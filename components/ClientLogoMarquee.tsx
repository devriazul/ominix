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
    <section className="relative py-10 md:py-12 bg-slate-50/70 border-b border-slate-200/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-32 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />

        {/* Right Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

        {/* Marquee Row */}
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 md:gap-10 py-3">
          {fullLoop.map((client, idx) => {
            const logoNode = (
              <div
                key={`${client.id}-${idx}`}
                className="relative h-14 sm:h-16 px-4 sm:px-6 py-2.5 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-brand-accent/40 hover:scale-105 shrink-0 select-none cursor-pointer"
                title={client.name}
              >
                <div className="relative w-32 sm:w-36 h-8 sm:h-9 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            );

            return client.website ? (
              <a
                key={`${client.id}-${idx}`}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none shrink-0"
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
