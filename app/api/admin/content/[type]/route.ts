import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getSiteSettings,
  saveSiteSettings,
  getTranslations,
  saveTranslations,
  getServices,
  saveServices,
  getPackages,
  savePackages,
  getPortfolio,
  savePortfolio,
  getBlogs,
  saveBlogs,
  getTestimonials,
  saveTestimonials,
  getFaqs,
  saveFaqs,
  getClients,
  saveClients,
  getAdminConfig,
  updateAdminConfig,
} from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  switch (type) {
    case "settings":
      return NextResponse.json(await getSiteSettings());
    case "translations":
      return NextResponse.json(await getTranslations());
    case "services":
      return NextResponse.json(await getServices());
    case "packages":
      return NextResponse.json(await getPackages());
    case "portfolio":
      return NextResponse.json(await getPortfolio());
    case "blogs":
      return NextResponse.json(await getBlogs());
    case "testimonials":
      return NextResponse.json(await getTestimonials());
    case "faqs":
      return NextResponse.json(await getFaqs());
    case "clients":
      return NextResponse.json(await getClients());
    default:
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type } = await params;
  const body = await req.json();

  let success = false;
  switch (type) {
    case "settings":
      success = await saveSiteSettings(body);
      break;
    case "translations":
      success = await saveTranslations(body);
      break;
    case "services":
      success = await saveServices(body);
      break;
    case "packages":
      success = await savePackages(body);
      break;
    case "portfolio":
      success = await savePortfolio(body);
      break;
    case "blogs":
      success = await saveBlogs(body);
      break;
    case "testimonials":
      success = await saveTestimonials(body);
      break;
    case "faqs":
      success = await saveFaqs(body);
      break;
    case "clients":
      success = await saveClients(body);
      break;
    case "account":
      success = await updateAdminConfig(body);
      break;
    default:
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  if (success) {
    return NextResponse.json({ success: true, message: `${type} updated successfully` });
  } else {
    return NextResponse.json({ error: `Failed to update ${type}` }, { status: 500 });
  }
}
