import { NextResponse } from "next/server";
import { getSeoSettings, saveSeoSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSeoSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const success = await saveSeoSettings(data);
    if (success) {
      return NextResponse.json({ message: "SEO & Telemetry settings updated successfully", settings: data });
    }
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 });
  } catch (error) {
    console.error("Error updating SEO settings:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
