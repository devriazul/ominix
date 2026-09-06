"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const { siteSettings } = useLanguage();
  const phone = siteSettings?.whatsappPhone || "8801841451241";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Hello Omnix Network, I would like to consult regarding your digital marketing and web services.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-slate-700">
        Chat on WhatsApp
      </span>
    </a>
  );
}
