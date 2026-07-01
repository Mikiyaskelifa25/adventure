import type { MetadataRoute } from "next"
import { getToursFromSupabase } from "@/lib/supabaseData"

const BASE_URL_EN = "https://adventureinnethiopia.com"
const BASE_URL_FR = "https://fr.adventureinnethiopia.com"
const BASE_URL_RU = "https://ru.adventureinnethiopia.com"
const NOW = new Date()

function alternates(path: string) {
  const enUrl = `${BASE_URL_EN}${path}`
  const frUrl = `${BASE_URL_FR}${path}`
  const ruUrl = `${BASE_URL_RU}${path}`
  return {
    languages: {
      "en": enUrl,
      "fr": frUrl,
      "ru": ruUrl,
      "x-default": enUrl,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getToursFromSupabase()

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL_EN}/itineraries/${tour.slug}`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.95,
    alternates: alternates(`/itineraries/${tour.slug}`),
  }))

  return [
    {
      url: BASE_URL_EN,
      lastModified: NOW,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: alternates("/"),
    },
    {
      url: `${BASE_URL_EN}/groups`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/groups"),
    },
    {
      url: `${BASE_URL_EN}/itineraries`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/itineraries"),
    },
    {
      url: `${BASE_URL_EN}/plan-trip`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternates("/plan-trip"),
    },
    {
      url: `${BASE_URL_EN}/testimonials`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates("/testimonials"),
    },
    ...tourEntries,
  ]
}
