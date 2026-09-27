import { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omnixnetwork.com";

  const allowIndexing = seo ? seo.enableSearchIndexing : true;

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing ? ["/admin/", "/api/admin/"] : "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
