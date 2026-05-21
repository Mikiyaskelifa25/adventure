"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trip, getTripTitle, getTripDescription, getTripRegion } from "@/lib/tripsData";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";
import AnimateOnScroll from "../AnimateOnScroll";
import TourMap from "./TourMap";

const experienceIcons = [
  { icon: "landscape", key: "landscapes" },
  { icon: "temple_buddhist", key: "heritage" },
  { icon: "nature_people", key: "culture" },
  { icon: "directions_walk", key: "trekking" },
  { icon: "photo_camera", key: "photography" },
  { icon: "restaurant", key: "cuisine" },
];

function getActivityIcon(name: string, lang: "en" | "fr") {
  const lower = name.toLowerCase();
  if (lower.includes("morning") || lower.includes("sunrise") || lower.includes("dawn")) {
    return { icon: "light_mode", color: "text-primary", label: t("morning", lang) };
  }
  if (lower.includes("afternoon") || lower.includes("noon") || lower.includes("lunch")) {
    return { icon: "wb_sunny", color: "text-primary", label: t("afternoon", lang) };
  }
  if (lower.includes("evening") || lower.includes("night") || lower.includes("sunset") || lower.includes("dinner") || lower.includes("trek to volcano") || lower.includes("camp")) {
    return { icon: "dark_mode", color: "text-primary", label: t("evening", lang) };
  }
  return { icon: "location_on", color: "text-primary/60", label: t("activities", lang) };
}

function cleanActivityName(name: string) {
  return name.replace(/^(morning|afternoon|evening|night|sunrise|sunset):\s*/i, "");
}

const journeyFacts = [
  { icon: "language", key: "language", valueKey: "guides_languages" },
  { icon: "wb_sunny", key: "best_time", valueKey: "best_time_value" },
  { icon: "thermostat", key: "climate", valueKey: "climate_value" },
  { icon: "vaccines", key: "vaccines", valueKey: "vaccines_value" },
];

const sidebarRows = [
  { icon: "calendar_month", key: "duration" },
  { icon: "group", key: "group_size" },
  { icon: "terrain", key: "difficulty" },
  { icon: "location_on", key: "region" },
];

