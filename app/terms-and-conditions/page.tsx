import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FileCheck, ShieldAlert, Scale, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Omnix Network",
  description: "Read the Terms & Conditions governing your use of Omnix Network services and web platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold">
              <Scale className="w-4 h-4" />
              <span>Legal Agreement & Terms</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
              Terms & Conditions
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Effective Date: September 2026. Please read these terms carefully before engaging our services.
            </p>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-brand-accent" />
                <span>1. Agreement & Acceptance</span>
              </h2>
              <p>
                By accessing our website (omnixnetwork.com), purchasing packages, or executing service proposals with Omnix Network, you agree to be bound by these Terms and Conditions. If you do not accept all terms, you must refrain from using our platform and services.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                <span>2. Service Scope & Deliverables</span>
              </h2>
              <p>
                Omnix Network provides 360° Digital Marketing, Search Engine Optimization (SEO), Social Media Advertising, Custom Web & Mobile App Development, and Content Engineering. Specific project timelines, milestones, deliverables, and payment schedules are governed by individual client Service Level Agreements (SLAs) or proposals.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-brand-accent" />
                <span>3. Intellectual Property</span>
              </h2>
              <p>
                Unless explicitly agreed upon in writing, all preliminary design concepts, code frameworks, proprietary tools, and strategies developed by Omnix Network remain our intellectual property. Upon full payment of agreed fees, final client-customized code, graphics, and campaign copy are transferred to the client.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-brand-accent" />
                <span>4. Limitation of Liability</span>
              </h2>
              <p>
                While Omnix Network applies industry-leading techniques and optimization strategies, organic search rankings and third-party advertising algorithm behaviors (Google, Meta, TikTok) are subject to external engine updates. Omnix Network is not liable for indirect or consequential damages beyond total contract value paid.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900">
                5. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms are governed by and construed in accordance with applicable commercial laws. Any legal proceedings shall be handled in accordance with local jurisdiction.
              </p>
            </section>

            <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-brand-accent hover:underline font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <span className="text-slate-400">Omnix Network Terms & Conditions</span>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
