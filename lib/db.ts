import fs from "fs/promises";
import path from "path";
import {
  SiteSettings,
  ServiceItem,
  PackageItem,
  PortfolioItem,
  BlogPost,
  TestimonialItem,
  FaqItem,
  EnquiryItem,
  ScheduleItem,
  ScheduleSettings,
  AdminConfig,
  ClientLogoItem,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const filePath = path.join(DATA_DIR, filename);
    const tempPath = `${filePath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tempPath, filePath);
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  return readJsonFile<SiteSettings>("site-settings.json", {
    siteName: "Omnix Network",
    tagline: { en: "Digital Agency", bn: "ডিজিটাল এজেন্সি" },
    whatsappPhone: "8801841451241",
    contactEmail: "contact@omnixnetwork.com",
    contactPhone: "+880 1841 451241",
    offices: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
  });
}

export async function saveSiteSettings(data: SiteSettings): Promise<boolean> {
  return writeJsonFile("site-settings.json", data);
}

// Translations
export async function getTranslations(): Promise<Record<string, Record<string, string>>> {
  return readJsonFile("translations.json", { en: {}, bn: {} });
}

export async function saveTranslations(data: Record<string, Record<string, string>>): Promise<boolean> {
  return writeJsonFile("translations.json", data);
}

// Services
export async function getServices(): Promise<ServiceItem[]> {
  return readJsonFile<ServiceItem[]>("services.json", []);
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find((s) => s.id === id) || null;
}

export async function saveServices(data: ServiceItem[]): Promise<boolean> {
  return writeJsonFile("services.json", data);
}

// Packages
export async function getPackages(): Promise<PackageItem[]> {
  return readJsonFile<PackageItem[]>("packages.json", []);
}

export async function getPackageById(id: string): Promise<PackageItem | null> {
  const pkgs = await getPackages();
  return pkgs.find((p) => p.id === id) || null;
}

export async function savePackages(data: PackageItem[]): Promise<boolean> {
  return writeJsonFile("packages.json", data);
}

// Portfolio
export async function getPortfolio(): Promise<PortfolioItem[]> {
  return readJsonFile<PortfolioItem[]>("portfolio.json", []);
}

export async function getPortfolioById(id: string): Promise<PortfolioItem | null> {
  const items = await getPortfolio();
  return items.find((p) => p.id === id) || null;
}

export async function savePortfolio(data: PortfolioItem[]): Promise<boolean> {
  return writeJsonFile("portfolio.json", data);
}

// Blogs
export async function getBlogs(): Promise<BlogPost[]> {
  return readJsonFile<BlogPost[]>("blogs.json", []);
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.id === id) || null;
}

export async function saveBlogs(data: BlogPost[]): Promise<boolean> {
  return writeJsonFile("blogs.json", data);
}

// Testimonials
export async function getTestimonials(): Promise<TestimonialItem[]> {
  return readJsonFile<TestimonialItem[]>("testimonials.json", []);
}

export async function saveTestimonials(data: TestimonialItem[]): Promise<boolean> {
  return writeJsonFile("testimonials.json", data);
}

// FAQs
export async function getFaqs(): Promise<FaqItem[]> {
  return readJsonFile<FaqItem[]>("faqs.json", []);
}

export async function saveFaqs(data: FaqItem[]): Promise<boolean> {
  return writeJsonFile("faqs.json", data);
}

// Enquiries / Leads
export async function getEnquiries(): Promise<EnquiryItem[]> {
  return readJsonFile<EnquiryItem[]>("enquiries.json", []);
}

export async function saveEnquiries(data: EnquiryItem[]): Promise<boolean> {
  return writeJsonFile("enquiries.json", data);
}

export async function addEnquiry(item: Omit<EnquiryItem, "id" | "createdAt" | "status">): Promise<EnquiryItem> {
  const enquiries = await getEnquiries();
  const newEnquiry: EnquiryItem = {
    ...item,
    id: `enq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  enquiries.unshift(newEnquiry);
  await saveEnquiries(enquiries);
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: EnquiryItem["status"]): Promise<boolean> {
  const enquiries = await getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);
  if (index === -1) return false;
  enquiries[index].status = status;
  return saveEnquiries(enquiries);
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const enquiries = await getEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  return saveEnquiries(filtered);
}

// Admin Config
export async function getAdminConfig(): Promise<AdminConfig> {
  return readJsonFile<AdminConfig>("admin-config.json", {
    username: "admin",
    password: "admin123",
    updatedAt: new Date().toISOString(),
  });
}

export async function updateAdminConfig(data: Partial<AdminConfig>): Promise<boolean> {
  const current = await getAdminConfig();
  const updated: AdminConfig = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return writeJsonFile("admin-config.json", updated);
}

// Schedules & Appointments
export async function getSchedules(): Promise<ScheduleItem[]> {
  return readJsonFile<ScheduleItem[]>("schedules.json", []);
}

export async function saveSchedules(data: ScheduleItem[]): Promise<boolean> {
  return writeJsonFile("schedules.json", data);
}

export async function createSchedule(item: Omit<ScheduleItem, "id" | "createdAt" | "status">): Promise<ScheduleItem> {
  const schedules = await getSchedules();
  const newSchedule: ScheduleItem = {
    ...item,
    id: `SCH-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  schedules.unshift(newSchedule);
  await saveSchedules(schedules);
  return newSchedule;
}

export async function updateScheduleStatus(id: string, status: ScheduleItem["status"]): Promise<boolean> {
  const schedules = await getSchedules();
  const index = schedules.findIndex((s) => s.id === id);
  if (index === -1) return false;
  schedules[index].status = status;
  return saveSchedules(schedules);
}

export async function deleteSchedule(id: string): Promise<boolean> {
  const schedules = await getSchedules();
  const filtered = schedules.filter((s) => s.id !== id);
  return saveSchedules(filtered);
}

// Schedule Settings
export async function getScheduleSettings(): Promise<ScheduleSettings> {
  return readJsonFile<ScheduleSettings>("schedule-settings.json", {
    workingDays: [0, 1, 2, 3, 4, 5, 6],
    timeSlots: [
      "10:00 AM",
      "11:30 AM",
      "02:00 PM",
      "03:30 PM",
      "05:00 PM",
      "06:30 PM",
      "08:00 PM",
    ],
    meetingDuration: 30,
    bufferDays: 0,
    maxAdvanceDays: 14,
    blockedDates: [],
  });
}

export async function saveScheduleSettings(settings: ScheduleSettings): Promise<boolean> {
  return writeJsonFile("schedule-settings.json", settings);
}

// Clients
export async function getClients(): Promise<ClientLogoItem[]> {
  return readJsonFile<ClientLogoItem[]>("clients.json", []);
}

export async function saveClients(clients: ClientLogoItem[]): Promise<boolean> {
  return writeJsonFile<ClientLogoItem[]>("clients.json", clients);
}
