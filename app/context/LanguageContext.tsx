"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";

type Language = "en" | "bn";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string, fallback?: string) => string;
  isEnquiryModalOpen: boolean;
  openEnquiryModal: () => void;
  closeEnquiryModal: () => void;
  isCalendlyModalOpen: boolean;
  openCalendlyModal: () => void;
  closeCalendlyModal: () => void;
  siteSettings: SiteSettings | null;
  updateSiteSettings: (newSettings: SiteSettings) => void;
  refreshSettings: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialTranslations,
  initialSettings,
}: {
  children: React.ReactNode;
  initialTranslations?: Record<string, Record<string, string>>;
  initialSettings?: SiteSettings;
}) {
  const [lang, setLangState] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(
    initialTranslations || { en: {}, bn: {} }
  );
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(initialSettings || null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);

  // Sync initialSettings if changed by server
  useEffect(() => {
    if (initialSettings) {
      setSiteSettings(initialSettings);
    }
  }, [initialSettings]);

  // Client-side fresh fetch to guarantee latest settings
  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/site-settings", { cache: "no-store" });
      if (res.ok) {
        const data: SiteSettings = await res.json();
        setSiteSettings(data);
      }
    } catch (err) {
      console.error("Error refreshing site settings:", err);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("omnix_lang") as Language;
    if (saved === "en" || saved === "bn") {
      setLangState(saved);
    }
    // Fetch latest settings on mount
    refreshSettings();
  }, []);

  const updateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("omnix_lang", newLang);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations["en"] && translations["en"][key]) {
      return translations["en"][key];
    }
    return fallback || key;
  };

  const openEnquiryModal = () => setIsEnquiryModalOpen(true);
  const closeEnquiryModal = () => setIsEnquiryModalOpen(false);
  const openCalendlyModal = () => setIsCalendlyModalOpen(true);
  const closeCalendlyModal = () => setIsCalendlyModalOpen(false);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        translations,
        t,
        isEnquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
        isCalendlyModalOpen,
        openCalendlyModal,
        closeCalendlyModal,
        siteSettings,
        updateSiteSettings,
        refreshSettings,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
