"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = {
  id: string;
  service: string;
  service_label?: string;
  date?: string;
  time?: string;
  status: string;
  notes?: string;
  created_at: string;
};

const STATUS_COLOUR: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: "#FFF8E7", text: "#B08000", label: "Pending" },
  confirmed: { bg: "#E8F5EE", text: "#2D7D46", label: "Confirmed" },
  completed: { bg: "#EAF0FF", text: "#2255CC", label: "Completed" },
  cancelled: { bg: "#FEF2F2", text: "#DC2626", label: "Cancelled" },
};

export default function BookingPortalPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [signedIn, setSignedIn] = useState(false);
  const [clientName, setClientName] = useState("Client");
  const [clientEmail, setClientEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/booking/portal")
      .then(async (res) => {
        if (res.ok) {
          const payload = await res.json();
          setClientName(payload.user?.name || "Client");
          setClientEmail(payload.user?.email || "");
          setBookings(payload.bookings || []);
          setSignedIn(true);
        }
      })
      .finally(() => setChecking(false));
  }, []);

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!form.name.trim()) return setError("Please enter your name.");
      if (form.password.length < 6) return setError("Password must be at least 6 characters.");
      if (form.password !== form.confirm) return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/api/client/login" : "/api/client/register";
      const body = mode === "login"
        ? { email: form.email.trim().toLowerCase(), password: form.password.trim() }
        : { name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password.trim() };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      const portal = await fetch("/api/booking/portal");
      if (portal.ok) {
        const payload = await portal.json();
        setClientName(payload.user?.name || "Client");
        setClientEmail(payload.user?.email || "");
        setBookings(payload.bookings || []);
      }
      setSignedIn(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/client/logout", { method: "POST" });
    setSignedIn(false);
    setBookings([]);
    setForm({ name: "", email: "", password: "", confirm: "" });
  }

  if (checking) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-t2 text-sm">Loading…</p>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className="px-5 py-16 min-h-[70vh] bg-[#F8F8F8]">
        <div className="max-w-md mx-auto">
          <p className="eyebrow mb-2">Client Portal</p>
          <h1 className="font-display text-[34px] font-light mb-2">
            {mode === "login" ? "Sign in to your portal" : "Create your account"}
          </h1>
          <p className="text-t2 text-sm mb-8">
            {mode === "login"
              ? "Access your bookings and session history."
              : "Register to track your bookings and manage your sessions."}
          </p>

          {/* Toggle */}
          <div className="flex bg-white border border-br rounded-lg p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 text-sm font-medium rounded-md transition-all"
                style={{
                  background: mode === m ? "#1A1A1A" : "transparent",
                  color: mode === m ? "#fff" : "#6B6B6B",
                }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-br rounded-xl p-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">Full Name</label>
                <input className="w-full border border-br rounded px-4 py-3 text-sm" type="text"
                  placeholder="Your full name" required value={form.name}
                  onChange={e => set("name", e.target.value)} />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Email Address</label>
              <input className="w-full border border-br rounded px-4 py-3 text-sm" type="email"
                placeholder="your@email.com" required value={form.email}
                onChange={e => set("email", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Password</label>
              <input className="w-full border border-br rounded px-4 py-3 text-sm" type="password"
                placeholder={mode === "register" ? "Choose a password (min 6 characters)" : "Your password"}
                required value={form.password}
                onChange={e => set("password", e.target.value)} />
            </div>
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">Confirm Password</label>
                <input className="w-full border border-br rounded px-4 py-3 text-sm" type="password"
                  placeholder="Repeat your password" required value={form.confirm}
                  onChange={e => set("confirm", e.target.value)} />
              </div>
            )}
            <button disabled={loading} className="btn-primary w-full justify-center">
              {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>

          <p className="mt-6 text-sm text-t2 text-center">
            {mode === "login" ? "No account yet? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-ac underline">
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
          <p className="mt-3 text-sm text-t2 text-center">
            <Link href="/booking" className="text-ac underline">Book a consultation</Link>
          </p>
        </div>
      </main>
    );
  }

  const pending   = bookings.filter(b => b.status === "pending");
  const confirmed = bookings.filter(b => b.status === "confirmed");
  const past      = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  return (
    <main className="px-5 sm:px-8 lg:px-14 py-14 lg:py-20 bg-[#F8F8F8] min-h-[70vh]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Client Portal</p>
            <h1 className="font-display text-[34px] sm:text-[44px] font-light text-t1 mb-1">
              Welcome back, {clientName.split(" ")[0]}.
            </h1>
            <p className="text-sm text-t2">{clientEmail}</p>
          </div>
          <button onClick={logout} className="text-sm text-t2 underline mt-2 flex-shrink-0">Log out</button>
        </div>

        {bookings.length === 0 && (
          <div className="bg-white border border-br rounded-xl p-10 text-center">
            <p className="text-t2 text-sm mb-4">You have no bookings yet.</p>
            <Link href="/booking" className="btn-primary inline-flex">Book a consultation</Link>
          </div>
        )}

        {confirmed.length > 0 && (
          <Section title="Upcoming Sessions">
            {confirmed.map(b => <BookingCard key={b.id} b={b} />)}
          </Section>
        )}

        {pending.length > 0 && (
          <Section title="Pending Confirmation">
            {pending.map(b => <BookingCard key={b.id} b={b} />)}
          </Section>
        )}

        {past.length > 0 && (
          <Section title="Past Sessions">
            {past.map(b => <BookingCard key={b.id} b={b} />)}
          </Section>
        )}

        <div className="mt-8">
          <Link href="/booking" className="btn-primary">Book another consultation</Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-light mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function BookingCard({ b }: { b: Booking }) {
  const s = STATUS_COLOUR[b.status] || { bg: "#F8F8F8", text: "#6B6B6B", label: b.status };
  const label = b.service_label || b.service || "Consultation";
  const date = b.date || new Date(b.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="bg-white border border-br rounded-xl p-5 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-medium text-t1 text-sm">{label}</span>
          <span style={{ background: s.bg, color: s.text }} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {s.label}
          </span>
        </div>
        <p className="text-xs text-t2">{date}{b.time ? ` · ${b.time}` : ""}</p>
        {b.notes && <p className="text-xs text-t2 mt-1">{b.notes}</p>}
      </div>
    </div>
  );
}
