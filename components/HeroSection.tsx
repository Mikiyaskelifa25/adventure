import Image from "next/image";
import Link from "next/link";
import HeroSearch from "./HeroSearch";
import { Trip } from "@/lib/tripsData";

const filterChips = [
  "Group",
  "Family",
];

export default function HeroSection({ trips }: { trips: Trip[] }) {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Silhouette of a person with a horn at sunset"
          className="w-full h-full object-cover"
          fill
          priority
          src="/back.png"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content Canvas */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        <h1
          className="font-headline text-4xl md:text-7xl lg:text-8xl text-white mb-8 md:mb-12 tracking-tight leading-tight font-bold drop-shadow-2xl"
        >
          Make every journey <br />
          <span className="italic font-normal">an adventure</span>
        </h1>

        {/* Search Bar (Functional) */}
        <HeroSearch trips={trips} />

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {filterChips.map((chip) =>
            chip === "Group" ? (
              <Link
                key={chip}
                href="/groups"
                className="px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/60 hover:scale-105 active:scale-95 shadow-sm hover:shadow-premium transition-all duration-300 font-label text-xs uppercase tracking-[0.2em] cursor-pointer"
              >
                {chip}
              </Link>
            ) : (
              <Link
                key={chip}
                href="/groups?filter=Family"
                className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 hover:bg-white/20 hover:border-white/50 hover:text-white hover:scale-105 active:scale-95 shadow-sm hover:shadow-premium transition-all duration-300 font-label text-xs uppercase tracking-[0.2em]"
              >
                {chip}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
