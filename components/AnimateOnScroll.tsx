"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-up" | "fade-left" | "fade-right" | "zoom-in" | "reveal-3d" | "scale-reveal";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: number;
}

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
  staggerChildren = 0,
}: AnimateOnScrollProps) {
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animation === "fade-up" ? 40 : 0,
      x: animation === "fade-left" ? -40 : animation === "fade-right" ? 40 : 0,
      scale: animation === "zoom-in" ? 0.95 : animation === "scale-reveal" ? 0.8 : 1,
      rotateX: animation === "reveal-3d" ? 45 : 0,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Deceleration curve
        staggerChildren: staggerChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "-50px" }}
      variants={variants}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
