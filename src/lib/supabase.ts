import { createBrowserClient } from "@supabase/ssr";

// These will be set via environment variables
// Create a .env.local file with:
// NEXT_PUBLIC_SUPABASE_URL=your-project-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Database types (expand as needed)
export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  category: "dining" | "academic" | "library" | "athletic" | "housing" | "other";
  description: string | null;
  lat: number;
  lng: number;
  hours: Record<string, string> | null;
  amenities: string[];
  image_url: string | null;
}

export interface DiningItem {
  id: string;
  location_id: string;
  name: string;
  description: string | null;
  category: "breakfast" | "lunch" | "dinner" | "all-day";
  dietary_tags: string[];
  available_date: string | null;
  is_permanent: boolean;
}

export interface Rating {
  id: string;
  user_id: string;
  item_id: string;
  score: number;
  comment: string | null;
  created_at: string;
}

export interface Club {
  id: string;
  name: string;
  description: string | null;
  category: string;
  contact_email: string | null;
  website: string | null;
  instagram: string | null;
  meeting_info: string | null;
}
