import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { getSiteSettings, getTranslations, getSeoSettings } from "@/lib/db";
import { LanguageProvider } from "./context/LanguageContext";
import EnquiryModal from "@/components/EnquiryModal";
import ScheduleModal from "@/components/ScheduleModal";
import WelcomePopup from "@/components/WelcomePopup";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import SeoTelemetryInjector from "@/components/SeoTelemetryInjector";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const site = await getSiteSettings();

  const siteName = site?.siteName || "Omnix Network";
  const title = seo?.metaTitle?.en || `${siteName} | Web, SEO & 360° Digital Marketing Agency`;
  const description =
    seo?.metaDescription?.en ||
    "Omnix Network is a full-service premium digital agency specializing in SEO, Meta Ads, Google Ads, TikTok Ads, Web Analytics, Server-Side Tracking, Ethical Hacking & App Dev.";
  const keywords = seo?.keywords?.en || "digital marketing, seo agency, meta ads, google ads, web development";

  const otherVerification: Record<string, string> = {};
  if (seo?.bingSiteVerification) otherVerification["msvalidate.01"] = seo.bingSiteVerification;
  if (seo?.yandexVerification) otherVerification["yandex-verification"] = seo.yandexVerification;
  if (seo?.pinterestVerification) otherVerification["p:domain_verify"] = seo.pinterestVerification;

  return {
    title,
    description,
    keywords,
    icons: {
      icon: "/favicon.png",
    },
    verification: {
      google: seo?.googleSiteVerification || undefined,
      other: Object.keys(otherVerification).length > 0 ? otherVerification : undefined,
    },
    openGraph: {
      title,
      description,
      siteName,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [{ url: "https://omnixnetwork.com/og-banner.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: seo?.twitterHandle || "@omnixnetwork",
    },
    robots: {
      index: seo?.enableSearchIndexing ?? true,
      follow: seo?.enableSearchIndexing ?? true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const translations = await getTranslations();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} ${hindSiliguri.variable} font-sans bg-white text-slate-800 antialiased selection:bg-brand-accent selection:text-white`}>
        <LanguageProvider initialSettings={settings} initialTranslations={translations}>
          {children}
          <EnquiryModal />
          <ScheduleModal />
          <WelcomePopup />
          <FloatingWhatsApp />
          <ScrollToTop />
          <SeoTelemetryInjector />
        </LanguageProvider>
      </body>
    </html>
  );
}
