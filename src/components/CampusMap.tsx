"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location, SCU_CENTER, categoryColors } from "@/data/locations";

// Fix Leaflet default icon issue
const createIcon = (color: string) => {
  return L.divIcon({
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
};

interface CampusMapProps {
  locations: Location[];
  selectedCategory: string | null;
  onSelectLocation: (location: Location) => void;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 17);
  }, [center, map]);

  return null;
}

export default function CampusMap({
  locations,
  selectedCategory,
  onSelectLocation,
}: CampusMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <MapController center={[SCU_CENTER.lat, SCU_CENTER.lng]} />
      {filteredLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={createIcon(categoryColors[location.category])}
          eventHandlers={{
            click: () => onSelectLocation(location),
          }}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-semibold text-gray-900">{location.name}</h3>
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
