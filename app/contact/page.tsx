import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/db";
import ContactClient from "@/components/ContactClient";

export const metadata = {
  title: "Contact Us | Omnix Network",
  description: "Connect with Omnix Network offices in Banani Dhaka and Sydney.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              Let's Connect
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Contact Omnix Network
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Reach out directly to discuss campaigns, request performance proposals, or schedule a growth consultation.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactClient settings={settings} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
