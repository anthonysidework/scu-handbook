"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Navigation, X } from "lucide-react";
import {
  locations,
  Location,
  categoryColors,
  categoryLabels,
} from "@/data/locations";

// Dynamic import for Leaflet (requires window)
const CampusMap = dynamic(() => import("@/components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

const categories = Object.keys(categoryLabels) as Location["category"][];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const openInMaps = (location: Location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-5rem)]">
      {/* Header */}
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-4 shrink-0">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Campus Map</h1>
            <p className="text-white/80 text-sm">Find any location</p>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? categoryColors[category]
                    : undefined,
              }}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <CampusMap
          locations={locations}
          selectedCategory={selectedCategory}
          onSelectLocation={setSelectedLocation}
        />

        {/* Location Detail Card */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 z-[1000]">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: categoryColors[selectedLocation.category],
                }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedLocation.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedLocation.description}
                </p>
                {selectedLocation.hours && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{selectedLocation.hours}</span>
                  </div>
                )}
                {selectedLocation.amenities && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedLocation.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => openInMaps(selectedLocation)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#9E1B32] text-white py-2.5 rounded-lg font-medium hover:bg-[#7a1526] transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
