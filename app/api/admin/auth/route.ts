import { NextResponse } from "next/server";
import { getAdminConfig } from "@/lib/db";
import { isAuthenticated, setAdminSession } from "@/lib/auth";

export async function GET() {
  const auth = await isAuthenticated();
  return NextResponse.json({ authenticated: auth });
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const config = await getAdminConfig();

    if (username === config.username && password === config.password) {
      await setAdminSession(username);
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
