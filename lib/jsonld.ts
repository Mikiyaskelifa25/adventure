import type { Trip } from "./tripsData";

const BASE_URL = "https://adventureinnethiopia.com";
const BRAND_NAME = "Adventure in Abyssinie";

// ─── Primitives ───────────────────────────────────────────────────────────────

export type JsonLdObject = Record<string, unknown>;

// ─── 1. TravelAgency (site-wide, used in root layout) ────────────────────────

export function buildTravelAgencySchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${BASE_URL}/#organization`,
    name: BRAND_NAME,
    alternateName: ["Adventure in Ethiopia", "Aventure en Abyssinie"],
    description:
      "Specialists in curated, authentic journeys across the Ethiopian highlands. From the Danakil Depression to the Omo Valley.",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.ico`,
      width: "512",
      height: "512",
    },
    image: `${BASE_URL}/og-image.jpg`,
    telephone: "+251911603027",
    email: "tedbezmengistu@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
      addressLocality: "Addis Ababa",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.0054,
      longitude: 38.7636,
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    sameAs: [
      "https://wa.me/251911603027",
    ],
    priceRange: "$$",
    currenciesAccepted: "EUR, USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ethiopia Tour Packages",
      url: `${BASE_URL}/itineraries`,
    },
  };
}

// ─── 2. WebSite (used in root layout for sitelinks search box) ───────────────

export function buildWebSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: BRAND_NAME,
    url: BASE_URL,
    publisher: {
      "@id": `${BASE_URL}/#about-us`,
    },
    inLanguage: ["en", "fr", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/itineraries?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── 3. TouristTrip / Product (used on individual tour detail pages) ──────────

export function buildTourSchema(trip: Trip): JsonLdObject {
  const tourUrl = `${BASE_URL}/itineraries/${trip.slug}`;
  const imageUrl = trip.heroImage?.startsWith("http")
    ? trip.heroImage
    : `${BASE_URL}${trip.heroImage || "/og-image.jpg"}`;

  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    "@id": `${tourUrl}#tour`,
    name: trip.title,
    description: trip.description,
    url: tourUrl,
    image: [
      imageUrl,
      ...(trip.images || []).slice(0, 4).map((img) =>
        img.startsWith("http") ? img : `${BASE_URL}${img}`
      ),
    ],
    touristType: [
      {
        "@type": "Audience",
        audienceType: trip.category,
      },
    ],
    itinerary: {
      "@type": "ItemList",
      name: `${trip.title} – Day-by-Day Itinerary`,
      numberOfItems: trip.daysCount,
      itemListElement: (trip.itinerary || []).map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Day ${day.day}: ${day.title}`,
        description: day.description,
        ...(day.lat && day.lng
          ? {
            item: {
              "@type": "Place",
              name: day.overnight,
              geo: {
                "@type": "GeoCoordinates",
                latitude: day.lat,
                longitude: day.lng,
              },
            },
          }
          : {}),
      })),
    },
    duration: trip.duration,
    // numberOfNights derived from daysCount
    offers: {
      "@type": "Offer",
      "@id": `${tourUrl}#offer`,
      url: tourUrl,
      priceCurrency: "EUR",
      price: trip.priceNum,
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      seller: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trip.rating,
      reviewCount: trip.reviews,
      bestRating: "5",
      worstRating: "1",
    },
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en",
    availableLanguage: ["English", "French", "Russian"],
  };
}

// ─── 4. ItemList (used on the /groups and /itineraries listing pages) ─────────

export function buildTourListSchema(trips: Trip[], pageTitle: string, pageUrl: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}${pageUrl}#list`,
    name: pageTitle,
    url: `${BASE_URL}${pageUrl}`,
    numberOfItems: trips.length,
    itemListElement: trips.map((trip, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/itineraries/${trip.slug}`,
      name: trip.title,
    })),
  };
}

// ─── 5. BreadcrumbList ────────────────────────────────────────────────────────

export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ─── 6. FAQPage ───────────────────────────────────────────────────────────────

export type FaqItem = { question: string; answer: string };

export function buildFaqSchema(faqs: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── 7. Review / ItemList of Reviews (used on /testimonials) ─────────────────

export type ReviewItem = {
  id: number;
  name: string;
  quote: string;
  rating: number;
  date: string;
  image?: string;
};

export function buildReviewListSchema(reviews: ReviewItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/testimonials`,
    name: "Customer Reviews – Adventure in Abyssinie",
    url: `${BASE_URL}/testimonials`,
    numberOfItems: reviews.length,
    itemListElement: reviews.map((review, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        "@id": `${BASE_URL}/testimonials#review-${review.id}`,
        author: {
          "@type": "Person",
          name: review.name,
          ...(review.image ? { image: review.image } : {}),
        },
        reviewBody: review.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: "5",
          worstRating: "1",
        },
        datePublished: (() => {
          try {
            return new Date(review.date.trim()).toISOString().split("T")[0];
          } catch {
            return review.date.trim();
          }
        })(),
        itemReviewed: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
    })),
  };
}
