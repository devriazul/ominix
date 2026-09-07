import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFaqs } from "@/lib/db";
import FaqClient from "@/components/FaqClient";

export const metadata = {
  title: "Frequently Asked Questions | Omnix Network",
  description: "Find answers to common operational, strategy, and budget questions about Omnix Network.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              Support & Clarity
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Find transparent answers to common operational, campaign execution, and budget inquiries.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqClient faqs={faqs} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
