"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function PatternSVG({ opacity }: { opacity: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="w-full h-full"
      style={{ opacity }}
    >
      <defs>
        <pattern id="tilfi" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,5 75,40 40,75 5,40" fill="none" stroke="var(--pattern-color)" strokeWidth="1.8"/>
          <polygon points="40,20 60,40 40,60 20,40" fill="none" stroke="var(--pattern-color)" strokeWidth="1.0" opacity="0.7"/>
          <circle cx="40" cy="5"  r="2.5" fill="var(--pattern-color)"/>
          <circle cx="75" cy="40" r="2.5" fill="var(--pattern-color)"/>
          <circle cx="40" cy="75" r="2.5" fill="var(--pattern-color)"/>
          <circle cx="5"  cy="40" r="2.5" fill="var(--pattern-color)"/>
        </pattern>
        <pattern id="mesob" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon points="30,5 55,18 55,42 30,55 5,42 5,18" fill="none" stroke="var(--pattern-color)" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="3.5" fill="var(--pattern-color)" opacity="0.9"/>
          <line x1="30" y1="5" x2="30" y2="15" stroke="var(--pattern-color)" strokeWidth="1.0"/>
          <line x1="30" y1="55" x2="30" y2="45" stroke="var(--pattern-color)" strokeWidth="1.0"/>
        </pattern>
        <symbol id="ethiopian-cross" viewBox="0 0 100 100">
          <path d="M50 5 L62 25 L85 30 L68 48 L75 72 L50 60 L25 72 L32 48 L15 30 L38 25 Z" fill="none" stroke="var(--pattern-color)" strokeWidth="3"/>
          <circle cx="50" cy="45" r="10" fill="none" stroke="var(--pattern-color)" strokeWidth="2.5"/>
          <path d="M50 15 V75 M25 45 H75" stroke="var(--pattern-color)" strokeWidth="2"/>
        </symbol>
        <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" className="vignette-stop" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#tilfi)" opacity="0.6" />
      <rect width="100%" height="100%" fill="url(#mesob)" opacity="0.5" />
      <g opacity="0.35" className="hidden md:inline">
        <use href="#ethiopian-cross" x="8%" y="12%" width="140" height="140" />
        <use href="#ethiopian-cross" x="82%" y="8%" width="120" height="120" />
        <use href="#ethiopian-cross" x="78%" y="75%" width="180" height="180" />
        <use href="#ethiopian-cross" x="4%" y="80%" width="110" height="110" />
        <use href="#ethiopian-cross" x="45%" y="45%" width="200" height="200" opacity="0.15" />
      </g>
      <rect width="100%" height="100%" fill="url(#vignette)" />
    </svg>
  );
}

const cachedSVG = <PatternSVG opacity={1} />;

export default function EthiopianPatternBg() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseOpacity = mounted && resolvedTheme === "light" ? 0.45 : 0.12;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      <div
        className="absolute inset-0"
        style={{ opacity: baseOpacity, transition: "opacity 2s ease-out" }}
      >
        {cachedSVG}
      </div>
    </div>
  );
}
