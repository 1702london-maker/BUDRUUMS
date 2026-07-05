import { NextRequest, NextResponse } from "next/server";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function notifyHtml(name: string, email: string, role: string, message: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>New Job Application — Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Job Application</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">A new application has been submitted for <strong>${role}</strong>.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;">
      ${[["Applicant", name], ["Email", email], ["Role Applied For", role], ["Message", message || "No message provided"]].map((r, i) => `
      <tr style="${i > 0 ? "border-top:1px solid #E8E8E8;" : ""}background:${i % 2 === 0 ? LIGHT : "#fff"};">
        <td style="padding:13px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:160px;">${r[0]}</td>
        <td style="padding:13px 20px;font-size:14px;color:${GREY};line-height:1.65;">${r[1]}</td>
      </tr>`).join("")}
    </table>
    <div style="margin:32px 0 0;padding:20px 24px;background:${LIGHT};border-left:3px solid ${TERRACOTTA};border-radius:0 6px 6px 0;">
      <p style="margin:0;font-size:13px;color:${GREY};line-height:1.7;">Reply to this email to contact <strong style="color:${DARK};">${name}</strong> directly.</p>
    </div>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;">Budruum Ltd · budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function confirmHtml(name: string, role: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Application Received — Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:0;">
    <div style="height:3px;background:${TERRACOTTA};"></div>
    <div style="padding:36px 40px 32px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
      <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">Careers</p>
    </div>
  </td></tr>
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${DARK};">We have received your application, ${name.split(" ")[0]}.</h2>
    <p style="margin:0 0 16px;font-size:15px;color:${GREY};line-height:1.8;">Thank you for applying for the <strong style="color:${DARK};">${role}</strong> position at Budruum. We review every application personally and will be in touch within <strong style="color:${DARK};">5 business days</strong>.</p>
    <p style="margin:0 0 32px;font-size:15px;color:${GREY};line-height:1.8;">In the meantime, feel free to explore our work at <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a> or reach us on WhatsApp at <a href="https://wa.me/447919643752" style="color:${TERRACOTTA};text-decoration:none;">+44 7919 643752</a>.</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:4px;background:${TERRACOTTA};">
      <a href="https://budruum.co.uk/portfolio" style="display:inline-block;padding:13px 28px;font-size:13.5px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.03em;">View Our Work →</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;">
    <p style="margin:0 0 4px;font-size:13px;color:${DARK};font-weight:500;">The Budruum Team</p>
    <p style="margin:0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> · budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { name, email, role, message } = await req.json();
  if (!name || !email || !role) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Careers <booking@budruum.co.uk>",
        to: ["booking@budruum.co.uk"],
        reply_to: email,
        subject: `New Application: ${role} — ${name}`,
        html: notifyHtml(name, email, role, message),
      }),
    });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Careers <booking@budruum.co.uk>",
        to: [email],
        subject: `Your application has been received — Budruum`,
        html: confirmHtml(name, role),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
