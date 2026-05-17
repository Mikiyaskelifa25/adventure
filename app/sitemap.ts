import type { MetadataRoute } from "next"
import { getToursFromSupabase } from "@/lib/supabaseData"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aventure-abyssinie.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getToursFromSupabase()

  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL}/groups/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/groups`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/plan-trip`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...tourEntries,
  ]
}
