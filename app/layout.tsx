import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings, getTranslations } from "@/lib/db";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Omnix Network | Web, SEO & 360° Digital Marketing Agency",
  description:
    "Omnix Network is a full-service premium digital marketing agency offering SEO, SMM, Web/App Development, Media Buying, Graphic Design, and Video Editing.",
  icons: {
    icon: "/favicon.jpg",
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
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
      </head>
      <body className="bg-white text-slate-800 antialiased selection:bg-brand-accent selection:text-white">
        <LanguageProvider initialSettings={settings} initialTranslations={translations}>
          {children}
          <EnquiryModal />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
