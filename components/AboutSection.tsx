"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bookRotate = useTransform(scrollYProgress, [0, 0.4], [6, 0]);
  const bookY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const bookOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      id="about-us"
      ref={sectionRef}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight"
            style={{ color: "var(--on-surface)" }}
          >
            {t("who_we_are", lang)}
          </h2>
        </motion.div>

        {/* ══════ 3-D Open Book ══════ */}
        <motion.div
          style={{ rotateX: bookRotate, y: bookY, opacity: bookOpacity }}
          className="book-wrapper"
        >
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
                  src="/about.jpg"
                  alt="Aventure en Abyssinie – Ethiopia"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
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
        </motion.div>
      </div>

      {/* ═══ Scoped Styles ═══ */}
      <style>{`
        .book-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Desktop: side-by-side pages ── */
        .book-outer {
          display: flex;
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          border-radius: 4px 16px 16px 4px;
          background: var(--surface-container, var(--surface));
          box-shadow:
            -6px 6px 0px color-mix(in srgb, var(--on-surface) 8%, transparent),
            -12px 12px 0px color-mix(in srgb, var(--on-surface) 5%, transparent),
            -18px 18px 0px color-mix(in srgb, var(--on-surface) 2%, transparent),
            0 30px 80px -10px color-mix(in srgb, var(--on-surface) 30%, transparent);
        }

        /* ── Spine ── */
        .book-spine {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 20px;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: none;
        }
        .book-spine::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            color-mix(in srgb, var(--on-surface) 20%, transparent) 0%,
            color-mix(in srgb, var(--on-surface) 8%, transparent) 25%,
            color-mix(in srgb, var(--surface) 100%, transparent) 50%,
            color-mix(in srgb, var(--on-surface) 8%, transparent) 75%,
            color-mix(in srgb, var(--on-surface) 16%, transparent) 100%
          );
        }
        .book-spine::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 12%; bottom: 12%;
          width: 1px;
          transform: translateX(-50%);
          background: color-mix(in srgb, var(--on-surface) 12%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--on-surface) 6%, transparent),
            0 0 4px color-mix(in srgb, var(--on-surface) 8%, transparent);
        }

        /* ── Bookmark Ribbon ── */
        .book-bookmark {
          position: absolute;
          left: 50%;
          bottom: -20px;
          transform: translateX(-50%);
          z-index: 15;
          pointer-events: none;
        }
        .book-bookmark::before {
          content: '';
          display: block;
          width: 8px;
          height: 28px;
          margin: 0 auto;
          background: linear-gradient(180deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%);
          border-radius: 0 0 3px 3px;
          box-shadow: 0 4px 8px color-mix(in srgb, var(--primary) 30%, transparent);
        }
        .book-bookmark::after {
          display: none;
        }

        /* ── Page edges (stacked paper effect) ── */
        .book-page-edges {
          position: absolute;
          pointer-events: none;
          z-index: 5;
        }
        .book-page-edges-left {
          right: -6px; bottom: -6px;
          width: 12px; height: 12px;
          background: repeating-linear-gradient(
            0deg,
            color-mix(in srgb, var(--on-surface) 3%, transparent) 0px,
            color-mix(in srgb, var(--on-surface) 3%, transparent) 1px,
            var(--surface-container, var(--surface)) 1px,
            var(--surface-container, var(--surface)) 2px
          );
          border-radius: 0 0 0 2px;
        }
        .book-page-edges-right {
          left: -6px; bottom: -6px;
          width: 12px; height: 12px;
          background: repeating-linear-gradient(
            0deg,
            color-mix(in srgb, var(--on-surface) 3%, transparent) 0px,
            color-mix(in srgb, var(--on-surface) 3%, transparent) 1px,
            var(--surface-container, var(--surface)) 1px,
            var(--surface-container, var(--surface)) 2px
          );
          border-radius: 0 0 2px 0;
        }

        .book-page {
          flex: 1;
          position: relative;
          overflow: visible;
        }

        /* ── Left page ── */
        .book-page-left {
          border-radius: 4px 0 0 4px;
          transform-origin: right center;
          transform: perspective(1200px) rotateY(5deg);
          z-index: 2;
        }

        .book-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          overflow: hidden;
          border-radius: 4px 0 0 4px;
        }
        /* Paper texture overlay on image */
        .book-image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        /* ── Right page ── */
        .book-page-right {
          background: var(--surface-container, var(--surface));
          border-radius: 0 16px 16px 0;
          transform-origin: left center;
          transform: perspective(1200px) rotateY(-5deg);
          z-index: 2;
        }
        /* Paper texture on right page */
        .book-page-right::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
          mix-blend-mode: multiply;
          pointer-events: none;
          border-radius: 0 16px 16px 0;
        }

        /* Inner shadows for depth from spine */
        .page-inner-shadow-left {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(
            to left,
            color-mix(in srgb, var(--on-surface) 18%, transparent) 0%,
            color-mix(in srgb, var(--on-surface) 8%, transparent) 40%,
            transparent 100%
          );
          z-index: 4;
          pointer-events: none;
        }

        .page-inner-shadow-right {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(
            to right,
            color-mix(in srgb, var(--on-surface) 18%, transparent) 0%,
            color-mix(in srgb, var(--on-surface) 8%, transparent) 40%,
            transparent 100%
          );
          z-index: 4;
          pointer-events: none;
        }

        /* Corner curl shadow overlay */
        .book-page-left::after {
          content: '';
          position: absolute;
          bottom: 0; right: 0;
          width: 40px; height: 40px;
          z-index: 4;
          pointer-events: none;
          background: radial-gradient(
            ellipse at 100% 100%,
            color-mix(in srgb, var(--on-surface) 12%, transparent) 0%,
            transparent 70%
          );
          border-radius: 0 0 4px 0;
        }

        .book-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, transparent 35%, rgba(8,5,2,0.78) 100%
          );
          z-index: 2;
        }

        .book-stats {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-around;
          z-index: 3;
        }

        .book-stat { text-align: center; }

        .book-stat-value {
          color: #fff;
          font-family: var(--font-headline, serif);
          font-size: clamp(1.2rem, 3vw, 1.75rem);
          font-weight: 700;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          line-height: 1.1;
        }

        .book-stat-label {
          color: rgba(255,255,255,0.75);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .book-text-content {
          padding: clamp(1.25rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
          min-height: 100%;
        }

        .book-ruled-header {
          height: 3px;
          margin-bottom: 1.25rem;
          background: linear-gradient(
            to right,
            var(--primary),
            color-mix(in srgb, var(--primary) 20%, transparent)
          );
          border-radius: 2px;
        }

        .book-cta-btn {
          background: var(--primary);
          color: var(--on-primary);
          align-self: flex-start;
          box-shadow: 0 4px 24px -6px color-mix(in srgb, var(--primary) 60%, transparent);
        }
        .book-cta-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .book-page-num {
          position: absolute;
          bottom: 0.75rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          user-select: none;
          opacity: 0.35;
        }
        .book-page-num-left {
          left: 1rem;
          color: #fff;
          z-index: 3;
        }
        .book-page-num-right {
          right: 1rem;
          color: var(--on-surface-variant);
          z-index: 2;
        }

        .book-floor-shadow {
          width: 65%;
          height: 24px;
          margin-top: -2px;
          background: color-mix(in srgb, var(--on-surface) 10%, transparent);
          filter: blur(14px);
          border-radius: 50%;
        }

        /* ══════════════════════════════
           DARK MODE OVERRIDES
        ══════════════════════════════ */
        .dark .book-page-right {
          background: var(--surface-container);
        }

        .dark .book-image-wrapper::after {
          opacity: 0.06;
          mix-blend-mode: screen;
        }

        .dark .book-page-right::after {
          opacity: 0.05;
          mix-blend-mode: screen;
        }

        .dark .book-page-edges-left,
        .dark .book-page-edges-right {
          background: repeating-linear-gradient(
            0deg,
            color-mix(in srgb, var(--on-surface) 5%, transparent) 0px,
            color-mix(in srgb, var(--on-surface) 5%, transparent) 1px,
            var(--surface-container) 1px,
            var(--surface-container) 2px
          );
        }

        .dark .book-outer {
          box-shadow:
            -6px 6px 0px color-mix(in srgb, var(--on-surface) 6%, transparent),
            -12px 12px 0px color-mix(in srgb, var(--on-surface) 4%, transparent),
            -18px 18px 0px color-mix(in srgb, var(--on-surface) 2%, transparent),
            0 30px 80px -10px color-mix(in srgb, #000 60%, transparent);
        }

        /* ══════════════════════════════
           MOBILE  ≤ 767px
        ══════════════════════════════ */
        @media (max-width: 767px) {
          .book-outer {
            flex-direction: column;
            border-radius: 16px;
            box-shadow:
              0 20px 60px -10px color-mix(in srgb, var(--on-surface) 22%, transparent);
          }

          .book-spine {
            display: none;
          }

          .book-bookmark {
            display: none;
          }

          .book-page-edges {
            display: none;
          }

          .book-page-left,
          .book-page-right {
            transform: none;
            flex: none;
            width: 100%;
          }

          .book-page-left {
            border-radius: 16px 16px 0 0;
          }
          .book-page-left::after {
            display: none;
          }
          .book-page-right {
            border-radius: 0 0 16px 16px;
            border-top: 6px solid color-mix(in srgb, var(--on-surface) 12%, transparent);
          }

          .book-image-wrapper {
            min-height: unset;
            aspect-ratio: 4 / 3;
            height: auto;
            border-radius: 16px 16px 0 0;
          }

          /* Hide paper texture on mobile for performance */
          .book-image-wrapper::after,
          .book-page-right::after {
            display: none;
          }

          .page-inner-shadow-left {
            top: auto;
            left: 0; right: 0; bottom: 0;
            width: 100%; height: 50px;
            background: linear-gradient(
              to top,
              color-mix(in srgb, var(--on-surface) 22%, transparent),
              transparent
            );
          }
          .page-inner-shadow-right {
            top: 0; left: 0; right: 0; bottom: auto;
            width: 100%; height: 40px;
            background: linear-gradient(
              to bottom,
              color-mix(in srgb, var(--on-surface) 14%, transparent),
              transparent
            );
          }

          .book-text-content {
            padding: 1.5rem 1.25rem 2rem;
          }

          .book-floor-shadow {
            width: 80%;
          }
        }
      `}</style>
    </section>
  );
}
