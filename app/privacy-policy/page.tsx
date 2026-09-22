import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Omnix Network",
  description: "Learn how Omnix Network collects, protects, and handles your personal and business data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-cyan text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Last updated: September 2026. Your privacy and trust are our highest priorities.
            </p>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-brand-accent" />
                <span>1. Introduction</span>
              </h2>
              <p>
                Omnix Network ("we," "our," or "us") is committed to safeguarding the privacy of our website visitors, clients, and partners. This Privacy Policy outlines how we collect, store, use, and process your personal information when you visit our website, submit inquiries, or utilize our digital growth, SEO, web development, and media buying services.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-brand-accent" />
                <span>2. Information We Collect</span>
              </h2>
              <p>We may collect personal and non-personal data through various touchpoints:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>
                  <strong className="text-slate-800">Direct Information:</strong> Name, business email, phone number, company name, and project specifications provided via our inquiry forms or strategy scheduling tools.
                </li>
                <li>
                  <strong className="text-slate-800">Automated Analytics:</strong> IP address, browser type, operating system, referring URL, time spent on pages, and clickstream data collected via secure web analytics cookies.
                </li>
                <li>
                  <strong className="text-slate-800">Communication Logs:</strong> Records of WhatsApp consultations, email correspondence, and strategy call notes.
                </li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-brand-accent" />
                <span>3. How We Use Your Data</span>
              </h2>
              <p>Your information is exclusively utilized to deliver high-yielding services, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Preparing tailored proposals, technical site audits, and campaign strategies.</li>
                <li>Scheduling consultation calls and providing client support.</li>
                <li>Improving website performance, security, and user experience.</li>
                <li>Complying with legal obligations and anti-fraud regulations.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900">
                4. Data Sharing & Security
              </h2>
              <p>
                We do <strong className="text-slate-900">NOT</strong> sell, rent, or trade your personal data to third parties. We employ enterprise-grade SSL encryption, restricted access controls, and secure server hosting environments to prevent unauthorized data access or disclosure.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-150">
              <h2 className="text-xl font-bold font-display text-slate-900">
                5. Contact Privacy Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to exercise your data access/deletion rights, please contact our Data Protection Officer at:
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1 font-mono">
                <p>Email: privacy@omnixnetwork.com</p>
                <p>Phone: +880 1841 451241</p>
                <p>Dhaka Office: Moghbazar, Ramna, Dhaka, Bangladesh, 1217</p>
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
              <span className="text-slate-400">Omnix Network Legal Framework</span>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
