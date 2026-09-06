"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { X, Send, CheckCircle2 } from "lucide-react";

export default function EnquiryModal() {
  const { isEnquiryModalOpen, closeEnquiryModal, t, siteSettings } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("360° Digital Marketing");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Record lead to backend /api/enquiries
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, details }),
      });

      // 2. Build WhatsApp URL
      const waPhone = siteSettings?.whatsappPhone || "8801841451241";
      const waText = `Hi Omnix Network,\n\nI want to make an enquiry.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Details:* ${details || "None"}`;
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

      setSubmitted(true);
      window.open(waUrl, "_blank");

      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(false);
        setName("");
        setPhone("");
        setDetails("");
        closeEnquiryModal();
      }, 1200);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeEnquiryModal}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeEnquiryModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 font-display">Inquiry Sent!</h3>
            <p className="text-xs text-slate-500">Redirecting you to WhatsApp to connect with our team...</p>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Send className="w-3.5 h-3.5" />
              <span>{t("popup-badge", "Quick Consultation")}</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 leading-tight">
              {t("popup-title", "Start Your Project")}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              {t(
                "popup-desc",
                "Let us know what you need and our campaign planners will respond within 2 hours."
              )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  {t("popup-form-name", "Your Name")} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  placeholder="e.g. Tanvir Ahmed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  {t("popup-form-phone", "Phone Number")} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  placeholder="e.g. 017xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  {t("popup-form-service", "Select Service")}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                >
                  <option value="360° Digital Marketing">360° Digital Marketing</option>
                  <option value="Professional SEO Services">Professional SEO Services</option>
                  <option value="Social Media Marketing (SMM)">Social Media Marketing (SMM)</option>
                  <option value="Content Development">Content Development</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  {t("popup-form-message", "Brief Details")}
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  placeholder="Describe your goals, targets, or timelines..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-brand-darkText hover:bg-brand-accent text-white font-bold rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
              >
                <span>{submitting ? "Processing..." : t("popup-form-submit", "Submit Inquiry via WhatsApp")}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
