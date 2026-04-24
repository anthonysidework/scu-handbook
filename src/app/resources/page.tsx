"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, BookOpen, ExternalLink, Search } from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return resources.filter((r) => {
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const grouped = useMemo(() => {
    if (selectedCategory || search) {
      return [{ category: selectedCategory ?? "Results", items: filtered }];
    }
    return resourceCategories
      .map((cat) => ({
        category: cat,
        items: resources.filter((r) => r.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered, selectedCategory, search]);

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
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Resources</h1>
            <p className="text-white/80 text-sm">Helpful SCU links</p>
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
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      {!search && (
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
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
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
      )}

      {/* Resource Groups */}
      <div className="px-4 mt-4 pb-8 space-y-6">
        {grouped.map(({ category, items }) => (
          <div key={category}>
            {!selectedCategory && !search && (
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                {category}
              </h2>
            )}
            <div className="space-y-2">
              {items.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl leading-none shrink-0">
                    {resource.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {resource.description}
                    </p>
                    {(selectedCategory || search) && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {resource.category}
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {grouped.every((g) => g.items.length === 0) && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No resources match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
