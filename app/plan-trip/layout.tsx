import { cookies } from "next/headers";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/jsonld";
import { getPageMeta, parseLocale } from "@/lib/metadata";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("lang")?.value);
  return getPageMeta("planTrip", locale);
}

export default async function PlanTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("lang")?.value);

  return (
    <>
      <JsonLd
        id="plan-trip-jsonld"
        schema={[
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Plan Trip", url: "/plan-trip" },
          ], locale),
        ]}
      />
      {children}
    </>
  );
}
