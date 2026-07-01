import { testimonials } from "@/lib/testimonialsData";
import JsonLd from "@/components/JsonLd";
import { buildReviewListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";
import { getPageMeta, getLocaleFromCookies } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocaleFromCookies();
  return getPageMeta("testimonials", locale);
}

export default async function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocaleFromCookies();

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
            })),
            locale
          ),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Testimonials", url: "/testimonials" },
          ], locale),
        ]}
      />
      {children}
    </>
  );
}
