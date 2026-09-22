"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { ServiceItem } from "@/lib/types";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Lock,
  FileText,
  Shield,
} from "lucide-react";

export default function Footer() {
  const { lang, t, siteSettings } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data: ServiceItem[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error("Error loading dynamic services in footer:", err);
      }
    };
    loadServices();
  }, []);

  const offices = siteSettings?.offices || [
    {
      id: "dhaka",
      name: { en: "Dhaka Office", bn: "ঢাকা অফিস" },
      address: { en: "Moghbazar, Ramna, Dhaka, Bangladesh, 1217", bn: "মগবাজার, রমনা, ঢাকা, বাংলাদেশ, ১২১৭" },
      phone: "+880 1841 451241",
      email: "dhaka@omnixnetwork.com",
    },
    {
      id: "sydney",
      name: { en: "Sydney Office", bn: "সিডনি অফিস" },
      address: { en: "23 Damascus St, Bardia NSW 2565, Australia", bn: "২৩ দামাস্কাস স্ট্রিট, বার্ডিয়া এনএসডব্লিউ ২৫৬৫, অস্ট্রেলিয়া" },
      phone: "+61 469 567 808",
      email: "sydney@omnixnetwork.com",
    },
    {
      id: "usa",
      name: { en: "USA Office", bn: "ইউএসএ অফিস" },
      address: { en: "1007 N Orange St 4th Fl, Wilmington, DE 19801, USA", bn: "১০০৭ এন অরেঞ্জ স্ট্রিট ৪র্থ ফ্লোর, উইলমিংটন, ডিই ১৯৮০১, ইউএসএ" },
      phone: "+1 302 555 0199",
      email: "usa@omnixnetwork.com",
    },
  ];

  const socialItems = [
    { key: "facebook", label: "Facebook", icon: Facebook, href: siteSettings?.socialLinks?.facebook },
    { key: "instagram", label: "Instagram", icon: Instagram, href: siteSettings?.socialLinks?.instagram },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, href: siteSettings?.socialLinks?.linkedin },
    { key: "twitter", label: "Twitter / X", icon: Twitter, href: siteSettings?.socialLinks?.twitter },
    { key: "youtube", label: "YouTube", icon: Youtube, href: siteSettings?.socialLinks?.youtube },
  ].filter((item) => item.href && item.href.trim() !== "");

  const defaultServiceItems = [
    { id: "s1", title: "360° Digital Marketing" },
    { id: "s2", title: "Professional SEO Services" },
    { id: "s3", title: "Social Media Marketing" },
    { id: "s4", title: "Content Development" },
    { id: "s5", title: "Website Development" },
    { id: "s6", title: "Mobile App Development" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-8 text-xs text-slate-400 relative overflow-hidden">
      {/* Subtle Background Lighting Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-brand-accent/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Socials (lg: 4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <div className="relative h-10 w-36">
                <Image
                  src="/logo-white.png"
                  alt="Omnix Network"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              {t(
                "footer-desc",
                "Omnix Network is a premium results-first digital marketing agency. We design customer acquisition funnels, manage social ads, and build lightning-fast web code platforms."
              )}
            </p>

            {/* System Status Pill */}
            <div className="pt-1 flex items-center space-x-2.5 text-emerald-400 text-[11px] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("footer-status", "Engineered with high performance systems")}</span>
            </div>

            {/* Social Icons Bar */}
            {socialItems.length > 0 && (
              <div className="pt-3 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("footer-connect-title", "Connect With Us")}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {socialItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        title={item.label}
                        className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-brand-accent text-slate-300 hover:text-white border border-slate-800 hover:border-brand-accent/50 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xs group"
                      >
                        <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Agency Offerings (lg: 3 cols) - DYNAMIC FROM ADMIN */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>{t("footer-services-title", "Agency Offerings")}</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              {services.length > 0
                ? services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.id}`}
                        className="hover:text-brand-cyan transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0"></span>
                        <span className="truncate">{service.title[lang] || service.title.en}</span>
                      </Link>
                    </li>
                  ))
                : defaultServiceItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/services/${item.id}`}
                        className="hover:text-brand-cyan transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0"></span>
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policies (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Legal & Policies</span>
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>{t("nav-privacy", "Privacy Policy")}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>{t("nav-terms", "Terms & Conditions")}</span>
                </Link>
              </li>
              <li>
                <Link href="/gdpr-policy" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>{t("nav-gdpr", "GDPR Policy")}</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                  <span>{t("nav-faq", "FAQs")}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                  <span>{t("nav-contact", "Contact Us")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Office Locations (lg: 3 cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3.5">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("footer-contact-title", "Global Office Locations")}</span>
            </h4>
            <div className="space-y-2.5">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-colors space-y-1"
                >
                  <div className="text-white font-bold text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-brand-cyan shrink-0" />
                      <span>{office.name[lang] || office.name.en}</span>
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed pl-4">
                    {office.address[lang] || office.address.en}
                  </div>
                  <div className="pt-0.5 pl-4 flex items-center gap-1 text-[11px]">
                    <Phone className="w-3 h-3 text-brand-accent shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p className="text-center md:text-left">
            2019 - 2026 &copy; Omnix Network. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span className="text-slate-800">•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span className="text-slate-800">•</span>
            <Link href="/gdpr-policy" className="hover:text-slate-300 transition-colors">
              GDPR
            </Link>
            <span className="text-slate-800">•</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-brand-cyan transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
