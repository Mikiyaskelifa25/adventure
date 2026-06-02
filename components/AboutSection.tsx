"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

const stats = [
  { value: "16+", key: "years" },
  { value: "500+", key: "travelers" },
  { value: "30+", key: "destinations_lower" },
];

const highlights = [
  { icon: "landscape", key: "simien_treks" },
  { icon: "church", key: "lalibela_churches" },
  { icon: "diversity_3", key: "community_tourism" },
  { icon: "eco", key: "eco_journeys" },
];

export default function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section
      id="about-us"
      className="py-20 md:py-36 px-4 md:px-8 overflow-hidden relative"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--primary)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "var(--primary)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight"
            style={{ color: "var(--on-surface)" }}
          >
            {t("who_we_are", lang)}
          </h2>
        </div>

        {/* ══════ 3-D Open Book ══════ */}
        <div className="book-wrapper">
          <div className="book-outer">
            {/* Spine */}
            <div className="book-spine" aria-hidden />

            {/* Bookmark Ribbon */}
            <div className="book-bookmark" aria-hidden />

            {/* ── Left Page: Image ── */}
            <div className="book-page book-page-left">
              <div className="page-inner-shadow-left" aria-hidden />
              <div className="book-page-edges book-page-edges-left" aria-hidden />
              <div className="book-image-wrapper">
                <Image
                  src="/about.webp"
                  alt="Adventure in Abyssinie – Ethiopia"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="book-image-overlay" aria-hidden />

                {/* Stats */}
                <div className="book-stats">
                  {stats.map((s) => (
                    <div key={s.key} className="book-stat">
                      <div className="book-stat-value">{s.value}</div>
                      <div className="book-stat-label">{t(s.key, lang)}</div>
                    </div>
                  ))}
                </div>

                <div className="book-page-num book-page-num-left">i</div>
              </div>
            </div>

            {/* ── Right Page: Text ── */}
            <div className="book-page book-page-right">
              <div className="page-inner-shadow-right" aria-hidden />
              <div className="book-page-edges book-page-edges-right" aria-hidden />
              <div className="book-text-content">
                <div className="book-ruled-header" />

                <p
                  className="font-label uppercase tracking-[0.4em] text-[10px] mb-3"
                  style={{ color: "var(--primary)" }}
                >
                  {t("adventure_in_ethiopia", lang)}
                </p>

                <h3
                  className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug mb-4"
                  style={{ color: "var(--on-surface)" }}
                >
                  {t("adventure_in_ethiopia", lang)}
                </h3>

                <div
                  className="space-y-3 font-body text-sm leading-relaxed mb-5"
                  style={{ color: "var(--on-surface-variant)" }}
                >
                  <p>
                    {t("about_text_1", lang)}
                  </p>
                  <p className="hidden sm:block">
                    {t("about_text_2", lang)}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {highlights.map((h) => (
                    <li key={h.key} className="flex items-center gap-2.5">
                      <span
                        className="material-symbols-outlined text-base flex-shrink-0"
                        style={{ color: "var(--primary)" }}
                      >
                        {h.icon}
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "var(--on-surface)" }}
                      >
                        {t(h.key, lang)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="h-px mb-5"
                  style={{ background: "var(--outline)" }}
                />

                <a
                  href="#contact-us"
                  className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 book-cta-btn"
                >
                  {t("plan_your_journey", lang)}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>

                <div className="book-page-num book-page-num-right">ii</div>
              </div>
            </div>
          </div>

          {/* Floor shadow */}
          <div className="book-floor-shadow" aria-hidden />
        </div>
      </div>


    </section>
  );
}
