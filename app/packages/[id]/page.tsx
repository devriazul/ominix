import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageById, getSiteSettings, getPackages } from "@/lib/db";
import { ArrowLeft, MessageCircle, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((p) => ({ id: p.id }));
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await getPackageById(id);
  const settings = await getSiteSettings();

  if (!pkg) {
    notFound();
  }

  const waPhone = settings.whatsappPhone || "8801841451241";
  const waText = `Hi Omnix Network, I am interested in ordering your "${pkg.title.en}" packages. Please share pricing and timelines.`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Packages</span>
            </Link>
            <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full mb-3">
              {pkg.type}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {pkg.title.en}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              {pkg.desc.en}
            </p>
          </div>
        </div>

        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rs-card rounded-3xl p-8 sm:p-12 border-slate-200 bg-white shadow-xl space-y-8">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                What's Included in this Retainer
              </h2>
              <div
                className="space-y-3 text-sm text-slate-700 [&_li]:flex [&_li]:items-center [&_li]:gap-2.5 [&_li]:py-1.5 [&_li]:border-b [&_li]:border-slate-50"
                dangerouslySetInnerHTML={{ __html: pkg.features.en }}
              />
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs text-slate-500 block">Custom Retainer Pricing</span>
                <span className="text-2xl font-black font-display text-slate-900">
                  {pkg.price || "Tailored to Budget"}
                </span>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Package via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
