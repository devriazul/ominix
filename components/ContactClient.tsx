"use client";

import React, { useState } from "react";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/app/context/LanguageContext";
import { MapPin, Phone, Mail, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactClient({ settings }: { settings: SiteSettings }) {
  const { lang, t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("360° Digital Marketing");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, details }),
      });

      const waPhone = settings.whatsappPhone || "8801841451241";
      const waText = `Hi Omnix Network,\n\nI want to make an enquiry from your Contact Page:\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n*Details:* ${details}`;
      window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`, "_blank");

      setSubmitted(true);
      setSubmitting(false);
      setName("");
      setEmail("");
      setPhone("");
      setDetails("");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
      {/* Left Column: Office Contacts */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase block">
            Direct Communication
          </span>
          <h2 className="text-3xl font-extrabold font-display text-slate-900">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Have a project in mind, need an SEO audit, or want to scale your Meta ad campaigns? Reach out to our offices in Dhaka and Sydney.
          </p>
        </div>

        <div className="space-y-6">
          {settings.offices.map((office) => (
            <div
              key={office.id}
              className="rs-card p-6 rounded-2xl border-slate-200 bg-white space-y-3"
            >
              <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span>{office.name[lang] || office.name.en}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {office.address[lang] || office.address.en}
              </p>
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs">
                <a
                  href={`tel:${office.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-brand-accent font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{office.phone}</span>
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-brand-accent font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{office.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7">
        <div className="rs-card p-8 sm:p-10 rounded-3xl border-slate-200 bg-white shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your details were submitted and forwarded to our WhatsApp support team. We will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold font-display text-slate-900">
                Make An Enquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mahfuzur Rahman"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 17xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Select Service
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share details about your business goals, target markets, or budget..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>{submitting ? "Sending..." : "Submit Inquiry & Connect"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
