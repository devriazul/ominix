import { Metadata } from "next";
import { getSeoSettings, getSiteSettings } from "./db";
import { ServiceItem, PackageItem, PortfolioItem, BlogPost } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://omnixnetwork.com";

/**
 * Auto-generate dynamic page Metadata for Next.js 15
 */
export async function generateCustomMetadata({
  title,
  description,
  keywords,
  path = "",
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Promise<Metadata> {
  const seo = await getSeoSettings();
  const site = await getSiteSettings();

  const siteName = site?.siteName || "Omnix Network";
  const defaultTitle = seo?.metaTitle?.en || `${siteName} | Web, SEO & 360° Digital Agency`;
  const defaultDesc =
    seo?.metaDescription?.en ||
    "Omnix Network is a full-service agency specializing in SEO, Meta Ads, Google Ads, TikTok Ads, Web Analytics, Server-Side Tracking, Ethical Hacking & App Dev.";
  const defaultKeywords = seo?.keywords?.en || "digital marketing, seo, web development, meta ads";
  const defaultOgImage = seo?.ogImage || `${BASE_URL}/og-image.jpg`;

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || defaultOgImage;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: finalTitle,
    description: finalDesc,
    keywords: finalKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: canonicalUrl,
      siteName: siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      type: type,
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDesc,
      images: [finalImage],
      creator: seo?.twitterHandle || "@omnixnetwork",
    },
    robots: {
      index: seo?.enableSearchIndexing ?? true,
      follow: seo?.enableSearchIndexing ?? true,
    },
  };
}

/**
 * Auto-generate JSON-LD Schema.org for Service detail page
 */
export function generateServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title.en,
    "description": service.desc.en,
    "provider": {
      "@type": "Organization",
      "name": "Omnix Network",
      "url": BASE_URL,
    },
    "serviceType": service.title.en,
    "image": service.image,
    "areaServed": "Global",
  };
}

/**
 * Auto-generate JSON-LD Schema.org for Blog / Article detail page
 */
export function generateArticleSchema(blog: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title.en,
    "description": blog.excerpt.en,
    "image": blog.image,
    "author": {
      "@type": "Person",
      "name": blog.author || "Omnix Network Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Omnix Network",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo-white.png`,
      },
    },
    "datePublished": blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
  };
}

/**
 * Auto-generate JSON-LD Schema.org for Portfolio / Case Study page
 */
export function generateCaseStudySchema(item: PortfolioItem) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": item.title.en,
    "description": item.details.en,
    "image": item.image,
    "author": {
      "@type": "Organization",
      "name": "Omnix Network",
      "url": BASE_URL,
    },
    "keywords": item.tag,
  };
}

/**
 * Auto-generate JSON-LD Schema.org for Package / Pricing page
 */
export function generatePackageSchema(pkg: PackageItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg.title.en,
    "description": pkg.desc.en,
    "brand": {
      "@type": "Brand",
      "name": "Omnix Network",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": pkg.price ? pkg.price.replace(/[^0-9.]/g, "") || "149" : "149",
      "availability": "https://schema.org/InStock",
    },
  };
}
