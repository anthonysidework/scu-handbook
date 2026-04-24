"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Users, Search, Link2, Mail, MapPin } from "lucide-react";
import { clubs, clubCategories } from "@/data/clubs";

export default function ClubsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return clubs.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

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
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Clubs & Orgs</h1>
            <p className="text-white/80 text-sm">{clubs.length} organizations</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 -mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clubs..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 mt-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null
                ? "bg-[#9E1B32] text-white"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            All
          </button>
          {clubCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#9E1B32] text-white"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 mt-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {filtered.length} {filtered.length === 1 ? "club" : "clubs"} found
        </p>
      </div>

      {/* Club List */}
      <div className="px-4 mt-2 pb-8 space-y-3">
        {filtered.map((club) => (
          <div
            key={club.id}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {club.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {club.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {club.description}
                </p>

                <div className="mt-2 space-y-1">
                  {club.meetingInfo && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{club.meetingInfo}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-2">
                  {club.instagram && (
                    <a
                      href={`https://instagram.com/${club.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 hover:underline"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      {club.instagram}
                    </a>
                  )}
                  {club.email && (
                    <a
                      href={`mailto:${club.email}`}
                      className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No clubs match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
