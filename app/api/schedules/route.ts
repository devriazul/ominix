import { NextRequest, NextResponse } from "next/server";
import {
  getSchedules,
  createSchedule,
  updateScheduleStatus,
  deleteSchedule,
  getScheduleSettings,
} from "@/lib/db";
import { ScheduleItem } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const schedules = await getSchedules();
    const settings = await getScheduleSettings();

    // If client asks for a specific date's booked slots
    if (date) {
      const bookedSlots = schedules
        .filter((s) => s.date === date && s.status !== "cancelled")
        .map((s) => s.timeSlot);
      return NextResponse.json({ bookedSlots, settings });
    }

    return NextResponse.json({ schedules, settings });
  } catch (error) {
    console.error("Error in GET /api/schedules:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, date, timeSlot, notes } = body;

    if (!name || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Name, phone, date, and time slot are required" },
        { status: 400 }
      );
    }

    // Check if slot is already booked
    const existing = await getSchedules();
    const isConflict = existing.some(
      (s) => s.date === date && s.timeSlot === timeSlot && s.status !== "cancelled"
    );

    if (isConflict) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another slot." },
        { status: 409 }
      );
    }

    const newBooking = await createSchedule({
      name,
      email: email || "",
      phone,
      service: service || "General Strategy Call",
      date,
      timeSlot,
      notes: notes || "",
    });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Error in POST /api/schedules:", error);
    return NextResponse.json(
      { error: "Failed to create appointment schedule" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const success = await updateScheduleStatus(id, status as ScheduleItem["status"]);
    if (!success) {
      return NextResponse.json(
        { error: "Schedule appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PATCH /api/schedules:", error);
    return NextResponse.json(
      { error: "Failed to update schedule status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const success = await deleteSchedule(id);
    if (!success) {
      return NextResponse.json(
        { error: "Schedule appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/schedules:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule appointment" },
      { status: 500 }
    );
  }
}
