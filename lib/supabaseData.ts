import { supabase } from "./supabase";
import { Trip, TripDay } from "./tripsData";
import type { Language } from "./i18n/translations";

interface SupabaseTour {
  id: string;
  title: string;
  title_fr?: string;
  category: string;
  duration: string;
  hero_image: string;
  banner_image: string;
  created_at: string;
  images: string[];
  itinerary: {
    day_number: number;
    title: string;
    activities: {
      place: string;
      latitude: number;
      longitude: number;
      description: string;
    }[];
  }[];
  highlights?: string[];
  tips?: string[];
  group_size: number | null;
  difficulty: string | null;
  description?: string;
  description_fr?: string;
  region?: string;
  region_fr?: string;
  display_order: number;
  type: string | null;
}

function mapCategory(cat: string): Trip["category"] {
  const map: Record<string, Trip["category"]> = {
    group: "Group Trip",
    daily: "Daily",
    private: "Private Trip",
    tailor: "Tailor-made",
  };
  return map[cat.toLowerCase()] || "Group Trip";
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function mapTour(tour: SupabaseTour, index: number): Trip {
  const slug = slugify(tour.title || tour.itinerary?.[0]?.title || "ethiopia-tour");

  const itinerary: TripDay[] = (tour.itinerary || []).map((day) => {
    const lastActivity = day.activities?.[day.activities.length - 1];
    return {
      day: day.day_number,
      title: day.title,
      description: day.activities?.map((a) => a.description).join(", ") || "",
      activities: day.activities?.map((a) => ({
        name: a.description,
        place: a.place,
        longitude: a.longitude,
        latitude: a.latitude,
      })),
      overnight: lastActivity?.place || "TBD",
      lat: lastActivity?.latitude,
      lng: lastActivity?.longitude,
    };
  });

  return {
    id: index + 1,
    slug,
    title: tour.title || itinerary[0]?.title || "Ethiopia Tour",
    title_fr: tour.title_fr,
    duration: tour.duration,
    daysCount: itinerary.length,
    price: "€2,450",
    priceNum: 2450,
    rating: 4.8,
    reviews: 12,
    groupSize: tour.group_size ? `${tour.group_size}` : "6–12",
    difficulty: tour.difficulty || "Moderate",
    images: tour.images?.length ? tour.images : [],
    heroImage: tour.hero_image || "",
    bannerImageUrl: tour.banner_image || tour.hero_image || "",
    description: tour.description || itinerary[0]?.description || "Explore the wonders of Ethiopia.",
    description_fr: tour.description_fr,
    longDescription:
      itinerary.map((d) => d.description).join(" ") ||
      "This journey offers a deep dive into the unique landscapes and cultures of Ethiopia.",
    highlights: tour.highlights?.length ? tour.highlights : [],
    tips: tour.tips?.length ? tour.tips : undefined,
    itinerary,
    included: [
      "All internal flights",
      "Full-board accommodation",
      "Expert English/French-speaking guide",
      "All park and site entrance fees",
      "4WD vehicle with driver",
      "Airport transfers",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tipping (optional)",
    ],
    region: tour.region || "Ethiopia",
    region_fr: (tour as any).region_fr,
    isNew: index === 0,
    category: mapCategory(tour.category),
    type: tour.type,
    displayOrder: tour.display_order,
  };
}

export async function getToursFromSupabase(isLightweight = false): Promise<Trip[]> {
  const query = isLightweight 
    ? "id, title, title_fr, category, duration, hero_image, banner_image, region, display_order, type, description, description_fr"
    : "*";

  const { data, error } = await supabase
    .from("tours")
    .select(query)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }

  return (data || []).map((tour: any, index: number) =>
    mapTour(tour as SupabaseTour, index)
  );
}

export async function getTourBySlugFromSupabase(
  slug: string
): Promise<Trip | undefined> {
  const tours = await getToursFromSupabase();
  return tours.find((t) => t.slug === slug);
}

export async function getDestinationsFromSupabase(): Promise<string[]> {
  const { data, error } = await supabase
    .from("tours")
    .select("title");

  if (error) {
    console.error("Supabase destinations fetch error:", error.message);
    return [];
  }

  const destinations = (data || [])
    .map((t: { title: string }) => {
      const title = t.title || "";
      const match = title.match(/(?:the\s+)?(.+)/i);
      return match ? match[1].trim() : title;
    })
    .filter(Boolean);

  return destinations.length > 0 ? destinations : [
    "Danakil Depression",
    "Omo Valley",
    "Lalibela",
    "Simien Mountains",
    "Bale Mountains",
    "Historical North"
  ];
}

export async function getCollectionsFromSupabase(): Promise<
  { image: string; title: string; tag: string }[]
> {
  const { data, error } = await supabase
    .from("collections")
    .select("*");

  if (error) {
    console.error("Supabase collections fetch error:", error.message);
    return [];
  }

  return (data || []).map((c: unknown) => {
    const col = c as { image?: string; title?: string; tag?: string };
    return {
      image: col.image || "/pic1.jpg",
      title: col.title || "Collection",
      tag: col.tag || "Explore",
    };
  });
}
