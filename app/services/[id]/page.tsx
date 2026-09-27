import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceById, getSiteSettings, getServices } from "@/lib/db";
import { generateCustomMetadata, generateServiceSchema } from "@/lib/seo";
import { ArrowLeft, CheckCircle2, MessageCircle, Wrench, Calendar, Layers, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return {};

  return generateCustomMetadata({
    title: service.title.en,
    description: service.desc.en,
    keywords: `${service.title.en}, ${service.techStack?.join(", ") || ""}`,
    path: `/services/${service.id}`,
    image: service.image,
  });
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
  const jsonLd = generateServiceSchema(service);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Auto JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner - Light Slate */}
        <div className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Services Overview</span>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Enterprise Agency Solution</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                  {service.title.en}
                </h1>
                <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
                  {service.desc.en}
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-emerald-600/20"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Instant Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Featured Service Image */}
              <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title.en}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Comprehensive Service Overview */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 shadow-sm">
                <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-brand-accent" />
                  <span>Strategic Executive Overview</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {service.longDesc?.en || service.desc.en}
                </p>
              </div>

              {/* Tech Stack / Tools Pill Container */}
              {service.techStack && service.techStack.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-brand-accent" />
                    <span>Technologies & Platform Ecosystem</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Deliverables & Advantages */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Core Growth Deliverables & Outcomes
                </h3>
                <div
                  className="prose prose-sm text-slate-700 max-w-none space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm sm:[&_li]:text-base [&_li]:py-2 [&_li]:border-b [&_li]:border-slate-100"
                  dangerouslySetInnerHTML={{ __html: service.benefits.en }}
                />
              </div>

              {/* 4-Step Execution Workflow Roadmap */}
              {service.process && service.process.length > 0 && (
                <div className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-slate-900">
                      Our 4-Step Execution Framework
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      A disciplined roadmap designed to deliver predictable, measurable results.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.process.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-accent/40 shadow-sm transition-all space-y-3 relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black font-display text-slate-200 group-hover:text-brand-accent/60 transition-colors">
                            {p.step}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 font-display">
                          {p.title.en}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {p.desc.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl p-6 border border-slate-200 bg-slate-50/80 sticky top-28 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Request a Customized Proposal
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Speak directly with our technical strategists. We audit your infrastructure and craft an actionable execution blueprint.
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors border border-slate-300 flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-4 h-4 text-brand-accent" />
                  <span>Schedule Consultation Call</span>
                </Link>

                <div className="pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free preliminary campaign audit</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Dedicated technical account lead</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Data protection & NDA guaranteed</span>
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
