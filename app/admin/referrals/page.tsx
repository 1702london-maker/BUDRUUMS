"use client";
import { useState } from "react";

type Application = {
  id: string;
  name: string;
  email: string;
  website: string | null;
  audience: string | null;
  status: string;
  created_at: string;
  referral_code?: string | null;
  supabase_uid?: string | null;
  approved_at?: string | null;
};

function getErrorDetail(data: any) {
  if (typeof data?.details?.message === "string") {
    return data.stage ? `${data.stage}: ${data.details.message}` : data.details.message;
  }
  if (typeof data?.details?.error === "string") {
    return data.stage ? `${data.stage}: ${data.details.error}` : data.details.error;
  }
  if (typeof data?.error === "string" && data.error !== "Referral approval failed") return data.error;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error?.message === "string") return data.error.message;
  if (typeof data?.error?.error?.message === "string") return data.error.error.message;
  if (Array.isArray(data?.details?.keys)) {
    const prefix = data.stage ? `${data.stage}: ` : "";
    return `${prefix}${data.error || "Error"} (${data.details.keys.join(", ")})`;
  }
  return JSON.stringify(data);
}

export default function AdminReferralsPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function load(adminKey: string) {
    setLoading(true);
    const res = await fetch("/api/admin/referrals", { headers: { "x-admin-key": adminKey } });
    if (res.status === 401) {
      setMsg("Wrong key.");
      setLoading(false);
      return;
    }
    const { data } = await res.json();
    setApps(data || []);
    setAuthed(true);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string, adminKey: string) {
    setActing(id);
    setMsg("");
    const res = await fetch("/api/admin/referrals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      await load(adminKey);
      setMsg(status === "approved" ? "Approved - credentials sent to partner." : "Application rejected.");
    } else {
      setMsg("Error: " + getErrorDetail(data));
    }
    setActing(null);
  }

  const statusColor: Record<string, string> = {
    pending: "#A88F84",
    approved: "#22c55e",
    rejected: "#ef4444",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F8F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 8, padding: "48px 40px", width: 380 }}>
          <p style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 300, marginBottom: 8 }}>Budruum Admin</p>
          <p style={{ fontSize: 13, color: "#6B6B6B", marginBottom: 28 }}>Referral Applications</p>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(key)}
            style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E8E8E8", borderRadius: 4, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
          />
          {msg && <p style={{ fontSize: 13, color: "#ef4444", marginBottom: 10 }}>{msg}</p>}
          <button
            onClick={() => load(key)}
            disabled={loading}
            style={{ width: "100%", padding: "13px", background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </div>
    );
  }

  const pending = apps.filter((a) => a.status === "pending");
  const others = apps.filter((a) => a.status !== "pending");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F8F8", padding: "48px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 300 }}>Referral Applications</p>
            <p style={{ fontSize: 13, color: "#6B6B6B", marginTop: 4 }}>
              {pending.length} pending · {apps.length} total
            </p>
            <p style={{ fontSize: 12, color: "#B0B0B0", marginTop: 6, lineHeight: 1.6 }}>
              Approve here to create the login, generate the referral code, and send credentials by email.
            </p>
          </div>
          <button
            onClick={() => load(key)}
            style={{ padding: "9px 18px", border: "1px solid #E8E8E8", borderRadius: 4, background: "#fff", fontSize: 13, cursor: "pointer", color: "#6B6B6B" }}
          >
            Refresh
          </button>
        </div>

        {msg && (
          <div
            style={{
              padding: "14px 18px",
              background: msg.startsWith("Error") ? "#fef2f2" : "#f0fdf4",
              border: `1px solid ${msg.startsWith("Error") ? "#fecaca" : "#bbf7d0"}`,
              borderRadius: 6,
              marginBottom: 20,
              fontSize: 14,
              color: msg.startsWith("Error") ? "#ef4444" : "#22c55e",
            }}
          >
            {msg}
          </div>
        )}

        {apps.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#6B6B6B", fontSize: 14 }}>No applications yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[...pending, ...others].map((app) => (
              <div key={app.id} style={{ background: "#fff", border: "1px solid #E8E8E8", borderRadius: 8, padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A" }}>{app.name}</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: statusColor[app.status] + "22",
                          color: statusColor[app.status],
                          textTransform: "capitalize",
                        }}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 13.5, color: "#6B6B6B", margin: "0 0 4px" }}>{app.email}</p>
                    {app.website && <p style={{ fontSize: 13, color: "#6B6B6B", margin: "0 0 4px" }}>Website: {app.website}</p>}
                    {app.audience && <p style={{ fontSize: 13, color: "#6B6B6B", margin: 0 }}>Audience: {app.audience}</p>}
                    {app.referral_code && <p style={{ fontSize: 13, color: "#6B6B6B", margin: "4px 0 0" }}>Referral code: {app.referral_code}</p>}
                    {app.supabase_uid && <p style={{ fontSize: 12, color: "#B0B0B0", margin: "4px 0 0" }}>Auth user: {app.supabase_uid}</p>}
                    {app.approved_at && <p style={{ fontSize: 12, color: "#B0B0B0", margin: "4px 0 0" }}>Approved: {new Date(app.approved_at).toLocaleString("en-GB")}</p>}
                    <p style={{ fontSize: 12, color: "#B0B0B0", marginTop: 8 }}>{new Date(app.created_at).toLocaleString("en-GB")}</p>
                  </div>
                  {app.status === "pending" && (
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => updateStatus(app.id, "approved", key)}
                        disabled={acting === app.id}
                        style={{ padding: "10px 20px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 4, fontSize: 13.5, fontWeight: 500, cursor: "pointer", opacity: acting === app.id ? 0.6 : 1 }}
                      >
                        {acting === app.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "rejected", key)}
                        disabled={acting === app.id}
                        style={{ padding: "10px 16px", background: "#fff", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 4, fontSize: 13.5, fontWeight: 500, cursor: "pointer", opacity: acting === app.id ? 0.6 : 1 }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
