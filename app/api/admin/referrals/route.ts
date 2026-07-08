import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function formatError(err: unknown): string {
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    const e = err as Record<string, unknown>;
    const message = e.message;
    if (typeof message === "string" && message.trim()) return message;
    const error = e.error;
    if (typeof error === "string" && error.trim()) return error;
    if (error && typeof error === "object") return formatError(error);
    const ownProps = Object.getOwnPropertyNames(err as object);
    for (const prop of ownProps) {
      const value = (err as Record<string, unknown>)[prop];
      if (typeof value === "string" && value.trim()) return value;
      if (value && typeof value === "object") {
        const nested = formatError(value);
        if (nested && nested !== "[object Object]" && nested !== "{}") return nested;
      }
    }
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}") return json;
    } catch {}
  }
  return String(err);
}

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-key") === ADMIN_SECRET;
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function generateReferralCode(name: string): string {
  const slug = (name || "partner").split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BUD-${slug}-${suffix}`;
}

function stageError(stage: string, message: string) {
  return Object.assign(new Error(message), { stage });
}

function credentialsHtml(name: string, email: string, password: string, referralCode: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Welcome - Your Budruum Referral Credentials</title></head><body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);"><tr><td style="background:${DARK};padding:0;"><div style="height:3px;background:${TERRACOTTA};"></div><div style="padding:40px 48px 36px;"><p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p><p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Referral Partner Credentials</p></div></td></tr><tr><td style="padding:48px 48px 32px;"><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">You&rsquo;re approved,<br/><em style="font-style:italic;color:${TERRACOTTA};">${name.split(" ")[0]}.</em></h1><p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Welcome to the Budruum Referral Programme. Your application has been approved. Below are your login credentials and unique referral code.</p><table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:32px;"><tr><td style="padding:28px 32px;"><p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Your Login Details</p>${[["Portal URL", '<a href="https://budruum.co.uk/referral-portal" style="color:#A88F84;text-decoration:none;">budruum.co.uk/referral-portal</a>'],["Email", email],["Password", `<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#1A1A1A;">${password}</strong>`],["Referral Code", `<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#A88F84;">${referralCode}</strong>`],].map(([label, val]) => `<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-bottom:1px solid #E8E8E8;padding-bottom:14px;"><tr><td style="width:140px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${GREY};vertical-align:top;padding-top:2px;">${label}</td><td style="font-size:14px;color:${DARK};line-height:1.6;">${val}</td></tr></table>`).join("")}<p style="margin:8px 0 0;font-size:12px;color:${GREY};">Please change your password after your first login.</p></td></tr></table><table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:32px;"><tr><td style="padding:24px 32px;"><p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">How to Earn</p>${[["10% commission", "On every client who places an order after clicking your referral link"],["30-day cookie", "You get credit even if they return days later &mdash; tracked for 30 days"],["Monthly payouts", "Paid on the 15th of every month via UK bank transfer"],].map(([title, desc]) => `<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;"><tr><td style="width:10px;vertical-align:top;"><div style="width:6px;height:6px;border-radius:50%;background:${TERRACOTTA};margin-top:7px;"></div></td><td style="padding-left:12px;"><p style="margin:0 0 2px;font-size:14px;font-weight:500;color:${DARK};">${title}</p><p style="margin:0;font-size:13px;color:${GREY};line-height:1.6;">${desc}</p></td></tr></table>`).join("")}</td></tr></table><table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td style="border-radius:4px;background:${DARK};"><a href="https://budruum.co.uk/referral-portal" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.04em;">Go to Referral Portal &rarr;</a></td></tr></table></td></tr><tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};"><p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p><p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p><p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p></td></tr></table></td></tr></table></body></html>`;
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
  let stage = "start";
  if (!admin) throw stageError(stage, "Missing Supabase service role key");
  if (!RESEND_KEY) throw stageError(stage, "Missing Resend API key");
  stage = "load-application";
  const { data, error } = await admin.from("referral_applications").select("*").eq("id", id).maybeSingle();
  if (error) throw stageError(stage, error.message);
  if (!data) throw stageError(stage, "Application not found");

  const name = data.name as string;
  const email = data.email as string;
  const password = generatePassword();
  const referralCode = generateReferralCode(name);

  let supabaseUid = data.supabase_uid ?? null;
  stage = "find-auth-user";
  const { data: usersData, error: usersError } = await admin.auth.admin.listUsers();
  if (usersError) throw stageError(stage, formatError(usersError));
  const existing = usersData.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());

  if (existing?.id) {
    supabaseUid = existing.id;
    stage = "update-existing-auth-user";
    const { error: updateUserError } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { name, role: "referral_partner", referral_code: referralCode },
    });
    if (updateUserError) throw stageError(stage, updateUserError.message);
  } else {
    stage = "create-auth-user";
    const { data: userData, error: createUserError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "referral_partner", referral_code: referralCode },
    });
    if (createUserError) throw stageError(stage, createUserError.message);
    supabaseUid = userData?.user?.id ?? null;
  }

  stage = "update-application-row";
  await admin.from("referral_applications").update({
    status: "approved",
    supabase_uid: supabaseUid,
    referral_code: referralCode,
    approved_at: new Date().toISOString(),
  }).eq("id", id);

  stage = "send-email";
  await sendEmail(email, "You're approved - Budruum Referral Partner Credentials", credentialsHtml(name, email, password, referralCode));
  return { referralCode };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!admin) return NextResponse.json({ error: "Missing service role key" }, { status: 500 });
  const { data, error } = await admin.from("referral_applications").select("*").order("created_at", { ascending: false });
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
    console.error("Referral approval failed", err);
    const stage = err && typeof err === "object" && "stage" in err ? String((err as Record<string, unknown>).stage) : "unknown";
    const details = err && typeof err === "object"
      ? {
          name: (err as Record<string, unknown>).name ?? "UnknownError",
          message: formatError(err),
          keys: Object.getOwnPropertyNames(err as object),
        }
      : { name: "UnknownError", message: formatError(err), keys: [] };
    return NextResponse.json({
      error: "Referral approval failed",
      stage,
      details,
    }, { status: 500 });
  }
}
