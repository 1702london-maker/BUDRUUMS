import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function notifyHtml(name: string, email: string, website: string, audience: string, id: string, secret: string) {
  const base = "https://budruum.co.uk/api/referral/action";
  const approveUrl = `${base}?secret=${secret}&action=approve&id=${id}`;
  const rejectUrl = `${base}?secret=${secret}&action=reject&id=${id}`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>New Referral Application - Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Referral Application</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">A new referral programme application has been submitted.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;margin-bottom:32px;">
      ${[["Name", name], ["Email", email], ["Website / Platform", website || "Not provided"], ["Audience Description", audience || "Not provided"]].map((r, i) => `
      <tr style="${i > 0 ? "border-top:1px solid #E8E8E8;" : ""}background:${i % 2 === 0 ? LIGHT : "#fff"};">
        <td style="padding:13px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:180px;">${r[0]}</td>
        <td style="padding:13px 20px;font-size:14px;color:${GREY};line-height:1.65;">${r[1]}</td>
      </tr>`).join("")}
    </table>
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:12px;"><a href="${approveUrl}" style="display:inline-block;padding:13px 28px;background:#22c55e;color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:4px;">Approve</a></td>
      <td><a href="${rejectUrl}" style="display:inline-block;padding:13px 28px;background:#fff;color:#ef4444;font-size:14px;font-weight:600;text-decoration:none;border-radius:4px;border:1px solid #fecaca;">Reject</a></td>
    </tr></table>
    <p style="margin:24px 0 0;font-size:12px;color:#B0B0B0;">Clicking Approve sends login credentials to the partner automatically.</p>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;">Budruum Ltd &middot; budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function confirmationHtml(name: string, email: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Application Received - Budruum Referral Programme</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:0;">
    <div style="height:3px;background:${TERRACOTTA};"></div>
    <div style="padding:40px 48px 36px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
      <p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Referral Programme</p>
    </div>
  </td></tr>
  <tr><td style="padding:48px 48px 32px;">
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">Application<br/><em style="font-style:italic;color:${TERRACOTTA};">received.</em></h1>
    <p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Dear ${name.split(" ")[0]},</p>
    <p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Thank you for applying to the Budruum Referral Programme. Your application is under review and we aim to respond within <strong style="color:${DARK};">1 working day</strong>.</p>
    <p style="margin:0 0 36px;font-size:15.5px;color:${GREY};line-height:1.85;">If approved, you will receive your login credentials and unique referral link by email. In the meantime, familiarise yourself with our services at <a href="https://budruum.co.uk/services" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk/services</a>.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:36px;">
      <tr><td style="padding:28px 32px;">
        <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">What Happens Next</p>
        ${[
          ["Review", "We review every application carefully within 1 working day"],
          ["Approval email", "If approved, we send your login credentials and referral link"],
          ["Start earning", "Share your link &mdash; earn 10% on every referred client who converts"],
        ].map(([title, desc]) => `
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;">
          <tr>
            <td style="width:10px;vertical-align:top;">
              <div style="width:6px;height:6px;border-radius:50%;background:${TERRACOTTA};margin-top:7px;"></div>
            </td>
            <td style="padding-left:14px;">
              <p style="margin:0 0 2px;font-size:14px;font-weight:500;color:${DARK};">${title}</p>
              <p style="margin:0;font-size:13px;color:${GREY};line-height:1.6;">${desc}</p>
            </td>
          </tr>
        </table>`).join("")}
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;color:${GREY};">Questions? Email us at <a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a></p>
  </td></tr>
  <tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};">
    <p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p>
    <p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p>
    <p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p>
  </td></tr>
  <tr><td style="padding:16px 48px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#C0C0C0;line-height:1.6;">Budruum Ltd &middot; Registered in England &amp; Wales &middot; budruum.co.uk<br/>You applied to our referral programme at ${email}</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

async function sendEmail(from: string, to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html }),
  });
}

export async function POST(req: NextRequest) {
  const { name, email, website, audience } = await req.json();
  if (!name || !email) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const webhookSecret = process.env.WEBHOOK_SECRET || "";
  if (!serviceKey)
    return NextResponse.json({ success: false, error: "Referral applications are temporarily unavailable." }, { status: 500 });

  const supabase = createClient("https://padfgbudntpmzfnuiupt.supabase.co", serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Save to Supabase and get the row id
  const { data: inserted, error: dbError } = await supabase
    .from("referral_applications")
    .insert({ name, email, website: website || null, audience: audience || null })
    .select("id")
    .single();

  if (dbError) console.error("Supabase insert error:", dbError.message);

  const rowId = inserted?.id || "";

  // Notify admin with Approve / Reject buttons
  await sendEmail(
    "Budruum <booking@budruum.co.uk>",
    "booking@budruum.co.uk",
    `New Referral Application - ${name}`,
    notifyHtml(name, email, website, audience, rowId, webhookSecret),
    email
  );

  // Confirm to applicant
  await sendEmail(
    "Budruum Referral Programme <booking@budruum.co.uk>",
    email,
    "Application received - Budruum Referral Programme",
    confirmationHtml(name, email)
  );

  return NextResponse.json({ success: true });
}
