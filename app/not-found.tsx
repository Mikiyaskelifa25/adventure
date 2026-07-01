import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl md:text-9xl font-headline font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-4">
          Page not found
        </h2>
        <p className="text-on-surface-variant font-body mb-10 leading-relaxed">
          The trail you&apos;re looking for doesn&apos;t exist on our map. 
          It may have been moved or no longer available.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-sm hover:scale-95 transition-transform duration-300 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-lg">explore</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
