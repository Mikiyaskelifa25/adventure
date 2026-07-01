import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Ethiopia Travel Blog | Tips, Guides & Inspiration | Adventure in Abyssinie",
  description: "Explore our Ethiopia travel blog for expert guides, tips on Danakil Depression, Lalibela churches, Omo Valley tribes, Simien Mountains trekking, and the best time to visit Ethiopia.",
};

const posts = [
  {
    title: "Best Time to Visit Ethiopia: A Month-by-Month Guide",
    excerpt: "Planning your Ethiopia trip? Discover the best seasons for Danakil, Lalibela, Simien Mountains, and the Omo Valley with our complete climate guide.",
    slug: "best-time-to-visit-ethiopia",
    date: "June 2026",
    readTime: "8 min",
  },
  {
    title: "Danakil Depression: What to Expect on Ethiopia's Most Extreme Expedition",
    excerpt: "Everything you need to know before visiting the Danakil Depression — Erta Ale volcano, Dallol hydrothermal fields, salt flats, and camping under the stars.",
    slug: "danakil-depression-guide",
    date: "May 2026",
    readTime: "10 min",
  },
  {
    title: "Lalibela's Rock-Hewn Churches: A Complete Visitor's Guide",
    excerpt: "Explore the UNESCO World Heritage site of Lalibela. History, architecture, practical tips, and how to experience the 11 monolithic churches.",
    slug: "lalibela-churches-guide",
    date: "April 2026",
    readTime: "7 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mb-4 tracking-tight">
            Ethiopia Travel Blog
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl mb-16 max-w-2xl">
            Expert guides, travel tips, and inspiration for your Ethiopian adventure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] rounded-2xl bg-stone-100 dark:bg-stone-900 mb-4 flex items-center justify-center border border-outline/30 group-hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">article</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant/60 font-label uppercase tracking-widest mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
