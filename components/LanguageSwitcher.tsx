"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { getLanguages, type Language } from "@/lib/i18n/translations";

const BASE_URL_EN = "https://adventureinnethiopia.com";
const BASE_URL_FR = "https://fr.adventureinnethiopia.com";
const BASE_URL_RU = "https://ru.adventureinnethiopia.com";

function isSubdomain(locale: string): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.startsWith(`${locale}.`);
}

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

  const handleLanguageChange = useCallback((newLang: Language) => {
    const currentHost = window.location.hostname;
    const path = window.location.pathname + window.location.search;

    const targetUrl = newLang === "fr" ? BASE_URL_FR
      : newLang === "ru" ? BASE_URL_RU
      : BASE_URL_EN;

    const isAlreadyOnCorrectDomain = (
      (newLang === "fr" && currentHost.startsWith("fr.")) ||
      (newLang === "ru" && currentHost.startsWith("ru.")) ||
      (newLang !== "fr" && newLang !== "ru" && !currentHost.startsWith("fr.") && !currentHost.startsWith("ru."))
    );

    if (!isAlreadyOnCorrectDomain) {
      window.location.href = `${targetUrl}${path}`;
      return;
    }

    setLang(newLang);
    setOpen(false);
  }, [setLang]);

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
        aria-label={`Current language: ${current.label}. Click to change language.`}
      >
        <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-outline/30 rounded-xl shadow-lg overflow-hidden z-[60] min-w-[120px]">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code as Language)}
              className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-label hover:bg-surface-variant/50 transition-colors ${
                lang === l.code ? "text-primary font-bold" : "text-on-surface"
              }`}
              aria-label={`Switch language to ${l.label}`}
            >
              <span className="text-base leading-none" aria-hidden="true">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
