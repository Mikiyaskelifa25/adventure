"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function TopNavBar() {
  const { lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: t("about", lang), href: "/#about-us" },
    { label: t("destinations", lang), href: "/#destinations" },
    { label: t("testimonials", lang), href: "/testimonials" },
    { label: t("contact", lang), href: "/#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-5 md:px-12 py-4 md:py-5 flex justify-between items-center ${isScrolled || menuOpen
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl border-b border-outline/50 dark:border-white/5 shadow-sm"
          : "bg-transparent"
          }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-bold font-headline tracking-wider uppercase hover:opacity-80 transition-all shrink-0 ${isScrolled || menuOpen ? "text-on-surface" : "text-white/90"
            }`}
        >
          <span className="hidden md:inline text-[clamp(0.875rem,4cqi,1.5rem)]">{t("adventure_ethiopia_travel", lang)}</span>
          <span className="md:hidden flex flex-col leading-none text-[clamp(0.6rem,3cqi,0.85rem)]">
            <span>Adventure</span>
            <span>Ethiopia</span>
            <span>Travel</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 font-headline tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`hover:text-primary transition-colors text-sm ${isScrolled || menuOpen ? "text-on-surface" : "text-white/90"
                }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className={`hidden md:flex items-center gap-5 ${isScrolled || menuOpen ? "text-on-surface" : "text-white/90"
          }`}>
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="tel:+251911603027"
            className="hidden lg:flex items-center gap-2 font-label text-xs tracking-widest hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-sm text-primary">phone</span>
            +251 91 160 3027
          </a>
          <Link
            href="/plan-trip"
            className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-95 duration-200 ease-in-out shadow-lg shadow-primary/20"
          >
            {t("plan_trip", lang)}
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${isScrolled || menuOpen ? "text-on-surface" : "text-white/90"
              }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-background border-l border-outline/50 pt-20 px-8 flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Row 1: Language + Theme Toggle */}
          <div className="flex items-center justify-center gap-4 border-b border-outline/30 pb-6 mb-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Row 2: Nav Links */}
          <div className="flex-1 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-4 text-on-surface font-headline text-xl border-b border-outline/30 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Row 3: Contact + CTA */}
          <div className="pt-6 border-t border-outline/30 mt-auto">
            <a
              href="tel:+251911603027"
              className="flex items-center gap-3 text-on-surface-variant hover:text-primary text-sm font-label mb-4"
            >
              <span className="material-symbols-outlined text-lg text-primary">phone</span>
              +251 91 160 3027
            </a>
            <Link
              href="/plan-trip"
              onClick={() => setMenuOpen(false)}
              className="block bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm text-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {t("plan_trip", lang)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
