"use client";

import { useEffect, useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured() || loading) return null;

  const signIn = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signOut = () => createClient().auth.signOut();

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline truncate max-w-[100px]">
          {user.email?.split("@")[0]}
        </span>
        <LogOut className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
    >
      <LogIn className="w-4 h-4" />
      Sign in
    </button>
  );
}
