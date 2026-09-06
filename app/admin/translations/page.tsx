"use client";

import React, { useState, useEffect } from "react";
import { Save, Check, Languages, Sparkles } from "lucide-react";

export default function AdminTranslationsPage() {
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({
    en: {},
    bn: {},
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "why" | "general">("hero");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content/translations");
    const data = await res.json();
    setTranslations(data);
    setLoading(false);
  };

  const updateKey = (lang: "en" | "bn", key: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/content/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(translations),
    });

    if (res.ok) {
      setMessage("UI translations and copy updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error updating translations.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading translations editor...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white">
            UI Texts & Translations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit landing page hero slides, about writeups, why us benefits, and slogans in both English and Bengali.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-brand-accent/20"
        >
          <Save className="w-4 h-4" />
          <span>Save All Translations</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-bold">
        {[
          { id: "hero", label: "Hero Sliders (4 Slides)" },
          { id: "about", label: "About Us & Story" },
          { id: "why", label: "Why Choose Us (4 Pillars)" },
          { id: "general", label: "Buttons & CTAs" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-colors ${
              activeTab === tab.id
                ? "bg-brand-accent text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO TAB */}
        {activeTab === "hero" && (
          <div className="space-y-8">
            {[1, 2, 3, 4].map((slideNum) => (
              <div
                key={slideNum}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center gap-2 text-brand-accent font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Hero Slide #{slideNum}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Badge Text (English)
                    </label>
                    <input
                      type="text"
                      value={translations.en[`hero-badge-${slideNum}`] || ""}
                      onChange={(e) => updateKey("en", `hero-badge-${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Badge Text (Bengali)
                    </label>
                    <input
                      type="text"
                      value={translations.bn[`hero-badge-${slideNum}`] || ""}
                      onChange={(e) => updateKey("bn", `hero-badge-${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Headline Part 1 (English)
                    </label>
                    <input
                      type="text"
                      value={translations.en[`hero-title-1-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("en", `hero-title-1-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Headline Part 1 (Bengali)
                    </label>
                    <input
                      type="text"
                      value={translations.bn[`hero-title-1-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("bn", `hero-title-1-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Headline Part 2 (Gradient Highlight - EN)
                    </label>
                    <input
                      type="text"
                      value={translations.en[`hero-title-2-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("en", `hero-title-2-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Headline Part 2 (Gradient Highlight - BN)
                    </label>
                    <input
                      type="text"
                      value={translations.bn[`hero-title-2-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("bn", `hero-title-2-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Description (English)
                    </label>
                    <textarea
                      rows={2}
                      value={translations.en[`hero-description-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("en", `hero-description-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Description (Bengali)
                    </label>
                    <textarea
                      rows={2}
                      value={translations.bn[`hero-description-s${slideNum}`] || ""}
                      onChange={(e) => updateKey("bn", `hero-description-s${slideNum}`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white font-display">About Section Copies</h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Paragraph 1 (English)
                  </label>
                  <textarea
                    rows={4}
                    value={translations.en["about-desc-1"] || ""}
                    onChange={(e) => updateKey("en", "about-desc-1", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Paragraph 1 (Bengali)
                  </label>
                  <textarea
                    rows={4}
                    value={translations.bn["about-desc-1"] || ""}
                    onChange={(e) => updateKey("bn", "about-desc-1", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Paragraph 2 (English)
                  </label>
                  <textarea
                    rows={4}
                    value={translations.en["about-desc-2"] || ""}
                    onChange={(e) => updateKey("en", "about-desc-2", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Paragraph 2 (Bengali)
                  </label>
                  <textarea
                    rows={4}
                    value={translations.bn["about-desc-2"] || ""}
                    onChange={(e) => updateKey("bn", "about-desc-2", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Philosophy Card Description (EN)
                  </label>
                  <textarea
                    rows={2}
                    value={translations.en["about-ph-desc"] || ""}
                    onChange={(e) => updateKey("en", "about-ph-desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Philosophy Card Description (BN)
                  </label>
                  <textarea
                    rows={2}
                    value={translations.bn["about-ph-desc"] || ""}
                    onChange={(e) => updateKey("bn", "about-ph-desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WHY CHOOSE US TAB */}
        {activeTab === "why" && (
          <div className="space-y-6">
            {[1, 2, 3, 4].map((cNum) => (
              <div
                key={cNum}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4"
              >
                <h4 className="text-sm font-bold text-white">Why Card #{cNum}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Title (EN)</label>
                    <input
                      type="text"
                      value={translations.en[`why-card${cNum}-title`] || ""}
                      onChange={(e) => updateKey("en", `why-card${cNum}-title`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Title (BN)</label>
                    <input
                      type="text"
                      value={translations.bn[`why-card${cNum}-title`] || ""}
                      onChange={(e) => updateKey("bn", `why-card${cNum}-title`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Description (EN)</label>
                    <textarea
                      rows={2}
                      value={translations.en[`why-card${cNum}-desc`] || ""}
                      onChange={(e) => updateKey("en", `why-card${cNum}-desc`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Description (BN)</label>
                    <textarea
                      rows={2}
                      value={translations.bn[`why-card${cNum}-desc`] || ""}
                      onChange={(e) => updateKey("bn", `why-card${cNum}-desc`, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Enquiry Button Text (English)
                </label>
                <input
                  type="text"
                  value={translations.en["nav-cta"] || ""}
                  onChange={(e) => updateKey("en", "nav-cta", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Enquiry Button Text (Bengali)
                </label>
                <input
                  type="text"
                  value={translations.bn["nav-cta"] || ""}
                  onChange={(e) => updateKey("bn", "nav-cta", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Footer Description (English)
                </label>
                <textarea
                  rows={3}
                  value={translations.en["footer-desc"] || ""}
                  onChange={(e) => updateKey("en", "footer-desc", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">
                  Footer Description (Bengali)
                </label>
                <textarea
                  rows={3}
                  value={translations.bn["footer-desc"] || ""}
                  onChange={(e) => updateKey("bn", "footer-desc", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Translations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
