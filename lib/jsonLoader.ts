import fs from 'fs';
import path from 'path';
import { Trip, TripDay } from './tripsData';

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

export interface JSONTour {
  title: string;
  description: string;
  duration: string;
  images?: string[];
  heroImage?: string;
  bannerImageUrl?: string;
  category?: "Group Trip" | "Daily" | "Private Trip" | "Tailor-made";
  highlights?: string[];
  days: {
    day: number;
    title: string;
    activities: {
      name: string;
      place: string;
      longitude: number;
      latitude: number;
    }[];
  }[];
  tips?: string[];
}

export interface JSONCollection {
  image: string;
  title: string;
  tag: string;
}

export async function getToursFromJSON(): Promise<Trip[]> {
  const filePath = path.join(process.cwd(), 'public', 'destinations.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  return data.tours.map((tour: JSONTour, index: number) => {
    const slug = slugify(tour.title);
    
    // Map JSON days to TripDay
    const itinerary: TripDay[] = tour.days.map(day => {
      const lastActivity = day.activities[day.activities.length - 1];
      return {
        day: day.day,
        title: day.title,
        description: day.activities.map(a => a.name).join(', '),
        activities: day.activities,
        overnight: lastActivity?.place || 'TBD',
        lat: lastActivity?.latitude,
        lng: lastActivity?.longitude
      };
    });

    const highlights = tour.highlights?.length
      ? tour.highlights
      : undefined;

    // Default values for missing fields to satisfy the Trip interface
    return {
      id: index + 1,
      slug: slug,
      title: tour.title,
      duration: tour.duration,
      daysCount: tour.days.length,
      price: "€2,450", // Default price
      priceNum: 2450,
      rating: 4.8,
      reviews: 12,
      groupSize: "6–12",
      difficulty: "Moderate",
      images: tour.images?.length ? tour.images : [],
      heroImage: tour.heroImage || `/pic${(index % 6) + 1}.jpg`,
      bannerImageUrl: tour.bannerImageUrl || tour.heroImage || `/pic${(index % 6) + 1}.jpg`,
      category: tour.category || "Group Trip",
      description: tour.description,
      longDescription: tour.description + " This journey offers a deep dive into the unique landscapes and cultures of Ethiopia.",
      highlights: highlights,
      tips: tour.tips?.length ? tour.tips : undefined,
      itinerary: itinerary,
      included: [
        "All internal flights",
        "Full-board accommodation",
        "Expert English/French-speaking guide",
        "All park and site entrance fees",
        "4WD vehicle with driver",
        "Airport transfers"
      ],
      notIncluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Tipping (optional)"
      ],
      region: tour.title.includes("Danakil") ? "Afar Region" : "Northern Ethiopia",
      isNew: index === 0
    };
  });
}

export async function getTourBySlug(slug: string): Promise<Trip | undefined> {
  const tours = await getToursFromJSON();
  return tours.find(t => t.slug === slug);
}

export async function getCollectionsFromJSON(): Promise<JSONCollection[]> {
  const filePath = path.join(process.cwd(), 'public', 'destinations.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data.collections || [];
}

export async function getRelatedImagesFromJSON(): Promise<string[]> {
  const filePath = path.join(process.cwd(), 'public', 'destinations.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  return data.relatedImages || [];
}
