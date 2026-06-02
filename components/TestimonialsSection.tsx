"use client";

import { testimonials } from "@/lib/testimonialsData";
import TestimonialCard from "./TestimonialCard";
import AnimateOnScroll from "./AnimateOnScroll";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <AnimateOnScroll animation="fade-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-on-surface tracking-tight">
              {t("what they say", lang)} <br /> <span className="text-primary">{t("about us", lang)}</span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-left" delay={0.2}>
            <Link 
              href="/testimonials"
              className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest border-b border-primary/30 pb-1"
            >
              {t("view_all_stories", lang)}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {featuredTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
