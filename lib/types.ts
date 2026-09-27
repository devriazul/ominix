export interface LocalizedString {
  en: string;
  bn: string;
}

export interface SeoSettings {
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  keywords: LocalizedString;
  ogImage?: string;
  twitterHandle?: string;

  // Site Verification Codes
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yandexVerification?: string;
  pinterestVerification?: string;

  // Tracking & Pixels Telemetry
  gtmContainerId?: string; // e.g. GTM-XXXXXX
  ga4MeasurementId?: string; // e.g. G-XXXXXX
  facebookPixelId?: string; // e.g. 1234567890
  facebookCapiToken?: string;
  facebookCapiTestCode?: string;
  tiktokPixelId?: string;
  tiktokAccessToken?: string;

  // Custom Scripts Injection
  customHeadScripts?: string;
  customBodyScripts?: string;

  // Structured Data (Schema.org)
  organizationSchema?: {
    name: string;
    url: string;
    logo: string;
    telephone: string;
    addressLocality: string;
    addressCountry: string;
    sameAs: string[];
  };
  customJsonLd?: string;

  // Robots & Indexing
  robotsTxtContent?: string;
  enableSearchIndexing: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: LocalizedString;
  whatsappPhone: string;
  contactEmail: string;
  contactPhone: string;
  offices: {
    id: string;
    name: LocalizedString;
    address: LocalizedString;
    phone: string;
    email: string;
  }[];
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  calendlyUrl?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface ServiceItem {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  longDesc?: LocalizedString;
  image: string;
  benefits: LocalizedString; // HTML string or bullet list
  process?: ServiceProcessStep[];
  techStack?: string[];
  iconName?: string;
  featured?: boolean;
}

export interface PackageItem {
  id: string;
  title: LocalizedString;
  type: string;
  desc: LocalizedString;
  features: LocalizedString; // HTML string or bullet list
  price?: string;
  startingPrice?: LocalizedString;
}

export interface PortfolioItem {
  id: string;
  title: LocalizedString;
  tag: string;
  image: string;
  client: string;
  duration: string;
  metrics: LocalizedString;
  details: LocalizedString;
  workflow?: {
    problem: LocalizedString;
    whatWeDid: LocalizedString;
    solution: LocalizedString;
    result: LocalizedString;
  };
  category: "all" | "seo" | "ads" | "web";
}

export interface BlogPost {
  id: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  rating: string;
  image?: string;
  text: LocalizedString;
}

export interface FaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  category?: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service: string;
  details: string;
  createdAt: string;
  status: "new" | "in_progress" | "contacted" | "closed";
}

export interface ScheduleItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:00 AM"
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface ScheduleSettings {
  workingDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  timeSlots: string[];
  meetingDuration: number; // minutes
  bufferDays: number;
  maxAdvanceDays: number;
  blockedDates?: string[];
}

export interface AdminConfig {
  username: string;
  password: string;
  updatedAt: string;
}

export interface ClientLogoItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  order?: number;
  active?: boolean;
}

