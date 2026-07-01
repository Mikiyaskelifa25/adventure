import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EditorialSection from "@/components/EditorialSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getToursFromSupabase } from "@/lib/supabaseData";
import { getPageMeta, getLocaleFromCookies } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata() {
  const locale = await getLocaleFromCookies();
  return getPageMeta("home", locale);
}

export default async function Home() {
  const locale = await getLocaleFromCookies();
  const trips = await getToursFromSupabase(true);

  return (
    <>
      <JsonLd
        id="home-jsonld"
        schema={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
          ], locale),
        ]}
      />
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
