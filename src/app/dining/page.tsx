"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { diningHalls } from "@/data/dining";

function getCurrentMeal(): string | null {
  const h = new Date().getHours();
  if (h >= 7 && h < 11) return "breakfast";
  if (h >= 11 && h < 15) return "lunch";
  if (h >= 17 && h < 21) return "dinner";
  return null;
}

export default function DiningPage() {
  const currentMeal = getCurrentMeal();

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-2">
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
              {currentMeal ? `Currently serving ${currentMeal}` : "All locations currently closed"}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3 pb-8 space-y-3">
        {diningHalls.map((hall) => (
          <Link
            key={hall.id}
            href={`/dining/${hall.id}`}
            className="block bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-gray-900 dark:text-white">{hall.name}</h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      hall.type === "weekly"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {hall.type === "weekly" ? "Weekly menu" : "Café"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{hall.description}</p>

                <div className="mt-2 space-y-1">
                  {hall.approximateHours.weekdays && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{hall.approximateHours.weekdays}</span>
                    </div>
                  )}
                  {hall.approximateHours.note && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                      <span>⚠ {hall.approximateHours.note}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{hall.location}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
