"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Package,
  Briefcase,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Languages,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Services", href: "/admin/services", icon: Globe },
    { label: "Packages", href: "/admin/packages", icon: Package },
    { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "UI Translations", href: "/admin/translations", icon: Languages },
    { label: "Leads & Inquiries", href: "/admin/leads", icon: Users },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
        aria-label="Toggle Admin Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900/95 border-r border-slate-800/80 p-6 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center font-bold text-white shadow-lg shadow-brand-accent/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white tracking-wider font-display">
                  OMNIX ADMIN
                </h2>
                <span className="text-[10px] text-emerald-400 font-bold block">
                  ● Content Manager
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? "bg-brand-accent text-white shadow-md shadow-brand-accent/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
              View
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
