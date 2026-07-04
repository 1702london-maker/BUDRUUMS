import { NextRequest, NextResponse } from "next/server";

const TERRACOTTA = "#A88F84";
const DARK = "#1A1A1A";
const LIGHT = "#F8F8F8";
const GREY = "#6B6B6B";

function welcomeHtml(email: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Welcome to Budruum Insights</title></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
  <tr><td style="background:${DARK};padding:0;">
    <div style="height:3px;background:${TERRACOTTA};"></div>
    <div style="padding:36px 44px 32px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:300;color:#ffffff;letter-spacing:.04em;">Budruum</p>
      <p style="margin:6px 0 0;font-size:11px;letter-spacing:.20em;text-transform:uppercase;color:rgba(255,255,255,.4);">Insights &amp; Strategy</p>
    </div>
  </td></tr>
  <tr><td style="padding:44px 44px 32px;">
    <h2 style="margin:0 0 18px;font-family:Georgia,serif;font-size:26px;font-weight:300;color:${DARK};line-height:1.3;">You are in. <em style="font-style:italic;color:${TERRACOTTA};">Welcome.</em></h2>
    <p style="margin:0 0 18px;font-size:15px;color:${GREY};line-height:1.85;">Thank you for subscribing to the Budruum newsletter. You will receive practical insights, business strategy, and founder resources â€” delivered straight to your inbox, without the noise.</p>
    <p style="margin:0 0 36px;font-size:15px;color:${GREY};line-height:1.85;">Start with our most-read insights below, or book a free discovery call to speak to us directly.</p>

    <!-- Featured insights -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${LIGHT};border:1px solid #E8E8E8;border-radius:6px;margin-bottom:32px;">
      <tr><td style="padding:24px 28px 8px;">
        <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${TERRACOTTA};">Start Reading</p>
        ${[
          ["How to Write a Business Plan That Actually Gets Funding", "/insights/how-to-write-business-plan-funding"],
          ["What Investors Actually Look For in a Business Plan", "/insights/what-investors-look-for"],
          ["12-Month vs 36-Month Financial Forecast: Which Do You Need?", "/insights/12-vs-36-month-forecast"],
        ].map(([title, href]) => `
        <a href="https://budruum.co.uk${href}" style="display:block;padding:14px 0;border-top:1px solid #E8E8E8;text-decoration:none;">
          <p style="margin:0;font-size:14px;color:${DARK};line-height:1.5;">${title} <span style="color:${TERRACOTTA};">â†’</span></p>
        </a>`).join("")}
      </td></tr>
    </table>

    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:4px;background:${TERRACOTTA};">
      <a href="https://budruum.co.uk/booking" style="display:inline-block;padding:13px 28px;font-size:13.5px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:.03em;">Book a Free Consultation â†’</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:24px 44px;border-top:1px solid #E8E8E8;background:${LIGHT};">
    <p style="margin:0 0 4px;font-size:13px;font-weight:500;color:${DARK};">The Budruum Team</p>
    <p style="margin:0;font-size:12px;color:#B0B0B0;"><a href="mailto:booking@budruum.co.uk" style="color:${TERRACOTTA};text-decoration:none;">booking@budruum.co.uk</a> Â· budruum.co.uk</p>
  </td></tr>
  <tr><td style="padding:14px 44px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#C0C0C0;">You subscribed at budruum.co.uk Â· <a href="https://budruum.co.uk" style="color:#C0C0C0;text-decoration:none;">Unsubscribe</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ success: false, error: "No email" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ success: false, error: "No API key" }, { status: 500 });

  try {
    // Notify team
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum <booking@budruum.co.uk>",
        to: ["booking@budruum.co.uk"],
        subject: `New Newsletter Subscriber â€” ${email}`,
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      }),
    });

    // Welcome email to subscriber
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Budruum Insights <booking@budruum.co.uk>",
        to: [email],
        subject: "Welcome to Budruum Insights",
        html: welcomeHtml(email),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
