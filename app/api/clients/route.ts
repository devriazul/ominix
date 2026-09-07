import { NextResponse } from "next/server";
import { getClients } from "@/lib/db";

export async function GET() {
  try {
    const clients = await getClients();
    // Return active clients sorted by order
    const activeClients = clients
      .filter((c) => c.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json(activeClients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}
