"use client";

import Link from "next/link";
import { Trip } from "@/lib/tripsData";
import AnimateOnScroll from "../AnimateOnScroll";
import DestinationCard from "../DestinationCard";

export default function ItinerariesContent({ trips }: { trips: Trip[] }) {
  const destinations = trips.map((tour, index) => ({
    region: tour.region,
    title: tour.title,
    imageUrl: tour.heroImage,
    imageAlt: tour.description,
    href: `/groups/${tour.slug}`,
    elevated: index % 2 !== 0,
  }));

  return (
    <section className="py-12 md:py-16 px-4 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/60 uppercase tracking-widest mb-5 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Itineraries</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex-1">
              <h2 className="font-headline text-3xl md:text-5xl text-on-surface mb-3 font-bold">All Itineraries</h2>
              <p className="text-on-surface-variant text-sm md:text-base max-w-2xl leading-relaxed">
                Discover our complete collection of curated Ethiopian adventures, from historic circuits to off-the-beaten-path expeditions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {destinations.map((dest, index) => (
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
      </div>
    </section>
  );
}
