import { NextRequest, NextResponse } from "next/server";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function notifyHtml(name: string, email: string, website: string, audience: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>New Affiliate Application â€” Budruum</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:36px 40px;">
    <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
    <p style="margin:6px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">New Affiliate Application</p>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;font-size:15px;color:${DARK};line-height:1.7;">A new affiliate application has been submitted:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E8E8;border-radius:6px;overflow:hidden;">
      ${[["Name", name], ["Email", email], ["Website / Platform", website || "Not provided"], ["Audience Description", audience || "Not provided"]].map((r, i) => `
      <tr style="${i > 0 ? "border-top:1px solid #E8E8E8;" : ""}background:${i % 2 === 0 ? LIGHT : "#fff"};">
        <td style="padding:13px 20px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${TERRACOTTA};width:180px;">${r[0]}</td>
        <td style="padding:13px 20px;font-size:14px;color:${GREY};line-height:1.65;">${r[1]}</td>
      </tr>`).join("")}
    </table>
    <div style="margin:32px 0 0;padding:20px 24px;background:${LIGHT};border-left:3px solid ${TERRACOTTA};border-radius:0 6px 6px 0;">
      <p style="margin:0;font-size:13px;color:${GREY};line-height:1.7;">Reply to this email to respond to <strong style="color:${DARK};">${name}</strong>. Send their unique affiliate link and dashboard credentials within 48 hours.</p>
    </div>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #E8E8E8;text-align:center;">
    <p style="margin:0;font-size:12px;color:#B0B0B0;">Budruum Ltd Â· budruum.co.uk</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function welcomeHtml(name: string, email: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Welcome to the Budruum Partner Programme</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">

  <!-- Header with gold accent bar -->
  <tr><td style="background:${DARK};padding:0;">
    <div style="height:3px;background:${TERRACOTTA};"></div>
    <div style="padding:40px 48px 36px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
      <p style="margin:8px 0 0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.4);">Partner Programme</p>
    </div>
  </td></tr>

  <!-- Hero message -->
  <tr><td style="padding:48px 48px 32px;">
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:300;color:${DARK};line-height:1.25;">Welcome to the<br/><em style="font-style:italic;color:${TERRACOTTA};">Budruum Partner Programme</em></h1>
    <p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">Dear ${name.split(" ")[0]},</p>
    <p style="margin:0 0 18px;font-size:15.5px;color:${GREY};line-height:1.85;">We are delighted to welcome you as a Budruum affiliate partner. Your application has been received and is under review. Within <strong style="color:${DARK};">48 hours</strong>, we will send your unique referral link, dashboard access, and a full partner guide.</p>
    <p style="margin:0 0 36px;font-size:15.5px;color:${GREY};line-height:1.85;">In the meantime, familiarise yourself with our services at <a href="https://budruum.co.uk/services" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk/services</a> â€” knowing the offering deeply is what turns great affiliates into top earners.</p>

    <!-- Commission highlight box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:8px;margin-bottom:36px;">
      <tr><td style="padding:28px 32px;">
        <p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Your Partner Benefits</p>
        ${[
          ["10% Commission", "On every client you refer who places an order with Budruum"],
          ["30-Day Cookie", "Referrals tracked for 30 days â€” earn even if they do not buy immediately"],
          ["Monthly Payouts", "Paid on the 15th of every month via UK bank transfer â€” no delays"],
          ["Dedicated Support", "Your own contact at Budruum for questions, marketing assets and updates"],
        ].map(([title, desc]) => `
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
          <tr>
            <td style="width:10px;vertical-align:top;padding-top:4px;">
              <div style="width:6px;height:6px;border-radius:50%;background:${TERRACOTTA};margin-top:6px;"></div>
            </td>
            <td style="padding-left:14px;">
              <p style="margin:0 0 2px;font-size:14px;font-weight:500;color:${DARK};">${title}</p>
              <p style="margin:0;font-size:13px;color:${GREY};line-height:1.6;">${desc}</p>
            </td>
          </tr>
        </table>`).join("")}
      </td></tr>
    </table>

    <!-- CTA button -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr><td style="border-radius:4px;background:${DARK};">
      <a href="https://budruum.co.uk/affiliate-portal" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.04em;">View Affiliate Portal â†’</a>
    </td></tr></table>
    <p style="margin:0;font-size:13px;color:${GREY};">Questions? Email us at <a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a></p>
  </td></tr>

  <!-- Signature -->
  <tr><td style="padding:32px 48px;border-top:1px solid #E8E8E8;background:${LIGHT};">
    <p style="margin:0 0 4px;font-size:14px;font-weight:500;color:${DARK};">Warm regards,</p>
    <p style="margin:0 0 2px;font-family:Georgia,serif;font-size:20px;font-weight:300;color:${TERRACOTTA};letter-spacing:.04em;">The Budruum Team</p>
    <p style="margin:6px 0 0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> Â· <a href="https://budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">budruum.co.uk</a></p>
  </td></tr>

  <!-- Legal footer -->
  <tr><td style="padding:16px 48px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#C0C0C0;line-height:1.6;">Budruum Ltd Â· Registered in England &amp; Wales Â· budruum.co.uk<br/>You are receiving this because you applied to our affiliate programme at ${email}</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { name, email, website, audience } = await req.json();
  if (!name || !email) return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum <booking@budruum.co.uk>",
        to: ["booking@budruum.co.uk"],
        reply_to: email,
        subject: `New Affiliate Application â€” ${name}`,
        html: notifyHtml(name, email, website, audience),
      }),
    });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Partner Programme <booking@budruum.co.uk>",
        to: [email],
        subject: "Welcome to the Budruum Partner Programme",
        html: welcomeHtml(name, email),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
