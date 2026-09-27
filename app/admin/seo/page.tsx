"use client";

import React, { useState, useEffect } from "react";
import { SeoSettings } from "@/lib/types";
import {
  Search,
  Save,
  Check,
  AlertCircle,
  Code,
  ShieldCheck,
  Globe,
  Radio,
  FileText,
  Copy,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"meta" | "verification" | "tracking" | "schema" | "scripts" | "robots">("meta");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Failed to load SEO settings:", err);
      setMessage({ type: "error", text: "Failed to load SEO settings." });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      setMessage(null);
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "SEO & Telemetry settings saved successfully!" });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to save SEO settings." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-3">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold">Loading SEO & Tracking Configurations...</p>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search Engine & Tracking Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            SEO & Telemetry Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage meta titles, search verification tags, GTM, GA4, Meta CAPI, Pixels, and Schema.org scripts.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accentHover disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-accent/20"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? "Saving Changes..." : "Save All SEO Settings"}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
              : "bg-rose-950/40 border-rose-800 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 text-xs font-bold">
        {[
          { id: "meta", label: "Global Meta & Tags", icon: Globe },
          { id: "verification", label: "Search Console Verification", icon: ShieldCheck },
          { id: "tracking", label: "Analytics & Pixels (GTM/GA4/Meta)", icon: Radio },
          { id: "schema", label: "Schema.org (JSON-LD)", icon: Layers },
          { id: "scripts", label: "Custom Code Injection", icon: Code },
          { id: "robots", label: "Robots & Indexing", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-brand-accent text-white shadow-md shadow-brand-accent/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* TAB 1: Global Meta & OpenGraph */}
        {activeTab === "meta" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-accent" />
                <span>Global Meta Titles & Descriptions</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Default fallback metadata served across all website pages and search engines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meta Title EN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta Title (English) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={settings.metaTitle.en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      metaTitle: { ...settings.metaTitle, en: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="Omnix Network | Web, SEO & 360° Digital Agency"
                  required
                />
                <span className="text-[10px] text-slate-500 block">
                  Character count: {settings.metaTitle.en.length} (Recommended: 50-60 chars)
                </span>
              </div>

              {/* Meta Title BN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta Title (Bengali)
                </label>
                <input
                  type="text"
                  value={settings.metaTitle.bn}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      metaTitle: { ...settings.metaTitle, bn: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="অমনিক্স নেটওয়ার্ক | ডিজিটাল এজেন্সি"
                />
              </div>

              {/* Meta Description EN */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta Description (English) <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={settings.metaDescription.en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      metaDescription: { ...settings.metaDescription, en: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="Provide a compelling snippet for search results..."
                  required
                />
                <span className="text-[10px] text-slate-500 block">
                  Character count: {settings.metaDescription.en.length} (Recommended: 150-160 chars)
                </span>
              </div>

              {/* Meta Description BN */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta Description (Bengali)
                </label>
                <textarea
                  rows={3}
                  value={settings.metaDescription.bn}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      metaDescription: { ...settings.metaDescription, bn: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="বাংলা ডেসক্রিপশন সংক্ষেপে উল্লেখ করুন..."
                />
              </div>

              {/* Keywords EN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Target Keywords (English - Comma Separated)
                </label>
                <input
                  type="text"
                  value={settings.keywords.en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      keywords: { ...settings.keywords, en: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="digital marketing, seo agency, meta ads, web development"
                />
              </div>

              {/* Keywords BN */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Target Keywords (Bengali - Comma Separated)
                </label>
                <input
                  type="text"
                  value={settings.keywords.bn}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      keywords: { ...settings.keywords, bn: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="ডিজিটাল মার্কেটিং, এসইও সার্ভিস, ফেসবুক এডস"
                />
              </div>

              {/* OpenGraph Image URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  OpenGraph Share Image URL (og:image)
                </label>
                <input
                  type="text"
                  value={settings.ogImage || ""}
                  onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="https://omnixnetwork.com/og-banner.jpg"
                />
              </div>

              {/* Twitter Handle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Twitter / X Creator Handle (@username)
                </label>
                <input
                  type="text"
                  value={settings.twitterHandle || ""}
                  onChange={(e) => setSettings({ ...settings, twitterHandle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-brand-accent"
                  placeholder="@omnixnetwork"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Search Console Site Verification */}
        {activeTab === "verification" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Search Engine Site Verification Codes</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your site verification tokens to instantly claim ownership in Google, Bing, Yandex & Pinterest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Search Console Verification */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Google Search Console Verification Code / Meta Tag
                </label>
                <input
                  type="text"
                  value={settings.googleSiteVerification || ""}
                  onChange={(e) => setSettings({ ...settings, googleSiteVerification: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="google-site-verification=xxxxxxxxx"
                />
                <span className="text-[10px] text-slate-500 block">
                  Extract value from: &lt;meta name="google-site-verification" content="VALUE" /&gt;
                </span>
              </div>

              {/* Bing Webmaster Verification */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Bing Webmaster Verification Code
                </label>
                <input
                  type="text"
                  value={settings.bingSiteVerification || ""}
                  onChange={(e) => setSettings({ ...settings, bingSiteVerification: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="msvalidate.01=xxxxxxxx"
                />
              </div>

              {/* Yandex Verification */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Yandex Webmaster Verification Code
                </label>
                <input
                  type="text"
                  value={settings.yandexVerification || ""}
                  onChange={(e) => setSettings({ ...settings, yandexVerification: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="yandex-verification=xxxxxxxx"
                />
              </div>

              {/* Pinterest Verification */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Pinterest Domain Verification Code
                </label>
                <input
                  type="text"
                  value={settings.pinterestVerification || ""}
                  onChange={(e) => setSettings({ ...settings, pinterestVerification: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="p:domain_verify=xxxxxxxx"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Analytics & Pixels Telemetry */}
        {activeTab === "tracking" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-indigo-400" />
                <span>Analytics Telemetry & Marketing Pixels</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure GTM, GA4, Meta (Facebook) Pixel, CAPI, and TikTok Pixel IDs for 100% conversion tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GTM Container ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Google Tag Manager (GTM) Container ID
                </label>
                <input
                  type="text"
                  value={settings.gtmContainerId || ""}
                  onChange={(e) => setSettings({ ...settings, gtmContainerId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="GTM-XXXXXXX"
                />
                <span className="text-[10px] text-slate-500 block">
                  Automatically injects GTM script in &lt;head&gt; and &lt;noscript&gt; fallback in &lt;body&gt;.
                </span>
              </div>

              {/* GA4 Measurement ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={settings.ga4MeasurementId || ""}
                  onChange={(e) => setSettings({ ...settings, ga4MeasurementId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              {/* Meta (Facebook) Pixel ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta (Facebook) Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.facebookPixelId || ""}
                  onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="123456789012345"
                />
              </div>

              {/* Meta CAPI Access Token */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta Conversions API (CAPI) Access Token
                </label>
                <input
                  type="password"
                  value={settings.facebookCapiToken || ""}
                  onChange={(e) => setSettings({ ...settings, facebookCapiToken: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="EAAXXXXXX..."
                />
              </div>

              {/* Meta CAPI Test Code */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Meta CAPI Test Event Code (Optional)
                </label>
                <input
                  type="text"
                  value={settings.facebookCapiTestCode || ""}
                  onChange={(e) => setSettings({ ...settings, facebookCapiTestCode: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="TEST12345"
                />
              </div>

              {/* TikTok Pixel ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  TikTok Ads Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.tiktokPixelId || ""}
                  onChange={(e) => setSettings({ ...settings, tiktokPixelId: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="CXXXXXXXXXXXXXXX"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Schema.org Structured Data */}
        {activeTab === "schema" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Schema.org JSON-LD Structured Data</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure rich snippet organization schema for Google Knowledge Graph & Local Pack.
              </p>
            </div>

            {settings.organizationSchema && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Organization Name</label>
                  <input
                    type="text"
                    value={settings.organizationSchema.name}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizationSchema: { ...settings.organizationSchema!, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Organization URL</label>
                  <input
                    type="text"
                    value={settings.organizationSchema.url}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizationSchema: { ...settings.organizationSchema!, url: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Logo Image URL</label>
                  <input
                    type="text"
                    value={settings.organizationSchema.logo}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizationSchema: { ...settings.organizationSchema!, logo: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">Telephone</label>
                  <input
                    type="text"
                    value={settings.organizationSchema.telephone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        organizationSchema: { ...settings.organizationSchema!, telephone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* Custom JSON-LD Raw Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block flex items-center justify-between">
                <span>Custom JSON-LD Schema (Raw JSON Injection)</span>
                <span className="text-[10px] text-amber-400">Validated JSON-LD</span>
              </label>
              <textarea
                rows={8}
                value={settings.customJsonLd || ""}
                onChange={(e) => setSettings({ ...settings, customJsonLd: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-brand-accent"
                placeholder='{\n  "@context": "https://schema.org",\n  "@type": "ProfessionalService",\n  "name": "Omnix Network"\n}'
              />
            </div>
          </div>
        )}

        {/* TAB 5: Custom Code Injection */}
        {activeTab === "scripts" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-brand-cyan" />
                <span>Header & Body Script Injection</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Inject custom HTML tags, tracking pixels, or chat widgets directly into &lt;head&gt; or &lt;body&gt;.
              </p>
            </div>

            <div className="space-y-6">
              {/* Custom Head Scripts */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Custom Head Scripts (Injected right before &lt;/head&gt;)
                </label>
                <textarea
                  rows={6}
                  value={settings.customHeadScripts || ""}
                  onChange={(e) => setSettings({ ...settings, customHeadScripts: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="<!-- Custom Head Scripts e.g. Hotjar, Clarity, Chat Widget -->"
                />
              </div>

              {/* Custom Body Scripts */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Custom Body Scripts (Injected right after &lt;body&gt;)
                </label>
                <textarea
                  rows={6}
                  value={settings.customBodyScripts || ""}
                  onChange={(e) => setSettings({ ...settings, customBodyScripts: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-accent"
                  placeholder="<!-- Custom Body Scripts e.g. Noscript tags or Chat Embeds -->"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Robots & Indexing */}
        {activeTab === "robots" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-400" />
                <span>Search Engine Crawling & Robots.txt</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage search engine indexing directives and robots.txt rules.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Allow Search Engine Indexing</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  When enabled, search engine bots are permitted to index and rank your pages.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableSearchIndexing}
                  onChange={(e) => setSettings({ ...settings, enableSearchIndexing: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent" />
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Robots.txt Content Rules
              </label>
              <textarea
                rows={6}
                value={settings.robotsTxtContent || ""}
                onChange={(e) => setSettings({ ...settings, robotsTxtContent: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-accent"
                placeholder="User-agent: *&#10;Allow: /&#10;Sitemap: https://omnixnetwork.com/sitemap.xml"
              />
            </div>
          </div>
        )}

        {/* Bottom Sticky Action Bar */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={fetchSeoSettings}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl text-xs border border-slate-800"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-accent hover:bg-brand-accentHover disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-accent/20"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Saving Changes..." : "Save All SEO Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
