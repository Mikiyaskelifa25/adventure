import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import GroupsHero from "@/components/groups/GroupsHero";
import GroupsContent from "@/components/groups/GroupsContent";
import { getToursFromSupabase, getCollectionsFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";

export const metadata = {
  title: "Ethiopia Group Tours | Adventure in Abyssinie",
  description:
    "Discover Ethiopia with our curated group circuits. Explore ancient churches, dramatic landscapes, and vibrant cultures.",
};

export default async function GroupsPage() {
  const [trips, collections] = await Promise.all([
    getToursFromSupabase(),
    getCollectionsFromSupabase()
  ]);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <TopNavBar />
      <main>
        <GroupsHero />
        <Suspense fallback={<div className="py-20 text-center">Loading tours...</div>}>
          <GroupsContent trips={trips} collections={collections} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
