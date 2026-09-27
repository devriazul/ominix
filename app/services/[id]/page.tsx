import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceById, getSiteSettings, getServices } from "@/lib/db";
import { ArrowLeft, CheckCircle2, MessageCircle, Wrench, Calendar, Layers, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner */}
        <div className="border-b border-slate-800 bg-slate-950/60 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-accent transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Services Overview</span>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Enterprise Agency Solution</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                  {service.title.en}
                </h1>
                <p className="mt-3 text-base text-slate-300 max-w-3xl leading-relaxed">
                  {service.desc.en}
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-emerald-500/25"
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
              <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title.en}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              {/* Comprehensive Service Overview */}
              <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-800/80 space-y-4 shadow-sm">
                <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-brand-accent" />
                  <span>Strategic Executive Overview</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {service.longDesc?.en || service.desc.en}
                </p>
              </div>

              {/* Tech Stack / Tools Pill Container */}
              {service.techStack && service.techStack.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-indigo-400" />
                    <span>Technologies & Platform Ecosystem</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Deliverables & Advantages */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-white">
                  Core Growth Deliverables & Outcomes
                </h3>
                <div
                  className="prose prose-invert prose-sm text-slate-300 max-w-none space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm sm:[&_li]:text-base [&_li]:py-2 [&_li]:border-b [&_li]:border-slate-800/60"
                  dangerouslySetInnerHTML={{ __html: service.benefits.en }}
                />
              </div>

              {/* 4-Step Execution Workflow Roadmap */}
              {service.process && service.process.length > 0 && (
                <div className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      Our 4-Step Execution Framework
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      A disciplined roadmap designed to deliver predictable, measurable results.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.process.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-brand-accent/40 transition-colors space-y-3 relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black font-display text-brand-accent/30 group-hover:text-brand-accent/60 transition-colors">
                            {p.step}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-brand-accent" />
                        </div>
                        <h4 className="text-base font-bold text-white font-display">
                          {p.title.en}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
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
              <div className="rounded-2xl p-6 border border-slate-800 sticky top-28 space-y-6 bg-slate-950/80 backdrop-blur-sm shadow-xl">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Request a Customized Proposal
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Speak directly with our technical strategists. We audit your infrastructure and craft an actionable execution blueprint.
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/contact"
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors border border-slate-700 flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-4 h-4 text-brand-accent" />
                  <span>Schedule Consultation Call</span>
                </Link>

                <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Free preliminary campaign audit</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Dedicated technical account lead</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
