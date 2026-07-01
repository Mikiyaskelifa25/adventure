import { cookies } from "next/headers";

export type Locale = "en" | "fr" | "ru";

type PageMeta = {
  title: string;
  description: string;
};

const pageMeta: Record<string, Record<Locale, PageMeta>> = {
  home: {
    en: {
      title: "Adventure in Abyssinie | Expert Ethiopia Tours \u2013 Danakil, Lalibela & Omo Valley",
      description: "Ethiopia's premier small-group & tailor-made tour operator. Expert French & English-speaking guides. Danakil Depression, Lalibela UNESCO churches, Omo Valley tribal tours, Simien Mountains trekking. Book direct from Addis Ababa.",
    },
    fr: {
      title: "Aventure en Abyssinie | Circuits \u00c9thiopie \u2013 Danakil, Lalibela & Vall\u00e9e de l'Omo",
      description: "Sp\u00e9cialiste des circuits en petit groupe et sur mesure en \u00c9thiopie. Guides francophones experts. D\u00e9pression du Danakil, \u00e9glises de Lalibela, vall\u00e9e de l'Omo, trek du Simien. R\u00e9servez depuis Addis-Abeba.",
    },
    ru: {
      title: "Adventure in Abyssinie | \u0422\u0443\u0440\u044b \u0432 \u042d\u0444\u0438\u043e\u043f\u0438\u044e \u2013 \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u0430 \u0438 \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e",
      description: "\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u0442\u0443\u0440\u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 \u043f\u043e \u042d\u0444\u0438\u043e\u043f\u0438\u0438. \u0413\u0438\u0434\u044b-\u044d\u043a\u0441\u043f\u0435\u0440\u0442\u044b. \u0412\u043f\u0430\u0434\u0438\u043d\u0430 \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u0446\u0435\u0440\u043a\u0432\u0438 \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u044b, \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e, \u0442\u0440\u0435\u043a\u0438\u043d\u0433 \u0432 \u0433\u043e\u0440\u0430\u0445 \u0421\u0438\u043c\u0438\u0435\u043d.",
    },
  },
  itineraries: {
    en: {
      title: "Ethiopia Tour Itineraries 2025 | Danakil, Lalibela & Omo Valley",
      description: "Browse all curated Ethiopia tour itineraries. 7 to 15-day packages covering Danakil Depression, Lalibela churches, Omo Valley tribes, Simien Mountains. Tailor-made or small group departures.",
    },
    fr: {
      title: "Itin\u00e9raires \u00c9thiopie 2025 | Circuits Danakil, Lalibela & Vall\u00e9e de l'Omo",
      description: "Tous nos circuits en \u00c9thiopie. 7 \u00e0 15 jours : D\u00e9pression du Danakil, \u00e9glises de Lalibela, vall\u00e9e de l'Omo, montagnes du Simien. Sur mesure ou en petit groupe.",
    },
    ru: {
      title: "\u041c\u0430\u0440\u0448\u0440\u0443\u0442\u044b \u042d\u0444\u0438\u043e\u043f\u0438\u0438 2025 | \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u0430 \u0438 \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e",
      description: "\u0412\u0441\u0435 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u044b \u043f\u043e \u042d\u0444\u0438\u043e\u043f\u0438\u0438. 7\u201315 \u0434\u043d\u0435\u0439: \u0412\u043f\u0430\u0434\u0438\u043d\u0430 \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u0446\u0435\u0440\u043a\u0432\u0438 \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u044b, \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e, \u0433\u043e\u0440\u044b \u0421\u0438\u043c\u0438\u0435\u043d.",
    },
  },
  groups: {
    en: {
      title: "Ethiopia Group Tours 2025 | Small Group & Private Packages",
      description: "Explore Ethiopia with expert-guided group tours. Danakil Depression, Lalibela churches, Omo Valley tribes, Simien Mountains trekking. Small groups of 6\u201314, French & English-speaking guides.",
    },
    fr: {
      title: "Circuits de Groupe \u00c9thiopie 2025 | Petits Groupes & Priv\u00e9s",
      description: "Explorez l'\u00c9thiopie en groupe avec guides experts. Danakil, Lalibela, vall\u00e9e de l'Omo, Simien. Petits groupes de 6\u201314, guides francophones.",
    },
    ru: {
      title: "\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u044b\u0435 \u0442\u0443\u0440\u044b \u0432 \u042d\u0444\u0438\u043e\u043f\u0438\u044e 2025 | \u041c\u0430\u043b\u044b\u0435 \u0433\u0440\u0443\u043f\u043f\u044b",
      description: "\u0418\u0441\u0441\u043b\u0435\u0434\u0443\u0439\u0442\u0435 \u042d\u0444\u0438\u043e\u043f\u0438\u044e \u0432 \u0433\u0440\u0443\u043f\u043f\u0435 \u0441 \u0433\u0438\u0434\u0430\u043c\u0438-\u044d\u043a\u0441\u043f\u0435\u0440\u0442\u0430\u043c\u0438. \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u0430, \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e, \u0433\u043e\u0440\u044b \u0421\u0438\u043c\u0438\u0435\u043d. \u0413\u0440\u0443\u043f\u043f\u044b 6\u201314 \u0447\u0435\u043b\u043e\u0432\u0435\u043a.",
    },
  },
  testimonials: {
    en: {
      title: "Traveller Reviews | Ethiopia Tours \u2013 Adventure in Abyssinie",
      description: "Read authentic 5-star reviews from travellers who explored Ethiopia with Adventure in Abyssinie. Danakil Depression, Lalibela, Omo Valley, Simien Mountains. Rated 4.8/5.",
    },
    fr: {
      title: "Avis Voyageurs | Circuits \u00c9thiopie \u2013 Aventure en Abyssinie",
      description: "Lisez les avis authentiques de voyageurs ayant explor\u00e9 l'\u00c9thiopie avec Aventure en Abyssinie. Danakil, Lalibela, vall\u00e9e de l'Omo, Simien. Not\u00e9 4.8/5.",
    },
    ru: {
      title: "\u041e\u0442\u0437\u044b\u0432\u044b \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432 | \u0422\u0443\u0440\u044b \u0432 \u042d\u0444\u0438\u043e\u043f\u0438\u044e",
      description: "\u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u043e\u0442\u0437\u044b\u0432\u044b \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432. \u0412\u043f\u0430\u0434\u0438\u043d\u0430 \u0414\u0430\u043d\u0430\u043a\u0438\u043b\u044c, \u041b\u0430\u043b\u0438\u0431\u044d\u043b\u0430, \u0434\u043e\u043b\u0438\u043d\u0430 \u041e\u043c\u043e, \u0433\u043e\u0440\u044b \u0421\u0438\u043c\u0438\u0435\u043d. \u0420\u0435\u0439\u0442\u0438\u043d\u0433 4.8/5.",
    },
  },
  planTrip: {
    en: {
      title: "Plan Your Custom Ethiopia Trip | Tailor-Made Tours",
      description: "Design your perfect Ethiopia itinerary. Get a free custom quote for Danakil Depression, Lalibela, Omo Valley, Simien Mountains tours from expert local guides.",
    },
    fr: {
      title: "Planifiez Votre Voyage sur Mesure en \u00c9thiopie",
      description: "Cr\u00e9ez votre itin\u00e9raire parfait en \u00c9thiopie. Devis gratuit pour un circuit personnalis\u00e9 au Danakil, Lalibela, vall\u00e9e de l'Omo, Simien.",
    },
    ru: {
      title: "\u0421\u043f\u043b\u0430\u043d\u0438\u0440\u0443\u0439\u0442\u0435 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u0442\u0443\u0440 \u0432 \u042d\u0444\u0438\u043e\u043f\u0438\u044e",
      description: "\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u043c\u0430\u0440\u0448\u0440\u0443\u0442 \u043f\u043e \u042d\u0444\u0438\u043e\u043f\u0438\u0438. \u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u0430\u044f \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0438\u044f.",
    },
  },
};

export function getPageMeta(page: string, locale: Locale): PageMeta {
  return pageMeta[page]?.[locale] || pageMeta[page]?.en || { title: "", description: "" };
}

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  return lang === "fr" || lang === "ru" ? lang : "en";
}

export function parseLocale(lang?: string): Locale {
  return lang === "fr" || lang === "ru" ? lang : "en";
}
