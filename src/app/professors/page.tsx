"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, GraduationCap, Search, ExternalLink } from "lucide-react";

// SCU's school ID on Rate My Professors
const SCU_RMP_ID = "1045";

export default function ProfessorsPage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const url = `https://www.ratemyprofessors.com/search/professors/${SCU_RMP_ID}?q=${encodeURIComponent(query.trim())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Professors</h1>
            <p className="text-white/80 text-sm">Find professor ratings</p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-3 pb-8 space-y-4">
        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
            Search Rate My Professors
          </h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Professor last name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 bg-[#9E1B32] text-white rounded-lg font-medium hover:bg-[#7a1526] transition-colors text-sm"
            >
              Search
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Opens Rate My Professors filtered to SCU
          </p>
        </div>

        {/* Direct Link */}
        <a
          href={`https://www.ratemyprofessors.com/search/professors/${SCU_RMP_ID}?q=*`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Browse All SCU Professors
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              View full list on Rate My Professors
            </p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 shrink-0" />
        </a>

        {/* Tips */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Tips for reading reviews
          </h3>
          <div className="space-y-3">
            {[
              {
                emoji: "📊",
                tip: "Look at the number of ratings — more reviews means more reliable data.",
              },
              {
                emoji: "📅",
                tip: "Filter for recent reviews. Teaching styles change over time.",
              },
              {
                emoji: "🎯",
                tip: "Check if reviewers took the same class you're considering.",
              },
              {
                emoji: "⚖️",
                tip: "Read both positive and negative reviews for a balanced view.",
              },
            ].map(({ emoji, tip }) => (
              <div key={tip} className="flex gap-3">
                <span className="text-lg leading-tight">{emoji}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SCU Registrar */}
        <a
          href="https://www.scu.edu/registrar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              SCU Registrar
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Official course schedules and enrollment
            </p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400 shrink-0" />
        </a>
      </div>
    </div>
  );
}
