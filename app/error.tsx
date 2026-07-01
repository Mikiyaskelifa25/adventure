"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl md:text-9xl font-headline font-bold text-primary mb-4">500</h1>
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-4">
          Something went wrong
        </h2>
        <p className="text-on-surface-variant font-body mb-10 leading-relaxed">
          Our trail map encountered an error. Our team has been notified.
          Please try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-sm hover:scale-95 transition-transform duration-300 shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-outline text-on-surface px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
