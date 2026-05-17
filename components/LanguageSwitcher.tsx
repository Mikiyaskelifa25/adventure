"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { getLanguages, type Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const languages = getLanguages();
  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 font-label text-xs tracking-widest opacity-0">
        <span>EN</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-label text-xs tracking-widest hover:text-primary transition-colors"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-outline/30 rounded-xl shadow-lg overflow-hidden z-[60] min-w-[120px]">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Language);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-label hover:bg-surface-variant/50 transition-colors ${
                lang === l.code ? "text-primary font-bold" : "text-on-surface"
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
