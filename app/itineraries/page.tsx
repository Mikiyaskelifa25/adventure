import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import ItinerariesHero from "@/components/itineraries/ItinerariesHero";
import ItinerariesContent from "@/components/itineraries/ItinerariesContent";
import { getToursFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { buildTourListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Ethiopia Tour Itineraries 2025 | Danakil, Lalibela & Omo Valley",
  description:
    "Browse all curated Ethiopia tour itineraries. 7 to 15-day packages covering Danakil Depression, Lalibela rock-hewn churches, Omo Valley tribes, Simien Mountains & Gondar castles. Tailor-made or small group departures.",
};

export default async function ItinerariesPage() {
  const trips = await getToursFromSupabase();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <JsonLd
        id="itineraries-jsonld"
        schema={[
          buildTourListSchema(trips, "All Ethiopia Itineraries", "/itineraries"),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Itineraries", url: "/itineraries" },
          ]),
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
