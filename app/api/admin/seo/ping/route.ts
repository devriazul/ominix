import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omnixnetwork.com";
    const sitemapUrl = `${baseUrl}/sitemap.xml`;

    // Google & Bing Sitemap Ping URLs
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    const results = {
      google: "Sent request to Google Search Console ping service",
      bing: "Sent request to Bing Webmaster ping service",
      sitemapUrl,
      timestamp: new Date().toISOString(),
    };

    // Execute background ping requests
    try {
      await Promise.allSettled([
        fetch(googlePingUrl, { method: "GET" }),
        fetch(bingPingUrl, { method: "GET" }),
      ]);
    } catch (err) {
      console.log("Ping dispatch executed:", err);
    }

    return NextResponse.json({
      message: "Instant search engine crawl ping successfully dispatched!",
      details: results,
    });
  } catch (error) {
    console.error("Error pinging search engines:", error);
    return NextResponse.json({ error: "Failed to dispatch crawl request" }, { status: 500 });
  }
}
