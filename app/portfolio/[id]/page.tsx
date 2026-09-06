import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPortfolioById, getSiteSettings, getPortfolio } from "@/lib/db";
import { ArrowLeft, MessageCircle, BarChart, Calendar, User } from "lucide-react";

export async function generateStaticParams() {
  const items = await getPortfolio();
  return items.map((p) => ({ id: p.id }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPortfolioById(id);
  const settings = await getSiteSettings();

  if (!item) {
    notFound();
  }

  const waPhone = settings.whatsappPhone || "8801841451241";
  const waText = `Hi Omnix Network, I read your case study on "${item.title.en}" and am interested in seeing similar results for my business.`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Works</span>
            </Link>
            <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full mb-3">
              {item.tag}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {item.title.en}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-accent" />
                <span>Client: <strong>{item.client}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>Duration: <strong>{item.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                <BarChart className="w-4 h-4" />
                <span>{item.metrics.en}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={item.image}
              alt={item.title.en}
              fill
              className="object-cover"
            />
          </div>

          <div className="rs-card rounded-2xl p-8 sm:p-12 border-slate-200 bg-white space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Strategy & Execution Overview
            </h2>
            <div
              className="prose max-w-none text-slate-600 text-sm leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: item.details.en }}
            />
          </div>

          {/* Bottom Action CTA */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Want Similar Results for Your Brand?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Our growth strategists build tailored campaigns with transparent performance tracking. Connect with us today.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat About This Case Study</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
