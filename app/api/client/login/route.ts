import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  verifyClientPassword,
  createClientSessionValue,
  CLIENT_SESSION_COOKIE,
  CLIENT_SESSION_MAX_AGE,
} from "@/lib/auth/client-session";

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

  const { data: row, error: dbErr } = await admin
    .from("clients")
    .select("id, email, full_name, password_hash")
    .eq("email", email)
    .not("password_hash", "is", null)
    .maybeSingle();

  if (dbErr) return NextResponse.json({ error: "Database error." }, { status: 500 });
  if (!row || !row.password_hash) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  if (!verifyClientPassword(password, row.password_hash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    CLIENT_SESSION_COOKIE,
    createClientSessionValue(row.id, row.email, row.full_name || "Client"),
    {
      httpOnly: true,
      maxAge: CLIENT_SESSION_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: origin.startsWith("https://"),
    }
  );
  return response;
}
