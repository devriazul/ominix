"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  Database,
  BarChart4,
  Smartphone,
  Server,
  Workflow,
  Sparkles,
} from "lucide-react";

interface ClientLogo {
  id: string;
  name: string;
  category: {
    en: string;
    bn: string;
  };
  accentColor: string;
  gradient: string;
  icon: React.ReactNode;
}

const clientLogos: ClientLogo[] = [
  {
    id: "c1",
    name: "TechFlow Systems",
    category: {
      en: "Cloud Infrastructure",
      bn: "ক্লাউড ইনফ্রাস্ট্রাকচার",
    },
    accentColor: "#2563eb",
    gradient: "from-blue-600 to-indigo-600",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: "c2",
    name: "AlphaPay Global",
    category: {
      en: "FinTech & Payments",
      bn: "ফিনটেক ও পেমেন্টস",
    },
    accentColor: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: "c3",
    name: "Nexus AI Labs",
    category: {
      en: "Enterprise AI & ML",
      bn: "এন্টারপ্রাইজ এআই ও এমএল",
    },
    accentColor: "#7c3aed",
    gradient: "from-violet-600 to-purple-600",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: "c4",
    name: "HyperScale Media",
    category: {
      en: "Performance Ads",
      bn: "পারফরম্যান্স অ্যাডস",
    },
    accentColor: "#0284c7",
    gradient: "from-cyan-600 to-blue-600",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "c5",
    name: "OmniCommerce",
    category: {
      en: "Headless E-Commerce",
      bn: "হেডলেস ই-কমার্স",
    },
    accentColor: "#ea580c",
    gradient: "from-orange-500 to-amber-600",
    icon: <Globe2 className="w-5 h-5" />,
  },
  {
    id: "c6",
    name: "NovaData Analytics",
    category: {
      en: "Data Intelligence",
      bn: "ডেটা ইন্টেলিজেন্স",
    },
    accentColor: "#0d9488",
    gradient: "from-teal-600 to-emerald-600",
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: "c7",
    name: "CyberPulse Security",
    category: {
      en: "Cyber Threat Defense",
      bn: "সাইবার থ্রেট ডিফেন্স",
    },
    accentColor: "#4f46e5",
    gradient: "from-indigo-600 to-blue-700",
    icon: <Server className="w-5 h-5" />,
  },
  {
    id: "c8",
    name: "PulseHealth Tech",
    category: {
      en: "Digital Healthcare",
      bn: "ডিজিটাল হেলথকেয়ার",
    },
    accentColor: "#e11d48",
    gradient: "from-rose-600 to-pink-600",
    icon: <BarChart4 className="w-5 h-5" />,
  },
  {
    id: "c9",
    name: "Apex Mobility",
    category: {
      en: "IoT & Smart Logistics",
      bn: "আইওটি ও স্মার্ট লজিস্টিকস",
    },
    accentColor: "#0891b2",
    gradient: "from-cyan-600 to-teal-600",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "c10",
    name: "Zenith Automations",
    category: {
      en: "Robotic Process Auto",
      bn: "রোবোটিক অটোমেশন",
    },
    accentColor: "#6366f1",
    gradient: "from-indigo-500 to-cyan-500",
    icon: <Workflow className="w-5 h-5" />,
  },
];

export default function ClientLogoMarquee() {
  const { lang, t } = useLanguage();

  // Duplicate list to create seamless infinite loop
  const marqueeItems = [...clientLogos, ...clientLogos];

  return (
    <section className="relative py-12 md:py-16 bg-slate-50/60 border-b border-slate-100/90 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <ScrollReveal animation="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-brand-accent text-xs font-semibold tracking-wider uppercase mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>{t("clients-badge", "Trusted Partners & Global Clients")}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-400">
            {t(
              "clients-heading",
              "POWERING HIGH-GROWTH STARTUPS, ENTERPRISES & DIGITAL LEADERS"
            )}
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent z-10" />

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-slate-50/95 via-slate-50/80 to-transparent z-10" />

        {/* Marquee Row */}
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-2">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="interactive-glow flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-accent/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default shrink-0 group/card"
            >
              {/* Brand Icon emblem with gradient */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${client.gradient} text-white flex items-center justify-center shadow-sm group-hover/card:scale-110 transition-transform duration-300`}
              >
                {client.icon}
              </div>

              {/* Brand Name & Category */}
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight group-hover/card:text-brand-accent transition-colors duration-200">
                  {client.name}
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wide">
                  {lang === "bn" ? client.category.bn : client.category.en}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
