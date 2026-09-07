"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { X, Calendar, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export default function WelcomePopup() {
  const { t, openCalendlyModal, openEnquiryModal, siteSettings } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("omnix_welcome_dismissed");
    if (dismissed === "true") return;

    // Show popup after 2.5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("omnix_welcome_dismissed", "true");
  };

  if (!visible) return null;

  return (
    <aside aria-label="Welcome notice" className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-96 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-slate-900/10 hover:shadow-brand-accent/5 transition-all relative">
        
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-brand-accent via-brand-cyan to-brand-accent rounded-t-full"></div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-sm">
              <Image
                src="/logo-white.png"
                alt="Omnix"
                width={32}
                height={16}
                className="object-contain"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>{t("welcome-title", "Welcome to Omnix Network! 👋")}</span>
              </h4>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                ● Growth & Tech Consultants Online
              </span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Content */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {t(
            "welcome-desc",
            "Looking to build a high-performance web platform, dominate search rankings, or scale your revenue with modern tech? Let's discuss your project!"
          )}
        </p>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              handleDismiss();
              openCalendlyModal();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-brand-accent/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Call</span>
          </button>

          <a
            href={`https://wa.me/${siteSettings?.whatsappPhone || "8801841451241"}?text=${encodeURIComponent(
              "Hi Omnix Network, I just visited your website and would like to learn more about your services!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Subtle dismissed reminder */}
        <div className="mt-2 text-center">
          <button
            onClick={handleDismiss}
            className="text-[10px] text-slate-400 hover:text-slate-600 hover:underline"
          >
            I'm just browsing for now
          </button>
        </div>
      </div>
    </aside>
  );
}
