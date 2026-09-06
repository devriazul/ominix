"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const { lang, t, siteSettings } = useLanguage();

  const offices = siteSettings?.offices || [
    {
      id: "banani",
      name: { en: "Banani Office (Dhaka)", bn: "বনানী অফিস (ঢাকা)" },
      address: { en: "H 105, Rd 13/A, Banani, Dhaka", bn: "এইচ ১০৫, রোড ১৩/এ, বনানী, ঢাকা" },
      phone: "+880 1841 451241",
      email: "dhaka@omnixnetwork.com",
    },
    {
      id: "sydney",
      name: { en: "Sydney Office", bn: "সিডনি অফিস" },
      address: { en: "23 Damascus St, Bardia NSW 2565", bn: "২৩ দামাস্কাস স্ট্রিট, বার্ডিয়া এনএসডব্লিউ ২৫৬৫" },
      phone: "+61 469 567 808",
      email: "sydney@omnixnetwork.com",
    },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="inline-block">
            <div className="relative h-10 w-40">
              <Image
                src="/logo-web.jpg"
                alt="Omnix Network"
                fill
                className="object-contain rounded brightness-110"
              />
            </div>
          </Link>
          <p className="text-slate-400 leading-relaxed text-xs">
            {t(
              "footer-desc",
              "Omnix Network is a premium results-first digital marketing agency. We design customer acquisition funnels, manage social ads, and build lightning-fast web code platforms."
            )}
          </p>
          <div className="pt-2 flex items-center space-x-3 text-emerald-400 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{t("footer-status", "Engineered with high performance systems")}</span>
          </div>
        </div>

        {/* Agency Offerings */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">
            {t("footer-services-title", "Agency Offerings")}
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/services/s1" className="hover:text-brand-cyan transition-colors">
                360° Digital Marketing
              </Link>
            </li>
            <li>
              <Link href="/services/s2" className="hover:text-brand-cyan transition-colors">
                Professional SEO Services
              </Link>
            </li>
            <li>
              <Link href="/services/s3" className="hover:text-brand-cyan transition-colors">
                Social Media Marketing
              </Link>
            </li>
            <li>
              <Link href="/services/s4" className="hover:text-brand-cyan transition-colors">
                Content Development
              </Link>
            </li>
            <li>
              <Link href="/services/s5" className="hover:text-brand-cyan transition-colors">
                Website Development
              </Link>
            </li>
            <li>
              <Link href="/services/s6" className="hover:text-brand-cyan transition-colors">
                Mobile App Development
              </Link>
            </li>
          </ul>
        </div>

        {/* Multiple Offices */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">
            {t("footer-contact-title", "Multiple Offices")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offices.map((office) => (
              <div key={office.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-750 space-y-2">
                <div className="text-white font-bold text-xs">
                  {office.name[lang] || office.name.en}
                </div>
                <div className="flex items-start gap-1.5 text-slate-400 text-[11px] leading-snug">
                  <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{office.address[lang] || office.address.en}</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <Phone className="w-3 h-3 text-brand-accent shrink-0" />
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    className="text-slate-300 hover:text-white transition-colors text-[11px]"
                  >
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Admin Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <p>2019 - 2026 &copy; Omnix Network. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <Link href="/faq" className="hover:text-slate-300 transition-colors">
            FAQs
          </Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">
            Contact
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1 text-slate-400 hover:text-brand-cyan transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
