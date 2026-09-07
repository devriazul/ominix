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
  Calendar,
  Zap,
  Cpu,
  ShieldCheck,
  Activity,
  Handshake,
} from "lucide-react";
import HeroAnimatedGraphic from "@/components/HeroAnimatedGraphic";
import ScrollReveal from "@/components/ScrollReveal";
import ClientLogoMarquee from "@/components/ClientLogoMarquee";

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
  const { lang, t, openEnquiryModal, openCalendlyModal, siteSettings } = useLanguage();

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
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
        
        {/* Dynamic Background Floating Ambient Glows */}
        <div className="absolute -top-24 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob-reverse pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Dynamic Slide Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>{t(heroSlides[currentHeroSlide].badgeKey)}</span>
              </div>

              {/* Dynamic Slide Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15] min-h-[120px] sm:min-h-[140px] transition-all duration-300">
                {t(heroSlides[currentHeroSlide].title1Key)}{" "}
                <span className="gradient-text block">
                  {t(heroSlides[currentHeroSlide].title2Key)}
                </span>
              </h1>

              {/* Dynamic Slide Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl min-h-[50px] sm:min-h-[60px]">
                {t(heroSlides[currentHeroSlide].descKey)}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openCalendlyModal}
                  className="interactive-glow px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-accent/25 hover:shadow-xl hover:shadow-brand-accent/35 transition-all duration-300 flex items-center gap-2 group hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="w-4 h-4 text-cyan-200" />
                  <span>{t("nav-schedule", "Schedule a Call")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={openEnquiryModal}
                  className="interactive-glow px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-brand-accent text-white text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>{t("hero-btn-primary", "Make an enquiry")}</span>
                </button>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center space-x-2 pt-3">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHeroSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentHeroSlide
                        ? "w-8 bg-brand-accent"
                        : "w-2 bg-slate-300 hover:bg-slate-400 hover:scale-125"
                    }`}
                  />
                ))}
              </div>

              {/* Trust Badge */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse-soft" />
                <span>{t("hero-trust", "Trusted by high-performing local & international businesses")}</span>
              </div>
            </div>

            {/* Right Column: Animated Picture & Interactive Visual */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center py-4">
              <HeroAnimatedGraphic />
            </div>
          </div>
        </div>
      </section>
 
      {/* CLIENTS LOGO SCROLLING MARQUEE */}
      <ClientLogoMarquee />

      {/* 2. ABOUT US SECTION (Short & Tech-Focused) */}
      <section id="about" className="py-16 md:py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        
        {/* Subtle Accent Glow */}
        <div className="absolute top-1/2 -right-32 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-blob pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content: Short, Punchy Tech Overview */}
            <div className="lg:col-span-6 space-y-5">
              <ScrollReveal animation="fade-right">
                <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-150">
                  <Cpu className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{t("about-title-main", "Tech-First Digital Agency")}</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={100}>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
                  Engineering High-Impact Web Platforms & Automated Growth.
                </h2>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={180}>
                <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                  {t("about-desc-1")}
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={240}>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
                  {t("about-desc-2")}
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={300}>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={openCalendlyModal}
                    className="interactive-glow px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-accent text-white text-xs font-bold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Book Free Consultation</span>
                  </button>
                  <Link
                    href="/about"
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-accent hover:border-brand-accent text-xs font-bold transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
                  >
                    <span>{t("about-cta-btn", "Learn More About Us")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Tech Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-4">
              
              <ScrollReveal animation="fade-left" delay={100}>
                <div className="rs-card interactive-glow rounded-2xl p-5 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-accent/30 transition-all duration-300 flex items-start space-x-4 group">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-brand-accent flex items-center justify-center shrink-0 font-bold group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-slate-900 mb-1 group-hover:text-brand-accent transition-colors">
                      Next-Gen Web & App Architecture
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Custom-built web platforms using Next.js 15, React, Node.js, and Cloud infrastructures engineered for sub-second speeds and flawless security.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={200}>
                <div className="rs-card interactive-glow rounded-2xl p-5 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-cyan/30 transition-all duration-300 flex items-start space-x-4 group">
                  <div className="w-11 h-11 rounded-xl bg-cyan-100 text-brand-cyan flex items-center justify-center shrink-0 font-bold group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-white transition-all duration-300">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-slate-900 mb-1 group-hover:text-brand-cyan transition-colors">
                      Automated Conversion Pipelines
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Connecting CRM integrations, smart lead qualification, and WhatsApp automated funnels to capture customers 24/7.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={300}>
                <div className="rs-card interactive-glow rounded-2xl p-5 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all duration-300 flex items-start space-x-4 group">
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      Algorithmic SEO & Paid Media Scale
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Data-backed search visibility and targeted multi-channel advertising on Google, Meta, and LinkedIn with transparent ROI telemetry.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Faithful to Existing Site Design) */}
      <section id="services" className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80 relative overflow-hidden">
        
        {/* Subtle Ambient Background Blob */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-blob pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
              <span className="text-xs font-bold text-brand-accent tracking-wider uppercase">
                {t("services-badge", "Agency Services")}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-display text-slate-900">
                {t("services-title", "Services We Provide")}
              </h2>
              <p className="text-slate-550 text-sm md:text-base leading-relaxed">
                {t(
                  "services-description",
                  "Deliver complete marketing solutions combining SEO, advertising, content, and social media for consistent brand growth."
                )}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <ScrollReveal key={svc.id} animation="fade-up" delay={(idx % 3) * 100}>
                <div className="rs-card interactive-glow rounded-xl p-6 flex flex-col justify-between group cursor-pointer border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 h-full">
                  <div>
                    <div className="w-11 h-11 rounded bg-slate-100 text-slate-800 flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-brand-accent group-hover:to-brand-cyan group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      {getServiceIcon(svc.id)}
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brand-accent transition-colors">
                      {svc.title[lang] || svc.title.en}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">
                      {svc.desc[lang] || svc.desc.en}
                    </p>
                  </div>
                  <Link
                    href={`/services/${svc.id}`}
                    className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1 group-hover:gap-2 transition-all pt-2 border-t border-slate-100"
                  >
                    <span>Get details</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US (Attractive Modern Layout) */}
      <section id="why-choose" className="py-16 md:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-blob pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl animate-blob-reverse pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Advantages & Trust Card */}
            <div className="lg:col-span-5 space-y-6">
              <ScrollReveal animation="fade-right">
                <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  <Award className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{t("why-badge", "Core Advantages")}</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={80}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
                  {t("why-title", "Why Choose Omnix?")}
                </h2>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-right" delay={160}>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {t(
                    "why-description",
                    "We operate as a growth engineering partner rather than a third-party vendor. Everything we build and launch matches your specific business bottom-line goals."
                  )}
                </p>
              </ScrollReveal>

              {/* High-Impact Trust Commitment Card */}
              <ScrollReveal animation="fade-right" delay={240}>
                <div className="rs-card interactive-glow bg-gradient-to-tr from-slate-50 to-blue-50/40 p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-start gap-4 transition-all hover:border-brand-accent/30 group">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-brand-accent flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <Handshake className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-0.5">
                      {t("why-trust-lbl", "Our Commitment")}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mb-1">
                      {t("why-trust-val", "100% Transparency & Weekly Reports")}
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Live client dashboards with zero hidden fees, weekly milestone updates, and measurable deliverables.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Live Metric Pills */}
              <ScrollReveal animation="fade-right" delay={300}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 hover:border-emerald-300 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-800">3.8x Average Client ROI</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 hover:border-blue-300 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-800">99.8% On-Time Delivery</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 4 Attractive Interactive Feature Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Card 1 */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="rs-card interactive-glow rounded-2xl p-6 border-slate-200 bg-white hover:border-blue-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-accent flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-blue-500/60 font-display">01</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-brand-accent transition-colors">
                      {t("why-card1-title", "ROI Driven Strategies")}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t("why-card1-desc", "We set exact, trackable goals for each campaign. If it does not drive a positive return, we adjust or pause instantly.")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 2 */}
              <ScrollReveal animation="fade-up" delay={180}>
                <div className="rs-card interactive-glow rounded-2xl p-6 border-slate-200 bg-white hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 text-brand-cyan flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-cyan-500/60 font-display">02</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-brand-cyan transition-colors">
                      {t("why-card2-title", "Performance Dashboards")}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t("why-card2-desc", "Clients get access to live campaign portals to view ad spent metrics, lead quality, and reach performance in real time.")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 3 */}
              <ScrollReveal animation="fade-up" delay={260}>
                <div className="rs-card interactive-glow rounded-2xl p-6 border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-indigo-500/60 font-display">03</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">
                      {t("why-card3-title", "Specialist Tech Squad")}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t("why-card3-desc", "No middle-men. You talk directly with seasoned developers, SEO specialists, and creative directors running your project.")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Card 4 */}
              <ScrollReveal animation="fade-up" delay={340}>
                <div className="rs-card interactive-glow rounded-2xl p-6 border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-emerald-500/60 font-display">04</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-emerald-600 transition-colors">
                      End-to-End Scalability
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      From early-stage customer acquisition to full enterprise software architecture, our solutions scale smoothly as your revenue expands.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO / CASE STUDIES */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-blob pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-5">
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
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredPortfolio.map((item, idx) => (
              <ScrollReveal key={item.id} animation="fade-up" delay={(idx % 3) * 100}>
                <div className="rs-card interactive-glow rounded-2xl overflow-hidden flex flex-col justify-between border-slate-200 bg-white group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title[lang] || item.title.en}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] text-brand-accent font-bold uppercase tracking-wider">
                      {item.client}
                    </div>
                    <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brand-accent transition-colors">
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
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-blob pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
              <div className="inline-flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("feedback-badge", "Client Reviews")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                {t("feedback-title", "What Clients Say.")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="rs-card interactive-glow rounded-3xl p-8 md:p-12 border-slate-200 bg-gradient-to-b from-white to-slate-50/50 shadow-xl relative group">
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
                      className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
                      }
                      className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
                {t("nav-faq", "Frequently Asked Questions")}
              </h2>
              <p className="text-slate-550 text-xs sm:text-sm">
                Answers to common strategy, budget, and deployment questions.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <ScrollReveal key={faq.id} animation="fade-up" delay={(idx % 4) * 60}>
                  <div
                    className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all hover:border-slate-300"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left font-bold text-sm text-slate-800 flex justify-between items-center focus:outline-none hover:text-brand-accent transition-colors"
                    >
                      <span>{faq.question[lang] || faq.question.en}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                          isOpen ? "rotate-180 text-brand-accent" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50/50 animate-in fade-in duration-150">
                        {faq.answer[lang] || faq.answer.en}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CONTACT FORM SECTION */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-blob pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="rs-card interactive-glow rounded-3xl p-8 sm:p-12 border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
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
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
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
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50 transition-all"
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
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50 transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50 transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="interactive-glow w-full py-3.5 bg-brand-accent hover:bg-brand-accentHover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:shadow-brand-accent/25 flex items-center justify-center gap-2 group"
                    >
                      <span>Submit & Chat on WhatsApp</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
