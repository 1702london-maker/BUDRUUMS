import { NextRequest, NextResponse } from "next/server";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function notifyHtml(d: Record<string, string>) {
  const rows = [
    ["Service", d.service],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "Not provided"],
    ["Business Stage", d.stage || "Not specified"],
    ["Budget", d.budget || "Not specified"],
    ["Message", d.message || "â€”"],
  ];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>New Booking â€” Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Consultation Booking</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">A new consultation has been booked. Details below:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;">
      ${rows.map((r, i) => `<tr style="${i > 0 ? "border-top:1px solid #E8E8E8;" : ""}background:${i % 2 === 0 ? LIGHT : "#fff"};">
        <td style="padding:13px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:150px;">${r[0]}</td>
        <td style="padding:13px 20px;font-size:14px;color:${GREY};line-height:1.65;">${r[1]}</td>
      </tr>`).join("")}
    </table>
    <div style="margin:32px 0 0;padding:20px 24px;background:${LIGHT};border-left:3px solid ${TERRACOTTA};border-radius:0 6px 6px 0;">
      <p style="margin:0;font-size:13px;color:${GREY};line-height:1.7;">Reply to this email to contact <strong style="color:${DARK};">${d.name}</strong> directly. Respond within 24 hours to confirm the session.</p>
    </div>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;">Budruum Ltd Â· budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function confirmHtml(name: string, service: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Booking Confirmed â€” Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">Consultation Request Received</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:300;color:${DARK};">Your request is confirmed, ${name.split(" ")[0]}.</h2>
    <p style="margin:0 0 16px;font-size:15px;color:${GREY};line-height:1.8;">Thank you for booking a consultation with Budruum. We have received your request for <strong style="color:${DARK};">${service}</strong> and a member of our team will be in touch within <strong style="color:${DARK};">24 hours</strong> to finalise the details.</p>
    <p style="margin:0 0 32px;font-size:15px;color:${GREY};line-height:1.8;">In the meantime, feel free to browse our resources or reach us on WhatsApp at <a href="https://wa.me/447919643752" style="color:${TERRACOTTA};text-decoration:none;">+44 7919 643752</a>.</p>
    <div style="margin:0 0 32px;padding:24px;background:${LIGHT};border-radius:6px;border:1px solid #E8E8E8;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${TERRACOTTA};">What to expect</p>
      ${["Our team reviews your brief and confirms a suitable time slot","You receive a calendar invite and a short preparation guide","Your 30-minute session runs â€” focused, structured, actionable"].map(s => `<p style="margin:10px 0 0;font-size:14px;color:${GREY};line-height:1.7;padding-left:16px;border-left:2px solid ${TERRACOTTA};">${s}</p>`).join("")}
    </div>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:4px;background:${TERRACOTTA};">
      <a href="https://budruum.co.uk/insights" style="display:inline-block;padding:13px 28px;font-size:13.5px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.03em;">Read Our Insights â†’</a>
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
  const data = await req.json();
  const { name, email, service } = data;
  if (!name || !email || !service) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Bookings <booking@budruum.co.uk>",
        to: ["booking@budruum.co.uk"],
        reply_to: email,
        subject: `New Booking: ${service} â€” ${name}`,
        html: notifyHtml(data),
      }),
    });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum <booking@budruum.co.uk>",
        to: [email],
        subject: "Your consultation request is confirmed â€” Budruum",
        html: confirmHtml(name, service),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
