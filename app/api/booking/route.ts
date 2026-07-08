import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";
const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function notifyHtml(d: Record<string, string>, bookingId: string, secret: string) {
  const base = "https://budruum.co.uk/api/booking/action";
  const confirmUrl = `${base}?secret=${secret}&action=confirm&id=${bookingId}`;
  const cancelUrl = `${base}?secret=${secret}&action=cancel&id=${bookingId}`;
  const rows = [
    ["Service", d.service],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "Not provided"],
    ["Business Stage", d.stage || "Not specified"],
    ["Budget", d.budget || "Not specified"],
    ["Message", d.message || "-"],
  ];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>New Booking - Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Consultation Booking</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">A new consultation has been booked. Click <strong>Confirm</strong> to send the client their portal login credentials.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;margin-bottom:32px;">
      ${rows.map((r, i) => `<tr style="${i > 0 ? "border-top:1px solid #E8E8E8;" : ""}background:${i % 2 === 0 ? LIGHT : "#fff"};">
        <td style="padding:13px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:150px;">${r[0]}</td>
        <td style="padding:13px 20px;font-size:14px;color:${GREY};line-height:1.65;">${r[1]}</td>
      </tr>`).join("")}
    </table>
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:12px;"><a href="${confirmUrl}" style="display:inline-block;padding:13px 28px;background:#22c55e;color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:4px;">Confirm Booking</a></td>
      <td><a href="${cancelUrl}" style="display:inline-block;padding:13px 28px;background:#fff;color:#ef4444;font-size:14px;font-weight:600;text-decoration:none;border-radius:4px;border:1px solid #fecaca;">Cancel</a></td>
    </tr></table>
    <p style="margin:20px 0 0;font-size:12px;color:#B0B0B0;">Confirming sends the client their portal password automatically.</p>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;">Budruum Ltd &middot; budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function confirmHtml(name: string, service: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Booking Received - Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">Consultation Request Received</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${DARK};">Your request is in, ${name.split(" ")[0]}.</h2>
    <p style="margin:0 0 16px;font-size:15px;color:${GREY};line-height:1.8;">Thank you for booking a <strong style="color:${DARK};">${service}</strong> consultation with Budruum. We will review your request and get back to you within <strong style="color:${DARK};">24 hours</strong> to confirm.</p>
    <p style="margin:0 0 32px;font-size:15px;color:${GREY};line-height:1.8;">Once confirmed, you will receive your client portal login so you can track your session and share documents securely.</p>
    <div style="padding:20px 24px;background:${LIGHT};border-radius:6px;border:1px solid #E8E8E8;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${TERRACOTTA};">What happens next</p>
      ${["We review your brief and confirm a time slot within 24 hours","You receive your portal login and a calendar invite","Your session runs, focused and actionable"].map(s => `<p style="margin:8px 0 0;font-size:14px;color:${GREY};line-height:1.7;padding-left:14px;border-left:2px solid ${TERRACOTTA};">${s}</p>`).join("")}
    </div>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;">
    <p style="margin:0 0 4px;font-size:13px;color:${DARK};font-weight:500;">The Budruum Team</p>
    <p style="margin:0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> &middot; budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, service, phone, stage, budget, message } = data;
  if (!name || !email || !service) {
    return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const webhookSecret = process.env.WEBHOOK_SECRET || "";

  if (!resendKey) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  // Save to Supabase — upsert client, insert booking
  let bookingId = "";
  if (serviceKey) {
    const admin = createClient(SUPABASE_URL, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Upsert client by email
    const { data: existingClient } = await admin
      .from("clients")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (!existingClient) {
      await admin.from("clients").insert({
        email: email.toLowerCase().trim(),
        full_name: name,
        phone: phone || null,
      });
    }

    // Insert booking
    const { data: booking } = await admin
      .from("bookings")
      .insert({
        email: email.toLowerCase().trim(),
        full_name: name,
        service: service,
        service_label: service,
        phone: phone || null,
        message: message || null,
        status: "pending",
        notes: [stage && `Stage: ${stage}`, budget && `Budget: ${budget}`].filter(Boolean).join(" | ") || null,
      })
      .select("id")
      .single();

    bookingId = booking?.id || "";
  }

  // Admin notification with Confirm / Cancel buttons
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
    body: JSON.stringify({
      from: "Budruum Bookings <booking@budruum.co.uk>",
      to: ["booking@budruum.co.uk"],
      reply_to: email,
      subject: `New Booking: ${service} - ${name}`,
      html: notifyHtml(data, bookingId, webhookSecret),
    }),
  });

  // Client confirmation
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
    body: JSON.stringify({
      from: "Budruum <booking@budruum.co.uk>",
      to: [email],
      subject: "Your consultation request is in - Budruum",
      html: confirmHtml(name, service),
    }),
  });

  return NextResponse.json({ success: true });
}
