import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function verifyUser(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!auth || !anon) return null;
  const client = createClient(SUPABASE_URL, anon, { global: { headers: { Authorization: auth } } });
  const { data } = await client.auth.getUser();
  return data.user || null;
}

export async function GET(req: NextRequest) {
  const user = await verifyUser(req);
  const admin = serviceClient();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const email = user.email || "";

  const tables = ["booking_sessions", "bookings", "consultation_bookings", "booking_requests"];
  let bookings: any[] = [];
  for (const table of tables) {
    try {
      const { data } = await admin.from(table).select("*").eq("email", email).order("created_at", { ascending: false }).limit(10);
      if (data && data.length) { bookings = data; break; }
    } catch {}
  }

  return NextResponse.json({
    user: { email, name: user.user_metadata?.name || "Client" },
    bookings,
  });
}

export async function POST(req: NextRequest) {
  const user = await verifyUser(req);
  const admin = serviceClient();
  if (!user || !admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const email = user.email || "";
  const body = await req.json();

  const record = {
    email,
    note: body.note || "",
    file_names: body.file_names || [],
    created_at: new Date().toISOString(),
  };

  const tables = ["client_documents", "booking_documents", "portal_documents"];
  for (const table of tables) {
    try {
      const { error } = await admin.from(table).insert(record);
      if (!error) return NextResponse.json({ success: true, table });
    } catch {}
  }

  return NextResponse.json({ success: true, stored: false });
}
