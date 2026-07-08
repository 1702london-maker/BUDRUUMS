import { NextRequest, NextResponse } from "next/server";

// This webhook fires from the Supabase DB trigger on UPDATE to referral_applications.
// The admin route (api/admin/referrals) now handles ALL approval logic:
// it generates the password, stores the hash, and sends the email — all in one update.
// When it sets status=approved AND password_hash in the same update, this webhook
// checks for password_hash already being set and skips immediately.
// This prevents double-processing and double-emails.

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const record = body.record;
  const oldRecord = body.old_record;

  // Skip if not an approval transition
  if (
    body.type !== "UPDATE" ||
    record?.status !== "approved" ||
    oldRecord?.status === "approved"
  ) {
    return NextResponse.json({ skipped: true });
  }

  // Skip if the admin route already set password_hash — it handled everything
  if (record?.password_hash) {
    return NextResponse.json({ skipped: true, reason: "already_processed" });
  }

  // Should never reach here in normal flow, but return ok so trigger doesn't error
  return NextResponse.json({ ok: true });
}
