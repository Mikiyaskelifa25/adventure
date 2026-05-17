"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AnimateOnScroll from "../AnimateOnScroll";
import { Trip } from "@/lib/tripsData";
import { JSONCollection } from "@/lib/jsonLoader";

const tripFilters = ["All", "Group", "Family"];

export default function GroupsContent({ trips, collections }: { trips: Trip[], collections: JSONCollection[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
    const filter = searchParams.get("filter");
    if (filter && tripFilters.includes(filter)) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  const filteredTrips = trips.filter((trip) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      trip.title.toLowerCase().includes(query) ||
      trip.description.toLowerCase().includes(query) ||
      trip.region.toLowerCase().includes(query)
    );
    
    const matchesCategory = activeFilter === "All" || trip.type?.toLowerCase() === activeFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 md:py-16 px-4 md:px-12 relative">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumbs & Title */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant/60 uppercase tracking-widest mb-5 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span>Destinations</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Ethiopia</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex-1">
              <h2 className="font-headline text-3xl md:text-5xl text-on-surface mb-3 font-bold">Groups Circuits</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="text-sm text-on-surface-variant font-label">4.8 (12 reviews) · {filteredTrips.length} Destinations</span>
              </div>
            </div>

            {/* Modern Search Input */}
            <div className="w-full lg:w-96 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant/50 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input
                type="text"
                placeholder="Search destinations, regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface dark:bg-white/5 border border-outline/50 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-4 flex items-center text-on-surface-variant/50 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters — horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-10 -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {tripFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-6 py-3 text-[10px] font-label uppercase tracking-widest transition-all rounded-full border whitespace-nowrap ${
                activeFilter === filter 
                  ? "bg-primary border-primary text-on-primary font-bold shadow-lg shadow-primary/20 scale-105" 
                  : "bg-surface dark:bg-white/5 border-outline dark:border-white/10 text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/10 shadow-sm"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Trip Listings */}
        <div className="space-y-6 mb-20">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <AnimateOnScroll key={trip.id} animation="fade-up">
                <Link
                  href={`/groups/${trip.slug}`}
                  className="bg-surface/50 dark:bg-white/5 rounded-2xl overflow-hidden border border-outline/50 dark:border-white/10 flex flex-col md:flex-row group hover:bg-surface dark:hover:bg-white/[0.08] hover:border-primary/60 dark:hover:border-primary/20 shadow-glass hover:shadow-premium transition-all duration-500 cursor-pointer block"
                >
                  {trip.images.length > 0 && (
                    <div className="md:w-[340px] md:shrink-0 h-[220px] md:h-auto relative grid grid-cols-3 grid-rows-2 gap-1 p-1 bg-surface-variant dark:bg-stone-900">
                      <div className="col-span-2 row-span-2 relative overflow-hidden rounded-l-xl">
                        <Image
                          src={trip.images[0]}
                          alt={trip.title}
                          fill
                          sizes="(max-width: 768px) 60vw, 220px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                        />
                      </div>
                      {trip.images[1] && (
                        <div className="relative overflow-hidden rounded-sm">
                          <Image src={trip.images[1]} alt={trip.title} fill sizes="110px" className="object-cover" unoptimized />
                        </div>
                      )}
                      {trip.images[2] && (
                        <div className="relative overflow-hidden rounded-br-xl">
                          <Image src={trip.images[2]} alt={trip.title} fill sizes="110px" className="object-cover" unoptimized />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-primary text-xs font-label uppercase tracking-widest">{trip.duration}</span>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-xs font-bold text-on-surface">{trip.rating}</span>
                            <span className="text-on-surface-variant text-xs">({trip.reviews})</span>
                          </div>
                        </div>
                        <span className="bg-primary/10 text-primary text-[10px] font-label uppercase tracking-widest px-2 py-1 rounded-full shrink-0">
                          {trip.groupSize}
                        </span>
                      </div>

                      <h3 className="font-headline text-xl md:text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                        {trip.title}
                      </h3>

                      <p className="text-on-surface-variant font-body text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {trip.description}
                      </p>
                    </div>

                    <div className="flex justify-end pt-5 mt-5 border-t border-outline/50 dark:border-white/10">
                      <span className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase group-hover:scale-105 transition-transform shadow-lg shadow-primary/20 inline-block">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))
          ) : (
            <div className="py-20 text-center bg-surface/30 dark:bg-white/[0.02] rounded-3xl border border-dashed border-outline/30 flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4">search_off</span>
              <h3 className="text-on-surface font-headline text-xl mb-2">No results found</h3>
              <p className="text-on-surface-variant text-sm">We couldn&apos;t find any trips matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="mt-6 text-primary font-label text-xs uppercase tracking-widest hover:underline flex items-center gap-2"
              >
                Reset all filters
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-14">

            {/* Experts */}
            <div>
              <h4 className="font-headline text-xl md:text-2xl text-on-surface mb-6 font-bold border-b border-primary/20 pb-4">Our Local Experts</h4>
              <div className="flex flex-col sm:flex-row items-start gap-5 bg-surface/50 dark:bg-white/5 p-6 rounded-2xl border border-outline/50 dark:border-white/10 shadow-glass">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-4 border-surface dark:border-surface-container">
                  <Image src="/aboutus.jpg" alt="Expert" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h5 className="font-headline text-lg text-on-surface mb-1">Teddy &amp; the Aventure Team</h5>
                  <p className="text-primary font-label text-xs uppercase tracking-widest mb-3">Ethiopia Specialists</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed italic">
                    &quot;We don&apos;t just guide you; we share our home and traditions with you. Every trail we walk has a story.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-headline text-xl md:text-2xl text-on-surface mb-6 font-bold border-b border-primary/20 pb-4">Our Collectors Ethiopia</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {collections.map((collection) => (
                  <div key={collection.title} className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 640px) 90vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 text-on-surface">
                      <span className="text-[10px] uppercase tracking-widest text-primary block mb-1">{collection.tag}</span>
                      <h5 className="font-headline text-base font-bold">{collection.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/groups" className="mt-8 text-primary font-label text-xs uppercase tracking-widest flex items-center gap-2 group">
                View all collections
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-surface/50 dark:bg-white/[0.03] text-on-surface p-8 rounded-3xl relative overflow-hidden group border border-outline/50 dark:border-white/5 shadow-glass">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
              <h4 className="font-headline text-xl mb-3 leading-tight text-on-surface">plan trip <br /><span className="italic font-normal">for you.</span></h4>
              <p className="text-on-surface-variant font-body text-sm mb-6 leading-relaxed">
                Don&apos;t find the perfect dates? Our specialists create a custom journey for you.
              </p>
              <button className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
                Start Plan
              </button>
            </div>

            <div className="bg-surface/50 dark:bg-white/5 p-6 rounded-3xl border border-outline/50 dark:border-white/10 shadow-glass">
              <h4 className="font-headline text-lg text-on-surface mb-5">Need help?</h4>
              <div className="space-y-5">
                <a href="https://wa.me/251911603027" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#25D366" }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-label">+251 91 160 3027</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
