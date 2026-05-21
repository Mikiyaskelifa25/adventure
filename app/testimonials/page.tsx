"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/lib/testimonialsData";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";

export default function TestimonialsPage() {
  const { lang } = useLanguage();

  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-20 text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-on-surface mb-6 tracking-tight leading-tight">
              {t("our_testimonials", lang)}
            </h1>
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed">
              {t("testimonials_description", lang)}
            </p>
          </AnimateOnScroll>
        </section>

        {/* Testimonials Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto mt-32 text-center bg-black/5 dark:bg-stone-900/40 backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-[2rem] p-12 md:p-16">
          <AnimateOnScroll animation="zoom-in">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-6">
              {t("ready_to_write_story", lang)}
            </h2>
            <p className="text-on-surface-variant text-lg mb-10">
              {t("join_us_adventure", lang)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#destinations" 
                className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-base hover:scale-95 transition-transform duration-300 shadow-lg shadow-primary/20"
              >
                {t("explore_destinations", lang)}
              </a>
              <a 
                href="/#contact" 
                className="bg-black/5 dark:bg-white/5 text-on-surface border border-black/10 dark:border-white/10 px-8 py-4 rounded-2xl font-bold text-base hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
              >
                {t("contact", lang)}
              </a>
            </div>
          </AnimateOnScroll>
        </section>
      </main>
      <Footer />
    </>
  );
}
