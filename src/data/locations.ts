export interface Location {
  id: string;
  name: string;
  category: "dining" | "academic" | "library" | "athletic" | "housing" | "services" | "other";
  description: string;
  lat: number;
  lng: number;
  hours?: string;
  amenities?: string[];
}

// SCU campus center (Mission Gardens area)
export const SCU_CENTER = {
  lat: 37.3496,
  lng: -121.9406,
};

export const locations: Location[] = [
  // Dining
  {
    id: "benson",
    name: "Benson Memorial Center",
    category: "dining",
    description: "Main dining hall with multiple food stations",
    lat: 37.3484,
    lng: -121.9400,
    hours: "7:00 AM - 9:00 PM",
    amenities: ["Dining Hall", "Coffee", "Meeting Rooms"],
  },
  {
    id: "marketplace",
    name: "The Marketplace",
    category: "dining",
    description: "Food court style dining with various options",
    lat: 37.3477,
    lng: -121.9389,
    hours: "10:00 AM - 8:00 PM",
    amenities: ["Fast Food", "Grab & Go"],
  },
  {
    id: "mission-bakery",
    name: "Mission Bakery",
    category: "dining",
    description: "Fresh baked goods and coffee, inside Benson",
    lat: 37.3483,
    lng: -121.9402,
    hours: "7:30 AM - 5:00 PM",
    amenities: ["Coffee", "Pastries"],
  },

  // Academic Buildings
  {
    id: "lucas-hall",
    name: "Lucas Hall",
    category: "academic",
    description: "Leavey School of Business",
    lat: 37.3503,
    lng: -121.9381,
    amenities: ["Classrooms", "Study Rooms", "Business School"],
  },
  {
    id: "engineering",
    name: "Bannan Engineering",
    category: "academic",
    description: "School of Engineering",
    lat: 37.3497,
    lng: -121.9364,
    amenities: ["Labs", "Classrooms", "Engineering School"],
  },
  {
    id: "kenna-hall",
    name: "Kenna Hall",
    category: "academic",
    description: "Arts & Sciences classrooms",
    lat: 37.3501,
    lng: -121.9399,
    amenities: ["Classrooms", "Faculty Offices"],
  },
  {
    id: "varsi-hall",
    name: "Varsi Hall",
    category: "academic",
    description: "Administrative offices and classrooms",
    lat: 37.3505,
    lng: -121.9413,
    amenities: ["Classrooms", "Admin Offices"],
  },

  // Library
  {
    id: "orradre-library",
    name: "Orradre Library",
    category: "library",
    description: "Main campus library with study spaces",
    lat: 37.3491,
    lng: -121.9411,
    hours: "Open 24/7 during finals",
    amenities: ["Study Rooms", "Computers", "Printing", "Quiet Zones"],
  },

  // Athletic
  {
    id: "leavey-center",
    name: "Leavey Center",
    category: "athletic",
    description: "Fitness center and recreational facilities",
    lat: 37.3472,
    lng: -121.9404,
    hours: "6:00 AM - 11:00 PM",
    amenities: ["Gym", "Pool", "Basketball Courts", "Fitness Classes"],
  },
  {
    id: "stevens-stadium",
    name: "Stevens Stadium",
    category: "athletic",
    description: "Soccer stadium",
    lat: 37.3457,
    lng: -121.9421,
    amenities: ["Soccer", "Track"],
  },

  // Services
  {
    id: "cowell-health",
    name: "Cowell Health Center",
    category: "services",
    description: "Student health services",
    lat: 37.3479,
    lng: -121.9371,
    hours: "8:00 AM - 5:00 PM",
    amenities: ["Medical Services", "Counseling"],
  },
  {
    id: "benson-bookstore",
    name: "SCU Bookstore",
    category: "services",
    description: "Textbooks, apparel, and supplies",
    lat: 37.3486,
    lng: -121.9397,
    hours: "9:00 AM - 6:00 PM",
    amenities: ["Textbooks", "Apparel", "Supplies"],
  },

  // Housing
  {
    id: "graham-hall",
    name: "Graham Hall",
    category: "housing",
    description: "Freshman residence hall",
    lat: 37.3469,
    lng: -121.9371,
    amenities: ["Residence Hall", "Laundry"],
  },
  {
    id: "swig-hall",
    name: "Swig Hall",
    category: "housing",
    description: "Upperclassman residence hall",
    lat: 37.3461,
    lng: -121.9383,
    amenities: ["Residence Hall", "Laundry", "Study Lounges"],
  },

  // Other
  {
    id: "mission-church",
    name: "Mission Santa Clara",
    category: "other",
    description: "Historic mission church at the heart of campus",
    lat: 37.3494,
    lng: -121.9413,
    amenities: ["Chapel", "Historic Site"],
  },
];

export const categoryColors: Record<Location["category"], string> = {
  dining: "#f97316", // orange
  academic: "#3b82f6", // blue
  library: "#8b5cf6", // purple
  athletic: "#22c55e", // green
  housing: "#ec4899", // pink
  services: "#06b6d4", // cyan
  other: "#6b7280", // gray
};

export const categoryLabels: Record<Location["category"], string> = {
  dining: "Dining",
  academic: "Academic",
  library: "Library",
  athletic: "Athletic",
  housing: "Housing",
  services: "Services",
  other: "Other",
};
