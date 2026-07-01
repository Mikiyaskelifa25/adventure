import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Adventure in Abyssinie",
  description: "Privacy policy for Adventure in Abyssinie — how we collect, use, and protect your personal data when booking Ethiopia tours.",
};

export default function PrivacyPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8">Privacy Policy</h1>
          <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-on-surface-variant">
            <p>Last updated: June 2026</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">1. Information We Collect</h2>
            <p>When you use our website or book a tour, we may collect: your name, email address, phone number, travel preferences, payment information, and technical data (IP address, browser type, pages visited).</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">2. How We Use Your Information</h2>
            <p>We use your information to: process tour bookings and inquiries, communicate about your trip, improve our services, send promotional emails (with your consent), and comply with legal obligations.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">3. Data Sharing</h2>
            <p>We do not sell your personal data. We may share it with: local tour operators and guides necessary for your trip, payment processors, and authorities if required by law.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">4. Data Security</h2>
            <p>We implement industry-standard security measures including SSL encryption, secure data storage, and access controls to protect your personal information.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">5. Your Rights</h2>
            <p>You have the right to: access your personal data, request correction or deletion, withdraw consent at any time, and lodge a complaint with a supervisory authority.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">6. Cookies</h2>
            <p>We use essential cookies for language preference and session management. We use analytics cookies (Google Analytics) to understand site usage. You can disable cookies in your browser settings.</p>

            <h2 className="text-xl font-headline font-bold text-on-surface mt-10">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at: <strong>tedbezmengistu@gmail.com</strong> or <strong>+251 91 160 3027</strong>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
