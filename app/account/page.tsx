"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Mode = "affiliate" | "client";
type ClientView = "login" | "register";

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>("affiliate");
  const [clientView, setClientView] = useState<ClientView>("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Affiliate login fields
  const [affEmail, setAffEmail] = useState("");
  const [affPassword, setAffPassword] = useState("");

  // Client fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientConfirm, setClientConfirm] = useState("");

  useEffect(() => {
    // Check if already signed in (affiliate session)
    fetch("/api/referral/dashboard").then(res => {
      if (res.ok) window.location.href = "/referral-portal/dashboard";
    });
    // Check if client session active
    fetch("/api/booking/portal").then(res => {
      if (res.ok) window.location.href = "/booking/portal";
    }).finally(() => setChecking(false));
  }, []);

  function reset() { setError(""); }

  async function submitAffiliate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/referral/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: affEmail.trim().toLowerCase(), password: affPassword.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setError(data.error || "Invalid email or password."); return; }
      window.location.href = "/referral-portal/dashboard";
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  }

  async function submitClient(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (clientView === "register") {
      if (!clientName.trim()) return setError("Please enter your full name.");
      if (clientPassword.length < 6) return setError("Password must be at least 6 characters.");
      if (clientPassword !== clientConfirm) return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const endpoint = clientView === "login" ? "/api/client/login" : "/api/client/register";
      const body = clientView === "login"
        ? { email: clientEmail.trim().toLowerCase(), password: clientPassword.trim() }
        : { name: clientName.trim(), email: clientEmail.trim().toLowerCase(), password: clientPassword.trim() };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setError(data.error || "Something went wrong."); return; }
      window.location.href = "/booking/portal";
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  }

  if (checking) {
    return <main className="min-h-[60vh] flex items-center justify-center"><p className="text-t2 text-sm">Loading…</p></main>;
  }

  return (
    <main>
      <section className="px-5 sm:px-8 lg:px-14 py-16 lg:py-20 bg-[#F8F8F8] min-h-[70vh]">
        <div className="max-w-md mx-auto">

          {/* Tab switcher */}
          <div className="flex bg-white border border-br rounded-lg p-1 mb-6">
            {(["affiliate", "client"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); reset(); }}
                className="flex-1 py-2.5 text-sm font-medium rounded-md transition-all capitalize"
                style={{ background: mode === m ? "#1A1A1A" : "transparent", color: mode === m ? "#fff" : "#6B6B6B" }}>
                {m === "affiliate" ? "Referral Partner" : "Client"}
              </button>
            ))}
          </div>

          <div className="bg-white border border-br rounded-xl p-6">

            {/* ── AFFILIATE ── */}
            {mode === "affiliate" && (
              <form onSubmit={submitAffiliate} className="space-y-4">
                <div>
                  <h1 className="font-display text-[28px] font-light mb-1">Partner Login</h1>
                  <p className="text-sm text-t2">Use the credentials emailed after your referral approval.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Email Address</label>
                  <input className="w-full border border-br rounded px-4 py-3 text-sm" type="email"
                    placeholder="your@email.com" required value={affEmail}
                    onChange={e => { setAffEmail(e.target.value); reset(); }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Password</label>
                  <input className="w-full border border-br rounded px-4 py-3 text-sm" type="password"
                    placeholder="Your password" required value={affPassword}
                    onChange={e => { setAffPassword(e.target.value); reset(); }} />
                </div>
                <button disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? "Signing in…" : "Sign In"}
                </button>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <p className="text-sm text-t2">
                  Not a partner yet?{" "}
                  <Link href="/referral" className="text-ac underline">Apply for referral access</Link>
                </p>
              </form>
            )}

            {/* ── CLIENT ── */}
            {mode === "client" && (
              <>
                {/* Sign in / Register toggle */}
                <div className="flex bg-[#F8F8F8] border border-br rounded-lg p-1 mb-5">
                  {(["login", "register"] as const).map(v => (
                    <button key={v} onClick={() => { setClientView(v); reset(); }}
                      className="flex-1 py-2 text-sm font-medium rounded-md transition-all"
                      style={{ background: clientView === v ? "#fff" : "transparent", color: clientView === v ? "#1A1A1A" : "#6B6B6B", boxShadow: clientView === v ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
                      {v === "login" ? "Sign In" : "Create Account"}
                    </button>
                  ))}
                </div>

                <form onSubmit={submitClient} className="space-y-4">
                  <div>
                    <h1 className="font-display text-[28px] font-light mb-1">
                      {clientView === "login" ? "Client Login" : "Create Your Account"}
                    </h1>
                    <p className="text-sm text-t2">
                      {clientView === "login"
                        ? "Sign in to view your bookings and session history."
                        : "Register with your email and choose your own password."}
                    </p>
                  </div>

                  {clientView === "register" && (
                    <div>
                      <label className="block text-xs font-semibold mb-1.5">Full Name</label>
                      <input className="w-full border border-br rounded px-4 py-3 text-sm" type="text"
                        placeholder="Your full name" required value={clientName}
                        onChange={e => { setClientName(e.target.value); reset(); }} />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Email Address</label>
                    <input className="w-full border border-br rounded px-4 py-3 text-sm" type="email"
                      placeholder="your@email.com" required value={clientEmail}
                      onChange={e => { setClientEmail(e.target.value); reset(); }} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Password</label>
                    <input className="w-full border border-br rounded px-4 py-3 text-sm" type="password"
                      placeholder={clientView === "register" ? "Choose a password (min 6 characters)" : "Your password"}
                      required value={clientPassword}
                      onChange={e => { setClientPassword(e.target.value); reset(); }} />
                  </div>

                  {clientView === "register" && (
                    <div>
                      <label className="block text-xs font-semibold mb-1.5">Confirm Password</label>
                      <input className="w-full border border-br rounded px-4 py-3 text-sm" type="password"
                        placeholder="Repeat your password" required value={clientConfirm}
                        onChange={e => { setClientConfirm(e.target.value); reset(); }} />
                    </div>
                  )}

                  <button disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? "Please wait…" : clientView === "login" ? "Sign In" : "Create Account"}
                  </button>
                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <p className="text-sm text-t2">
                    {clientView === "login" ? "No account? " : "Already registered? "}
                    <button type="button" onClick={() => { setClientView(clientView === "login" ? "register" : "login"); reset(); }}
                      className="text-ac underline">
                      {clientView === "login" ? "Create one" : "Sign in"}
                    </button>
                  </p>
                  <p className="text-sm text-t2">
                    <Link href="/booking" className="text-ac underline">Book a consultation</Link>
                  </p>
                </form>
              </>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}
