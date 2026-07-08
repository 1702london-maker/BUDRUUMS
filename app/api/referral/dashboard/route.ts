import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function pickFirst<T>(tries: Array<() => Promise<T | null>>) {
  for (const fn of tries) {
    try {
      const out = await fn();
      if (out) return out;
    } catch {}
  }
  return null;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const admin = serviceClient();
  if (!auth || !anon || !admin) return NextResponse.json({ error: "Unavailable" }, { status: 500 });

  const authClient = createClient(SUPABASE_URL, anon, { global: { headers: { Authorization: auth } } });
  const { data: userData } = await authClient.auth.getUser();
  const user = userData.user;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = user.email || "";
  const profile = await pickFirst([
    async () => {
      const { data } = await admin.from("referral_applications").select("*").eq("email", email).maybeSingle();
      return data as any;
    },
  ]);

  return NextResponse.json({
    user: {
      email,
      name: user.user_metadata?.name || profile?.name || "Partner",
      referral_code: user.user_metadata?.referral_code || profile?.referral_code || "BUD-XXXX",
    },
    profile,
    metrics: {
      clicks: profile?.clicks ?? profile?.total_clicks ?? profile?.visits ?? 0,
      conversions: profile?.conversions ?? profile?.sales ?? 0,
      earnings: profile?.earnings ?? profile?.commission_total ?? 0,
      payout_status: profile?.payout_status ?? profile?.status ?? "Pending",
    },
    recent: profile?.recent_referrals ?? profile?.referrals ?? [],
  });
}
