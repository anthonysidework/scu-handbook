"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { diningHalls } from "@/data/dining";

type MealPeriod = "breakfast" | "lunch" | "dinner";

function getCurrentMeal(): MealPeriod | null {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 15) return "lunch";
  if (hour >= 17 && hour < 21) return "dinner";
  return null;
}

function getNextMeal(hours: { breakfast?: string; lunch?: string; dinner?: string }): string | null {
  const hour = new Date().getHours();
  if (hour < 7 && hours.breakfast) return `Breakfast at ${hours.breakfast.split(" - ")[0]}`;
  if (hour < 11 && hours.lunch) return `Lunch at ${hours.lunch.split(" - ")[0]}`;
  if (hour < 17 && hours.dinner) return `Dinner at ${hours.dinner.split(" - ")[0]}`;
  return null;
}

function getMealStatus(hours: { breakfast?: string; lunch?: string; dinner?: string }) {
  const currentMeal = getCurrentMeal();
  if (currentMeal && hours[currentMeal]) {
    return {
      open: true,
      label: currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1),
      hours: hours[currentMeal]!,
    };
  }
  const next = getNextMeal(hours);
  return { open: false, label: next ?? "Closed today", hours: null };
}

export default function DiningPage() {
  const currentMeal = getCurrentMeal();

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Dining</h1>
            <p className="text-white/80 text-sm">
              {currentMeal
                ? `Currently serving ${currentMeal}`
                : "All locations currently closed"}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3 pb-8 space-y-3">
        {diningHalls.map((hall) => {
          const status = getMealStatus(hall.hours);
          return (
            <Link
              key={hall.id}
              href={`/dining/${hall.id}`}
              className="block bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {hall.name}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        status.open
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {status.open ? "Open" : "Closed"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {hall.description}
                  </p>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                      {status.open ? (
                        <span className="text-green-700 dark:text-green-400">
                          {status.label} · {status.hours}
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          {status.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{hall.location}</span>
                    </div>
                  </div>

                  {/* All hours summary */}
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {(["breakfast", "lunch", "dinner"] as const).map(
                      (meal) =>
                        hall.hours[meal] && (
                          <span
                            key={meal}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              currentMeal === meal && status.open
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {meal.charAt(0).toUpperCase() + meal.slice(1)}
                          </span>
                        )
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="px-4 pb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
            Rate your meals!
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Sign in with your SCU email to rate menu items and help other
            students find the best food on campus.
          </p>
        </div>
      </div>
    </div>
  );
}
