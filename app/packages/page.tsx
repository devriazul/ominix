import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPackages } from "@/lib/db";
import { Check, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Service Packages | Omnix Network",
  description: "Explore our transparent, scalable Social Media and SEO marketing packages.",
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
              Investment & Tiers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Marketing Packages
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Transparent, scalable, and results-focused retainers engineered to outperform standard ad agencies.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="rs-card rounded-3xl p-8 border-slate-200 bg-white flex flex-col justify-between shadow-lg hover:border-brand-accent/40 transition-all"
              >
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full">
                    {pkg.type}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    {pkg.title.en}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pkg.desc.en}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">
                      Included Deliverables
                    </h4>
                    <div
                      className="space-y-2 text-xs text-slate-700 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:py-1"
                      dangerouslySetInnerHTML={{ __html: pkg.features.en }}
                    />
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100">
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="w-full py-3.5 bg-slate-900 hover:bg-brand-accent text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Package Details</span>
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
