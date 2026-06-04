import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import GroupsHero from "@/components/groups/GroupsHero";
import GroupsContent from "@/components/groups/GroupsContent";
import { getToursFromSupabase, getCollectionsFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { buildTourListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Ethiopia Group Tours 2025 | Small Group & Private Packages",
  description:
    "Explore Ethiopia with expert-guided group tours. Danakil Depression, Lalibela churches, Omo Valley tribes & Simien Mountains trekking. Small groups of 6–14, French & English-speaking guides. Book from Addis Ababa.",
};

export default async function GroupsPage() {
  const [trips, collections] = await Promise.all([
    getToursFromSupabase(),
    getCollectionsFromSupabase()
  ]);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <JsonLd
        id="groups-jsonld"
        schema={[
          buildTourListSchema(trips, "Ethiopia Group Tours", "/groups"),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Group Tours", url: "/groups" },
          ]),
        ]}
      />
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
