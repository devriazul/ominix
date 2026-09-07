import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { getSiteSettings, getTranslations } from "@/lib/db";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import ScheduleModal from "@/components/ScheduleModal";
import WelcomePopup from "@/components/WelcomePopup";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

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

export const metadata: Metadata = {
  title: "Omnix Network | Web, SEO & 360° Digital Marketing Agency",
  description:
    "Omnix Network is a full-service premium digital marketing agency offering SEO, SMM, Web/App Development, Media Buying, Graphic Design, and Video Editing.",
  icons: {
    icon: "/favicon.png",
  },
};

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
        </LanguageProvider>
      </body>
    </html>
  );
}
