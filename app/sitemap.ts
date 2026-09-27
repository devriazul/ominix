import { MetadataRoute } from "next";
import { getServices, getPackages, getPortfolio, getBlogs, getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omnixnetwork.com";

  // Core Static Pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/packages",
    "/portfolio",
    "/blogs",
    "/contact",
    "/faq",
    "/career",
    "/privacy-policy",
    "/terms-and-conditions",
    "/gdpr-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Services
  const services = await getServices();
  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Packages
  const packages = await getPackages();
  const packagePages = packages.map((p) => ({
    url: `${baseUrl}/packages/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Dynamic Portfolio / Case Studies
  const portfolio = await getPortfolio();
  const portfolioPages = portfolio.map((item) => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Blogs
  const blogs = await getBlogs();
  const blogPages = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.id}`,
    lastModified: new Date(b.date || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...packagePages,
    ...portfolioPages,
    ...blogPages,
  ];
}
