"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      if (totalScroll > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative group w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute -inset-[2px] w-[52px] h-[52px] -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          {/* Background track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="3"
            fill="none"
          />
          {/* Active progress */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-brand-accent transition-all duration-150 ease-out"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Arrow Icon with Bounce */}
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