export default function TripDetailContent({ 
  trip,
  relatedImages = ["/pic1.jpg", "/pic4.jpg", "/pic6.jpg"] 
}: { 
  trip: Trip,
  relatedImages?: string[]
}) {
  const { lang } = useLanguage();
  const [activeDay, setActiveDay] = useState(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  return (
    <>
      {/* ─── Hero ─── */}
      {(trip.bannerImageUrl || trip.heroImage) && (
        <section className="relative h-[45vh] md:h-[55vh] min-h-[280px] w-full overflow-hidden">
          <Image
            src={trip.bannerImageUrl || trip.heroImage}
            alt={getTripTitle(trip, lang)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            unoptimized
          />
        </section>
      )}

      {/* ─── Main Layout ─── */}
      <section className="px-4 md:px-12 pt-8 md:pt-12 pb-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

            {/* ── Left / Main Column ── */}
            <div className="lg:col-span-2 space-y-16">

              {/* Title block */}
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="bg-primary/20 text-primary font-label text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    {getTripRegion(trip, lang)}
                  </span>
                  <span className="text-on-surface-variant/60 text-xs">•</span>
                  <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{trip.duration}</span>
                  <span className="text-on-surface-variant/60 text-xs">•</span>
                  <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{trip.groupSize} {t("group_size", lang).toLowerCase()}</span>
                  <span className="text-on-surface-variant/60 text-xs">•</span>
                  <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{trip.difficulty}</span>
                </div>

                <h1 className="font-headline text-3xl md:text-4xl xl:text-5xl text-on-surface leading-tight mb-6 max-w-3xl drop-shadow-sm">
                  {getTripTitle(trip, lang)}
                </h1>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-sm ${i < Math.floor(trip.rating) ? "text-primary" : "text-outline"}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="text-on-surface font-bold text-sm ml-1">{trip.rating}</span>
                    <span className="text-on-surface-variant text-sm">({trip.reviews} {t("reviews", lang)})</span>
                  </div>

                </div>
              </div>

              {/* Image gallery */}
              <AnimateOnScroll animation="fade-up">
                <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-[240px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden shadow-glass">
                  <div
                    onClick={() => setShowLightbox(true)}
                    className="col-span-3 row-span-2 relative overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={trip.images[activeImage]}
                      alt={getTripTitle(trip, lang)}
                      fill
                      sizes="(max-width: 1024px) 75vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  {trip.images.slice(0, 2).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => { setActiveImage(i); setShowLightbox(true); }}
                      className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "rounded-tr-2xl" : "rounded-br-2xl"}`}
                    >
                      <Image
                        src={img}
                        alt={`photo ${i + 1}`}
                        fill
                        sizes="25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      {i === 1 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/60 transition-colors">
                          <span className="text-white font-label text-xs uppercase tracking-widest">{t("more", lang)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>

              {/* Description */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-headline text-2xl text-on-surface mb-5 border-b border-primary/20 pb-4">{t("about_this_trip", lang)}</h2>
                  <p className="text-on-surface-variant font-body text-base leading-loose">{getTripDescription(trip, lang)}</p>
                </div>
              </AnimateOnScroll>

              {/* Highlights */}
              {trip.highlights?.length ? (
                <AnimateOnScroll animation="fade-up">
                  <div>
                    <h2 className="font-headline text-2xl text-on-surface mb-6 border-b border-primary/20 pb-4">{t("trip_highlights", lang)}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {trip.highlights.map((hl, i) => {
                        const isUnesco = hl.toLowerCase().includes("unesco");
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">
                              {isUnesco ? "account_balance" : "check_circle"}
                            </span>
                            <span className="text-on-surface-variant text-sm leading-relaxed">{hl}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </AnimateOnScroll>
              ) : null}

              {/* ─── Modern Timeline Itinerary ─── */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-headline text-2xl text-on-surface mb-8 border-b border-primary/20 pb-4">
                    {t("day_by_day_schedule", lang)}
                  </h2>

                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

                    <div className="space-y-6">
                      {trip.itinerary.map((day, index) => {
                        const isOpen = expandedDay === day.day;
                        const isLast = index === trip.itinerary.length - 1;
                        return (
                          <div key={day.day} className="relative w-full clear-both pl-14 isolate">
                            {/* Day circle */}
                            <button
                              onClick={() => setExpandedDay(isOpen ? null : day.day)}
                              className="absolute left-0 top-3 w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 z-10 border-2 focus:outline-none"
                              style={{
                                background: isOpen ? "var(--primary)" : "var(--surface)",
                                borderColor: isOpen ? "var(--primary)" : "var(--outline)",
                              }}
                            >
                              <span
                                className={`font-bold text-xs transition-colors ${isOpen ? "text-on-primary" : "text-on-surface-variant"}`}
                              >
                                {day.day < 10 ? `0${day.day}` : day.day}
                              </span>
                            </button>

                            {/* Card */}
                            <div
                              className={`rounded-2xl border transition-all duration-400 overflow-hidden ${
                                isOpen
                                  ? "border-primary/30 bg-surface dark:bg-white/[0.06] shadow-sm"
                                  : "border-outline/30 dark:border-white/8 bg-surface/50 dark:bg-white/[0.02] hover:bg-surface dark:hover:bg-white/[0.04] hover:border-outline/50 dark:hover:border-white/20"
                              }`}
                            >
                              {/* Header (always visible) */}
                              <button
                                onClick={() => setExpandedDay(isOpen ? null : day.day)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-primary font-label text-[10px] uppercase tracking-widest mb-0.5">
                                    {t("day", lang)} {day.day}
                                  </p>
                                  <p className="font-headline text-on-surface text-base leading-snug truncate">
                                    {day.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">hotel</span>
                                    <span className="font-label">{day.overnight}</span>
                                  </div>
                                  <span
                                    className={`material-symbols-outlined text-on-surface-variant text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                  >
                                    expand_more
                                  </span>
                                </div>
                              </button>

                              {/* Expanded body */}
                              {isOpen && (
                                <div className="px-6 pb-6 border-t border-outline/30 dark:border-white/[0.06]">
                                  {day.activities && day.activities.length > 0 ? (
                                    <div className="mt-6 mb-6 relative">
                                      {/* Inner connector line */}
                                      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-outline/20 dark:bg-white/5" />
                                      
                                      <div className="space-y-6">
                                        {day.activities.map((activity, i) => {
                                          const info = getActivityIcon(activity.name, lang);
                                          return (
                                            <div key={i} className="relative pl-8 group/item">
                                              {/* Activity point */}
                                              <div className="absolute left-0 top-1 w-6 h-6 flex items-center justify-center z-10">
                                                <span className={`material-symbols-outlined text-[15px] ${info.color}`}>
                                                  {info.icon}
                                                </span>
                                              </div>
                                              
                                              <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                  <span className="text-[11px] font-label uppercase tracking-wider text-on-surface-variant/60">
                                                    {info.label}
                                                  </span>
                                                  {activity.place && (
                                                    <span className="text-[11px] font-label uppercase tracking-wider text-primary/70">
                                                      • {activity.place}
                                                    </span>
                                                  )}
                                                </div>
                                                <p className="text-on-surface text-base leading-relaxed font-semibold">
                                                  {cleanActivityName(activity.name)}
                                                </p>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-on-surface-variant text-sm leading-relaxed mt-4 mb-5">
                                      {day.description}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-label">
                                      <span className="material-symbols-outlined text-sm">hotel</span>
                                      {day.overnight}
                                    </div>
                                    {!isLast && (
                                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-outline/20 dark:bg-white/5 text-on-surface-variant text-xs font-label">
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                        {t("continues_to", lang)} {day.day + 1}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Journey Map */}
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-headline text-2xl text-on-surface mb-8 border-b border-primary/20 pb-4">
                    {t("interactive_journey_map", lang)}
                  </h2>
                  <TourMap trip={trip} />
                </div>
              </AnimateOnScroll>

              {trip.tips && trip.tips.length > 0 && (
              <AnimateOnScroll animation="fade-up">
                <div>
                  <h2 className="font-headline text-2xl text-on-surface mb-6 border-b border-primary/20 pb-4">{t("travel_tips", lang)}</h2>
                  <ul className="space-y-3">
                    {trip.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">lightbulb</span>
                        <span className="text-on-surface-variant text-sm leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
              )}

              {/* Included / Not included */}
              <AnimateOnScroll animation="fade-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-headline text-xl text-on-surface mb-5 border-b border-primary/20 pb-3">{t("whats_included", lang)}</h3>
                    <ul className="space-y-3">
                      {trip.included.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg shrink-0">check</span>
                          <span className="text-on-surface-variant text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-on-surface mb-5 border-b border-outline/30 pb-3">{t("not_included", lang)}</h3>
                    <ul className="space-y-3">
                      {trip.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-red-600/70 dark:text-red-400/70 text-lg shrink-0">close</span>
                          <span className="text-on-surface-variant text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* CTA Banner */}
              <AnimateOnScroll animation="fade-up">
                <div className="relative overflow-hidden rounded-3xl bg-stone-900 dark:bg-gradient-to-r dark:from-[#2a1f14] dark:to-[#3d2c1a] p-6 md:p-10 border border-primary/20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <h3 className="font-headline text-2xl text-white mb-2">{t("want_tailor_made", lang)}</h3>
                      <p className="text-white/70 text-sm max-w-md">
                        {t("tailor_made_description", lang)}
                      </p>
                    </div>
                    <Link
                      href="/plan-trip"
                      className="shrink-0 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20 inline-flex items-center gap-2"
                    >
                      {t("start_planning", lang)}
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* ── Right / Sidebar — visible on mobile at top, sticky on desktop ── */}
            <div className="block lg:hidden order-first">
              {/* Mobile compact booking card */}
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(trip.rating) ? "text-primary" : "text-black/10 dark:text-white/10"}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                    <span className="text-on-surface font-bold text-sm ml-1">{trip.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-sm">calendar_month</span>{trip.duration}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-sm">group</span>{trip.groupSize}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-6">

                {/* Trip info card */}
                <div className="bg-surface/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl p-7 backdrop-blur-sm shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-sm ${i < Math.floor(trip.rating) ? "text-primary" : "text-outline"}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-on-surface font-bold text-sm">{trip.rating}</span>
                    <span className="text-on-surface-variant text-xs">({trip.reviews})</span>
                  </div>

                  <div className="space-y-3 mb-7 text-sm">
                    {sidebarRows.map((row) => (
                      <div key={row.key} className="flex justify-between items-center py-2.5 border-b border-outline/30 dark:border-white/5 last:border-0">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary text-base">{row.icon}</span>
                          {t(row.key, lang)}
                        </div>
                        <span className="text-on-surface font-medium text-right max-w-[55%] text-sm">
                          {row.key === "duration" ? trip.duration :
                           row.key === "group_size" ? `${trip.groupSize} ${t("group_size", lang).toLowerCase()}` :
                           row.key === "difficulty" ? trip.difficulty :
                           row.key === "region" ? getTripRegion(trip, lang) :
                           ""}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Journey facts */}
                <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6">
                  <h4 className="font-headline text-on-surface text-lg mb-4">{t("journey_facts", lang)}</h4>
                  <div className="space-y-4">
                    {journeyFacts.map((fact) => (
                      <div key={fact.key} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary text-sm">{fact.icon}</span>
                        </div>
                        <div>
                          <p className="text-on-surface text-xs font-bold">{t(fact.key, lang)}</p>
                          <p className="text-on-surface-variant text-xs">{t(fact.valueKey, lang)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience icons strip */}
          <AnimateOnScroll animation="fade-up">
            <div className="mt-24 pt-16 border-t border-black/10 dark:border-white/10">
              <h3 className="font-headline text-2xl text-on-surface mb-10 text-center">{t("what_youll_experience", lang)}</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {experienceIcons.map((h) => (
                  <div key={h.key} className="flex flex-col items-center gap-3 text-on-surface-variant hover:text-primary transition-colors cursor-default group">
                    <div className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                      <span className="material-symbols-outlined text-2xl">{h.icon}</span>
                    </div>
                    <span className="font-label text-[10px] uppercase tracking-widest">{t(h.key, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* You may also like */}
          <AnimateOnScroll animation="fade-up">
            <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-black/10 dark:border-white/10">
              <h3 className="font-headline text-xl md:text-2xl text-on-surface mb-8 md:mb-10">{t("you_may_also_like", lang)}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {relatedImages.map((img, i) => (
                  <Link
                    href="/groups"
                    key={i}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden block"
                  >
                    <Image src={img} alt="Related trip" fill sizes="(max-width: 640px) 90vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-primary font-label text-[10px] uppercase tracking-widest mb-1">{t("ethiopia", lang)}</p>
                      <p className="text-on-surface font-headline text-sm">{t("explore_more_trips", lang)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev === 0 ? trip.images.length - 1 : prev - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 p-2"
          >
            <span className="material-symbols-outlined text-4xl">chevron_left</span>
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={trip.images[activeImage]}
              alt={getTripTitle(trip, lang)}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev === trip.images.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 p-2"
          >
            <span className="material-symbols-outlined text-4xl">chevron_right</span>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {trip.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeImage ? "bg-white w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
