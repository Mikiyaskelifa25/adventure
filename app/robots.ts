import type { MetadataRoute } from "next"

const BASE_URL = "https://adventureinnethiopia.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Main crawlers: full access except internal API routes ──────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        // Allow image crawling for tour hero images → Google Image Search traffic
        allow: ["/", "/*.jpg$", "/*.JPG$", "/*.jpeg$", "/*.png$", "/*.webp$"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── Block AI training scrapers ─────────────────────────────────────────
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Claude-Web",
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
