import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ success: false, error: "Missing credentials" }, { status: 400 });

  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseKey)
    return NextResponse.json({ success: false, error: "Referral login is temporarily unavailable." }, { status: 500 });

  const supabase = createClient("https://padfgbudntpmzfnuiupt.supabase.co", supabaseKey);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session)
    return NextResponse.json({ success: false, error: "Invalid email or password." }, { status: 401 });

  // Check user is a referral partner
  const role = data.user?.user_metadata?.role;
  if (role !== "referral_partner")
    return NextResponse.json({ success: false, error: "This account does not have referral partner access." }, { status: 403 });

  return NextResponse.json({ success: true, user: { email: data.user.email, name: data.user.user_metadata?.name } });
}
