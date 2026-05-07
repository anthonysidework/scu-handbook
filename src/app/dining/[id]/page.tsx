import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import { diningHalls, menuItems } from "@/data/dining";
import DiningMenuTabs from "@/components/DiningMenuTabs";
import AuthButton from "@/components/AuthButton";

export default async function DiningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hall = diningHalls.find((h) => h.id === id);
  if (!hall) notFound();

  const items = menuItems.filter((m) => m.hallId === id);

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

        {/* Menu tabs (client component) */}
        {items.length > 0 ? (
          <DiningMenuTabs items={items} hallId={id} />
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400">No menu items available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
