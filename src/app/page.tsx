import Link from "next/link";
import {
  Calculator,
  MapPin,
  UtensilsCrossed,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const features = [
  {
    href: "/calculator",
    icon: Calculator,
    title: "Finals Calculator",
    description: "Calculate what you need on your final",
    color: "bg-blue-500",
  },
  {
    href: "/map",
    icon: MapPin,
    title: "Campus Map",
    description: "Find buildings, dining halls & more",
    color: "bg-green-500",
  },
  {
    href: "/dining",
    icon: UtensilsCrossed,
    title: "Dining",
    description: "Menus, hours & meal ratings",
    color: "bg-orange-500",
  },
  {
    href: "/clubs",
    icon: Users,
    title: "Clubs",
    description: "Browse student organizations",
    color: "bg-purple-500",
  },
  {
    href: "/professors",
    icon: GraduationCap,
    title: "Professors",
    description: "Find professor ratings",
    color: "bg-pink-500",
  },
  {
    href: "/resources",
    icon: BookOpen,
    title: "Resources",
    description: "Helpful links & info",
    color: "bg-teal-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-8">
        <h1 className="text-2xl font-bold">SCU Handbook</h1>
        <p className="text-white/80 mt-1">Your campus toolkit</p>
      </header>

      {/* Feature Grid */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
              >
                <div
                  className={`${feature.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="px-4 mt-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Welcome to SCU!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This app is your go-to guide for everything on campus. Calculate
            grades, find locations, check dining menus, and discover clubs.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
            Tip: Add this app to your home screen for quick access!
          </p>
        </div>
      </div>
    </div>
  );
}
