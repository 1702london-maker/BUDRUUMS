import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are a helpful assistant for Budruum, a UK business consultancy for founders.
You help visitors understand services, pricing, and which engagement is right for them.
Services: Brand Identity (from £1,200), Business Plan (from £800), Financial Forecasting (from £600), Web Development (from £2,500), Startup Consultancy (from £350/hr), Founder & Business Operating Blueprint (£3,500 fixed), Mentorship (Single Session £300, Monthly Retainer £1,500/mo, Quarterly Advisory £4,000/quarter), Innovator Visa (from £1,500).
Free 30-minute discovery calls are available. Book at budruum.co.uk/booking.
Be warm, professional and concise. Don't invent services or prices not listed above.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ content: "Chat is temporarily unavailable. Please contact us at hello@budruum.co.uk" });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM }, ...messages.slice(-10)],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that. Please try again.";
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: "Sorry, something went wrong. Please email us at hello@budruum.co.uk" });
  }
}
