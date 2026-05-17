"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/testimonialsData";
import AnimateOnScroll from "./AnimateOnScroll";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const isLong = testimonial.quote.length > maxLength;
  
  const displayedQuote = isExpanded 
    ? testimonial.quote 
    : testimonial.quote.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <AnimateOnScroll animation="fade-up" delay={index * 0.1}>
      <div className="bg-surface dark:bg-stone-900/40 backdrop-blur-md border border-outline/50 dark:border-white/5 rounded-3xl p-8 flex flex-col group hover:bg-white dark:hover:bg-stone-900/60 transition-all duration-500 hover:border-primary/50 dark:hover:border-primary/20 shadow-lg hover:shadow-premium h-full">
        {/* Quote Icon */}
        <div className="mb-6 text-primary/40 group-hover:text-primary transition-colors duration-500">
          <span className="material-symbols-outlined text-4xl">format_quote</span>
        </div>

        {/* Quote Content */}
        <blockquote className="flex-grow">
          <p className="text-on-surface-variant dark:text-on-surface/90 text-lg leading-relaxed italic mb-4">
            "{displayedQuote}"
          </p>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-label uppercase tracking-wider mb-8 hover:underline focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </blockquote>

        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`material-symbols-outlined text-sm ${
                i < testimonial.rating ? "text-primary fill-1" : "text-outline dark:text-on-surface/10"
              }`}
              style={{ fontVariationSettings: i < testimonial.rating ? "'FILL' 1" : "'FILL' 0" }}
            >
              star
            </span>
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-t border-outline/30 dark:border-white/5 pt-6">
          {testimonial.image ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg border-2 border-primary/20">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-on-surface dark:text-on-surface font-headline font-bold text-base leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-on-surface-variant/70 dark:text-on-surface/50 text-xs font-label uppercase tracking-widest mt-1">
              {testimonial.location}
            </p>
          </div>
        </div>

        {/* Trip Badge */}
        <div className="mt-4 inline-flex items-center gap-2 py-1 px-3 rounded-full bg-surface-variant/50 dark:bg-white/5 border border-outline/30 dark:border-white/5 self-start">
          <span className="material-symbols-outlined text-[10px] text-primary">explore</span>
          <span className="text-[10px] text-on-surface-variant/60 dark:text-on-surface/40 font-label uppercase tracking-wider">
            {testimonial.tripTitle}
          </span>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
