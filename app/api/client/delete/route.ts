import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CLIENT_SESSION_COOKIE, getClientSession, verifyClientSessionToken } from "@/lib/auth/client-session";

const SUPABASE_URL = "https://padfgbudntpmzfnuiupt.supabase.co";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const session = bearerToken ? verifyClientSessionToken(bearerToken) : await getClientSession();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return NextResponse.json({ error: "Server error." }, { status: 500 });

  const admin = createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const deletedEmail = `deleted-client-${session.id}@budruum.local`;

  await admin
    .from("bookings")
    .update({
      name: "Deleted Client",
      email: deletedEmail,
      phone: null,
      notes: null,
    })
    .eq("email", session.email);

  const { error } = await admin.from("clients").delete().eq("id", session.id);
  if (error) return NextResponse.json({ error: "Unable to delete account." }, { status: 500 });

  const response = NextResponse.json({ success: true, message: "Your account has been deleted." });
  response.cookies.set(CLIENT_SESSION_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" });
  return response;
}
