/**
 * Server layout for /plan-trip.
 * Injects SEO metadata and JSON-LD structured data.
 */
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/jsonld";

export const metadata = {
  title: "Plan Your Custom Ethiopia Trip | Tailor-Made Tours",
  description:
    "Design your perfect Ethiopia itinerary. Get a free custom quote for Danakil Depression, Lalibela, Omo Valley, and Simien Mountains tours from expert local guides.",
  keywords: [
    "custom Ethiopia tour",
    "plan trip to Ethiopia",
    "tailor-made Ethiopia itinerary",
    "book Ethiopia travel",
    "private Ethiopia guide",
    "Ethiopia tour quote",
  ],
};

export default function PlanTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        id="plan-trip-jsonld"
        schema={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Plan Trip", url: "/plan-trip" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
