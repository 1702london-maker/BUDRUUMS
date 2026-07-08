import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  generateReferralPassword,
  hashReferralPassword,
} from "@/lib/auth/referral-session";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://padfgbudntpmzfnuiupt.supabase.co";
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const RESEND_KEY = process.env.RESEND_API_KEY || "";

const DARK = "#1A1A1A";
const TERRACOTTA = "#A88F84";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

const admin = SERVICE_ROLE
  ? createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-key") === ADMIN_SECRET;
}

function generateReferralCode(name: string): string {
  const slug = (name || "partner").split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BUD-${slug}-${suffix}`;
}

function credentialsHtml(name: string, email: string, password: string, referralCode: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Welcome - Your Budruum Referral Credentials</title></head><body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);"><tr><td style="background:${DARK};padding:0;"><div style="height:3px;background:${TERRACOTTA};"></div><div style="padding:40px 48px 36px;"><p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p><p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Referral Partner Credentials</p></div></td></tr><tr><td style="padding:48px 48px 32px;"><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">You&rsquo;re approved,<br/><em style="font-style:italic;color:${TERRACOTTA};">${name.split(" ")[0]}.</em></h1><p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Welcome to the Budruum Referral Programme. Your application has been approved. Below are your login credentials and unique referral code.</p><table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:32px;"><tr><td style="padding:28px 32px;"><p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Your Login Details</p>${[["Portal URL", '<a href="https://budruum.co.uk/referral-portal" style="color:#A88F84;text-decoration:none;">budruum.co.uk/referral-portal</a>'],["Email", email],["Password", `<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#1A1A1A;">${password}</strong>`],["Referral Code", `<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#A88F84;">${referralCode}</strong>`],].map(([label, val]) => `<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-bottom:1px solid #E8E8E8;padding-bottom:14px;"><tr><td style="width:140px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${GREY};vertical-align:top;padding-top:2px;">${label}</td><td style="font-size:14px;color:${DARK};line-height:1.6;">${val}</td></tr></table>`).join("")}<p style="margin:8px 0 0;font-size:12px;color:${GREY};">Please keep this email safe. If you lose access, contact booking@budruum.co.uk.</p></td></tr></table><table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td style="border-radius:4px;background:${DARK};"><a href="https://budruum.co.uk/referral-portal" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.04em;">Go to Referral Portal &rarr;</a></td></tr></table></td></tr><tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};"><p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p><p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p><p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p></td></tr></table></td></tr></table></body></html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_KEY) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({ from: "Budruum Referral Programme <booking@budruum.co.uk>", to: [to], subject, html }),
  });
}

async function approveApplication(id: string) {
  if (!admin) throw new Error("Missing Supabase service role key");
  if (!RESEND_KEY) throw new Error("Missing Resend API key");

  const { data, error } = await admin
    .from("referral_applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Application not found");
  if (data.status === "approved") throw new Error("Already approved");

  const name = data.name as string;
  const email = data.email as string;

  // Generate password and hash — no Supabase auth user needed
  const plainPassword = generateReferralPassword();
  const passwordHash = hashReferralPassword(plainPassword);
  const referralCode = generateReferralCode(name);

  // Store hash + set approved in one update (triggers webhook which will skip due to password_hash being set)
  const { error: updateError } = await admin
    .from("referral_applications")
    .update({
      status: "approved",
      password_hash: passwordHash,
      referral_code: referralCode,
      approved_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  // Send credentials email with the plain password
  await sendEmail(
    email,
    "You're approved — Budruum Referral Partner Credentials",
    credentialsHtml(name, email, plainPassword, referralCode)
  );

  return { referralCode };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!admin) return NextResponse.json({ error: "Missing service role key" }, { status: 500 });
  const { data, error } = await admin
    .from("referral_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  try {
    if (status === "approved") {
      const out = await approveApplication(id);
      return NextResponse.json({ success: true, ...out });
    }
    if (!admin) return NextResponse.json({ error: "Missing service role key" }, { status: 500 });
    const { error } = await admin.from("referral_applications").update({ status }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
