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

  const expectedSecret = process.env.WEBHOOK_SECRET || "";
  if (!expectedSecret || secret !== expectedSecret) {
    return html("Unauthorised", "Invalid or missing secret.");
  }

  if (!id || !["approve", "reject"].includes(action)) {
    return html("Error", "Missing or invalid parameters.");
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return html("Error", "Server configuration error.");

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Check current status
  const { data: row } = await admin
    .from("referral_applications")
    .select("status, name, email")
    .eq("id", id)
    .maybeSingle();

  if (!row) return html("Not Found", "Application not found.");
  if (row.status !== "pending") {
    return html("Already Reviewed", `This application for ${row.email} has already been ${row.status}.`);
  }

  const newStatus = action === "approve" ? "approved" : "rejected";
  const { error } = await admin
    .from("referral_applications")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) return html("Error", `Could not update status: ${error.message}`);

  if (action === "approve") {
    return html(
      "Approved",
      `${row.name} (${row.email}) has been approved. Credentials will be emailed to them automatically.`
    );
  }

  return html("Rejected", `${row.name} (${row.email}) has been rejected.`);
}
