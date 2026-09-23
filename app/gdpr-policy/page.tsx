import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Globe, UserCheck, Key, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "GDPR Compliance & Data Rights | Omnix Network",
  description: "Learn about your EU General Data Protection Regulation (GDPR) data rights and how Omnix Network handles consent and data sovereignty.",
};

export default function GdprPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>EU Data Sovereignty & Rights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
              GDPR Compliance Policy
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Our commitment to European Union General Data Protection Regulation (GDPR) standard compliance.
            </p>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-brand-accent" />
                <span>1. Commitment to GDPR</span>
              </h2>
              <p>
                Omnix Network complies fully with the General Data Protection Regulation (EU) 2016/679. Whether you are an EU citizen or interacting with our services internationally, we respect your rights regarding personal data processing, transparency, and data portability.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-brand-accent" />
                <span>2. Your Individual Rights Under GDPR</span>
              </h2>
              <p>As a data subject, you hold fundamental rights under GDPR:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block font-bold">Right to Access (Art. 15)</strong>
                  <p className="text-slate-600 text-xs">Request copies of all personal data held about you.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block font-bold">Right to Erasure / Right to be Forgotten (Art. 17)</strong>
                  <p className="text-slate-600 text-xs">Request permanent deletion of your stored records.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block font-bold">Right to Rectification (Art. 16)</strong>
                  <p className="text-slate-600 text-xs">Update or correct inaccurate personal data.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-xs block font-bold">Right to Restrict & Object (Art. 18 & 21)</strong>
                  <p className="text-slate-600 text-xs">Object to direct marketing or request processing limits.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <Key className="w-5 h-5 text-brand-accent" />
                <span>3. Subprocessors & Data Transfers</span>
              </h2>
              <p>
                All data transfers outside the European Economic Area (EEA) adhere to standard contractual clauses (SCCs) and robust technical safeguards to ensure equivalent data protection.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900">
                4. Exercise Your Rights
              </h2>
              <p>
                To submit a Subject Access Request (SAR) or request data erasure under GDPR, email our Data Compliance Team at:
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-mono">
                dpo@omnixnetwork.com
              </div>
            </section>

            <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-xs">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-brand-accent hover:underline font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <span className="text-slate-400">Omnix Network GDPR Sovereignty</span>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
