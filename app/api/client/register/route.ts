import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  hashClientPassword,
  createClientSessionValue,
  CLIENT_SESSION_COOKIE,
  CLIENT_SESSION_MAX_AGE,
} from "@/lib/auth/client-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin;

  let name: string, email: string, password: string;
  try {
    const body = await req.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim().toLowerCase();
    password = String(body.password || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Check if already registered
  const { data: existing } = await admin
    .from("clients")
    .select("id, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (existing?.password_hash) {
    return NextResponse.json({ error: "An account with this email already exists. Please sign in." }, { status: 409 });
  }

  const hash = hashClientPassword(password);

  let clientId: string;
  if (existing) {
    // Row exists (from a booking) — update with password + name
    const { data: updated } = await admin
      .from("clients")
      .update({ full_name: name, password_hash: hash })
      .eq("id", existing.id)
      .select("id")
      .single();
    clientId = updated?.id || existing.id;
  } else {
    const { data: created, error } = await admin
      .from("clients")
      .insert({ full_name: name, email, password_hash: hash })
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: "Could not create account." }, { status: 500 });
    clientId = created.id;
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    CLIENT_SESSION_COOKIE,
    createClientSessionValue(clientId, email, name),
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
