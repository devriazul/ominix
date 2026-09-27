import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "newsletter.json");

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    let subscribers: Array<{ email: string; date: string }> = [];
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      subscribers = JSON.parse(content);
    } catch {
      subscribers = [];
    }

    const exists = subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      subscribers.unshift({ email, date: new Date().toISOString() });
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
