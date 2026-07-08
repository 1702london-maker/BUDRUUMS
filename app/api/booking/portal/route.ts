import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getClientSession, verifyClientSessionToken } from "@/lib/auth/client-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function GET(req: NextRequest) {
  // Accept Bearer token (mobile app) or httpOnly cookie (web)
  const authHeader = req.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const session = bearerToken ? verifyClientSessionToken(bearerToken) : await getClientSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: bookings } = await admin
    .from("bookings")
    .select("id, service, service_label, session_type, date, time, status, notes, created_at")
    .eq("email", session.email)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    user: { email: session.email, name: session.name },
    bookings: bookings || [],
  });
}
