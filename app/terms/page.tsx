import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Adventure in Abyssinie",
  description: "Terms and conditions for tour bookings with Adventure in Abyssinie. Please read before booking your Ethiopia adventure.",
};

export default function TermsPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8">Terms &amp; Conditions</h1>
          <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-on-surface-variant">
            <p>Last updated: June 2026</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">1. Booking &amp; Payment</h2>
            <p>A 30% deposit is required to confirm any booking. Full payment must be received 30 days before departure. Bookings made within 30 days of departure require full payment at the time of booking.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">2. Cancellation Policy</h2>
            <p>Cancellations made 60+ days before departure: full refund minus administration fee. 30-59 days: 50% refund. Less than 30 days: no refund. We strongly recommend travel insurance.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">3. Itinerary Changes</h2>
            <p>We reserve the right to modify itineraries due to weather, political conditions, or unforeseen circumstances. We will notify you of any significant changes as soon as possible.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">4. Participant Responsibility</h2>
            <p>Participants must have valid travel insurance, necessary vaccinations, and a passport valid for at least 6 months. You are responsible for your own safety and must follow guide instructions.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">5. Limitation of Liability</h2>
            <p>Adventure in Abyssinie acts as an intermediary for local service providers. We are not liable for delays, injuries, losses, or damages arising from events beyond our control.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">6. Complaints</h2>
            <p>Any complaints must be submitted in writing within 14 days of tour completion. We will investigate and respond within 30 days.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">7. Governing Law</h2>
            <p>These terms are governed by Ethiopian law. Any disputes shall be resolved in the courts of Addis Ababa, Ethiopia.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
