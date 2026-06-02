import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  region: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  href?: string;
  elevated?: boolean;
}

export default function DestinationCard({
  region,
  title,
  imageUrl,
  imageAlt,
  href = "/groups",
  elevated = false,
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-lg aspect-[3/4] block transition-transform duration-500 hover:-translate-y-2 ${
        elevated ? "md:-translate-y-12 md:hover:-translate-y-14" : ""
      }`}
    >
      {imageUrl && (
        <Image
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          fill
          src={imageUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      {!imageUrl && (
        <div className="w-full h-full bg-surface-variant dark:bg-stone-800 flex items-center justify-center">
          <span className="text-on-surface-variant/40 text-sm">No image</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <span className="text-primary font-label text-xs uppercase tracking-widest mb-2 block transform transition-transform duration-500 group-hover:-translate-y-1">
          {region}
        </span>
        <h3 className="font-headline text-2xl md:text-3xl text-white drop-shadow-md transform transition-transform duration-500 group-hover:-translate-y-1">
          {title}
        </h3>
      </div>
    </Link>
  );
}
