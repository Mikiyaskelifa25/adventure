import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/lib/testimonialsData";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata = {
  title: "Testimonials | Aventure en Abyssinie",
  description: "What our travelers say about their experiences in Ethiopia.",
};

export default function TestimonialsPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-28 md:pt-32 pb-20 px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-20 text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-on-surface mb-6 tracking-tight leading-tight">
              Our <span className="text-primary">Testimonials</span>
            </h1>
            <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl leading-relaxed">
              Every journey is a unique story. Discover the experiences of those who have ventured into the heart of Ethiopia with us.
            </p>
          </AnimateOnScroll>
        </section>

        {/* Testimonials Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto mt-32 text-center bg-black/5 dark:bg-stone-900/40 backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-[2rem] p-12 md:p-16">
          <AnimateOnScroll animation="zoom-in">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-6">
              Ready to write your own story?
            </h2>
            <p className="text-on-surface-variant text-lg mb-10">
              Join us for an unforgettable adventure through the ancestral lands and breathtaking landscapes of Abyssinia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#destinations" 
                className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold text-base hover:scale-95 transition-transform duration-300 shadow-lg shadow-primary/20"
              >
                Explore Destinations
              </a>
              <a 
                href="/#contact" 
                className="bg-black/5 dark:bg-white/5 text-on-surface border border-black/10 dark:border-white/10 px-8 py-4 rounded-2xl font-bold text-base hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </AnimateOnScroll>
        </section>
      </main>
      <Footer />
    </>
  );
}
