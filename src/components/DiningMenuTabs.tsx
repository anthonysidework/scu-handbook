"use client";

import { useState } from "react";
import { dietaryTagColors } from "@/data/dining";

export interface MenuItem {
  id: string;
  hallId: string;
  name: string;
  description?: string;
  category: "breakfast" | "lunch" | "dinner" | "all-day";
  station: string;
  dietaryTags: string[];
  isPermanent: boolean;
  rating?: number;
  ratingCount?: number;
}
import RatingWidget from "./RatingWidget";

const mealOrder = ["breakfast", "lunch", "dinner", "all-day"] as const;
type MealTab = (typeof mealOrder)[number] | "all";

const tabLabels: Record<MealTab, string> = {
  all: "All",
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  "all-day": "All Day",
};

export default function DiningMenuTabs({
  items,
  hallId,
}: {
  items: MenuItem[];
  hallId: string;
}) {
  const availableMeals = mealOrder.filter((m) => items.some((i) => i.category === m));
  const tabs: MealTab[] = availableMeals.length > 1 ? ["all", ...availableMeals] : availableMeals;
  const [activeTab, setActiveTab] = useState<MealTab>(tabs[0] ?? "all");

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.category === activeTab);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800 flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[#9E1B32] text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      )}

      {/* Items */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            No items for this meal period.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((item) => (
              <div key={item.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {item.station}
                      </span>
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
                  </div>
                  <RatingWidget
                    itemId={item.id}
                    hallId={hallId}
                    initialRating={item.rating}
                    initialCount={item.ratingCount}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
