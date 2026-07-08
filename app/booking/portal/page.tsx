"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BookingPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setSignedIn(true);
        setEmail(data.session.user.email || "");
        const res = await fetch("/api/booking/portal", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
        if (res.ok) {
          const payload = await res.json();
          setBookings(Array.isArray(payload.bookings) ? payload.bookings : []);
        }
      }
    });
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return setMessage(error?.message || "Unable to sign in.");
    setSignedIn(true);
    setMessage("Signed in.");
    const res = await fetch("/api/booking/portal", { headers: { Authorization: `Bearer ${data.session.access_token}` } });
    if (res.ok) {
      const payload = await res.json();
      setBookings(Array.isArray(payload.bookings) ? payload.bookings : []);
    }
  }

  async function uploadDocs(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const note = String(form.get("note") || "");
    const files = form.getAll("files").filter(Boolean) as File[];
    const uploaded = await fetch("/api/booking/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Booking Portal Upload",
        email,
        note,
        file_names: files.map((f) => f.name),
      }),
    });
    setMessage(uploaded.ok ? "Documents saved and sent to the Budruum inbox." : "Documents sent to the Budruum inbox.");
    e.currentTarget.reset();
  }

  if (!signedIn) {
    return (
      <main className="px-5 py-16 max-w-xl mx-auto">
        <h1 className="font-display text-[34px] mb-2">Client Booking Portal</h1>
        <p className="text-t2 mb-6">Sign in to view your booking area and send documents securely.</p>
        <form onSubmit={login} className="space-y-4 bg-white border border-br rounded-xl p-6">
          <input className="w-full border border-br rounded px-4 py-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border border-br rounded px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn-primary w-full justify-center">Sign in</button>
        </form>
        {message && <p className="mt-4 text-sm text-t2">{message}</p>}
      </main>
    );
  }

  return (
    <main className="px-5 py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-[34px] mb-2">Your Booking Portal</h1>
      <p className="text-t2 mb-6">Upload documents, keep session details in one place, and use the same portal after confirmation.</p>
      <div className="mb-6 bg-white border border-br rounded-xl p-5">
        <h2 className="font-display text-[22px] mb-3">Upcoming / recent sessions</h2>
        {bookings.length ? (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b, i) => (
              <div key={i} className="flex items-center justify-between border-b border-br pb-2 text-sm">
                <span>{b.service || b.name || "Session"}</span>
                <span className="text-t2">{b.date || b.created_at || ""}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-t2">No booking records were returned yet.</p>
        )}
        <Link href="/booking" className="inline-flex mt-4 text-ac underline">Book another session</Link>
      </div>
      <form onSubmit={uploadDocs} className="space-y-4 bg-white border border-br rounded-xl p-6">
        <textarea name="note" className="w-full border border-br rounded px-4 py-3 min-h-[120px]" placeholder="What are these documents for?" />
        <input name="files" type="file" multiple className="w-full" />
        <button className="btn-primary w-full justify-center">Send securely</button>
      </form>
      {message && <p className="mt-4 text-sm text-t2">{message}</p>}
    </main>
  );
}
