import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import ItinerariesHero from "@/components/itineraries/ItinerariesHero";
import ItinerariesContent from "@/components/itineraries/ItinerariesContent";
import { getToursFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";

export const metadata = {
  title: "All Itineraries | Aventure en Abyssinie",
  description:
    "Browse all our curated Ethiopian itineraries. Find the perfect adventure across Ethiopia's historic and natural wonders.",
};

export default async function ItinerariesPage() {
  const trips = await getToursFromSupabase();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
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
