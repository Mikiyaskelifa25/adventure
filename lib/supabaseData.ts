import { supabase } from "./supabase";
import { Trip, TripDay } from "./tripsData";
import type { Language } from "./i18n/translations";

interface SupabaseItineraryDay {
  day_number: number;
  title: string;
  fr_title?: string;
  ru_title?: string;
  activities: {
    place: string;
    latitude: number;
    longitude: number;
    description: string;
    fr_description?: string;
    ru_description?: string;
  }[];
}

interface SupabaseTour {
  id: string;
  title: string;
  title_fr?: string;
  title_ru?: string;
  category: string;
  duration: string;
  hero_image: string;
  banner_image: string;
  created_at: string;
  images: string[];
  itinerary: SupabaseItineraryDay[];
  itinerary_fr?: SupabaseItineraryDay[];
  itinerary_ru?: SupabaseItineraryDay[];
  highlights?: string[];
  tips?: string[];
  group_size: number | null;
  difficulty: string | null;
  description?: string;
  description_fr?: string;
  description_ru?: string;
  region?: string;
  region_fr?: string;
  region_ru?: string;
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

function enrichItineraryWithLang(
  base: TripDay[],
  langData: SupabaseItineraryDay[] | undefined,
  lang: "fr" | "ru"
): TripDay[] {
  if (!langData) return base;
  const titleKey = lang === "fr" ? "fr_title" : "ru_title";
  const descKey = lang === "fr" ? "fr_description" : "ru_description";
  const nameKey = lang === "fr" ? "fr_name" : "ru_name";
  const actDescKey = lang === "fr" ? "fr_description" : "ru_description";

  return base.map((day) => {
    const langDay = langData.find((d) => d.day_number === day.day);
    if (!langDay) return day;
    return {
      ...day,
      [titleKey]: langDay.title,
      [descKey]: langDay.activities?.map((a) => a.description).join(", ") || day.description,
      activities: day.activities?.map((act, i) => {
        const langAct = langDay.activities?.[i];
        return {
          ...act,
          [nameKey]: langAct?.description || act.name,
          [actDescKey]: langAct?.description || act.description || act.name,
        };
      }),
    };
  });
}

function mapTour(tour: SupabaseTour, index: number): Trip {
  const slug = slugify(tour.title || tour.itinerary?.[0]?.title || "ethiopia-tour");

  let itinerary: TripDay[] = (tour.itinerary || []).map((day) => {
    const lastActivity = day.activities?.[day.activities.length - 1];
    return {
      day: day.day_number,
      title: day.title,
      fr_title: day.fr_title,
      ru_title: day.ru_title,
      description: day.activities?.map((a) => a.description).join(", ") || "",
      activities: day.activities?.map((a) => ({
        name: a.description,
        description: a.description,
        fr_description: a.fr_description,
        ru_description: a.ru_description,
        place: a.place,
        longitude: a.longitude,
        latitude: a.latitude,
      })),
      overnight: lastActivity?.place || "TBD",
      lat: lastActivity?.latitude,
      lng: lastActivity?.longitude,
    };
  });

  itinerary = enrichItineraryWithLang(itinerary, tour.itinerary_fr, "fr");
  itinerary = enrichItineraryWithLang(itinerary, tour.itinerary_ru, "ru");

  return {
    id: index + 1,
    slug,
    title: tour.title || itinerary[0]?.title || "Ethiopia Tour",
    title_fr: tour.title_fr,
    title_ru: tour.title_ru,
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
    description_ru: tour.description_ru,
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
    region_fr: tour.region_fr,
    region_ru: tour.region_ru,
    isNew: index === 0,
    category: mapCategory(tour.category),
    type: tour.type,
    displayOrder: tour.display_order,
  };
}

export async function getToursFromSupabase(isLightweight = false): Promise<Trip[]> {
  const query = isLightweight 
    ? "id, title, title_fr, title_ru, category, duration, hero_image, banner_image, region, display_order, type, description, description_fr, description_ru"
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
