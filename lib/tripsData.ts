import type { Language } from "./i18n/translations";

export type TripDay = {
  day: number;
  title: string;
  fr_title?: string;
  ru_title?: string;
  description: string;
  fr_description?: string;
  ru_description?: string;
  activities?: {
    name: string;
    fr_name?: string;
    ru_name?: string;
    description?: string;
    fr_description?: string;
    ru_description?: string;
    place: string;
    fr_place?: string;
    ru_place?: string;
    longitude: number;
    latitude: number;
  }[];
  overnight: string;
  lat?: number;
  lng?: number;
};

export type Trip = {
  id: number;
  slug: string;
  title: string;
  title_fr?: string;
  title_ru?: string;
  duration: string;
  daysCount: number;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  groupSize: string;
  difficulty: string;
  images: string[];
  heroImage: string;
  bannerImageUrl?: string;
  description: string;
  description_fr?: string;
  description_ru?: string;
  longDescription: string;
  highlights: string[];
  itinerary: TripDay[];
  tips?: string[];
  included: string[];
  notIncluded: string[];
  region: string;
  region_fr?: string;
  region_ru?: string;
  isNew: boolean;
  category: "Group Trip" | "Daily" | "Private Trip" | "Tailor-made";
  type: string | null;
  displayOrder: number;
};

export function getTripTitle(trip: Trip, lang: Language): string {
  if (lang === "fr" && trip.title_fr) return trip.title_fr;
  if (lang === "ru" && trip.title_ru) return trip.title_ru;
  return trip.title;
}

export function getTripDescription(trip: Trip, lang: Language): string {
  if (lang === "fr" && trip.description_fr) return trip.description_fr;
  if (lang === "ru" && trip.description_ru) return trip.description_ru;
  return trip.description;
}

export function getTripRegion(trip: Trip, lang: Language): string {
  if (lang === "fr" && trip.region_fr) return trip.region_fr;
  if (lang === "ru" && trip.region_ru) return trip.region_ru;
  return trip.region;
}

export function getDayTitle(day: TripDay, lang: Language): string {
  if (lang === "fr" && day.fr_title) return day.fr_title;
  if (lang === "ru" && day.ru_title) return day.ru_title;
  return day.title;
}

export function getDayDescription(day: TripDay, lang: Language): string {
  if (lang === "fr" && day.fr_description) return day.fr_description;
  if (lang === "ru" && day.ru_description) return day.ru_description;
  return day.description;
}

export function getActivityName(
  activity: NonNullable<TripDay["activities"]>[number],
  lang: Language
): string {
  if (lang === "fr" && activity.fr_name) return activity.fr_name;
  if (lang === "ru" && activity.ru_name) return activity.ru_name;
  return activity.name;
}

export function getActivityDescription(
  activity: NonNullable<TripDay["activities"]>[number],
  lang: Language
): string {
  if (lang === "fr" && activity.fr_description) return activity.fr_description;
  if (lang === "ru" && activity.ru_description) return activity.ru_description;
  return activity.description || activity.name;
}

