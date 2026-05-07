"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location, SCU_CENTER, categoryColors } from "@/data/locations";

const createIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

interface CampusMapProps {
  locations: Location[];
  selectedCategory: string | null;
  onSelectLocation: (location: Location) => void;
  flyToLocation?: { lat: number; lng: number } | null;
  userLocation?: [number, number] | null;
}

function FlyController({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  const prevRef = useRef<typeof target>(null);

  useEffect(() => {
    if (target && target !== prevRef.current) {
      prevRef.current = target;
      map.flyTo([target.lat, target.lng], 18, { duration: 0.8 });
    }
  }, [target, map]);

  return null;
}

export default function CampusMap({
  locations,
  selectedCategory,
  onSelectLocation,
  flyToLocation,
  userLocation,
}: CampusMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const filteredLocations = selectedCategory
    ? locations.filter((loc) => loc.category === selectedCategory)
    : locations;

  return (
    <MapContainer
      center={[SCU_CENTER.lat, SCU_CENTER.lng]}
      zoom={17}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyController target={flyToLocation ?? null} />

      {userLocation && (
        <CircleMarker
          center={userLocation}
          radius={9}
          fillColor="#3b82f6"
          fillOpacity={1}
          color="white"
          weight={3}
        >
          <Popup>
            <span className="font-sans text-sm font-medium">You are here</span>
          </Popup>
        </CircleMarker>
      )}

      {filteredLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={createIcon(categoryColors[location.category])}
          eventHandlers={{ click: () => onSelectLocation(location) }}
        >
          <Popup>
            <div className="font-sans">
              <p className="font-semibold text-gray-900">{location.name}</p>
              <p className="text-sm text-gray-600">{location.description}</p>
              {location.hours && (
                <p className="text-xs text-gray-500 mt-1">{location.hours}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
