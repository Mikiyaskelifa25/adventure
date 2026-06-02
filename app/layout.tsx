import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import EthiopianPatternBg from "@/components/EthiopianPatternBg";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/context";
import { getServerLang } from "@/lib/i18n/server";
import { Geist, Noto_Serif, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

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
      "Discover authentic Ethiopia tours with Adventure in Abyssinie. Expert guides, curated itineraries from the Danakil Depression to Lalibela. Book your adventure today.",
    keywords: [
      "Ethiopia tours",
      "Ethiopia travel",
      "Abyssinia tours",
      "Lalibela churches",
      "Danakil Depression",
      "Omo Valley tours",
      "Simien Mountains trekking",
      "Ethiopia cultural tours",
      "Adventure travel Ethiopia",
      "Ethiopia vacation packages",
    ],
    ogTitle: "Adventure in Abyssinie | Ethiopia Tour & Travel Specialist",
    ogDescription:
      "Discover authentic Ethiopia tours with Adventure in Abyssinie. Expert guides, curated itineraries from the Danakil Depression to Lalibela.",
    ogSiteName: "Adventure in Abyssinie",
  },
  fr: {
    title: {
      default: "Aventure en Abyssinie | Spécialiste des Voyages en Éthiopie",
      template: "%s | Aventure en Abyssinie",
    },
    description:
      "Découvrez des circuits authentiques en Éthiopie avec Adventure in Abyssinie. Guides experts, itinéraires sur mesure du Dallol à Lalibela. Réservez votre aventure dès aujourd'hui.",
    keywords: [
      "circuits Éthiopie",
      "voyage Éthiopie",
      "tours Abyssinie",
      "églises Lalibela",
      "dépression Danakil",
      "vallée de l'Omo",
      "trek montagnes Simien",
      "voyage culturel Éthiopie",
      "aventure Éthiopie",
      "séjour Éthiopie",
    ],
    ogTitle: "Aventure en Abyssinie | Spécialiste des Voyages en Éthiopie",
    ogDescription:
      "Découvrez des circuits authentiques en Éthiopie avec Adventure in Abyssinie. Guides experts, itinéraires sur mesure du Dallol à Lalibela.",
    ogSiteName: "Aventure en Abyssinie",
  },
  ru: {
    title: {
      default: "Adventure in Abyssinie | Туроператор по Эфиопии",
      template: "%s | Adventure in Abyssinie",
    },
    description:
      "Откройте для себя подлинные туры по Эфиопии с Adventure in Abyssinie. Опытные гиды, индивидуальные маршруты от впадины Данакиль до Лалибэлы. Забронируйте приключение сегодня.",
    keywords: [
      "туры Эфиопия",
      "путешествие Эфиопия",
      "Абиссиния туры",
      "церкви Лалибэла",
      "впадина Данакиль",
      "долина Омо",
      "трекинг горы Симиен",
      "культурные туры Эфиопия",
      "приключения Эфиопия",
      "отдых Эфиопия",
    ],
    ogTitle: "Adventure in Abyssinie | Туроператор по Эфиопии",
    ogDescription:
      "Откройте для себя подлинные туры по Эфиопии с Adventure in Abyssinie. Опытные гиды, индивидуальные маршруты от впадины Данакиль до Лалибэлы.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var l=document.createElement('link');
              l.rel='stylesheet';
              l.href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
              document.head.appendChild(l);
            `,
          }}
        />
      </head>
      <body className={cn(
        "antialiased relative min-h-screen bg-background font-sans",
        geist.variable,
        notoSerif.variable,
        manrope.variable
      )}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Adventure in Abyssinie",
              description:
                "Specialists in curated, authentic journeys across the Ethiopian highlands. From the Danakil to the Omo Valley.",
              url: BASE_URL,
              telephone: "+251911603027",
              email: "hello@aventure-abyssinie.com",
              image: `${BASE_URL}/og-image.jpg`,
              address: {
                "@type": "PostalAddress",
                addressCountry: "ET",
              },
              sameAs: [
                "https://wa.me/251911603027",
              ],
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "12",
                bestRating: "5",
              },
            }),
          }}
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
