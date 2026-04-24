export interface DiningHall {
  id: string;
  name: string;
  description: string;
  hours: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  location: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  hallId: string;
  name: string;
  description?: string;
  category: "breakfast" | "lunch" | "dinner" | "all-day";
  station: string;
  dietaryTags: string[];
  isPermanent: boolean;
  rating?: number;
  ratingCount?: number;
}

export const diningHalls: DiningHall[] = [
  {
    id: "benson",
    name: "Benson Memorial Center",
    description: "Main campus dining hall with diverse food stations",
    hours: {
      breakfast: "7:00 AM - 10:00 AM",
      lunch: "11:00 AM - 2:00 PM",
      dinner: "5:00 PM - 8:00 PM",
    },
    location: "Center of campus, near Mission Gardens",
  },
  {
    id: "marketplace",
    name: "The Marketplace",
    description: "Food court style with quick service options",
    hours: {
      lunch: "10:30 AM - 3:00 PM",
      dinner: "4:30 PM - 8:00 PM",
    },
    location: "Near Graham Hall",
  },
  {
    id: "mission-bakery",
    name: "Mission Bakery & Café",
    description: "Fresh pastries, coffee, and light fare",
    hours: {
      breakfast: "7:30 AM - 11:00 AM",
      lunch: "11:00 AM - 3:00 PM",
    },
    location: "In Benson Center",
  },
];

// Sample menu items - in production these would come from a database or scraper
export const menuItems: MenuItem[] = [
  // Benson - Permanent Items
  {
    id: "b1",
    hallId: "benson",
    name: "Make Your Own Salad Bar",
    description: "Fresh greens, vegetables, and toppings",
    category: "all-day",
    station: "Salad Bar",
    dietaryTags: ["vegetarian", "vegan", "gluten-free"],
    isPermanent: true,
    rating: 4.2,
    ratingCount: 45,
  },
  {
    id: "b2",
    hallId: "benson",
    name: "Pizza Station",
    description: "Rotating selection of fresh pizzas",
    category: "all-day",
    station: "Pizza",
    dietaryTags: ["vegetarian"],
    isPermanent: true,
    rating: 3.8,
    ratingCount: 89,
  },
  {
    id: "b3",
    hallId: "benson",
    name: "Grill Station",
    description: "Burgers, chicken sandwiches, and fries",
    category: "lunch",
    station: "Grill",
    dietaryTags: [],
    isPermanent: true,
    rating: 4.0,
    ratingCount: 112,
  },
  {
    id: "b4",
    hallId: "benson",
    name: "Stir Fry Bowl",
    description: "Build your own stir fry with rice or noodles",
    category: "dinner",
    station: "Asian",
    dietaryTags: ["vegetarian"],
    isPermanent: true,
    rating: 4.5,
    ratingCount: 67,
  },
  {
    id: "b5",
    hallId: "benson",
    name: "Scrambled Eggs",
    description: "Made to order scrambled eggs",
    category: "breakfast",
    station: "Hot Breakfast",
    dietaryTags: ["vegetarian", "gluten-free"],
    isPermanent: true,
    rating: 3.9,
    ratingCount: 34,
  },
  {
    id: "b6",
    hallId: "benson",
    name: "Pancakes",
    description: "Fluffy buttermilk pancakes",
    category: "breakfast",
    station: "Hot Breakfast",
    dietaryTags: ["vegetarian"],
    isPermanent: true,
    rating: 4.1,
    ratingCount: 56,
  },

  // Marketplace Items
  {
    id: "m1",
    hallId: "marketplace",
    name: "Chicken Tenders",
    description: "Crispy chicken tenders with fries",
    category: "all-day",
    station: "Main",
    dietaryTags: [],
    isPermanent: true,
    rating: 4.3,
    ratingCount: 78,
  },
  {
    id: "m2",
    hallId: "marketplace",
    name: "Quesadilla",
    description: "Cheese or chicken quesadilla",
    category: "all-day",
    station: "Main",
    dietaryTags: ["vegetarian"],
    isPermanent: true,
    rating: 4.0,
    ratingCount: 45,
  },
  {
    id: "m3",
    hallId: "marketplace",
    name: "Grab & Go Sushi",
    description: "Fresh pre-made sushi rolls",
    category: "lunch",
    station: "Grab & Go",
    dietaryTags: ["gluten-free"],
    isPermanent: true,
    rating: 3.5,
    ratingCount: 23,
  },

  // Mission Bakery
  {
    id: "mb1",
    hallId: "mission-bakery",
    name: "Croissant",
    description: "Fresh baked butter croissant",
    category: "breakfast",
    station: "Bakery",
    dietaryTags: ["vegetarian"],
    isPermanent: true,
    rating: 4.7,
    ratingCount: 89,
  },
  {
    id: "mb2",
    hallId: "mission-bakery",
    name: "Cold Brew Coffee",
    description: "Smooth cold brew coffee",
    category: "all-day",
    station: "Drinks",
    dietaryTags: ["vegan", "gluten-free"],
    isPermanent: true,
    rating: 4.4,
    ratingCount: 134,
  },
  {
    id: "mb3",
    hallId: "mission-bakery",
    name: "Avocado Toast",
    description: "Sourdough with fresh avocado",
    category: "breakfast",
    station: "Kitchen",
    dietaryTags: ["vegetarian", "vegan"],
    isPermanent: true,
    rating: 4.2,
    ratingCount: 67,
  },
];

export const dietaryTagColors: Record<string, string> = {
  vegetarian: "bg-green-100 text-green-700",
  vegan: "bg-emerald-100 text-emerald-700",
  "gluten-free": "bg-amber-100 text-amber-700",
  halal: "bg-blue-100 text-blue-700",
  kosher: "bg-purple-100 text-purple-700",
};
