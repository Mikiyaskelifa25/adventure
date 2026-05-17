import Image from "next/image";

export default function ItinerariesHero() {
  return (
    <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Ethiopian landscape"
          className="w-full h-full object-cover"
          fill
          priority
          src="/pic3.JPG"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 text-center">
        <span className="text-white/80 font-label uppercase tracking-[0.4em] text-xs mb-4 block">
          Explore
        </span>
        <h1 className="text-white font-headline text-5xl md:text-7xl font-bold tracking-tight">
          All Itineraries
        </h1>
      </div>
    </section>
  );
}
