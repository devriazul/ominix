"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  ServiceItem,
  PortfolioItem,
  BlogPost,
  TestimonialItem,
  FaqItem,
} from "@/lib/types";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Globe,
  Search,
  Share2,
  PenTool,
  Code,
  Smartphone,
  CheckCircle2,
  Send,
  MessageSquare,
  BarChart3,
  Users,
} from "lucide-react";

interface HomeClientProps {
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  blogs: BlogPost[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

export default function HomeClient({
  services,
  portfolio,
  blogs,
  testimonials,
  faqs,
}: HomeClientProps) {
  const { lang, t, openEnquiryModal, siteSettings } = useLanguage();

  // Hero Slider
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      badgeKey: "hero-badge-1",
      title1Key: "hero-title-1-s1",
      title2Key: "hero-title-2-s1",
      descKey: "hero-description-s1",
    },
    {
      badgeKey: "hero-badge-2",
      title1Key: "hero-title-1-s2",
      title2Key: "hero-title-2-s2",
      descKey: "hero-description-s2",
    },
    {
      badgeKey: "hero-badge-3",
      title1Key: "hero-title-1-s3",
      title2Key: "hero-title-2-s3",
      descKey: "hero-description-s3",
    },
    {
      badgeKey: "hero-badge-4",
      title1Key: "hero-title-1-s4",
      title2Key: "hero-title-2-s4",
      descKey: "hero-description-s4",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Portfolio Filtering
  const [activeCategory, setActiveCategory] = useState<"all" | "seo" | "ads" | "web">("all");
  const filteredPortfolio =
    activeCategory === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  // Testimonials Carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const currentTestimonial = testimonials[activeTestimonial] || testimonials[0];

  // FAQ Accordion
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  // Contact Form
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactService, setContactService] = useState("360° Digital Marketing");
  const [contactDetails, setContactDetails] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          service: contactService,
          details: contactDetails,
        }),
      });

      const waPhone = siteSettings?.whatsappPhone || "8801841451241";
      const waText = `Hi Omnix Network,\n\nI want to make an enquiry from your website:\n*Name:* ${contactName}\n*Phone:* ${contactPhone}\n*Service:* ${contactService}\n*Details:* ${contactDetails}`;
      window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`, "_blank");

      setContactSuccess(true);
      setContactName("");
      setContactPhone("");
      setContactDetails("");
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "s1":
        return <Globe className="w-5 h-5" />;
      case "s2":
        return <Search className="w-5 h-5" />;
      case "s3":
        return <Share2 className="w-5 h-5" />;
      case "s4":
        return <PenTool className="w-5 h-5" />;
      case "s5":
        return <Code className="w-5 h-5" />;
      case "s6":
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/70 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dynamic Slide Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t(heroSlides[currentHeroSlide].badgeKey)}</span>
              </div>

              {/* Dynamic Slide Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15] min-h-[140px] sm:min-h-[160px]">
                {t(heroSlides[currentHeroSlide].title1Key)}{" "}
                <span className="gradient-text block">
                  {t(heroSlides[currentHeroSlide].title2Key)}
                </span>
              </h1>

              {/* Dynamic Slide Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl min-h-[70px]">
                {t(heroSlides[currentHeroSlide].descKey)}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openEnquiryModal}
                  className="px-7 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-accent/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>{t("hero-btn-primary", "Make an enquiry")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  href="/services"
                  className="px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all duration-300"
                >
                  {t("hero-btn-secondary", "Learn More")}
                </Link>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center space-x-2 pt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentHeroSlide
                        ? "w-8 bg-brand-accent"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              {/* Trust Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("hero-trust", "Trusted by high-performing local & international businesses")}</span>
              </div>
            </div>

            {/* Right Interactive Mockup Column */}
            <div className="lg:col-span-5 relative">
              <div className="rs-card rounded-2xl p-6 shadow-2xl relative z-10 border-slate-200/80 bg-white/95 backdrop-blur">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {t("hero-visual-live", "Live Analytics")}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2.5 py-1 rounded-full">
                    {t("hero-visual-status", "Consultant online now")}
                  </span>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">{t("hero-bar-seo", "Search Visibility")}</span>
                      <span className="text-brand-accent">+280%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-accent to-brand-cyan h-full w-[85%] rounded-full animate-pulse-soft"></div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">{t("hero-bar-ads", "Social Media Ads CTR")}</span>
                      <span className="text-brand-cyan">4.8% CTR</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[72%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">{t("hero-bar-conversion", "Lead Conversion")}</span>
                      <span className="text-emerald-600">3.4x</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full w-[92%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Stats Grid Box */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <div className="text-2xl font-black text-slate-900 font-display">
                        450%
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        {t("hero-stats-1-lbl", "Campaign ROI")}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <div className="text-2xl font-black text-slate-900 font-display">
                        1.2M+
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        {t("hero-stats-2-lbl", "Active Reach")}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={openEnquiryModal}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-brand-accent text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t("hero-visual-chat", "Chat With Expert")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>{t("about-title-main", "What we do.")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                Empowering brands with data-driven creative strategies.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t("about-desc-1")}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {t("about-desc-2")}
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:underline uppercase tracking-wider"
                >
                  <span>{t("about-cta-btn", "Connect With Experts")}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {t("about-ph-title", "Philosophy")}
                </h3>
                <h4 className="text-xs font-semibold text-brand-accent">
                  {t("about-ph-sub", "Trust pays off")}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t("about-ph-desc")}
                </p>
              </div>

              <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-brand-cyan flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {t("about-team-title", "Teamwork")}
                </h3>
                <h4 className="text-xs font-semibold text-brand-cyan">
                  {t("about-team-sub", "Committed and creative")}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t("about-team-desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-16 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("services-badge", "Agency Services")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {t("services-title", "Services We Provide")}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {t("services-description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="rs-card rounded-2xl p-6 flex flex-col justify-between group border-slate-200 bg-white"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-brand-accent group-hover:to-brand-cyan group-hover:text-white transition-all duration-300 shadow-sm">
                    {getServiceIcon(svc.id)}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                    {svc.title[lang] || svc.title.en}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    {svc.desc[lang] || svc.desc.en}
                  </p>
                </div>
                <Link
                  href={`/services/${svc.id}`}
                  className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1 group-hover:gap-2 transition-all pt-2 border-t border-slate-100"
                >
                  <span>Get details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{t("why-badge", "Core Advantages")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {t("why-title", "Why Choose Omnix?")
            }</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {t("why-description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3 bg-slate-50/50">
              <div className="text-brand-accent font-black text-xl font-display">01</div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t("why-card1-title", "ROI Driven Strategies")}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t("why-card1-desc")}
              </p>
            </div>

            <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3 bg-slate-50/50">
              <div className="text-brand-cyan font-black text-xl font-display">02</div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t("why-card2-title", "Performance Dashboards")}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t("why-card2-desc")}
              </p>
            </div>

            <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3 bg-slate-50/50">
              <div className="text-brand-accent font-black text-xl font-display">03</div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t("why-card3-title", "Specialist Managers")}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t("why-card3-desc")}
              </p>
            </div>

            <div className="rs-card rounded-2xl p-6 border-slate-200 space-y-3 bg-slate-50/50">
              <div className="text-emerald-500 font-black text-xl font-display">04</div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {t("why-card4-title", "Omni-Channel Routing")}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t("why-card4-desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO / CASE STUDIES */}
      <section className="py-16 bg-slate-50/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{t("portfolio-badge", "Client Success Studies")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                {t("portfolio-title", "Recent Campaigns & Works")}
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 bg-slate-200/80 p-1 rounded-full text-xs font-bold">
              {(["all", "seo", "ads", "web"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full transition-all capitalize ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-brand-accent to-brand-cyan text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat === "all" ? "All Works" : cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="rs-card rounded-2xl overflow-hidden flex flex-col justify-between border-slate-200 bg-white group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title[lang] || item.title.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[11px] text-brand-accent font-bold uppercase tracking-wider">
                    {item.client}
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    {item.title[lang] || item.title.en}
                  </h3>
                  <div className="bg-emerald-50 text-emerald-700 font-bold text-xs p-2.5 rounded-lg">
                    {item.metrics[lang] || item.metrics.en}
                  </div>
                  <div className="pt-2">
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="text-xs font-bold text-slate-800 hover:text-brand-accent flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>{t("portfolio-btn", "Case details")}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("feedback-badge", "Client Reviews")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {t("feedback-title", "What Clients Say.")}
            </h2>
          </div>

          <div className="rs-card rounded-3xl p-8 md:p-12 border-slate-200 bg-gradient-to-b from-white to-slate-50/50 shadow-xl relative">
            <div className="space-y-6">
              <div className="text-amber-400 text-lg tracking-widest">
                {currentTestimonial?.rating || "⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-slate-700 text-base sm:text-xl italic font-medium leading-relaxed">
                &ldquo;{currentTestimonial?.text[lang] || currentTestimonial?.text.en}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center font-bold text-sm">
                    {currentTestimonial?.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {currentTestimonial?.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold">
                      {currentTestimonial?.company}
                    </p>
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setActiveTestimonial(
                        (prev) => (prev - 1 + testimonials.length) % testimonials.length
                      )
                    }
                    className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
                    }
                    className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-16 bg-slate-50/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
              {t("nav-faq", "Frequently Asked Questions")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Answers to common strategy, budget, and deployment questions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left font-bold text-sm text-slate-800 flex justify-between items-center focus:outline-none"
                  >
                    <span>{faq.question[lang] || faq.question.en}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50/50 animate-in fade-in duration-150">
                      {faq.answer[lang] || faq.answer.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CONTACT FORM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rs-card rounded-3xl p-8 sm:p-12 border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
                <Send className="w-3.5 h-3.5" />
                <span>{t("contact-badge", "Let's Talk?")}</span>
              </div>
              <h2 className="text-3xl font-extrabold font-display text-slate-900 leading-tight">
                {t("contact-form-title", "Make An Enquiry")}
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                Connect with our senior growth strategists. Tell us about your targets, and we will prepare a tailored digital marketing roadmap.
              </p>

              <div className="pt-4 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free 30-minute initial consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Full transparent campaign breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No automated bot responses — real experts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {contactSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Received!</h3>
                  <p className="text-xs text-slate-600">
                    Our team is reviewing your details and will connect via WhatsApp/Phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+880 17xxxxxxxx"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Select Service
                    </label>
                    <select
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
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

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      value={contactDetails}
                      onChange={(e) => setContactDetails(e.target.value)}
                      placeholder="Give us a brief overview of your business..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit & Chat on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
