"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

const STATS = [
  { v: "10%", l: "Commission Rate" },
  { v: "30 days", l: "Cookie Window" },
  { v: "Monthly", l: "Payout Schedule" },
  { v: "£0", l: "To Join" },
];

export default function AffiliatePortalPage() {
  const [tab, setTab] = useState<"login" | "apply">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [applyForm, setApplyForm] = useState({ name: "", email: "", website: "", audience: "" });
  const [loginStatus, setLoginStatus] = useState<"idle" | "sent">("idle");
  const [applyStatus, setApplyStatus] = useState<"idle" | "sent">("idle");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginStatus("sent");
  }

  function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setApplyStatus("sent");
  }

  return (
    <main>
      <PageHero
        eyebrow="Affiliate Portal"
        title="Earn While You"
        titleAccent="Refer."
        subtitle="Sign in to your affiliate dashboard or apply to join the Budruum partner programme and start earning 10% commission on every referral."
      />

      <section className="py-16 bg-ac/10 border-y border-ac/20">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="font-display text-[36px] font-light text-ac">{s.v}</div>
                <div className="text-[13px] text-t2 mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 flex flex-col lg:flex-row gap-16 items-start">

          <motion.div className="flex-1 max-w-[480px]"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}>

            <div className="flex border-b border-br mb-8">
              {(["login", "apply"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-6 py-3 text-[13.5px] font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? "border-ac text-ac" : "border-transparent text-t2 hover:text-t1"}`}>
                  {t === "login" ? "Partner Login" : "Apply to Join"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "login" && (
                <motion.div key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  {loginStatus === "sent" ? (
                    <div className="bg-white rounded-xl p-8 border border-br text-center">
                      <div className="w-12 h-12 rounded-full bg-ac/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-ac text-xl">✓</span>
                      </div>
                      <h3 className="font-display text-[22px] text-t1 mb-2">Check your email</h3>
                      <p className="text-[13.5px] text-t2">We've sent a magic login link to <strong>{loginForm.email}</strong>. Check your inbox to access your dashboard.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLogin} className="bg-white rounded-xl p-8 border border-br space-y-5">
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Email Address</label>
                        <input type="email" required value={loginForm.email}
                          onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors"
                          placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Password</label>
                        <input type="password" required value={loginForm.password}
                          onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors"
                          placeholder="••••••••" />
                      </div>
                      <button type="submit"
                        className="w-full bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-3.5 rounded transition-all">
                        Sign In to Dashboard
                      </button>
                      <p className="text-center text-[12.5px] text-t2">
                        Not an affiliate yet?{" "}
                        <button type="button" onClick={() => setTab("apply")} className="text-ac hover:underline">Apply to join →</button>
                      </p>
                    </form>
                  )}
                </motion.div>
              )}

              {tab === "apply" && (
                <motion.div key="apply" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                  {applyStatus === "sent" ? (
                    <div className="bg-white rounded-xl p-8 border border-br text-center">
                      <div className="w-12 h-12 rounded-full bg-ac/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-ac text-xl">✓</span>
                      </div>
                      <h3 className="font-display text-[22px] text-t1 mb-2">Application received</h3>
                      <p className="text-[13.5px] text-t2">We review all applications within 3 business days. You'll hear from us at <strong>{applyForm.email}</strong>.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="bg-white rounded-xl p-8 border border-br space-y-5">
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Full Name</label>
                        <input type="text" required value={applyForm.name}
                          onChange={e => setApplyForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors"
                          placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Email Address</label>
                        <input type="email" required value={applyForm.email}
                          onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors"
                          placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Website / Social Profile</label>
                        <input type="url" value={applyForm.website}
                          onChange={e => setApplyForm(f => ({ ...f, website: e.target.value }))}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors"
                          placeholder="https://yoursite.com" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-t2 mb-2 uppercase tracking-[0.1em]">Tell us about your audience</label>
                        <textarea required value={applyForm.audience}
                          onChange={e => setApplyForm(f => ({ ...f, audience: e.target.value }))}
                          rows={3}
                          className="w-full border border-br rounded px-4 py-3 text-[14px] text-t1 focus:outline-none focus:border-ac transition-colors resize-none"
                          placeholder="Who follows you / reads your content? Size, industry, etc." />
                      </div>
                      <button type="submit"
                        className="w-full bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-3.5 rounded transition-all">
                        Submit Application
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}>
            <div>
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="font-display text-[32px] font-light text-t1 mb-6">Three steps to earning</h2>
            </div>
            {[
              { n: "01", t: "Apply & Get Approved", d: "Submit your application. We review and approve within 3 business days. You'll get a unique referral link." },
              { n: "02", t: "Share Your Link", d: "Share your link with your audience, clients, or network. No minimum referrals required." },
              { n: "03", t: "Earn 10% Commission", d: "Every time a referred client signs up and pays, you earn 10% of that invoice — paid monthly." },
            ].map((s, i) => (
              <motion.div key={s.n}
                className="flex gap-5 items-start bg-white rounded-xl p-6 border border-br"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                <div className="w-10 h-10 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-medium text-ac">{s.n}</span>
                </div>
                <div>
                  <h3 className="font-display text-[18px] font-medium text-t1 mb-1">{s.t}</h3>
                  <p className="text-[13px] text-t2 leading-relaxed">{s.d}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-ac/5 border border-ac/20 rounded-xl p-6 mt-4">
              <p className="text-[13px] text-t2 leading-relaxed">
                <strong className="text-t1">Questions?</strong> Email us at{" "}
                <a href="mailto:affiliates@budruum.co.uk" className="text-ac hover:underline">affiliates@budruum.co.uk</a>{" "}
                and we'll get back to you within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
