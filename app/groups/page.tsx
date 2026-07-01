import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import GroupsHero from "@/components/groups/GroupsHero";
import GroupsContent from "@/components/groups/GroupsContent";
import { getToursFromSupabase, getCollectionsFromSupabase } from "@/lib/supabaseData";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { buildTourListSchema, buildBreadcrumbSchema } from "@/lib/jsonld";
import { getPageMeta, getLocaleFromCookies } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocaleFromCookies();
  return getPageMeta("groups", locale);
}

export default async function GroupsPage() {
  const locale = await getLocaleFromCookies();
  const [trips, collections] = await Promise.all([
    getToursFromSupabase(),
    getCollectionsFromSupabase()
  ]);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <JsonLd
        id="groups-jsonld"
        schema={[
          buildTourListSchema(trips, "Ethiopia Group Tours", "/groups", locale),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Group Tours", url: "/groups" },
          ], locale),
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
