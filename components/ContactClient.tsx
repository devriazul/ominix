"use client";

import React, { useState } from "react";
import { SiteSettings } from "@/lib/types";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
  MessageSquare,
  Calendar,
  Clock,
  Building2,
  Globe,
} from "lucide-react";

export default function ContactClient({ settings }: { settings: SiteSettings }) {
  const { lang, t, openCalendlyModal } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("360° Digital Marketing");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dhakaOffice = settings.offices.find((o) => o.id === "dhaka") || settings.offices[0];

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

  const mapQuery = encodeURIComponent("Moghbazar, Ramna, Dhaka, Bangladesh");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* 1. Global Office Cards Grid (3 Columns) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-brand-accent tracking-widest uppercase block">
              Global Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              Our Office Locations
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline-block font-medium">
            3 Strategic Centers Worldwide
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {settings.offices.map((office) => {
            const isDhaka = office.id === "dhaka";
            return (
              <div
                key={office.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-blue-50 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                      <Building2 className="w-5 h-5" />
                    </span>
                    {isDhaka ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        Head Office
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                        Global Hub
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold font-display text-slate-900">
                      {office.name[lang] || office.name.en}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{office.address[lang] || office.address.en}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-150 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-1.5 text-slate-700 hover:text-brand-accent font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      <span>{office.phone}</span>
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="text-slate-400 hover:text-brand-accent transition-colors text-[11px]"
                    >
                      {office.email}
                    </a>
                  </div>

                  {isDhaka && (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-brand-accent hover:text-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200/80"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Map Directions</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Section: Form & Direct Consultation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form (lg: 7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-5">
            <div>
              <span className="text-[11px] font-bold text-brand-accent tracking-widest uppercase block">
                Project Consultation
              </span>
              <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
                Send Us An Inquiry
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your project requirements below to receive a custom proposal.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you! Your project details were received and dispatched to our engineering team. We will respond within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mahfuzur Rahman"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 18xxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Target Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
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
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Project Goals & Message
                  </label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Share details about your target audiences, website platform goals, or advertising budget..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-accent/20 flex items-center justify-center gap-2"
                >
                  <span>{submitting ? "Processing..." : "Submit Inquiry & Request Audit"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Info Box (lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick Contact Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/10 blur-2xl pointer-events-none rounded-full" />

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Instant Response Line</span>
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Need Immediate Assistance?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with our senior growth strategists via WhatsApp or book a 1-on-1 video consultation call.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${settings.whatsappPhone || "8801841451241"}?text=${encodeURIComponent(
                  "Hi Omnix Network, I just visited your contact page and would like to discuss a project!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={openCalendlyModal}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>Schedule Strategy Call</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Support Hours:</span>
              <span className="text-slate-200 font-semibold">24/7 Digital Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Embedded Google Map for Dhaka Head Office */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-900/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div>
            <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>Interactive Navigation</span>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
              Find Our Dhaka Office Location
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {dhakaOffice.address[lang] || dhakaOffice.address.en}
            </p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-brand-accent text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-105 shrink-0"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map iFrame */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
          <iframe
            title="Omnix Network Dhaka Office Map"
            src="https://maps.google.com/maps?q=Moghbazar%2C%20Ramna%2C%20Dhaka%2C%20Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
