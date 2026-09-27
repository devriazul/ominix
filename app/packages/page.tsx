import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPackages } from "@/lib/db";
import { Check, ArrowRight, Tag } from "lucide-react";

export const metadata = {
  title: "Service Packages & Pricing | Omnix Network",
  description: "Explore our transparent, scalable Social Media, SEO, and Web marketing packages with affordable starting rates.",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              Investment & Flexible Tiers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Transparent Marketing Packages
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Transparent, scalable, and results-focused retainers engineered to outperform standard ad agencies.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rs-card rounded-3xl p-8 border-slate-200 bg-white flex flex-col justify-between shadow-lg hover:border-brand-accent/50 transition-all hover:shadow-xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full">
                      {pkg.type}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>Best Value</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-display text-slate-900">
                      {pkg.title.en}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      {pkg.desc.en}
                    </p>
                  </div>

                  {/* Prominent Starting From Price Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-1 shadow-md">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                      Affordable Investment
                    </span>
                    <div className="text-xl sm:text-2xl font-extrabold font-display text-emerald-400">
                      {pkg.price || pkg.startingPrice?.en || "Starting from $149/mo"}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">
                      Key Deliverables Included
                    </h4>
                    <div
                      className="space-y-2 text-xs sm:text-sm text-slate-700 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:py-1"
                      dangerouslySetInnerHTML={{ __html: pkg.features.en }}
                    />
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100">
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-accent/20"
                  >
                    <span>View Full Package & Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
