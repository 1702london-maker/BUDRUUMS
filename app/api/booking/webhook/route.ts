import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateClientPassword, hashClientPassword } from "@/lib/auth/client-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";
const DARK = "#1A1A1A";
const TERRACOTTA = "#A88F84";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function credentialsHtml(name: string, email: string, password: string, service: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Your Budruum Client Portal Access</title></head><body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;"><tr><td align="center"><table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);"><tr><td style="background:${DARK};padding:0;"><div style="height:3px;background:${TERRACOTTA};"></div><div style="padding:40px 48px 36px;"><p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p><p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Your Client Portal</p></div></td></tr><tr><td style="padding:48px 48px 32px;"><h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">Your consultation is confirmed,<br/><em style="font-style:italic;color:${TERRACOTTA};">${name.split(" ")[0]}.</em></h1><p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Your <strong>${service}</strong> consultation has been confirmed. We have created your client portal where you can track your session, view documents, and manage future bookings.</p><table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:32px;"><tr><td style="padding:28px 32px;"><p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Your Portal Login</p>${[["Portal URL","<a href='https://budruum.co.uk/booking/portal' style='color:#A88F84;text-decoration:none;'>budruum.co.uk/booking/portal</a>"],["Email",email],["Password",`<strong style="font-family:monospace;font-size:16px;letter-spacing:.08em;color:#1A1A1A;">${password}</strong>`]].map(([label,val])=>`<table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;border-bottom:1px solid #E8E8E8;padding-bottom:14px;"><tr><td style="width:140px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${GREY};vertical-align:top;padding-top:2px;">${label}</td><td style="font-size:14px;color:${DARK};line-height:1.6;">${val}</td></tr></table>`).join("")}<p style="margin:8px 0 0;font-size:12px;color:${GREY};">Keep this email safe. Contact booking@budruum.co.uk for help.</p></td></tr></table><table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td style="border-radius:4px;background:${DARK};"><a href="https://budruum.co.uk/booking/portal" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.04em;">Go to Client Portal &rarr;</a></td></tr></table></td></tr><tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};"><p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p><p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p><p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p></td></tr></table></td></tr></table></body></html>`;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const record = body.record;
  const oldRecord = body.old_record;

  if (
    body.type !== "UPDATE" ||
    record?.status !== "confirmed" ||
    oldRecord?.status === "confirmed"
  ) {
    return NextResponse.json({ skipped: true });
  }

  const email = record?.email;
  const name = record?.full_name || record?.name || "Client";
  const service = record?.service_label || record?.service || "Consultation";
  const bookingId = record?.id;

  if (!email) return NextResponse.json({ error: "No email on booking record" }, { status: 400 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "No service key" }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Check if client already has credentials
  const { data: existingClient } = await admin
    .from("clients")
    .select("id, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  // If already has password_hash, skip — don't overwrite credentials
  if (existingClient?.password_hash) {
    return NextResponse.json({ skipped: true, reason: "client_already_has_credentials" });
  }

  const plainPassword = generateClientPassword();
  const passwordHash = hashClientPassword(plainPassword);

  if (existingClient) {
    // Update existing client row
    await admin.from("clients").update({ password_hash: passwordHash }).eq("id", existingClient.id);
  } else {
    // Create new client row
    await admin.from("clients").insert({
      email,
      full_name: name,
      password_hash: passwordHash,
    });
  }

  // Send credentials email
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Budruum <booking@budruum.co.uk>",
        to: [email],
        subject: "Your consultation is confirmed — Client Portal Access",
        html: credentialsHtml(name, email, plainPassword, service),
      }),
    });
  }

  return NextResponse.json({ success: true });
}
