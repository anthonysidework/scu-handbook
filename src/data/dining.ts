export type DiningHallType = "weekly" | "cafe";

export interface DiningHall {
  id: string;
  name: string;
  type: DiningHallType;
  menuUrl?: string;
  description: string;
  location: string;
  approximateHours: {
    weekdays?: string;
    note?: string;
  };
}

export const diningHalls: DiningHall[] = [
  {
    id: "marketplace",
    name: "Marketplace",
    type: "weekly",
    menuUrl: "https://legacy.cafebonappetit.com/weekly-menu/603202",
    description: "Main campus dining hall with rotating weekly menus",
    location: "Center of campus, near Mission Gardens",
    approximateHours: {
      weekdays: "Breakfast 7–10:30 AM · Lunch 11 AM–2:30 PM · Dinner 5–9 PM",
    },
  },
  {
    id: "fresh-bytes",
    name: "Fresh Bytes",
    type: "weekly",
    menuUrl: "https://legacy.cafebonappetit.com/weekly-menu/604682",
    description: "Coffee, smoothies, boba, and a weekly tapas lunch menu",
    location: "Near the library",
    approximateHours: {
      weekdays: "Open 7:30 AM–5 PM · Tapas Lunch 10:30 AM–2:30 PM",
    },
  },
  {
    id: "sunstream",
    name: "Sunstream Cafe",
    type: "cafe",
    description: "Light bites, coffee, and café drinks",
    location: "Lucas Hall",
    approximateHours: {
      weekdays: "Mon–Fri",
      note: "Menu coming soon",
    },
  },
  {
    id: "cadence",
    name: "Cadence Cafe",
    type: "cafe",
    description: "Espresso drinks, pastries, and grab-and-go items",
    location: "Sobrato Hall",
    approximateHours: {
      weekdays: "Mon–Fri",
      note: "Menu coming soon",
    },
  },
  {
    id: "mission-bakery",
    name: "Mission Bakery",
    type: "cafe",
    description: "Fresh baked pastries, sandwiches, and coffee",
    location: "Benson Memorial Center",
    approximateHours: {
      weekdays: "Mon–Fri · 7:30 AM–3 PM",
    },
  },
];

export const dietaryTagColors: Record<string, string> = {
  vegetarian: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  vegan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "gluten-free": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "seafood-watch": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};
