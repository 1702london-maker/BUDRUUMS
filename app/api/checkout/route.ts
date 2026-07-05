import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICES: Record<string, number> = {
  "Strategy Consultation": 30000,    // £300
  "Business Planning Session": 50000, // £500
};

export async function POST(req: NextRequest) {
  const { service, name, email, date, time, phone, biz, msg } = await req.json();

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  const amount = PRICES[service];
  if (!amount) return NextResponse.json({ error: "Invalid service for payment" }, { status: 400 });

  const stripe = new Stripe(key);

  const origin = req.headers.get("origin") || "https://budruum.co.uk";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: amount,
          product_data: {
            name: service,
            description: `Budruum consultation — ${date} at ${time}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      service,
      name,
      email,
      date,
      time,
      phone: phone || "",
      business: biz || "",
      message: msg || "",
    },
    success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/booking?cancelled=1`,
  });

  return NextResponse.json({ url: session.url });
}
