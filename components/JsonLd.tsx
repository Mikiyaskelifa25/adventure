import type { JsonLdObject } from "@/lib/jsonld";

/**
 * JsonLd — injects a JSON-LD <script> block into the document <head>.
 *
 * Usage (Server Component, no "use client" needed):
 *
 *   import JsonLd from "@/components/JsonLd";
 *   import { buildTourSchema } from "@/lib/jsonld";
 *
 *   <JsonLd schema={buildTourSchema(trip)} />
 *
 * Multiple schemas can be composed by wrapping in a @graph array:
 *
 *   <JsonLd schema={[buildTravelAgencySchema(), buildBreadcrumbSchema(crumbs)]} />
 */

interface JsonLdProps {
  /** A single schema object or an array of schema objects (rendered as @graph). */
  schema: JsonLdObject | JsonLdObject[];
  /** Optional unique key for React reconciliation when multiple instances exist. */
  id?: string;
}

export default function JsonLd({ schema, id }: JsonLdProps) {
  const payload = Array.isArray(schema)
    ? {
      "@context": "https://schema.org",
      "@graph": schema.map(({ "@context": _ctx, ...rest }) => rest),
    }
    : schema;

  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
