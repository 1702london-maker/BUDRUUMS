import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

export const REFERRAL_SESSION_COOKIE = "bud_ref_session";
const SECRET = process.env.REFERRAL_SESSION_SECRET || "budruum-referral-session-v1";
export const REFERRAL_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type ReferralSession = {
  id: string;
  email: string;
  code: string;
  name: string;
};

export function createReferralSessionValue(id: string, email: string, code: string, name: string): string {
  const payload = Buffer.from(
    JSON.stringify({ id, email, code, name, exp: Date.now() + REFERRAL_SESSION_MAX_AGE * 1000 })
  ).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function getReferralSession(): Promise<ReferralSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(REFERRAL_SESSION_COOKIE)?.value;
  if (!raw) return null;

  const dotIdx = raw.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const payload = raw.slice(0, dotIdx);
  const sig = raw.slice(dotIdx + 1);

  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "base64url"), Buffer.from(expected, "base64url")))
      return null;
  } catch {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Date.now()) return null;
    return { id: data.id, email: data.email, code: data.code, name: data.name };
  } catch {
    return null;
  }
}

export function generateReferralPassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(12);
  let s = "";
  for (let i = 0; i < 12; i++) s += chars[bytes[i] % chars.length];
  return `${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8, 12)}`;
}

export function hashReferralPassword(plain: string): string {
  return createHmac("sha256", SECRET).update(plain.trim()).digest("hex");
}

export function verifyReferralPassword(plain: string, storedHash: string): boolean {
  const hash = hashReferralPassword(plain);
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
}
