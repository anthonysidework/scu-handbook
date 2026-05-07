"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Navigation, X, Search, LocateFixed } from "lucide-react";
import { locations, Location, categoryColors, categoryLabels } from "@/data/locations";

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
  const [flyToLocation, setFlyToLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return locations
      .filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [search]);

  const handleSelectResult = (location: Location) => {
    setSelectedLocation(location);
    setFlyToLocation(location);
    setSearch("");
    setSearchFocused(false);
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setFlyToLocation({ lat: coords[0], lng: coords[1] } as Location);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  const openInMaps = (location: Location) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-5rem)]">
      {/* Header */}
      <header className="bg-[#9E1B32] text-white px-4 pt-12 pb-4 shrink-0">
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-2">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Campus Map</h1>
            <p className="text-white/80 text-sm">{locations.length} locations</p>
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-3 py-2 shrink-0 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
            placeholder="Search buildings..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search dropdown */}
        {searchFocused && searchResults.length > 0 && (
          <div className="absolute left-3 right-3 top-full mt-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-[2000]">
            {searchResults.map((loc) => (
              <button
                key={loc.id}
                onMouseDown={() => handleSelectResult(loc)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-left"
              >
                <div
                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: categoryColors[loc.category] }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {loc.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{loc.category}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category filters */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(selectedCategory === category ? null : category)
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category ? categoryColors[category] : undefined,
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
          flyToLocation={flyToLocation}
          userLocation={userLocation}
        />

        {/* My location button */}
        <button
          onClick={handleMyLocation}
          disabled={locating}
          className="absolute top-3 right-3 z-[1000] bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
          title="My location"
        >
          <LocateFixed
            className={`w-5 h-5 ${
              userLocation ? "text-blue-500" : "text-gray-600 dark:text-gray-300"
            } ${locating ? "animate-pulse" : ""}`}
          />
        </button>

        {/* Location detail card */}
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
                style={{ backgroundColor: categoryColors[selectedLocation.category] }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedLocation.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedLocation.description}
                </p>
                {selectedLocation.hours && (
                  <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedLocation.hours}</span>
                  </div>
                )}
                {selectedLocation.amenities && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedLocation.amenities.map((a) => (
                      <span
                        key={a}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => openInMaps(selectedLocation)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[#9E1B32] text-white py-2.5 rounded-lg font-medium hover:bg-[#7a1526] transition-colors text-sm"
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
