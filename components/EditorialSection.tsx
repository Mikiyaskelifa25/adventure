"use client";

import Link from "next/link";
import DestinationCard from "./DestinationCard";
import AnimateOnScroll from "./AnimateOnScroll";
import { Trip, getTripTitle } from "@/lib/tripsData";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function EditorialSection({ trips }: { trips: Trip[] }) {
  const { lang } = useLanguage();

  const destinations = trips.map((tour, index) => ({
    region: tour.region,
    title: getTripTitle(tour, lang),
    imageUrl: tour.heroImage,
    imageAlt: tour.description,
    href: `/itineraries/${tour.slug}`,
    elevated: index % 2 !== 0,
  }));

  const displayed = destinations.slice(0, 6);
  const hasMore = destinations.length > 6;

  return (
    <section id="destinations" className="py-20 md:py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-12">
            <AnimateOnScroll animation="reveal-3d">
              <h2 className="text-foreground font-headline text-5xl md:text-7xl font-bold leading-tight mb-8">
                {t("itineraries", lang)}
              </h2>
            </AnimateOnScroll>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {displayed.map((dest, index) => (
            <AnimateOnScroll 
              key={dest.title} 
              animation="scale-reveal" 
              delay={index * 0.15}
            >
              <div className="py-4 md:py-8">
                <DestinationCard
                  region={dest.region}
                  title={dest.title}
                  imageUrl={dest.imageUrl}
                  imageAlt={dest.imageAlt}
                  href={dest.href}
                  elevated={dest.elevated}
                />
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <Link
              href="/itineraries"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            >
              {t("all_itineraries", lang)}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
