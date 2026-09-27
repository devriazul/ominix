"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  TrendingUp,
  Activity,
  Cpu,
  Globe,
  Zap,
  Code2,
  Database,
  Search,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Share2,
  BarChart3,
  Server,
  Terminal,
} from "lucide-react";

interface HeroAnimatedGraphicProps {
  activeSlideIndex?: number;
}

export default function HeroAnimatedGraphic({
  activeSlideIndex = 0,
}: HeroAnimatedGraphicProps) {
  const { openCalendlyModal } = useLanguage();

  const graphicsData = [
    // Slide 0: Meta Ads & Conversions API
    {
      topBadgeIcon: TrendingUp,
      topBadgeTitle: "Meta Campaign ROAS",
      topBadgeValue: "3.8x Avg ROAS",
      bottomBadgeIcon: Zap,
      bottomBadgeTitle: "Meta CAPI Tracking",
      bottomBadgeValue: "100% Match Quality",
      topRightPill: "Meta Ads & CAPI",
      engineName: "Omnix Meta Funnel",
      engineSub: "UGC Video & Audience Profiling",
      gauges: [
        {
          label: "Meta Ad ROAS Yield",
          val: "94%",
          color: "from-brand-accent to-blue-600",
          textColor: "text-brand-accent",
          icon: Share2,
        },
        {
          label: "Server CAPI Event Match",
          val: "98%",
          color: "from-cyan-500 to-teal-400",
          textColor: "text-cyan-600",
          icon: Database,
        },
        {
          label: "Purchase Retargeting Funnel",
          val: "88%",
          color: "from-indigo-500 to-purple-600",
          textColor: "text-indigo-600",
          icon: Activity,
        },
      ],
      techPills: ["Meta Ads", "CAPI Server", "UGC Video", "GTM Cloud"],
    },
    // Slide 1: Google Ads (Search, PMax & Shopping)
    {
      topBadgeIcon: Search,
      topBadgeTitle: "Google PPC CPA",
      topBadgeValue: "-42% Lower CPA",
      bottomBadgeIcon: CheckCircle,
      bottomBadgeTitle: "Google Merchant Feed",
      bottomBadgeValue: "Approved & Active",
      topRightPill: "PMax & Search Ads",
      engineName: "Omnix Google Engine",
      engineSub: "Search, PMax & Merchant Feeds",
      gauges: [
        {
          label: "Search Impression Share",
          val: "95%",
          color: "from-blue-600 to-indigo-600",
          textColor: "text-blue-600",
          icon: Search,
        },
        {
          label: "PMax Conversion Value",
          val: "92%",
          color: "from-emerald-500 to-teal-400",
          textColor: "text-emerald-600",
          icon: TrendingUp,
        },
        {
          label: "Keyword Quality Score",
          val: "9.4 / 10",
          color: "from-brand-cyan to-blue-500",
          textColor: "text-brand-cyan",
          icon: BarChart3,
        },
      ],
      techPills: ["Google Search", "PMax Engine", "Merchant Feed", "GA4 Sync"],
    },
    // Slide 2: Technical SEO & Speed Dominance
    {
      topBadgeIcon: Globe,
      topBadgeTitle: "Organic Search Growth",
      topBadgeValue: "+280% Google Clicks",
      bottomBadgeIcon: Zap,
      bottomBadgeTitle: "Core Web Vitals",
      bottomBadgeValue: "99/100 Mobile Speed",
      topRightPill: "Technical SEO Audit",
      engineName: "Omnix SEO Engine",
      engineSub: "Sub-1.5s Core Web Vitals",
      gauges: [
        {
          label: "Technical SEO Health Score",
          val: "99%",
          color: "from-emerald-500 to-cyan-500",
          textColor: "text-emerald-600",
          icon: Globe,
        },
        {
          label: "Organic Keyword Rankings (Top 3)",
          val: "89%",
          color: "from-blue-500 to-indigo-500",
          textColor: "text-blue-600",
          icon: TrendingUp,
        },
        {
          label: "Sub-1.5s Load Time Performance",
          val: "98%",
          color: "from-cyan-400 to-teal-500",
          textColor: "text-cyan-600",
          icon: Zap,
        },
      ],
      techPills: ["Ahrefs / SEMrush", "Search Console", "JSON-LD Schema", "Speed Index"],
    },
    // Slide 3: Custom Web & Mobile App Engineering
    {
      topBadgeIcon: Code2,
      topBadgeTitle: "Fullstack Architecture",
      topBadgeValue: "Next.js 15 & React",
      bottomBadgeIcon: Zap,
      bottomBadgeTitle: "Page Load Speed",
      bottomBadgeValue: "0.6s Ultra Fast",
      topRightPill: "Next.js & Apps",
      engineName: "Omnix Web Engine",
      engineSub: "Standalone Build & Auto SEO",
      gauges: [
        {
          label: "Next.js SSG / ISR Rendering Speed",
          val: "100%",
          color: "from-slate-800 to-slate-900",
          textColor: "text-slate-900",
          icon: Code2,
        },
        {
          label: "Mobile Responsive UI Integrity",
          val: "96%",
          color: "from-blue-600 to-cyan-500",
          textColor: "text-blue-600",
          icon: Cpu,
        },
        {
          label: "Database API Latency",
          val: "24ms",
          color: "from-cyan-500 to-emerald-400",
          textColor: "text-cyan-600",
          icon: Database,
        },
      ],
      techPills: ["Next.js 15", "React Native", "Node.js 20", "Tailwind CSS"],
    },
    // Slide 4: Server-Side Data Analytics
    {
      topBadgeIcon: Server,
      topBadgeTitle: "Tracking Integrity",
      topBadgeValue: "100% Data Capture",
      bottomBadgeIcon: ShieldCheck,
      bottomBadgeTitle: "iOS 14+ Bypass",
      bottomBadgeValue: "Zero Data Loss",
      topRightPill: "Server-Side CAPI",
      engineName: "Omnix Data Engine",
      engineSub: "First-Party Cloud Container",
      gauges: [
        {
          label: "Server-Side Event Match Quality",
          val: "98%",
          color: "from-purple-600 to-indigo-600",
          textColor: "text-purple-600",
          icon: Server,
        },
        {
          label: "GA4 E-commerce Telemetry",
          val: "99%",
          color: "from-blue-500 to-brand-cyan",
          textColor: "text-blue-600",
          icon: BarChart3,
        },
        {
          label: "First-Party Cookie Lifetime",
          val: "365 Days",
          color: "from-teal-400 to-emerald-500",
          textColor: "text-teal-600",
          icon: Terminal,
        },
      ],
      techPills: ["Stape Cloud GTM", "Meta CAPI", "GA4 Ecommerce", "TikTok API"],
    },
    // Slide 5: Cyber Security VAPT & Brand Identity
    {
      topBadgeIcon: ShieldCheck,
      topBadgeTitle: "VAPT Security Shield",
      topBadgeValue: "Zero Vulnerabilities",
      bottomBadgeIcon: Sparkles,
      bottomBadgeTitle: "Brand Identity Impact",
      bottomBadgeValue: "3.2x Higher CTR",
      topRightPill: "VAPT & Creative Design",
      engineName: "Omnix Security & Design",
      engineSub: "Penetration Testing & Brand Identity",
      gauges: [
        {
          label: "OWASP Vulnerability Audit Score",
          val: "100%",
          color: "from-emerald-600 to-teal-500",
          textColor: "text-emerald-700",
          icon: ShieldCheck,
        },
        {
          label: "Visual Brand Engagement Rate",
          val: "96%",
          color: "from-amber-500 to-orange-500",
          textColor: "text-amber-600",
          icon: Sparkles,
        },
        {
          label: "UGC Video Creative Conversion",
          val: "91%",
          color: "from-rose-500 to-purple-600",
          textColor: "text-rose-600",
          icon: Layers,
        },
      ],
      techPills: ["Burp Suite VAPT", "OWASP Security", "Figma UI/UX", "CapCut UGC"],
    },
  ];

  const current = graphicsData[activeSlideIndex % graphicsData.length];
  const TopIcon = current.topBadgeIcon;
  const BottomIcon = current.bottomBadgeIcon;

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none transition-all duration-500">
      
      {/* Outer Glow Radiance */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-brand-accent/20 via-brand-cyan/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-75 animate-pulse-soft"></div>

      {/* Floating Animated Badge Top-Left */}
      <div className="absolute -top-5 -left-4 sm:-left-6 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-slate-900/10 flex items-center space-x-3 transition-transform hover:-translate-y-1 duration-300 animate-float-slow">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-brand-accent text-white flex items-center justify-center shadow-md shadow-brand-accent/30">
          <TopIcon className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            {current.topBadgeTitle}
          </span>
          <span className="text-sm sm:text-base font-black text-slate-900 font-display">
            {current.topBadgeValue}
          </span>
        </div>
      </div>

      {/* Floating Animated Badge Bottom-Right */}
      <div className="absolute -bottom-5 -right-4 sm:-right-6 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-slate-900/10 flex items-center space-x-3 transition-transform hover:-translate-y-1 duration-300 animate-float-fast">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/30">
          <BottomIcon className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            {current.bottomBadgeTitle}
          </span>
          <span className="text-sm sm:text-base font-black text-emerald-600 font-display flex items-center gap-1">
            <span>{current.bottomBadgeValue}</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </span>
        </div>
      </div>

      {/* Floating Tech Pill Top-Right */}
      <div className="absolute -top-3 right-4 z-20 bg-slate-900 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1.5 border border-slate-800 animate-pulse-soft">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>{current.topRightPill}</span>
      </div>

      {/* Main Terminal / Dashboard Canvas */}
      <div className="relative bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* Window Controls & Live System Status */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="uppercase tracking-wider">Live Telemetry Active</span>
          </div>
        </div>

        {/* Tech Architecture Stack Banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{current.engineName}</div>
              <div className="text-[10px] text-slate-500">{current.engineSub}</div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            v3.5 Live
          </span>
        </div>

        {/* Dynamic Metric Gauges */}
        <div className="space-y-3.5 my-4">
          {current.gauges.map((g, idx) => {
            const GaugeIcon = g.icon;
            return (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <GaugeIcon className={`w-3.5 h-3.5 ${g.textColor}`} />
                    <span>{g.label}</span>
                  </span>
                  <span className={`${g.textColor} font-extrabold`}>{g.val}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full bg-gradient-to-r ${g.color} rounded-full transition-all duration-1000 group-hover:brightness-110`}
                    style={{ width: g.val.includes("%") ? g.val : "92%" }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Tech Stack Micro-Tags */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
          {current.techPills.map((pill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-brand-accent" /> {pill}
            </span>
          ))}
        </div>

        {/* Quick Scheduler CTA Inside Visual */}
        <div className="mt-4 pt-3 border-t border-slate-150">
          <button
            onClick={openCalendlyModal}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-accent text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-brand-accent/20"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Book Free 30-Min Strategy Call</span>
          </button>
        </div>

      </div>
    </div>
  );
}
