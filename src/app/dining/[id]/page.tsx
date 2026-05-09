import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, MapPin, UtensilsCrossed, RefreshCw } from "lucide-react";
import { diningHalls } from "@/data/dining";
import { scrapeMenu, getDefaultDay } from "@/lib/scrape-menu";
import WeeklyMenuView from "@/components/WeeklyMenuView";
import AuthButton from "@/components/AuthButton";

export default async function DiningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hall = diningHalls.find((h) => h.id === id);
  if (!hall) notFound();

  // Fetch live menu for weekly halls
  let menu = null;
  let fetchError = false;
  if (hall.type === "weekly" && hall.menuUrl) {
    try {
      menu = await scrapeMenu(hall.menuUrl);
    } catch {
      fetchError = true;
    }
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/dining"
            className="inline-flex items-center text-white/80 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Dining</span>
          </Link>
          <AuthButton />
        </div>
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
        {/* Hours */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          {menu ? (
            <div className="space-y-1.5">
              {menu.hours.map((h) => (
                <div key={h.label} className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                  <span>
                    <span className="font-medium text-gray-900 dark:text-white">{h.label}:</span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">{h.time}</span>
                  </span>
                </div>
              ))}
              {menu.weekOf && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Week of {menu.weekOf} · updates automatically
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              {hall.approximateHours.weekdays && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>{hall.approximateHours.weekdays}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                <span>{hall.location}</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu */}
        {hall.type === "weekly" && (
          <>
            {fetchError && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">
                  Couldn&apos;t load the menu right now. Try again in a moment.
                </p>
              </div>
            )}
            {menu && menu.days.length > 0 && (
              <WeeklyMenuView
                days={menu.days}
                defaultDay={getDefaultDay(menu.days)}
              />
            )}
            {menu && menu.days.length === 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No menu posted yet for this week.
                </p>
              </div>
            )}
          </>
        )}

        {hall.type === "cafe" && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Full menu coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
