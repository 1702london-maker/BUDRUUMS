"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Mode = "affiliate" | "client";

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>("affiliate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setRedirecting(true);
      }
    });
  }, []);

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword(login);
    setLoading(false);
    if (error || !data.session) {
      setError(error?.message || "Invalid email or password.");
      return;
    }
    if (mode === "affiliate") {
      const role = data.session.user.user_metadata?.role;
      if (role !== "referral_partner") {
        await supabase.auth.signOut();
        setError("This account does not have referral partner access.");
        return;
      }
      window.location.href = "/referral-portal/dashboard";
      return;
    }
    window.location.href = "/booking/portal";
  }

  if (redirecting) {
    return (
      <main className="px-5 py-16 max-w-xl mx-auto">
        <h1 className="font-display text-[34px] mb-2">Account</h1>
        <p className="text-t2">You are already signed in.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="px-5 sm:px-8 lg:px-14 py-16 lg:py-20 bg-[#F8F8F8]">
        <div className="max-w-xl mx-auto bg-white border border-br rounded-xl p-6">
          <div className="flex border-b border-br mb-6">
            {([["affiliate", "Affiliate"], ["client", "Client"]] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${mode === value ? "border-ac text-ac" : "border-transparent text-t2"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={submitLogin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div>
                <h1 className="font-display text-[30px] mb-2">Account Login</h1>
                <p className="text-sm text-t2">
                  {mode === "affiliate"
                    ? "Use the credentials emailed after referral approval."
                    : "Use the credentials emailed after your booking is confirmed."}
                </p>
              </div>
              <input
                className="w-full border border-br rounded px-4 py-3"
                type="email"
                placeholder="Email"
                value={login.email}
                onChange={(e) => setLogin((s) => ({ ...s, email: e.target.value }))}
              />
              <input
                className="w-full border border-br rounded px-4 py-3"
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) => setLogin((s) => ({ ...s, password: e.target.value }))}
              />
              <button disabled={loading} className="btn-primary w-full justify-center">
                {loading ? "Signing in..." : "Sign In"}
              </button>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <p className="text-sm text-t2">
                Need access?{" "}
                <Link className="text-ac underline" href={mode === "affiliate" ? "/referral-portal" : "/booking"}>
                  {mode === "affiliate" ? "Apply for referral access" : "Book a session"}
                </Link>
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
