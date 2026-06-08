import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import EthiopianPatternBg from "@/components/EthiopianPatternBg";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/context";
import { getServerLang } from "@/lib/i18n/server";
import { Geist, Noto_Serif, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/JsonLd";
import { buildTravelAgencySchema, buildWebSiteSchema } from "@/lib/jsonld";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE_URL = "https://adventureinnethiopia.com";

const siteMeta = {
  en: {
    title: {
      default: "Adventure in Abyssinie | Ethiopia Tour & Travel Specialist",
      template: "%s | Adventure in Abyssinie",
    },
    description:
      "Book authentic Ethiopia tours with Adventure in Abyssinie — expert French & English-speaking guides. Danakil Depression expedition, Lalibela rock-hewn churches, Omo Valley tribal tours & Simien Mountains trekking. Small groups, tailor-made itineraries from Addis Ababa.",
    keywords: [
      // ── High-intent transactional ──────────────────────────────────────────
      "Ethiopia tour packages 2025",
      "Ethiopia group tour",
      "private Ethiopia tour operator",
      "tailor-made Ethiopia itinerary",
      "book Ethiopia tour from Addis Ababa",
      // ── Destination-specific (high volume) ────────────────────────────────
      "Danakil Depression tour",
      "Erta Ale volcano expedition",
      "Lalibela rock-hewn churches tour",
      "Omo Valley tribal tour",
      "Simien Mountains trekking Ethiopia",
      "Gondar castle tour Ethiopia",
      // ── Niche differentiators (low competition, high conversion) ──────────
      "French-speaking Ethiopia guide",
      "French-speaking tour operator Ethiopia",
      "small group Ethiopia adventure",
      "Timkat festival Ethiopia tour",
      "Hamer bull-jumping ceremony tour",
      "Dallol hydrothermal fields tour",
      // ── Informational (blog / content) ────────────────────────────────────
      "best time to visit Ethiopia",
      "Ethiopia cultural heritage tours",
      "Ethiopia UNESCO World Heritage sites",
      "adventure travel Ethiopia Africa",
    ],
    ogTitle: "Adventure in Abyssinie | Expert-Led Ethiopia Tours",
    ogDescription:
      "Authentic Ethiopia tours with expert French & English-speaking guides. Danakil Depression, Lalibela, Omo Valley & Simien Mountains. Small groups & tailor-made itineraries.",
    ogSiteName: "Adventure in Abyssinie",
  },
  fr: {
    title: {
      default: "Aventure en Abyssinie | Spécialiste Voyages Éthiopie Francophones",
      template: "%s | Aventure en Abyssinie",
    },
    description:
      "Circuits authentiques en Éthiopie avec guide francophone expert. Dépression du Danakil, églises de Lalibela, tribus de la vallée de l'Omo, trek Simien. Petits groupes et voyages sur mesure depuis Addis-Abeba.",
    keywords: [
      // ── Transactionnel haute intention ────────────────────────────────────
      "circuit Éthiopie 2025",
      "voyage organisé Éthiopie",
      "guide francophone Éthiopie",
      "agence de voyage Éthiopie francophone",
      "voyage sur mesure Éthiopie",
      "séjour Éthiopie petit groupe",
      // ── Destination (fort volume) ─────────────────────────────────────────
      "circuit dépression du Danakil",
      "Erta Ale volcan expédition",
      "visite églises Lalibela",
      "tour vallée de l'Omo tribus",
      "trek montagnes du Simien",
      "château de Gondar visite",
      // ── Niche différenciateurs (faible concurrence) ───────────────────────
      "guide parlant français Éthiopie",
      "cérémonie Timkat Éthiopie",
      "festival Meskel Addis-Abeba",
      "saut du taureau Hamer Éthiopie",
      // ── Informatif ────────────────────────────────────────────────────────
      "meilleure période visiter Éthiopie",
      "patrimoine UNESCO Éthiopie",
      "voyage culturel Éthiopie Afrique",
    ],
    ogTitle: "Aventure en Abyssinie | Circuits Éthiopie avec Guide Francophone",
    ogDescription:
      "Circuits authentiques en Éthiopie avec guide francophone expert. Danakil, Lalibela, vallée de l'Omo & Simien. Petits groupes & itinéraires sur mesure.",
    ogSiteName: "Aventure en Abyssinie",
  },
  ru: {
    title: {
      default: "Adventure in Abyssinie | Туры в Эфиопию — Эксперт по Абиссинии",
      template: "%s | Adventure in Abyssinie",
    },
    description:
      "Авторские туры по Эфиопии с опытными гидами. Экспедиция в Долину Данакиль, церкви Лалибэлы, племена долины Омо, трекинг в горах Симиен. Малые группы и индивидуальные маршруты из Аддис-Абебы.",
    keywords: [
      // ── Транзакционные (высокое намерение) ───────────────────────────────
      "туры в Эфиопию 2025",
      "туроператор по Эфиопии",
      "индивидуальный тур Эфиопия",
      "групповой тур Эфиопия",
      "заказать тур в Эфиопию",
      // ── Направления (высокий объём) ──────────────────────────────────────
      "тур в долину Данакиль",
      "вулкан Эрта Але экспедиция",
      "церкви Лалибэлы тур",
      "долина Омо племена тур",
      "трекинг горы Симиен",
      "замки Гондэра Эфиопия",
      // ── Нишевые дифференциаторы ───────────────────────────────────────────
      "гид на русском языке Эфиопия",
      "малая группа Эфиопия приключения",
      "фестиваль Тимкат Эфиопия",
      "обряд прыжка через быков Хамер",
      // ── Информационные ───────────────────────────────────────────────────
      "лучшее время для посещения Эфиопии",
      "объекты ЮНЕСКО Эфиопия",
      "культурный туризм Эфиопия Африка",
    ],
    ogTitle: "Adventure in Abyssinie | Авторские Туры по Эфиопии",
    ogDescription:
      "Авторские туры по Эфиопии с опытными гидами. Данакиль, Лалибэла, долина Омо и Симиен. Малые группы и индивидуальные маршруты.",
    ogSiteName: "Adventure in Abyssinie",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  const locale: "en" | "fr" | "ru" = lang === "fr" || lang === "ru" ? lang : "en";
  const meta = siteMeta[locale];

  return {
    metadataBase: new URL(BASE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Adventure in Abyssinie" }],
    creator: "Adventure in Abyssinie",
    publisher: "Adventure in Abyssinie",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "ru" ? "ru_RU" : "en_US",
      siteName: meta.ogSiteName,
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: BASE_URL,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["/og-image.jpg"],
      creator: "@aventureabyssinie",
    },
    icons: {
      icon: "/logo.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: BASE_URL,
      languages: {
        en: BASE_URL,
        fr: BASE_URL,
        ru: BASE_URL,
        "x-default": BASE_URL,
      },
    },
    category: "travel",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getServerLang();

  return (
    <html 
      lang={lang} 
      suppressHydrationWarning 
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn(
        "antialiased relative min-h-screen bg-background font-sans",
        geist.variable,
        notoSerif.variable,
        manrope.variable
      )}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NVVNBK1VWR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NVVNBK1VWR');
          `}
        </Script>
        <JsonLd
          id="site-jsonld"
          schema={[buildTravelAgencySchema(), buildWebSiteSchema()]}
        />
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <EthiopianPatternBg />
            <div className="relative z-10">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
