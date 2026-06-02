import type { MetadataRoute } from "next"

const BASE_URL = "https://adventureinnethiopia.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
