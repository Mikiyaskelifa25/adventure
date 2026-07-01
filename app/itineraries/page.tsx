import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import ItinerariesHero from "@/components/itineraries/ItinerariesHero";
import ItinerariesContent from "@/components/itineraries/ItinerariesContent";
import { getToursFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { buildTourListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";
import { getPageMeta, getLocaleFromCookies } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocaleFromCookies();
  return getPageMeta("itineraries", locale);
}

export default async function ItinerariesPage() {
  const locale = await getLocaleFromCookies();
  const trips = await getToursFromSupabase();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <JsonLd
        id="itineraries-jsonld"
        schema={[
          buildTourListSchema(trips, "All Ethiopia Itineraries", "/itineraries", locale),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Itineraries", url: "/itineraries" },
          ], locale),
        ]}
      />
      <TopNavBar />
      <main>
        <ItinerariesHero />
        <Suspense fallback={<div className="py-20 text-center">Loading itineraries...</div>}>
          <ItinerariesContent trips={trips} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
