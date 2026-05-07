"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Props {
  itemId: string;
  hallId: string;
  initialRating?: number;
  initialCount?: number;
}

export default function RatingWidget({ itemId, hallId, initialRating, initialCount }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [myRating, setMyRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [avgRating, setAvgRating] = useState(initialRating ?? null);
  const [ratingCount, setRatingCount] = useState(initialCount ?? 0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // Load this user's existing rating
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: existing } = await supabase
        .from("ratings")
        .select("score")
        .eq("item_id", itemId)
        .eq("user_id", data.user.id)
        .maybeSingle();
      if (existing) setMyRating(existing.score);
    });

    // Load aggregate
    supabase
      .from("ratings")
      .select("score")
      .eq("item_id", itemId)
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) {
          const avg = rows.reduce((sum, r) => sum + r.score, 0) / rows.length;
          setAvgRating(Math.round(avg * 10) / 10);
          setRatingCount(rows.length);
        }
      });

    return () => subscription.unsubscribe();
  }, [itemId]);

  if (!isSupabaseConfigured()) return null;

  const submitRating = async (score: number) => {
    if (!user || submitting) return;
    setSubmitting(true);
    const supabase = createClient();
    await supabase.from("ratings").upsert(
      { user_id: user.id, item_id: itemId, hall_id: hallId, score },
      { onConflict: "user_id,item_id" }
    );
    setMyRating(score);
    setSubmitting(false);
  };

  const signIn = () => {
    createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const displayRating = hovered ?? myRating;

  return (
    <div className="flex flex-col items-end gap-1">
      {avgRating !== null && (
        <div className="flex items-center gap-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">({ratingCount})</span>
        </div>
      )}
      {user ? (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => submitRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              disabled={submitting}
              className="p-0.5"
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  displayRating !== null && star <= displayRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={signIn}
          className="text-xs text-[#9E1B32] hover:underline"
        >
          Sign in to rate
        </button>
      )}
    </div>
  );
}
