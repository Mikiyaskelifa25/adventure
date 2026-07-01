export default function Loading() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        <p className="text-on-surface-variant font-body text-sm tracking-wider">
          Loading your adventure...
        </p>
      </div>
    </div>
  );
}
