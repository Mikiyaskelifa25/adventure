"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Language } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored === "en" || stored === "fr") {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCookie("lang", lang);
    }
  }, [lang, mounted]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    setCookie("lang", newLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
