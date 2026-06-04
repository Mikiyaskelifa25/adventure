/**
 * Server layout for /testimonials.
 * Injects JSON-LD here because the page itself is a Client Component
 * and cannot import server-only schema builders directly.
 */
import { testimonials } from "@/lib/testimonialsData";
import JsonLd from "@/components/JsonLd";
import { buildReviewListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Traveller Reviews | Ethiopia Tours – Adventure in Abyssinie",
  description:
    "Read authentic 5-star reviews from travellers who explored Ethiopia with Adventure in Abyssinie. Real stories: Danakil Depression, Lalibela, Omo Valley, Simien Mountains. French-speaking guide Teddy rated 4.8/5.",
  keywords: [
    "Ethiopia tour reviews",
    "Adventure in Abyssinie reviews",
    "Ethiopia travel testimonials",
    "Teddy guide Ethiopia",
    "French-speaking Ethiopia guide reviews",
    "TripAdvisor Ethiopia tour",
  ],
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        id="testimonials-jsonld"
        schema={[
          buildReviewListSchema(
            testimonials.map((t) => ({
              id: t.id,
              name: t.name,
              quote: t.quote,
              rating: t.rating,
              date: t.date,
              image: t.image,
            }))
          ),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Testimonials", url: "/testimonials" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
