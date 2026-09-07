export interface LocalizedString {
  en: string;
  bn: string;
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

export interface ServiceItem {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  image: string;
  benefits: LocalizedString; // HTML string or bullet list
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

