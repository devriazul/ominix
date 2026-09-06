import { NextRequest, NextResponse } from "next/server";
import { addEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getEnquiries();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, details } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required" },
        { status: 400 }
      );
    }

    const created = await addEnquiry({
      name,
      email: email || "",
      phone,
      service: service || "General Inquiry",
      details: details || "",
    });

    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteEnquiry(id);
    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
  }
}
