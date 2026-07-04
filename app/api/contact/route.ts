import { NextRequest, NextResponse } from "next/server";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function emailHtml(name: string, service: string, message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>New Enquiry â€” Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <!-- Header -->
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Website Enquiry</p>
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">You have received a new contact form submission from <strong>${name}</strong>.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;">
      <tr style="background:${LIGHT};">
        <td style="padding:14px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:140px;">Service</td>
        <td style="padding:14px 20px;font-size:14px;color:${DARK};">${service || "Not specified"}</td>
      </tr>
      <tr style="border-top:1px solid #E8E8E8;">
        <td style="padding:14px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};">Message</td>
        <td style="padding:14px 20px;font-size:14px;color:${GREY};line-height:1.7;">${message}</td>
      </tr>
    </table>
    <div style="margin:32px 0 0;padding:20px 24px;background:${LIGHT};border-left:3px solid ${TERRACOTTA};border-radius:0 6px 6px 0;">
      <p style="margin:0;font-size:13px;color:${GREY};line-height:1.7;">Reply directly to this email to respond to <strong style="color:${DARK};">${name}</strong>. Aim to respond within 24 hours.</p>
    </div>
  </td></tr>
  <!-- Footer -->
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;letter-spacing:.04em;">Budruum Ltd Â· budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function autoReplyHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>We received your message â€” Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">Strategy &amp; Digital Build</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${DARK};">We've received your message, ${name.split(" ")[0]}.</h2>
    <p style="margin:0 0 20px;font-size:15px;color:${GREY};line-height:1.8;">Thank you for reaching out to Budruum. A member of our team will review your enquiry and respond personally within <strong style="color:${DARK};">24 hours</strong>.</p>
    <p style="margin:0 0 32px;font-size:15px;color:${GREY};line-height:1.8;">If your matter is urgent, you can also reach us directly on WhatsApp at <a href="https://wa.me/447919643752" style="color:${TERRACOTTA};text-decoration:none;">+44 7919 643752</a>.</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:4px;background:${TERRACOTTA};">
      <a href="https://budruum.co.uk/booking" style="display:inline-block;padding:13px 28px;font-size:13.5px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.03em;">Book a Free Consultation â†’</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;">
    <p style="margin:0 0 4px;font-size:13px;color:${DARK};font-weight:500;">The Budruum Team</p>
    <p style="margin:0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> Â· budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { name, email, service, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  try {
    // Notify Budruum
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Website <booking@budruum.co.uk>",
        to: ["booking@budruum.co.uk"],
        reply_to: email,
        subject: `New Enquiry from ${name}${service ? ` â€” ${service}` : ""}`,
        html: emailHtml(name, service, message),
      }),
    });

    // Auto-reply to sender
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum <booking@budruum.co.uk>",
        to: [email],
        subject: "We received your message â€” Budruum",
        html: autoReplyHtml(name),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
