import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getTourBySlugFromSupabase, getToursFromSupabase } from "@/lib/supabaseData";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TripDetailContent from "@/components/groups/TripDetailContent";
import JsonLd from "@/components/JsonLd";
import { buildTourSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  const tours = await getToursFromSupabase();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getTourBySlugFromSupabase(slug);
  if (!trip) return { title: "Trip Not Found" };

  const topHighlights = (trip.highlights ?? []).slice(0, 3).join(", ");
  const descriptionSuffix = topHighlights
    ? ` Highlights: ${topHighlights}.`
    : "";

  return {
    title: `${trip.title} | ${trip.duration} Ethiopia Tour \u2013 Adventure in Abyssinie`,
    description:
      `${trip.description}${descriptionSuffix} ${trip.region}. Small group & private departures. Expert French & English-speaking guide. Book with Adventure in Abyssinie.`.trim(),
    keywords: [
      trip.title,
      `${trip.region} tour`,
      `${trip.duration} Ethiopia tour`,
      `Ethiopia ${trip.category.toLowerCase()}`,
      "French-speaking Ethiopia guide",
      "small group Ethiopia tour",
      "tailor-made Ethiopia itinerary",
      "Adventure in Abyssinie",
      ...(trip.highlights ?? []).slice(0, 5),
    ],
    openGraph: {
      title: `${trip.title} | Adventure in Abyssinie`,
      description: trip.description,
      images: trip.heroImage
        ? [{ url: trip.heroImage.startsWith("http") ? trip.heroImage : `/og-image.jpg`, width: 1200, height: 630, alt: trip.title }]
        : [],
    },
  };
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  const locale: "en" | "fr" | "ru" = lang === "fr" || lang === "ru" ? lang : "en";
  const { slug } = await params;
  const trip = await getTourBySlugFromSupabase(slug);
  
  if (!trip) notFound();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <JsonLd
        id={`tour-jsonld-${trip.slug}`}
        schema={[
          buildTourSchema(trip, locale),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tours", url: "/itineraries" },
            { name: trip.title, url: `/itineraries/${trip.slug}` },
          ], locale),
        ]}
      />
      <TopNavBar />
      <main>
        <TripDetailContent trip={trip} />
      </main>
      <Footer />
    </div>
  );
}

