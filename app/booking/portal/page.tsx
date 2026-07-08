"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = {
  id: string;
  service: string;
  service_label?: string;
  session_type?: string;
  date?: string;
  time?: string;
  status: string;
  notes?: string;
  created_at: string;
};

const STATUS_COLOUR: Record<string, string> = {
  pending: "#A88F84",
  confirmed: "#22c55e",
  completed: "#6366f1",
  cancelled: "#ef4444",
};

export default function BookingPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [clientName, setClientName] = useState("Client");
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
          setEmail(payload.user?.email || "");
          setBookings(payload.bookings || []);
          setSignedIn(true);
        }
      })
      .finally(() => setChecking(false));
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password.");
        return;
      }
      // Load portal data
      const portal = await fetch("/api/booking/portal");
      if (portal.ok) {
        const payload = await portal.json();
        setClientName(payload.user?.name || "Client");
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
    setPassword("");
  }

  if (checking) {
    return <main className="px-5 py-16 flex items-center justify-center min-h-[60vh]"><p className="text-t2 text-sm">Loading...</p></main>;
  }

  if (!signedIn) {
    return (
      <main className="px-5 py-16 max-w-md mx-auto">
        <p className="eyebrow mb-2">Client Portal</p>
        <h1 className="font-display text-[34px] mb-2">Sign in to your portal</h1>
        <p className="text-t2 text-sm mb-8">Use the credentials emailed to you when your consultation was confirmed.</p>
        <form onSubmit={login} className="space-y-4 bg-white border border-br rounded-xl p-6">
          <input
            className="w-full border border-br rounded px-4 py-3 text-sm"
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-br rounded px-4 py-3 text-sm"
            type="password"
            placeholder="Password (e.g. Xxxx-Xxxx-Xxxx)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} className="btn-primary w-full justify-center">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
        <p className="mt-6 text-sm text-t2 text-center">
          Don&apos;t have a booking yet?{" "}
          <Link href="/booking" className="text-ac underline">Book a consultation</Link>
        </p>
      </main>
    );
  }

  const pending = bookings.filter((b) => b.status === "pending");
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const past = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  return (
    <main className="px-5 sm:px-8 lg:px-14 py-14 lg:py-20 bg-[#F8F8F8] min-h-[70vh]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="eyebrow mb-2">Client Portal</p>
            <h1 className="font-display text-[34px] sm:text-[44px] font-light text-t1 mb-1">
              Welcome back, {clientName.split(" ")[0]}.
            </h1>
            <p className="text-sm text-t2">{email}</p>
          </div>
          <button onClick={logout} className="text-sm text-t2 underline mt-2">Log out</button>
        </div>

        {/* Confirmed bookings */}
        <section className="mb-6">
          <h2 className="font-display text-xl mb-3">Upcoming Sessions</h2>
          {confirmed.length === 0 ? (
            <div className="bg-white border border-br rounded-xl p-6 text-sm text-t2">No confirmed sessions yet.</div>
          ) : (
            <div className="space-y-3">
              {confirmed.map((b) => <BookingCard key={b.id} b={b} />)}
            </div>
          )}
        </section>

        {/* Pending bookings */}
        {pending.length > 0 && (
          <section className="mb-6">
            <h2 className="font-display text-xl mb-3">Pending Confirmation</h2>
            <div className="space-y-3">
              {pending.map((b) => <BookingCard key={b.id} b={b} />)}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section className="mb-6">
            <h2 className="font-display text-xl mb-3">Past Sessions</h2>
            <div className="space-y-3">
              {past.map((b) => <BookingCard key={b.id} b={b} />)}
            </div>
          </section>
        )}

        <div className="mt-8">
          <Link href="/booking" className="btn-primary">Book another consultation</Link>
        </div>
      </div>
    </main>
  );
}

function BookingCard({ b }: { b: Booking }) {
  const colour = STATUS_COLOUR[b.status] || "#6B6B6B";
  const label = b.service_label || b.service || "Consultation";
  const date = b.date || new Date(b.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="bg-white border border-br rounded-xl p-5 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-t1 text-sm">{label}</span>
          <span style={{ background: colour + "22", color: colour }} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize">{b.status}</span>
        </div>
        {b.session_type && <p className="text-xs text-t2">{b.session_type}</p>}
        <p className="text-xs text-t2 mt-1">{date}{b.time ? ` at ${b.time}` : ""}</p>
        {b.notes && <p className="text-xs text-t2 mt-1">{b.notes}</p>}
      </div>
    </div>
  );
}
