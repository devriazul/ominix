"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-white">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center mx-auto text-brand-cyan">
          <Mail className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
            Subscribe To Growth Insights
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Get Exclusive E-Commerce & SEO Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join 5,000+ business owners receiving our monthly breakdown on Meta advertising strategies, Google ranking algorithms, and sales conversion tactics.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 animate-fadeIn max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you! You are subscribed to Omnix Growth Insights.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email..."
              className="flex-grow px-4 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe Now"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-500">
          No spam guaranteed. Unsubscribe anytime with 1-click.
        </p>
      </div>
    </div>
  );
}