export const trips: Trip[] = [
  {
    id: 1,
    slug: "highlands-deserts-traditions",
    title: "In the heart of Abyssinian highlands, deserts and traditions",
    title_fr: "Au cœur des hauts plateaux d'Abyssinie, des déserts et des traditions",
    duration: "15 days",
    daysCount: 15,
    price: "€2,890",
    priceNum: 2890,
    rating: 4.8,
    reviews: 12,
    groupSize: "8–14",
    difficulty: "Moderate",
    images: ["/pic1.webp", "/pic2.webp", "/pic3.webp"],
    heroImage: "/pic5.webp",
    description:
      "Discover the ancestral lands of the Amhara people, the lunar landscapes of Danakil and the spiritual depth of Lalibela.",
    description_fr:
      "Découvrez les terres ancestrales du peuple Amhara, les paysages lunaires du Danakil et la profondeur spirituelle de Lalibela.",
    longDescription:
      "This extraordinary journey threads through the heart of Ethiopia — from the imperial castles of Gondar to the rock-hewn churches of Lalibela, across the dramatic Simien mountains and deep into the Afar depression. You will travel alongside local guides who are passionate about sharing their heritage, sleep in authentic lodges, and witness landscapes unlike anywhere else on Earth. This is not a packaged tour; this is a living story.",
    highlights: [
      "Rock-hewn churches of Lalibela (UNESCO World Heritage)",
      "Sunrise hike above the Simien mountains",
      "Salt caravans of the Afar desert",
      "Timkat festival ceremony (season-dependent)",
      "Gondar's Royal Enclosure castles",
      "Erta Ale lava lake night visit",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Addis Ababa", description: "Welcome to Ethiopia! Transfer to your hotel in the capital. Evening briefing with your guide over a traditional tej honey wine.", overnight: "Addis Ababa" },
      { day: 2, title: "Addis Ababa city tour", description: "Visit the National Museum (home of Lucy), the bustling Merkato, and St. George's Cathedral before flying north to Gondar.", overnight: "Gondar" },
      { day: 3, title: "Gondar – Royal Enclosure & Debre Birhan Selassie", description: "Explore the 17th-century castles and the famous church whose ceiling is painted with 144 winged cherubs.", overnight: "Gondar" },
      { day: 4, title: "Simien Mountains trekking day 1", description: "Drive into the park and begin trekking across dramatic ridges. Meet gelada baboons in their natural habitat.", overnight: "Simien Camp" },
      { day: 5, title: "Simien Mountains trekking day 2", description: "Continue the high-altitude trek, summit Imet Gogo for panoramic views over the Ethiopian plateau.", overnight: "Debark" },
      { day: 6, title: "Fly to Lalibela", description: "Morning flight to the sacred town of Lalibela. Afternoon visit to the northern cluster of rock churches.", overnight: "Lalibela" },
      { day: 7, title: "Lalibela – the full circuit", description: "Spend the full day exploring all 11 rock-hewn churches, including the iconic Bet Giyorgis (St. George's Church).", overnight: "Lalibela" },
      { day: 8, title: "Carry to Danakil – Mekele", description: "Fly to Mekele, gateway to the Danakil Depression. Evening briefing on the Afar expedition.", overnight: "Mekele" },
      { day: 9, title: "Danakil – Dallol salt flats", description: "Drive across the salt plains to the alien-like Dallol hydrothermal fields — the world's most unearthly landscape.", overnight: "Afar Desert Camp" },
      { day: 10, title: "Erta Ale volcano night hike", description: "Begin the night hike to the perpetually active lava lake of Erta Ale. Witness the glow of the Earth's inner fire.", overnight: "Erta Ale Base Camp" },
      { day: 11, title: "Return to Mekele & fly to Addis", description: "Return across the desert and fly back to the capital for a rest day.", overnight: "Addis Ababa" },
      { day: 12, title: "Omo Valley – Jinka", description: "Fly south to Jinka, gateway to the tribal heartland. Visit the South Omo Research Center.", overnight: "Jinka" },
      { day: 13, title: "Mursi tribe village visit", description: "Journey into the forest to visit a Mursi village, one of Ethiopia's most remote and fascinating tribes.", overnight: "Turmi" },
      { day: 14, title: "Hamer tribe & bull-jumping ceremony", description: "Attend (if timing allows) the extraordinary Hamer bull-jumping initiation rite. Explore the colorful weekly market.", overnight: "Turmi" },
      { day: 15, title: "Departure", description: "Final morning at leisure. Transfer to Addis Ababa airport for your international flight home.", overnight: "Departure" },
    ],
    included: [
      "All internal flights",
      "Full-board accommodation",
      "Expert English/French-speaking guide",
      "All park and site entrance fees",
      "4WD vehicle with driver",
      "Airport transfers",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tipping (optional)",
      "Visa fees (~$50)",
    ],
    region: "Northern & Eastern Ethiopia",
    region_fr: "Éthiopie du Nord et de l'Est",
    isNew: false,
    category: "Group Trip",
    type: "Group",
    displayOrder: 1,
  },
  {
    id: 2,
    slug: "omo-valley-southern-tribes",
    title: "Prophets of the Omo Valley and Southern tribes",
    title_fr: "Prophètes de la vallée de l'Omo et tribus du Sud",
    duration: "12 days",
    daysCount: 12,
    price: "€3,120",
    priceNum: 3120,
    rating: 4.9,
    reviews: 8,
    groupSize: "6–10",
    difficulty: "Easy / Moderate",
    images: ["/pic4.webp", "/pic5.webp", "/pic6.webp"],
    heroImage: "/pic4.webp",
    description:
      "Immerse yourself in the unique cultures of the Omo Valley, where tradition meets ancient rituals in a breathtaking setting.",
    description_fr:
      "Immergez-vous dans les cultures uniques de la vallée de l'Omo, où la tradition rencontre les rituels anciens dans un cadre à couper le souffle.",
    longDescription:
      "The Omo Valley is one of Africa's last great frontiers for cultural exploration. Here, dozens of distinct tribes — the Hamer, Mursi, Karo, Dasenech — have maintained traditions unchanged for millennia. This journey takes you deep into this living museum, attending ceremonies, visiting markets, and camping under skies of extraordinary clarity. It is an experience that permanently changes the way you see humanity.",
    highlights: [
      "Mursi tribe with traditional lip plates",
      "Karo tribe cliff-top village",
      "Hamer bull-jumping ceremony",
      "Key Afer Thursday market",
      "Crocodile market of the Dasenech",
      "Turmi weekly Hamer market",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Addis Ababa", description: "Arrive and settle into your Addis hotel. Share the first dinner with your guide and fellow travelers.", overnight: "Addis Ababa" },
      { day: 2, title: "Fly to Jinka – Mago National Park", description: "Morning flight south. Drive into Mago National Park, spotting wildlife along the Omo River banks.", overnight: "Jinka" },
      { day: 3, title: "Mursi homeland visit", description: "Deep village immersion with the Mursi tribe, one of the most photogenic and culturally distinct peoples in Africa.", overnight: "Jinka" },
      { day: 4, title: "Key Afer Thursday market", description: "The colourful weekly meeting of Bena, Ari and Tsemay peoples — a festival of trade, beauty and colour.", overnight: "Konso" },
      { day: 5, title: "Konso walled villages", description: "Explore the UNESCO-listed terraced villages of the Konso, famous for their remarkable carved totems.", overnight: "Arba Minch" },
      { day: 6, title: "Lake Chamo boat trip", description: "Early morning boat ride to the Crocodile Market, meeting place of hippos and enormous Nile crocodiles.", overnight: "Turmi" },
      { day: 7, title: "Dasenech tribal visit", description: "Cross the Omo River by dugout canoe to visit the Dasenech, fishermen and herders of the river delta.", overnight: "Turmi" },
      { day: 8, title: "Hamer market & village visit", description: "Morning in the red-ochred world of the Hamer people, followed by an afternoon village ceremony.", overnight: "Turmi" },
      { day: 9, title: "Bull Jumping ceremony (subject to timing)", description: "If the timing aligns, witness the extraordinary male initiation rite that defines Hamer manhood.", overnight: "Turmi" },
      { day: 10, title: "Karo cliff village", description: "Hike to the Karo tribe perched dramatically above a gorge, known for their extraordinary body painting.", overnight: "Arbore" },
      { day: 11, title: "Journey back to Addis", description: "Scenic drive to Addis Ababa, with stops at landscape viewpoints and a final farewell dinner.", overnight: "Addis Ababa" },
      { day: 12, title: "Departure", description: "Transfer to the international airport with memories that will last a lifetime.", overnight: "Departure" },
    ],
    included: [
      "All internal flights",
      "Full-board accommodation (lodge + tented camp)",
      "English/French-speaking specialist guide",
      "All entrance and ceremony fees",
      "4WD Safari vehicle",
      "Boat trips as specified",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips for guides/drivers",
      "Ethiopian visa",
    ],
    region: "Southern Ethiopia – Omo Valley",
    region_fr: "Éthiopie du Sud – Vallée de l'Omo",
    isNew: true,
    category: "Private Trip",
    type: null,
    displayOrder: 2,
  },
  {
    id: 3,
    slug: "salt-caravans-danakil",
    title: "The Salt Caravans and Danakil Depression",
    title_fr: "Les caravanes de sel et la dépression du Danakil",
    duration: "10 days",
    daysCount: 10,
    price: "€2,450",
    priceNum: 2450,
    rating: 4.7,
    reviews: 15,
    groupSize: "6–12",
    difficulty: "Challenging",
    images: ["/pic2.webp", "/pic1.webp", "/pic5.webp"],
    heroImage: "/pic2.webp",
    description:
      "A journey to the lowest point on Earth, witnessing the incredible salt caravans and the volcanic wonders of Erta Ale.",
    description_fr:
      "Un voyage vers le point le plus bas de la Terre, découvrant les incroyables caravanes de sel et les merveilles volcaniques de l'Erta Ale.",
    longDescription:
      "The Danakil Depression is not a destination for the faint-hearted. It is one of the remotest and geologically most active regions on the planet — a landscape of salt flats, sulphur springs, and permanent lava lakes that feels like another world entirely. The Afar people who call this inferno home are proud and welcoming. To witness the ancient salt caravans, hundreds of camels crossing the white desert at dawn, is one of the great sights remaining in human civilisation.",
    highlights: [
      "Erta Ale volcano — the 'Gateway to Hell'",
      "Dallol psychedelic hydrothermal fields",
      "Dawn salt caravan on the white desert",
      "Afar salt miners in action",
      "Asale salt lake crossing",
      "Sleeping under a blanket of stars at Erta Ale",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Addis Ababa", description: "Welcome dinner and group briefing with your Afar expedition specialist.", overnight: "Addis Ababa" },
      { day: 2, title: "Fly to Mekele", description: "Morning flight to Mekele, the highland city that serves as the jumping-off point for the Danakil. Equipment check and briefing.", overnight: "Mekele" },
      { day: 3, title: "Descent into the Depression – Berhale", description: "Drive down from the highlands toward the Danakil floor, stopping to watch salt caravans forming at Berhale.", overnight: "Afar Camp" },
      { day: 4, title: "Salt lake & miners visit", description: "Witness the extraordinary process of salt block extraction by Afar miners using only hand tools, a technique unchanged for centuries.", overnight: "Afar Camp" },
      { day: 5, title: "Erta Ale approach", description: "Long drive across the salt flats to the base of Erta Ale. Afternoon rest before the night ascent begins.", overnight: "Erta Ale Base" },
      { day: 6, title: "Erta Ale summit & lava lake", description: "Night hike to the crater rim. Stand above one of Earth's few permanent lava lakes, glowing red in the darkness.", overnight: "Erta Ale Rim" },
      { day: 7, title: "Dallol hydrothermal fields", description: "Drive to Dallol, the alien landscape of acid pools, salt pillars, and technicolour sulphur formations.", overnight: "Dallol Camp" },
      { day: 8, title: "Dodom & Afar village life", description: "Visit an Afar nomadic settlement and learn about survival in one of the harshest environments on Earth.", overnight: "Mekele" },
      { day: 9, title: "Return to Addis Ababa", description: "Morning flight back to the capital. Afternoon at leisure and farewell group dinner.", overnight: "Addis Ababa" },
      { day: 10, title: "Departure", description: "Transfer to Bole International Airport. Safe travels — you have earned the title of explorer.", overnight: "Departure" },
    ],
    included: [
      "All internal flights (Addis–Mekele–Addis)",
      "Accommodation (hotels + desert camp)",
      "All meals in the field",
      "Armed Afar escort (required)",
      "Expert Danakil specialist guide",
      "All site entrance fees",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance (mandatory)",
      "Personal expenses",
      "Tips",
      "Visa on arrival",
    ],
    region: "Afar Region – Danakil Depression",
    region_fr: "Région Afar – Dépression du Danakil",
    isNew: false,
    category: "Tailor-made",
    type: "Family",
    displayOrder: 3,
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getTripById(id: number): Trip | undefined {
  return trips.find((t) => t.id === id);
}
