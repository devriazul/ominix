import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Briefcase, ArrowRight, CheckCircle2, Zap, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "Careers & Join Our Team | Omnix Network",
  description: "Explore career opportunities, engineering culture, and open positions at Omnix Network.",
};

export default function CareerPage() {
  const jobs = [
    {
      id: "j1",
      title: "Senior Digital Marketing Strategist",
      location: "Dhaka Office / Hybrid",
      type: "Full-Time",
      dept: "Media Buying & SMM",
      desc: "Manage high-budget Meta & Google Ads campaigns for e-commerce and retail clients. Required 3+ years experience.",
    },
    {
      id: "j2",
      title: "SEO Specialist & Technical Lead",
      location: "Remote / Hybrid",
      type: "Full-Time",
      dept: "Search Engineering",
      desc: "Lead keyword research, technical SEO audits, schema markup, and link building strategies for global brand accounts.",
    },
    {
      id: "j3",
      title: "Full-Stack Web Developer (Next.js & React)",
      location: "Dhaka / Sydney Hub",
      type: "Full-Time",
      dept: "Engineering",
      desc: "Architect high-performance web platforms, Shopify apps, and CRM integrations using React, Next.js, and TypeScript.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-900 text-white border-b border-slate-800 py-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/15 blur-3xl pointer-events-none rounded-full" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
            <span className="text-xs font-bold text-brand-cyan tracking-widest uppercase block">
              Join Omnix Network
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display">
              Build The Future of Digital Growth
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We are a team of data-driven marketers, web engineers, and brand strategists scaling global businesses.
            </p>
          </div>
        </div>

        {/* Culture / Perks */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-accent flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Impact Driven</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work directly with active ad budgets, cutting-edge code stacks, and real business revenue metrics.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Continuous Growth</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Paid certifications, weekly engineering workshops, and mentorship from senior digital leads.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Work-Life Balance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Flexible hybrid work environment, festive bonuses, and supportive team culture.
              </p>
            </div>
          </div>
        </section>

        {/* Open Openings List */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block">
              Current Openings
            </span>
            <h2 className="text-3xl font-bold font-display text-slate-900">
              Open Positions
            </h2>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-brand-accent/50 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full">
                      {job.dept}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    {job.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {job.desc}
                  </p>
                </div>

                <a
                  href="mailto:contact@omnixnetwork.com?subject=Career Application for "
                  className="px-6 py-3 bg-slate-900 hover:bg-brand-accent text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-3">
            <h3 className="text-lg font-bold font-display text-slate-900">
              Don&apos;t see your role?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              We are always searching for talented marketers and developers. Send your CV to{" "}
              <a href="mailto:contact@omnixnetwork.com" className="text-brand-accent font-bold underline">
                contact@omnixnetwork.com
              </a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
