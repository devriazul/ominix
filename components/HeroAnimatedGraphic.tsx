"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export default function HeroAnimatedGraphic() {
  const { t, openCalendlyModal, openEnquiryModal, siteSettings } = useLanguage();
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      
      {/* Outer Glow Radiance */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-brand-accent/20 via-brand-cyan/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-75 animate-pulse-soft"></div>

      {/* Floating Animated Badge Top-Left: ROI Metric */}
      <div className="absolute -top-5 -left-4 sm:-left-6 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-slate-900/10 flex items-center space-x-3 transition-transform hover:-translate-y-1 duration-300 animate-float-slow">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-brand-accent text-white flex items-center justify-center shadow-md shadow-brand-accent/30">
          <TrendingUp className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Campaign ROI
          </span>
          <span className="text-sm sm:text-base font-black text-slate-900 font-display">
            +340% Avg Growth
          </span>
        </div>
      </div>

      {/* Floating Animated Badge Bottom-Right: Live Tech Speed */}
      <div className="absolute -bottom-5 -right-4 sm:-right-6 z-30 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-slate-900/10 flex items-center space-x-3 transition-transform hover:-translate-y-1 duration-300 animate-float-fast">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/30">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Speed & Core Web Vitals
          </span>
          <span className="text-sm sm:text-base font-black text-emerald-600 font-display flex items-center gap-1">
            <span>99/100 Score</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </span>
        </div>
      </div>

      {/* Floating Tech Pill Top-Right: React & Next.js */}
      <div className="absolute -top-3 right-4 z-20 bg-slate-900 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1.5 border border-slate-800 animate-pulse-soft">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>Next.js 15 & Cloud</span>
      </div>

      {/* Main Terminal / Dashboard Canvas */}
      <div className="relative bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden">
        
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
            <span className="uppercase tracking-wider">Live System Active</span>
          </div>
        </div>

        {/* Tech Architecture Stack Banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Omnix Tech Engine</div>
              <div className="text-[10px] text-slate-500">Automated Pipeline & SEO Indexer</div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            v3.2 Active
          </span>
        </div>

        {/* Dynamic Metric Gauges */}
        <div className="space-y-3.5 my-4">
          
          {/* Gauge 1: Search & Ranking Power */}
          <div className="group cursor-default">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-brand-accent" />
                <span>Search Engine Visibility</span>
              </span>
              <span className="text-brand-accent font-extrabold">96%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full transition-all duration-1000 group-hover:brightness-110"
                style={{ width: "96%" }}
              ></div>
            </div>
          </div>

          {/* Gauge 2: Social Ads & Customer Acquisition */}
          <div className="group cursor-default">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Customer Acquisition Flow</span>
              </span>
              <span className="text-brand-cyan font-extrabold">88%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-brand-cyan to-teal-400 rounded-full transition-all duration-1000 group-hover:brightness-110"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>

          {/* Gauge 3: Conversion & Lead Funnels */}
          <div className="group cursor-default">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                <span>Checkout & Lead Conversion</span>
              </span>
              <span className="text-indigo-600 font-extrabold">3.8x ROI</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 group-hover:brightness-110"
                style={{ width: "82%" }}
              ></div>
            </div>
          </div>

        </div>

        {/* Live Tech Stack Micro-Tags */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
            <Code2 className="w-3 h-3 text-brand-accent" /> Next.js
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
            <Database className="w-3 h-3 text-brand-cyan" /> Node / Cloud
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> AI Automation
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-500" /> 360° Media
          </span>
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
