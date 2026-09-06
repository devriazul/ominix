import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Award, Users, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/db";

export const metadata = {
  title: "About Us | Omnix Network",
  description:
    "Learn about Omnix Network, a premier 360° digital marketing agency based in Dhaka and Sydney.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner */}
        <div className="bg-slate-50 border-b border-slate-200 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-2 block">
              Our Identity & Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900">
              About Omnix Network
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We are a team of data-driven digital architects, creative designers, and media buying specialists helping ambitious businesses scale organic search and paid conversions.
            </p>
          </div>
        </div>

        {/* Core Story */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display text-slate-900">
                Pioneering 360° Digital Growth for Modern Businesses
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Omnix Network, a premier digital marketing agency in Dhaka, Bangladesh and Sydney, Australia, offers comprehensive and top-notch 360° digital marketing services, including web design and development, professional search engine optimization (SEO), social media marketing (SMM), content development, Facebook and Google advertising, motion graphics and audiovisuals, lead generation, media buying, and back-office support.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                As one of the most reliable performance agencies in the region, Omnix Network is dedicated to enhancing your online presence to drive quantifiable results. We stand as a full-service digital partner committed to empowering small, medium, and large businesses by crafting customized digital strategies.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rs-card p-6 rounded-2xl border-slate-200 space-y-3">
                <Target className="w-8 h-8 text-brand-accent" />
                <h3 className="text-lg font-bold font-display text-slate-900">Our Mission</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  To turn digital ad spending and web platforms into predictable, trackable profit engines for business founders.
                </p>
              </div>

              <div className="rs-card p-6 rounded-2xl border-slate-200 space-y-3">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <h3 className="text-lg font-bold font-display text-slate-900">100% Transparency</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  No hidden fees or vanity metrics. Every client receives live dashboard access with weekly KPI breakdowns.
                </p>
              </div>

              <div className="rs-card p-6 rounded-2xl border-slate-200 space-y-3">
                <Award className="w-8 h-8 text-cyan-600" />
                <h3 className="text-lg font-bold font-display text-slate-900">Quality Execution</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every ad copy, web code line, and SEO keyword is tailored to real buyer intent, maximizing conversion.
                </p>
              </div>

              <div className="rs-card p-6 rounded-2xl border-slate-200 space-y-3">
                <Users className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-bold font-display text-slate-900">Expert Team</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct communication with senior campaign strategists and certified developers without account middlemen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
