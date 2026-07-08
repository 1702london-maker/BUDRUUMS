import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  verifyReferralPassword,
  createReferralSessionValue,
  REFERRAL_SESSION_COOKIE,
  REFERRAL_SESSION_MAX_AGE,
} from "@/lib/auth/referral-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin;

  let email: string, password: string;
  try {
    const body = await req.json();
    email = String(body.email || "").trim().toLowerCase();
    password = String(body.password || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: rows, error: dbErr } = await admin
    .from("referral_applications")
    .select("id, email, name, referral_code, status, password_hash")
    .eq("email", email)
    .eq("status", "approved")
    .not("password_hash", "is", null)
    .order("approved_at", { ascending: false })
    .limit(1);

  if (dbErr) return NextResponse.json({ error: "Database error." }, { status: 500 });

  const row = rows?.[0] ?? null;
  if (!row || !row.password_hash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!verifyReferralPassword(password, row.password_hash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    REFERRAL_SESSION_COOKIE,
    createReferralSessionValue(row.id, row.email, row.referral_code || "BUD-XXXX", row.name || "Partner"),
    {
      httpOnly: true,
      maxAge: REFERRAL_SESSION_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: origin.startsWith("https://"),
    }
  );
  return response;
}
