"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, t, openEnquiryModal } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 sm:h-11 w-36 sm:w-40">
              <Image
                src="/logo-web.jpg"
                alt="Omnix Network"
                fill
                className="object-contain rounded"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-bold tracking-wider uppercase text-slate-800">
            <Link href="/about" className="hover:text-brand-accent transition-colors">
              {t("nav-about", "About")}
            </Link>

            {/* Services with Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className="hover:text-brand-accent flex items-center gap-1 transition-colors"
              >
                <span>{t("nav-services", "Services")}</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 text-xs space-y-1 transition-all duration-200 ${
                  servicesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/services/s1"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  360° Digital Marketing
                </Link>
                <Link
                  href="/services/s2"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  Professional SEO
                </Link>
                <Link
                  href="/services/s3"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  Social Media Marketing
                </Link>
                <Link
                  href="/services/s4"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  Content Development
                </Link>
                <Link
                  href="/services/s5"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  Website Development
                </Link>
                <Link
                  href="/services/s6"
                  className="block p-2 rounded-lg hover:bg-slate-50 font-semibold text-slate-800 hover:text-brand-accent transition-colors"
                >
                  Mobile App Development
                </Link>
                <div className="border-t border-slate-100 my-1 pt-1.5">
                  <Link
                    href="/services"
                    className="block p-2 text-center rounded-lg bg-slate-50 font-bold text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/packages" className="hover:text-brand-accent transition-colors">
              {t("nav-packages", "Packages")}
            </Link>
            <Link href="/portfolio" className="hover:text-brand-accent transition-colors">
              {t("nav-portfolio", "Works")}
            </Link>
            <Link href="/blogs" className="hover:text-brand-accent transition-colors">
              {t("nav-blogs", "Blogs")}
            </Link>
            <Link href="/faq" className="hover:text-brand-accent transition-colors">
              {t("nav-faq", "FAQs")}
            </Link>
            <Link href="/contact" className="hover:text-brand-accent transition-colors">
              {t("nav-contact", "Contact")}
            </Link>
          </div>

          {/* Language Switcher & Enquiry CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex bg-slate-100 border border-slate-200 rounded-full p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  lang === "en" ? "lang-active" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                ENG
              </button>
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  lang === "bn" ? "lang-active" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={openEnquiryModal}
              className="px-5 py-2.5 rounded-lg bg-brand-darkText text-white text-xs font-bold hover:bg-gradient-to-r hover:from-brand-accent hover:to-brand-cyan transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{t("nav-cta", "Make An Enquiry")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <div className="flex bg-slate-100 border border-slate-200 rounded-full p-0.5 text-[9px]">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-full font-bold ${
                  lang === "en" ? "lang-active" : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("bn")}
                className={`px-2 py-0.5 rounded-full font-bold ${
                  lang === "bn" ? "lang-active" : "text-slate-500"
                }`}
              >
                বাং
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-about", "About")}
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-services", "Services")}
          </Link>
          <Link
            href="/packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-packages", "Packages")}
          </Link>
          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-portfolio", "Works")}
          </Link>
          <Link
            href="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-blogs", "Blogs")}
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-faq", "FAQs")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-50"
          >
            {t("nav-contact", "Contact")}
          </Link>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="w-full py-3 text-center rounded-lg bg-brand-accent text-white font-bold text-xs uppercase tracking-wider"
            >
              {t("nav-cta", "Make An Enquiry")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
