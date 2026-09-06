import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/db";
import { ChevronRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Agency Services | Omnix Network",
  description: "Explore Omnix Network's full suite of 360° digital marketing and web solutions.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              What We Deliver
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              Agency Services
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We construct result-oriented campaigns designed to elevate your company's visibility, customer engagement, and sales pipeline.
            </p>
          </div>
        </div>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="rs-card rounded-2xl overflow-hidden border-slate-200 bg-white flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
                      {svc.title.en}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {svc.desc.en}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/services/${svc.id}`}
                      className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Explore Service Details</span>
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
