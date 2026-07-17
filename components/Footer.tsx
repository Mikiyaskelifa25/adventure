"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function Footer() {
  const { lang } = useLanguage();

  const quickLinks = [
    { label: t("destinations", lang), href: "/#destinations" },
    { label: t("group_circuits", lang), href: "/groups" },
    { label: t("about", lang), href: "/#about-us" },
    { label: t("contact", lang), href: "/#contact" },
  ];

  const legalLinks = [
    { label: t("privacy_policy", lang), href: "/privacy" },
    { label: t("terms_conditions", lang), href: "/terms" },
    { label: t("press_kit", lang), href: "/press-kit" },
  ];

  return (
    <footer className="w-full border-t border-outline/30 dark:border-white/5 bg-surface pt-16 md:pt-24 pb-12 px-6 md:px-12 relative z-10 overflow-hidden transition-colors">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mb-48" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-headline text-[clamp(1.125rem,3.5cqi,1.75rem)] text-on-surface uppercase tracking-tighter mb-6 block hover:opacity-80 transition-opacity">
              {t("adventure_ethiopia_travel", lang)}
            </Link>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8 max-w-xs">
              {t("footer_description", lang)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-lg text-on-surface mb-6 font-bold">{t("explore", lang)}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant hover:text-primary transition-colors font-label text-sm uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline text-lg text-on-surface mb-6 font-bold">{t("legal", lang)}</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant/60 hover:text-primary transition-colors font-label text-[10px] uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact mini */}
          <div>
            <h4 className="font-headline text-lg text-on-surface mb-6 font-bold">{t("need_help", lang)}</h4>
            <p className="text-on-surface-variant font-body text-sm mb-6">
              {t("our_specialists_ready", lang)}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+251911603027"
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">call</span>
                </div>
                <span className="font-label text-sm font-bold tracking-widest">+251 91 160 3027</span>
              </a>
              <a
                href="https://wa.me/251911603027"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-surface hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-green-500" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                  <span className="font-label text-sm font-bold tracking-widest">WhatsApp</span>
              </a>
            </div>
            <p className="text-on-surface-variant font-body text-[10px] uppercase tracking-widest opacity-60 mt-4">
              {t("international_local_support", lang)}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-outline/30 dark:border-white/5 flex flex-col items-center gap-6">
          <p className="text-on-surface-variant/40 font-body text-[10px] uppercase tracking-[0.3em] text-center">
            {t("copyright", lang)}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-on-surface-variant/40 font-body text-[10px] uppercase tracking-widest">
            <a
              href="https://www.getyourguide.com/-s783768"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://gyg.me/DFO5LFuz"
                className="w-[120px] md:w-[160px] h-auto border border-[#c6c8d0]"
                alt="GetYourGuide | Adventure in Ethiopia travel"
              />
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293791-d25131346-Reviews-Aventure_en_abyssinie_tour_and_travel-Addis_Ababa.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/trip.jpg"
                className="w-[120px] md:w-[160px] h-auto border border-[#c6c8d0]"
                alt="TripAdvisor | Adventure in Ethiopia travel"
              />
            </a>
            <a
              href="https://www.routard.com/forums/t/voyage-en-famille-et-super-guide-en-ethiopie/246300/2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/ro.jpeg"
                className="w-[120px] md:w-[160px] h-auto border border-[#c6c8d0]"
                alt="Routard | Adventure in Ethiopia travel"
              />
            </a>
            <a 
              href="https://t.me/Mikiyaskelifa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {t("made_by", lang)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
