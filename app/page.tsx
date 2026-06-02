import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EditorialSection from "@/components/EditorialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getToursFromSupabase } from "@/lib/supabaseData";

export const metadata = {
  title: "Adventure in Ethiopia",
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
