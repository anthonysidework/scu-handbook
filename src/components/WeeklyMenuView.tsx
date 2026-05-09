"use client";

import { useState } from "react";
import type { ScrapedDay } from "@/lib/scrape-menu";
import { dietaryTagColors } from "@/data/dining";

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  days: ScrapedDay[];
  defaultDay: number;
}

export default function WeeklyMenuView({ days, defaultDay }: Props) {
  const [view, setView] = useState<"daily" | "weekly">("daily");
  const [activeDay, setActiveDay] = useState(defaultDay);

  const currentDay = days.find((d) => d.dayIndex === activeDay) ?? days[0];

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-1 shadow-sm border border-gray-100 dark:border-gray-800 flex">
        <button
          onClick={() => setView("daily")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "daily"
              ? "bg-[#9E1B32] text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setView("weekly")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "weekly"
              ? "bg-[#9E1B32] text-white"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          Full Week
        </button>
      </div>

      {/* Day tabs (weekly view only) */}
      {view === "weekly" && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {days.map((d) => (
            <button
              key={d.dayIndex}
              onClick={() => setActiveDay(d.dayIndex)}
              className={`flex-1 min-w-[52px] py-2 rounded-xl text-sm font-medium transition-colors ${
                activeDay === d.dayIndex
                  ? "bg-[#9E1B32] text-white"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {DAY_SHORT[d.dayIndex]}
            </button>
          ))}
        </div>
      )}

      {/* Menu content */}
      {currentDay ? (
        <div className="space-y-3">
          {currentDay.stations.map((station) => (
            <div
              key={station.name}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {station.name}
                </h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {station.items.map((item, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
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
                      {item.dayPart !== "all-day" && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 capitalize">
                          {item.dayPart}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No menu available for this day.
          </p>
        </div>
      )}
    </div>
  );
}
