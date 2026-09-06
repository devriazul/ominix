import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getPortfolio } from "@/lib/db";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Client Case Studies & Works | Omnix Network",
  description: "Explore our recent digital marketing campaigns, e-commerce stores, and CRM builds.",
};

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              Proven Outcomes
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Selected Works & Case Studies
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore how we engineer quantifiable revenue growth, search engine rankings, and paid ads ROI for our clients.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="rs-card rounded-2xl overflow-hidden border-slate-200 bg-white flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block">
                      Client: {item.client}
                    </span>
                    <h3 className="text-xl font-bold font-display text-slate-900 leading-snug">
                      {item.title.en}
                    </h3>
                    <div className="bg-emerald-50 text-emerald-700 font-bold text-xs p-2.5 rounded-lg">
                      {item.metrics.en}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="text-xs font-bold text-slate-800 hover:text-brand-accent flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Read Full Case Study</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
