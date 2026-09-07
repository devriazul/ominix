import { NextRequest, NextResponse } from "next/server";
import { getScheduleSettings, saveScheduleSettings } from "@/lib/db";
import { ScheduleSettings } from "@/lib/types";

export async function GET() {
  try {
    const settings = await getScheduleSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error in GET /api/schedules/settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ScheduleSettings;

    if (!Array.isArray(body.timeSlots) || body.timeSlots.length === 0) {
      return NextResponse.json(
        { error: "At least one time slot is required" },
        { status: 400 }
      );
    }

    const success = await saveScheduleSettings(body);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to save schedule settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, settings: body });
  } catch (error) {
    console.error("Error in POST /api/schedules/settings:", error);
    return NextResponse.json(
      { error: "Failed to update schedule settings" },
      { status: 500 }
    );
  }
}
