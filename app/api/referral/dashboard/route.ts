import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getReferralSession } from "@/lib/auth/referral-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function GET(_req: NextRequest) {
  const session = await getReferralSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: profile } = await admin
    .from("referral_applications")
    .select("*")
    .eq("id", session.id)
    .maybeSingle();

  return NextResponse.json({
    user: {
      email: session.email,
      name: session.name,
      referral_code: session.code,
    },
    metrics: {
      clicks: profile?.clicks ?? 0,
      conversions: profile?.conversions ?? 0,
      earnings: profile?.earnings ?? 0,
      payout_status: "Pending",
    },
    recent: [],
  });
}
