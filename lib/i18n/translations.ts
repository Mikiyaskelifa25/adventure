export type Language = "en" | "fr";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "about": "About Us",
    "destinations": "Destinations",
    "testimonials": "Testimonials",
    "contact": "Contact Us",
    "plan_trip": "Plan Trip",
    "hero_title": "Make every journey",
    "hero_subtitle": "an adventure",
    "search_placeholder": "Search destinations...",
    "group": "Group",
    "family": "Family",
    "itineraries": "Itineraries",
    "all_itineraries": "All Itineraries",
    "who_we_are": "Who we are",
    "book_now": "Book Now",
    "view_details": "View Details",
    "see_all": "See All",
    "start_plan": "Start Plan",
    "need_help": "Need help?",
  },
  fr: {
    "about": "À Propos",
    "destinations": "Destinations",
    "testimonials": "Témoignages",
    "contact": "Contactez-nous",
    "plan_trip": "Planifier",
    "hero_title": "Faites de chaque voyage",
    "hero_subtitle": "une aventure",
    "search_placeholder": "Rechercher des destinations...",
    "group": "Groupe",
    "family": "Famille",
    "itineraries": "Itinéraires",
    "all_itineraries": "Tous les Itinéraires",
    "who_we_are": "Qui sommes-nous",
    "book_now": "Réserver",
    "view_details": "Voir Détails",
    "see_all": "Voir Tout",
    "start_plan": "Commencer",
    "need_help": "Besoin d'aide ?",
  },
};

export function t(key: string, lang: Language): string {
  return translations[lang]?.[key] || translations["en"]?.[key] || key;
}

export function getLanguages(): { code: Language; label: string; flag: string }[] {
  return [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "fr", label: "FR", flag: "🇫🇷" },
  ];
}

export { translations };
