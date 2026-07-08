import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  generateReferralPassword,
  hashReferralPassword,
} from "@/lib/auth/referral-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";
const DARK = "#1A1A1A";
const TERRACOTTA = "#A88F84";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function generateReferralCode(name: string): string {
  const slug = (name || "partner").split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BUD-${slug}-${suffix}`;
}

function credentialsHtml(name: string, email: string, password: string, referralCode: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Welcome - Your Budruum Referral Credentials</title></head><body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);"><tr><td style="background:${DARK};padding:0;"><div style="height:3px;background:${TERRACOTTA};"></div><div style="padding:40px 48px 36px;"><p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p><p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Referral Partner Credentials</p></div></td></tr><tr><td style="padding:48px 48px 32px;"><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">You&rsquo;re approved,<br/><em style="font-style:italic;color:${TERRACOTTA};">${name.split(" ")[0]}.</em></h1><p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Welcome to the Budruum Referral Programme. Your application has been approved. Below are your login credentials and unique referral code.</p><table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:32px;"><tr><td style="padding:28px 32px;"><p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Your Login Details</p>${[["Portal URL","<a href='https://budruum.co.uk/referral-portal' style='color:#A88F84;text-decoration:none;'>budruum.co.uk/referral-portal</a>"],["Email",email],["Password",`<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#1A1A1A;">${password}</strong>`],["Referral Code",`<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#A88F84;">${referralCode}</strong>`]].map(([label,val])=>`<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-bottom:1px solid #E8E8E8;padding-bottom:14px;"><tr><td style="width:140px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${GREY};vertical-align:top;padding-top:2px;">${label}</td><td style="font-size:14px;color:${DARK};line-height:1.6;">${val}</td></tr></table>`).join("")}<p style="margin:8px 0 0;font-size:12px;color:${GREY};">Keep this email safe. Contact booking@budruum.co.uk if you need help.</p></td></tr></table><table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td style="border-radius:4px;background:${DARK};"><a href="https://budruum.co.uk/referral-portal" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.04em;">Go to Referral Portal &rarr;</a></td></tr></table></td></tr><tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};"><p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p><p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p><p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p></td></tr></table></td></tr></table></body></html>`;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const record = body.record;
  const oldRecord = body.old_record;

  // Only act on pending → approved transition
  if (
    body.type !== "UPDATE" ||
    record?.status !== "approved" ||
    oldRecord?.status === "approved"
  ) {
    return NextResponse.json({ skipped: true });
  }

  // Already processed — password hash already stored
  if (record?.password_hash) {
    return NextResponse.json({ skipped: true, reason: "already_processed" });
  }

  const { id, name, email } = record;
  if (!email || !name) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "No service key" }, { status: 500 });

  const adminClient = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Generate password and referral code
  const plainPassword = generateReferralPassword();
  const passwordHash = hashReferralPassword(plainPassword);
  const referralCode = generateReferralCode(name);

  // Store hash and referral code in the row
  await adminClient
    .from("referral_applications")
    .update({
      password_hash: passwordHash,
      referral_code: referralCode,
      approved_at: new Date().toISOString(),
    })
    .eq("id", id);

  // Send credentials email
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Budruum Referral Programme <booking@budruum.co.uk>",
        to: [email],
        subject: "You're approved — Budruum Referral Partner Credentials",
        html: credentialsHtml(name, email, plainPassword, referralCode),
      }),
    });
  }

  return NextResponse.json({ success: true, referralCode });
}
