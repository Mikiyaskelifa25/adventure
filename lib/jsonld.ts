import type { Trip } from "./tripsData";

const BASE_URL_EN = "https://adventureinnethiopia.com";
const BASE_URL_FR = "https://fr.adventureinnethiopia.com";
const BASE_URL_RU = "https://ru.adventureinnethiopia.com";
const BRAND_NAME = "Adventure in Abyssinie";

type Locale = "en" | "fr" | "ru";

function getBaseUrl(locale?: Locale): string {
  if (locale === "fr") return BASE_URL_FR;
  if (locale === "ru") return BASE_URL_RU;
  return BASE_URL_EN;
}

export type JsonLdObject = Record<string, unknown>;

export function buildTravelAgencySchema(locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${url}/#organization`,
    name: BRAND_NAME,
    alternateName: ["Adventure in Ethiopia", "Aventure en Abyssinie"],
    description:
      "Specialists in curated, authentic journeys across the Ethiopian highlands. From the Danakil Depression to the Omo Valley.",
    url: url,
    logo: {
      "@type": "ImageObject",
      url: `${url}/logo.ico`,
      width: "512",
      height: "512",
    },
    image: `${url}/og-image.jpg`,
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
      url: `${url}/itineraries`,
    },
  };
}

export function buildWebSiteSchema(locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: BRAND_NAME,
    url: url,
    publisher: {
      "@id": `${url}/#about-us`,
    },
    inLanguage: ["en", "fr", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/itineraries?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildTourSchema(trip: Trip, locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  const tourUrl = `${url}/itineraries/${trip.slug}`;
  const imageUrl = trip.heroImage?.startsWith("http")
    ? trip.heroImage
    : `${url}${trip.heroImage || "/og-image.jpg"}`;

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
        img.startsWith("http") ? img : `${url}${img}`
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
    offers: {
      "@type": "Offer",
      "@id": `${tourUrl}#offer`,
      url: tourUrl,
      priceCurrency: "EUR",
      price: trip.priceNum,
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      seller: {
        "@id": `${url}/#organization`,
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
      "@id": `${url}/#organization`,
    },
    inLanguage: "en",
    availableLanguage: ["English", "French", "Russian"],
  };
}

export function buildTourListSchema(trips: Trip[], pageTitle: string, pageUrl: string, locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}${pageUrl}#list`,
    name: pageTitle,
    url: `${url}${pageUrl}`,
    numberOfItems: trips.length,
    itemListElement: trips.map((trip, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${url}/itineraries/${trip.slug}`,
      name: trip.title,
    })),
  };
}

export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[], locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${url}${item.url}`,
    })),
  };
}

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

export type ReviewItem = {
  id: number;
  name: string;
  quote: string;
  rating: number;
  date: string;
  image?: string;
};

export function buildReviewListSchema(reviews: ReviewItem[], locale?: Locale): JsonLdObject {
  const url = getBaseUrl(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}/testimonials`,
    name: "Customer Reviews – Adventure in Abyssinie",
    url: `${url}/testimonials`,
    numberOfItems: reviews.length,
    itemListElement: reviews.map((review, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        "@id": `${url}/testimonials#review-${review.id}`,
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
          "@id": `${url}/#organization`,
        },
      },
    })),
  };
}
