import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceById, getSiteSettings, getServices } from "@/lib/db";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  const settings = await getSiteSettings();

  if (!service) {
    notFound();
  }

  const waPhone = settings.whatsappPhone || "8801841451241";
  const waText = `Hi Omnix Network, I want to book a consultation for your "${service.title.en}" service. Please let me know how to proceed.`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        {/* Banner */}
        <div className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {service.title.en}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              {service.desc.en}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title.en}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  Key Deliverables & Growth Advantages
                </h2>
                <div
                  className="prose prose-sm text-slate-600 space-y-2 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:text-sm [&_li]:py-1"
                  dangerouslySetInnerHTML={{ __html: service.benefits.en }}
                />
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4">
              <div className="rs-card rounded-2xl p-6 border-slate-200 sticky top-28 space-y-6 bg-slate-50/50">
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Ready to Scale?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect directly with our campaign planners. We analyze your market and build a proven execution roadmap.
                </p>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consult via WhatsApp</span>
                </a>

                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Free campaign audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Customized KPI targets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Direct strategist support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
