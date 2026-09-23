import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/db";
import ContactClient from "@/components/ContactClient";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact Us | Omnix Network",
  description: "Connect with Omnix Network offices in Dhaka, Sydney, and the USA. Request proposals, schedule strategy calls, or reach our engineering support team.",
};

export default function ContactPage() {
  return getContactContent();
}

async function getContactContent() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        {/* Premium Dark Hero Banner */}
        <div className="bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800/80 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/3 w-96 h-48 bg-brand-accent/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-1/3 w-96 h-48 bg-brand-cyan/10 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 text-center space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-cyan text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>Let's Discuss Your Project</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-cyan-400 to-emerald-400">Omnix Network</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Reach out directly to discuss campaigns, request tailored performance proposals, or visit our global offices in Dhaka, Sydney, and the USA.
            </p>
          </div>
        </div>

        {/* Contact Client Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactClient settings={settings} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
