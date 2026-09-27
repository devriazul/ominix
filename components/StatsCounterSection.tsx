"use client";

import React from "react";
import { Briefcase, Users, DollarSign, Award } from "lucide-react";

export default function StatsCounterSection() {
  const stats = [
    {
      id: "projects",
      icon: Briefcase,
      count: "250+",
      title: "Completed Projects",
      subtitle: "Websites, Funnels & SEO Campaigns",
      color: "text-brand-accent",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "clients",
      icon: Users,
      count: "120+",
      title: "Happy Global Clients",
      subtitle: "Across USA, Australia & Bangladesh",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "revenue",
      icon: DollarSign,
      count: "$15M+",
      title: "Client Ad Spend & Revenue",
      subtitle: "Generated & Managed Online",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      id: "retention",
      icon: Award,
      count: "99.4%",
      title: "Client Retention Rate",
      subtitle: "Long-term Partnerships",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="py-12 border-y border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
                    {stat.count}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                    {stat.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
