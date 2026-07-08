"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

export default function ReferralPortalPage() {
  const [tab, setTab] = useState<"apply" | "login">("apply");
  const [applyDone, setApplyDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [apply, setApply] = useState({ name: "", email: "", website: "", audience: "" });

  useEffect(() => {
    // Check if already logged in via session cookie
    fetch("/api/referral/dashboard").then((res) => {
      if (res.ok) window.location.href = "/referral-portal/dashboard";
    });
  }, []);

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/referral/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: login.email.trim().toLowerCase(), password: login.password.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid email or password.");
        return;
      }
      window.location.href = "/referral-portal/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submitApply(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apply),
      });
      setApplyDone(true);
    } catch {
      setError("Could not submit application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <PageHero
        eyebrow="Referral Portal"
        title="Apply, get approved,"
        titleAccent="log in."
        subtitle="Apply for the referral programme or sign in to your partner dashboard to view your link and earnings."
      />

      <section className="px-5 sm:px-8 lg:px-14 py-14 lg:py-20 bg-[#F8F8F8]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-br rounded-xl p-6">
            <div className="flex border-b border-br mb-6">
              {(["apply", "login"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${tab === t ? "border-ac text-ac" : "border-transparent text-t2"}`}>
                  {t === "apply" ? "Apply to Join" : "Partner Login"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form key="login" onSubmit={submitLogin} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                  <p className="text-sm text-t2">Sign in with the credentials emailed after approval.</p>
                  <input
                    className="w-full border border-br rounded px-4 py-3"
                    type="email"
                    placeholder="Email"
                    required
                    value={login.email}
                    onChange={(e) => setLogin((s) => ({ ...s, email: e.target.value }))}
                  />
                  <input
                    className="w-full border border-br rounded px-4 py-3"
                    type="password"
                    placeholder="Password (e.g. Kx7m-N2pQ-9vR)"
                    required
                    value={login.password}
                    onChange={(e) => setLogin((s) => ({ ...s, password: e.target.value }))}
                  />
                  <button disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <p className="text-sm text-t2">
                    Not approved yet?{" "}
                    <button type="button" className="text-ac underline" onClick={() => setTab("apply")}>
                      Apply instead
                    </button>
                  </p>
                </motion.form>
              ) : applyDone ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <h2 className="font-display text-2xl">Application received</h2>
                  <p className="text-sm text-t2">We review applications within 1 working day. If approved, you will receive login details by email.</p>
                  <Link className="text-ac underline" href="/referral-portal">Go back</Link>
                </motion.div>
              ) : (
                <motion.form key="apply" onSubmit={submitApply} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                  <input className="w-full border border-br rounded px-4 py-3" type="text" placeholder="Full name" required value={apply.name} onChange={(e) => setApply((s) => ({ ...s, name: e.target.value }))} />
                  <input className="w-full border border-br rounded px-4 py-3" type="email" placeholder="Email address" required value={apply.email} onChange={(e) => setApply((s) => ({ ...s, email: e.target.value }))} />
                  <input className="w-full border border-br rounded px-4 py-3" type="url" placeholder="Website / profile" value={apply.website} onChange={(e) => setApply((s) => ({ ...s, website: e.target.value }))} />
                  <textarea className="w-full border border-br rounded px-4 py-3 min-h-[120px]" placeholder="Tell us about your audience" value={apply.audience} onChange={(e) => setApply((s) => ({ ...s, audience: e.target.value }))} />
                  <button disabled={loading} className="btn-primary w-full justify-center">
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-br rounded-xl p-6">
              <h2 className="font-display text-2xl mb-2">What happens after approval</h2>
              <p className="text-sm text-t2 leading-relaxed">After you are approved, you receive a password email. Use that password to sign in and access your referral link, earnings, and conversion activity.</p>
            </div>
            <div className="bg-white border border-br rounded-xl p-6">
              <h2 className="font-display text-2xl mb-2">Need help?</h2>
              <p className="text-sm text-t2 leading-relaxed">Email <a className="text-ac underline" href="mailto:booking@budruum.co.uk">booking@budruum.co.uk</a> and we will confirm next steps.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
