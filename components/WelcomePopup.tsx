"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { X, Calendar, MessageSquare } from "lucide-react";

export default function WelcomePopup() {
  const pathname = usePathname();
  const { t, openCalendlyModal, siteSettings } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 1. Hide completely when inside admin panel routes
    if (pathname?.startsWith("/admin")) return;

    // 2. Hide if logged in as admin (check cookie)
    if (typeof document !== "undefined" && document.cookie.includes("omnix_admin_session=")) {
      return;
    }

    // 3. Check if already dismissed in this session
    const dismissed = sessionStorage.getItem("omnix_welcome_dismissed");
    if (dismissed === "true") return;

    // Show popup after 1 second delay
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, [pathname]);

  // Auto-hide popup 5 seconds after becoming visible
  useEffect(() => {
    if (!visible) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("omnix_welcome_dismissed", "true");
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("omnix_welcome_dismissed", "true");
  };

  // Do not render on admin panel routes or when hidden
  if (pathname?.startsWith("/admin") || !visible) return null;

  return (
    <aside
      aria-label="Welcome notice"
      className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-xs w-[calc(100%-2rem)] sm:w-80 animate-in slide-in-from-bottom-6 fade-in duration-300"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-xl shadow-slate-900/10 relative">
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-brand-accent via-brand-cyan to-brand-accent rounded-t-full"></div>

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2 pt-1">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center p-1 shadow-sm shrink-0">
              <Image
                src="/logo-white.png"
                alt="Omnix"
                width={28}
                height={14}
                className="object-contain"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse"></span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {t("welcome-title", "Welcome to Omnix Network! 👋")}
              </h4>
              <span className="text-[10px] text-emerald-600 font-semibold block leading-tight">
                ● Online
              </span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Simplified Message Content */}
        <p className="text-[11px] text-slate-600 leading-normal mb-3">
          {t(
            "welcome-desc",
            "Let's discuss your web platform, SEO, or digital growth project!"
          )}
        </p>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              handleDismiss();
              openCalendlyModal();
            }}
            className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3 h-3" />
            <span>Schedule Call</span>
          </button>

          <a
            href={`https://wa.me/${siteSettings?.whatsappPhone || "8801841451241"}?text=${encodeURIComponent(
              "Hi Omnix Network, I would like to learn more about your services!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="w-full py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <MessageSquare className="w-3 h-3 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
