import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EditorialSection from "@/components/EditorialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getToursFromSupabase } from "@/lib/supabaseData";

export const metadata = {
  title: "Adventure in Abyssinie | Expert Ethiopia Tours – Danakil, Lalibela & Omo Valley",
  description:
    "Ethiopia's premier small-group & tailor-made tour operator. Expert French & English-speaking guides. Danakil Depression, Lalibela UNESCO churches, Omo Valley tribal tours, Simien Mountains trekking & Gondar castles. Book direct from Addis Ababa.",
  keywords: [
    "Ethiopia tour operator",
    "Adventure in Abyssinie",
    "Danakil Depression tour 2025",
    "Lalibela church tour",
    "Omo Valley tribal experience",
    "French-speaking guide Ethiopia",
    "small group Ethiopia tour",
    "Ethiopia private tour",
    "Simien Mountains trek",
    "Ethiopia tailor-made itinerary",
  ],
};

export default async function Home() {
  const trips = await getToursFromSupabase(true);

  return (
    <>
      <TopNavBar />
      <main>
        <HeroSection trips={trips} />
        <AboutSection />
        <EditorialSection trips={trips} />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
