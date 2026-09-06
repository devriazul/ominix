"use client";

import React, { useState } from "react";
import { FaqItem } from "@/lib/types";
import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqClient({ faqs }: { faqs: FaqItem[] }) {
  const { lang, t } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openFaqId === faq.id;
        return (
          <div
            key={faq.id}
            className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
              className="w-full p-5 text-left font-bold text-sm text-slate-800 flex justify-between items-center focus:outline-none hover:text-brand-accent transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="text-brand-accent text-xs font-bold w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{faq.question[lang] || faq.question.en}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-6 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 animate-in fade-in duration-200">
                {faq.answer[lang] || faq.answer.en}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
