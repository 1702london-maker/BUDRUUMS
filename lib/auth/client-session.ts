import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

export const CLIENT_SESSION_COOKIE = "bud_client_session";
const SECRET = process.env.CLIENT_SESSION_SECRET || "budruum-client-session-v1";
export const CLIENT_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type ClientSession = {
  id: string;
  email: string;
  name: string;
};

export function createClientSessionValue(id: string, email: string, name: string): string {
  const payload = Buffer.from(
    JSON.stringify({ id, email, name, exp: Date.now() + CLIENT_SESSION_MAX_AGE * 1000 })
  ).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function getClientSession(): Promise<ClientSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;
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
    return { id: data.id, email: data.email, name: data.name };
  } catch {
    return null;
  }
}

export function generateClientPassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(12);
  let s = "";
  for (let i = 0; i < 12; i++) s += chars[bytes[i] % chars.length];
  return `${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8, 12)}`;
}

export function hashClientPassword(plain: string): string {
  return createHmac("sha256", SECRET).update(plain.trim()).digest("hex");
}

export function verifyClientPassword(plain: string, storedHash: string): boolean {
  const hash = hashClientPassword(plain);
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
}
