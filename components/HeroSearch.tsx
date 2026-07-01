"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trip } from "@/lib/tripsData";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function HeroSearch({ trips }: { trips: Trip[] }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Trip[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = trips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(query.toLowerCase()) ||
          trip.region.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, trips]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (trip: Trip) => {
    setQuery(trip.title);
    setShowSuggestions(false);
    router.push(`/itineraries/${trip.slug}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else if (query.trim()) {
      router.push(`/itineraries?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl relative" ref={searchRef}>
      <form 
        onSubmit={handleSearch}
        className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full p-1 md:p-2 mb-10 flex items-center shadow-glass hover:shadow-premium transition-all duration-500 hover:border-white/40 group"
      >
        <div className="pl-3 md:pl-6 pr-1 md:pr-4 shrink-0">
          <span className="material-symbols-outlined text-white/60 md:text-2xl text-xl group-hover:text-white transition-colors">
            search
          </span>
        </div>
        <input
          className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-white/60 flex-1 min-w-0 py-2 md:py-4 text-sm md:text-lg"
          placeholder={t("search_placeholder", lang)}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
        />
        <button 
          type="submit"
          className="bg-primary text-on-primary font-bold px-4 py-2 md:px-8 md:py-4 rounded-full shrink-0 whitespace-nowrap mr-0.5 md:mr-1 hover:scale-95 transition-all duration-300 shadow-lg shadow-primary/30 text-xs md:text-base"
        >
          {t("explorer", lang)}
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%-35px)] left-6 right-6 bg-surface/95 dark:bg-stone-900/95 backdrop-blur-xl border border-outline/30 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-2">
            {suggestions.map((trip) => (
              <button
                key={trip.id}
                onClick={() => handleSelect(trip)}
                className="w-full flex items-center gap-4 p-3 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition-colors text-left group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-on-surface dark:text-white font-headline text-sm truncate group-hover:text-primary transition-colors">
                    {trip.title}
                  </h4>
                  <p className="text-on-surface-variant dark:text-white/50 text-[10px] uppercase tracking-widest">
                    {trip.region} • {trip.duration}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary group-hover:translate-x-1 transition-all text-sm">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
          <div className="bg-primary/5 p-3 border-t border-outline/10 dark:border-white/5">
            <button 
              onClick={() => router.push(`/itineraries?search=${encodeURIComponent(query)}`)}
              className="text-primary font-label text-[10px] uppercase tracking-[0.2em] hover:underline"
            >
              {t("see_all_results", lang)} &quot;{query}&quot;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
