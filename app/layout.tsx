import type { Metadata } from "next";
import "./globals.css";
import EthiopianPatternBg from "@/components/EthiopianPatternBg";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/context";
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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aventure-abyssinie.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Aventure en Abyssinie | Ethiopia Tour & Travel Specialist",
    template: "%s | Aventure en Abyssinie",
  },
  description:
    "Discover authentic Ethiopia tours with Aventure en Abyssinie. Expert guides, curated itineraries from the Danakil Depression to Lalibela. Book your adventure today.",
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
  authors: [{ name: "Aventure en Abyssinie" }],
  creator: "Aventure en Abyssinie",
  publisher: "Aventure en Abyssinie",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aventure en Abyssinie",
    title: "Aventure en Abyssinie | Ethiopia Tour & Travel Specialist",
    description:
      "Discover authentic Ethiopia tours with Aventure en Abyssinie. Expert guides, curated itineraries from the Danakil Depression to Lalibela.",
    url: BASE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aventure en Abyssinie – Ethiopia Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aventure en Abyssinie | Ethiopia Tour & Travel Specialist",
    description:
      "Discover authentic Ethiopia tours with Aventure en Abyssinie. Expert guides, curated itineraries.",
    images: ["/og-image.jpg"],
    creator: "@aventureabyssinie",
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
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
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
              name: "Aventure en Abyssinie",
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
