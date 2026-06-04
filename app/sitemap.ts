import type { MetadataRoute } from "next"
import { getToursFromSupabase } from "@/lib/supabaseData"

const BASE_URL = "https://adventureinnethiopia.com"
const NOW = new Date()

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build hreflang alternates for a given path.
 * All three locales point to the same URL (language is cookie-driven, not path-based).
 */
function alternates(path: string) {
  const url = `${BASE_URL}${path}`
  return {
    languages: {
      "en": url,
      "fr": url,
      "ru": url,
      "x-default": url,
    },
  }
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getToursFromSupabase()

  // Individual tour pages — highest priority after homepage
  const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${BASE_URL}/itineraries/${tour.slug}`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: 0.95,
    alternates: alternates(`/itineraries/${tour.slug}`),
  }))

  return [
    // ── Core pages (highest crawl priority) ───────────────────────────────
    {
      url: BASE_URL,
      lastModified: NOW,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: alternates("/"),
    },
    // ── Tour listing pages ────────────────────────────────────────────────
    {
      url: `${BASE_URL}/groups`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/groups"),
    },
    {
      url: `${BASE_URL}/itineraries`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/itineraries"),
    },
    // ── Conversion pages ──────────────────────────────────────────────────
    {
      url: `${BASE_URL}/plan-trip`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternates("/plan-trip"),
    },
    // ── Trust pages ───────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates("/testimonials"),
    },
    // ── Individual tour detail pages ──────────────────────────────────────
    ...tourEntries,
  ]
}
