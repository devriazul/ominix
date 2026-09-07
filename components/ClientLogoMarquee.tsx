"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { ClientLogoItem } from "@/lib/types";

const fallbackClients: ClientLogoItem[] = [
  { id: "c1", name: "TechFlow Systems", logo: "/clients/techflow.svg", website: "https://techflow.io" },
  { id: "c2", name: "AlphaPay Global", logo: "/clients/alphapay.svg", website: "https://alphapay.com" },
  { id: "c3", name: "Nexus AI Labs", logo: "/clients/nexusai.svg", website: "https://nexusai.tech" },
  { id: "c4", name: "HyperScale Media", logo: "/clients/hyperscale.svg", website: "https://hyperscale.media" },
  { id: "c5", name: "OmniCommerce", logo: "/clients/omnicommerce.svg", website: "https://omnicommerce.com" },
  { id: "c6", name: "NovaData Analytics", logo: "/clients/novadata.svg", website: "https://novadata.io" },
  { id: "c7", name: "CyberPulse Security", logo: "/clients/cyberpulse.svg", website: "https://cyberpulse.io" },
  { id: "c8", name: "Apex Mobility", logo: "/clients/apexmobility.svg", website: "https://apexmobility.com" },
];

export default function ClientLogoMarquee() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<ClientLogoItem[]>(fallbackClients);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data: ClientLogoItem[] = await res.json();
          if (data && data.length > 0) {
            setClients(data);
          }
        }
      } catch (err) {
        // use fallbacks gracefully
      }
    };
    loadClients();
  }, []);

  // Ensure enough items for an unbroken infinite marquee
  let marqueeItems = [...clients];
  while (marqueeItems.length < 12) {
    marqueeItems = [...marqueeItems, ...clients];
  }
  const fullLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative py-10 md:py-12 bg-slate-50/50 border-b border-slate-150/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-28 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-28 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <ScrollReveal animation="fade-up">
          <p className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-slate-400">
            {t(
              "clients-heading",
              "TRUSTED BY INNOVATIVE STARTUPS, ENTERPRISES & MODERN BRANDS GLOBALLY"
            )}
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite Scrolling Logo Ticker */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-slate-50/95 via-slate-50/70 to-transparent z-10" />

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-slate-50/95 via-slate-50/70 to-transparent z-10" />

        {/* Marquee Row: ONLY LOGOS */}
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 md:gap-14 py-2">
          {fullLoop.map((client, idx) => {
            const logoNode = (
              <div
                key={`${client.id}-${idx}`}
                className="relative h-12 sm:h-14 px-4 sm:px-5 rounded-xl flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-105 shrink-0 select-none cursor-pointer"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-8 sm:max-h-9 max-w-[140px] sm:max-w-[160px] object-contain drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo.png";
                  }}
                />
              </div>
            );

            return client.website ? (
              <a
                key={`${client.id}-${idx}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                {logoNode}
              </a>
            ) : (
              logoNode
            );
          })}
        </div>
      </div>
    </section>
  );
}
