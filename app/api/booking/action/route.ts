import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

function html(title: string, body: string) {
  return new Response(
    `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f8f8f8;padding:40px;"><div style="max-width:480px;margin:auto;background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:36px;"><h2 style="font-family:Georgia,serif;font-weight:300;color:#1A1A1A;margin:0 0 12px;">${title}</h2><p style="color:#6B6B6B;font-size:14px;">${body}</p></div></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret") || "";
  const action = searchParams.get("action") || "";
  const id = searchParams.get("id") || "";

  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return html("Unauthorised", "Invalid or missing secret.");
  }
  if (!id || !["confirm", "cancel"].includes(action)) {
    return html("Error", "Missing or invalid parameters.");
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return html("Error", "Server configuration error.");

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: row } = await admin
    .from("bookings")
    .select("status, full_name, email, service_label, service")
    .eq("id", id)
    .maybeSingle();

  if (!row) return html("Not Found", "Booking not found.");
  if (row.status !== "pending") {
    return html("Already Reviewed", `This booking for ${row.email} has already been ${row.status}.`);
  }

  const newStatus = action === "confirm" ? "confirmed" : "cancelled";
  const { error } = await admin.from("bookings").update({ status: newStatus }).eq("id", id);

  if (error) return html("Error", `Could not update: ${error.message}`);

  if (action === "confirm") {
    return html(
      "Booking Confirmed",
      `${row.full_name || row.email}'s booking for ${row.service_label || row.service || "consultation"} has been confirmed. Credentials will be emailed to them automatically.`
    );
  }
  return html("Booking Cancelled", `${row.full_name || row.email}'s booking has been cancelled.`);
}
