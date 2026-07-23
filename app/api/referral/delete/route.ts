import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getReferralSession, REFERRAL_SESSION_COOKIE } from "@/lib/auth/referral-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function POST() {
  const session = await getReferralSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await admin.from("referral_applications").delete().eq("id", session.id);
  if (error) return NextResponse.json({ error: "Unable to delete account." }, { status: 500 });

  const response = NextResponse.json({ success: true, message: "Your referral account has been deleted." });
  response.cookies.set(REFERRAL_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
