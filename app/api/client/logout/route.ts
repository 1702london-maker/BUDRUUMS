import { NextResponse } from "next/server";
import { CLIENT_SESSION_COOKIE } from "@/lib/auth/client-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CLIENT_SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
