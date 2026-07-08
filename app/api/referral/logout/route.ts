import { NextResponse } from "next/server";
import { REFERRAL_SESSION_COOKIE } from "@/lib/auth/referral-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(REFERRAL_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
