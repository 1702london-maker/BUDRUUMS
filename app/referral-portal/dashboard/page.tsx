"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReferralDashboardPage() {
  const [name, setName] = useState("Partner");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("BUD-XXXX");
  const [ready, setReady] = useState(false);
  const [metrics, setMetrics] = useState({ clicks: 0, conversions: 0, earnings: 0, payout_status: "Pending" });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/referral/dashboard")
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/referral-portal";
          return;
        }
        const payload = await res.json();
        setName(payload.user?.name || "Partner");
        setEmail(payload.user?.email || "");
        setCode(payload.user?.referral_code || "BUD-XXXX");
        setMetrics(payload.metrics || { clicks: 0, conversions: 0, earnings: 0, payout_status: "Pending" });
        setRecent(Array.isArray(payload.recent) ? payload.recent : []);
        setReady(true);
      })
      .catch(() => {
        window.location.href = "/referral-portal";
      });
  }, []);

  async function handleLogout() {
    await fetch("/api/referral/logout", { method: "POST" });
    window.location.href = "/referral-portal";
  }

  if (!ready) return <main className="px-6 py-16 min-h-[60vh] flex items-center justify-center"><p className="text-t2">Loading dashboard...</p></main>;

  const link = `https://budruum.co.uk/referral?ref=${code}`;

  return (
    <main className="px-5 sm:px-8 lg:px-14 py-14 lg:py-20 bg-[#F8F8F8] min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">Referral Dashboard</p>
            <h1 className="font-display text-[34px] sm:text-[46px] font-light text-t1 mb-2">Welcome back, {name}.</h1>
            <p className="text-sm text-t2">{email}</p>
          </div>
          <button onClick={handleLogout} className="text-sm text-t2 underline mt-2">Log out</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-br rounded-xl p-5"><div className="text-xs uppercase tracking-[.12em] text-t2">Clicks</div><div className="font-display text-4xl text-ac">{metrics.clicks}</div></div>
          <div className="bg-white border border-br rounded-xl p-5"><div className="text-xs uppercase tracking-[.12em] text-t2">Conversions</div><div className="font-display text-4xl text-t1">{metrics.conversions}</div></div>
          <div className="bg-white border border-br rounded-xl p-5"><div className="text-xs uppercase tracking-[.12em] text-t2">Earnings</div><div className="font-display text-4xl text-t1">£{metrics.earnings}</div></div>
          <div className="bg-white border border-br rounded-xl p-5"><div className="text-xs uppercase tracking-[.12em] text-t2">Code</div><div className="font-display text-3xl text-ac">{code}</div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white border border-br rounded-xl p-6">
            <h2 className="font-display text-2xl mb-3">Your referral link</h2>
            <p className="text-sm text-t2 mb-4">Share this link with your audience.</p>
            <div className="bg-[#F8F8F8] border border-br rounded-lg p-4 break-all text-sm font-mono">{link}</div>
            <button
              onClick={() => navigator.clipboard.writeText(link)}
              className="mt-3 text-sm text-ac underline"
            >
              Copy link
            </button>
          </section>
          <section className="bg-white border border-br rounded-xl p-6">
            <h2 className="font-display text-2xl mb-3">Earnings</h2>
            <p className="text-sm text-t2 leading-relaxed mb-2">Payout status: <strong>{metrics.payout_status}</strong></p>
            <p className="text-sm text-t2 leading-relaxed">Payouts are processed on the 15th of each month via bank transfer.</p>
            {recent.length > 0 && (
              <div className="mt-4 space-y-2">
                {recent.slice(0, 3).map((item, i) => (
                  <div key={i} className="text-sm border-b border-br pb-2">{item.name || item.email || "Referral activity"}</div>
                ))}
              </div>
            )}
            <Link href="/referral" className="inline-flex mt-4 text-ac underline text-sm">View public referral page</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
