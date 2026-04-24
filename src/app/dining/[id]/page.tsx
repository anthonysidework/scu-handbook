import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { diningHalls, menuItems, dietaryTagColors } from "@/data/dining";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

const mealOrder = ["breakfast", "lunch", "dinner", "all-day"] as const;
const mealLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  "all-day": "All Day",
};

export default async function DiningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hall = diningHalls.find((h) => h.id === id);
  if (!hall) notFound();

  const items = menuItems.filter((m) => m.hallId === id);

  const byMeal = mealOrder
    .map((meal) => ({ meal, items: items.filter((i) => i.category === meal) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <Link
          href="/dining"
          className="inline-flex items-center text-white/80 hover:text-white mb-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Dining</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{hall.name}</h1>
            <p className="text-white/80 text-sm">{hall.description}</p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3 pb-8 space-y-4">
        {/* Hours & Location */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="space-y-2">
            {(["breakfast", "lunch", "dinner"] as const).map(
              (meal) =>
                hall.hours[meal] && (
                  <div
                    key={meal}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {meal}:
                      </span>{" "}
                      {hall.hours[meal]}
                    </span>
                  </div>
                )
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{hall.location}</span>
            </div>
          </div>
        </div>

        {/* Menu grouped by meal */}
        {byMeal.map(({ meal, items: mealItems }) => (
          <div
            key={meal}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {mealLabels[meal]}
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {mealItems.map((item) => (
                <div key={item.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.description}
                        </p>
                      )}
                      {item.dietaryTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.dietaryTags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                dietaryTagColors[tag] ?? "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {item.rating !== undefined && item.ratingCount !== undefined && (
                      <StarRating rating={item.rating} count={item.ratingCount} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {byMeal.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No menu items available.
            </p>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
            Ratings coming soon
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Sign in with your SCU email to rate menu items and help fellow
            Broncos find the best food on campus.
          </p>
        </div>
      </div>
    </div>
  );
}
