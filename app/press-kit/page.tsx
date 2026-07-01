import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Press Kit | Adventure in Abyssinie",
  description: "Download press materials, brand assets, and media resources for Adventure in Abyssinie — Ethiopia's premier tour operator.",
};

export default function PressKitPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">Press Kit</h1>
          <p className="text-on-surface-variant text-lg mb-12">
            Media resources and brand assets for Adventure in Abyssinie.
          </p>

          <div className="space-y-8">
            <div className="rounded-2xl border border-outline/30 p-8">
              <h2 className="text-xl font-headline font-bold text-on-surface mb-2">Brand Overview</h2>
              <p className="text-on-surface-variant mb-4">Adventure in Abyssinie is a boutique Ethiopia tour operator specializing in small-group and tailor-made journeys. Founded by local experts, we offer authentic experiences across Ethiopia&apos;s major destinations.</p>
              <p className="text-sm text-on-surface-variant"><strong>Website:</strong> adventureinnethiopia.com</p>
              <p className="text-sm text-on-surface-variant"><strong>Contact:</strong> tedbezmengistu@gmail.com</p>
            </div>

            <div className="rounded-2xl border border-outline/30 p-8">
              <h2 className="text-xl font-headline font-bold text-on-surface mb-2">Media Inquiries</h2>
              <p className="text-on-surface-variant">For press trips, interviews, or media collaborations, please contact us at tedbezmengistu@gmail.com.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
