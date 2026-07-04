"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const SVC_TABLE = [
  { s: "Business Plan Writing", w: "Founders seeking funding or visa", p: "From £2,000", c: "£200+" },
  { s: "Financial Forecasting", w: "Startups needing investor-ready projections", p: "From £3,500", c: "£350+" },
  { s: "Startup Consultancy", w: "Early-stage founders building structure", p: "From £2,500", c: "£250+" },
  { s: "Branding & Identity", w: "Businesses launching or rebranding", p: "From £1,000", c: "£100+" },
  { s: "Mentorship", w: "Founders who want ongoing strategic guidance", p: "£6,200", c: "£620" },
  { s: "Full Founder Package", w: "Founders who want the complete setup", p: "From £7,500", c: "£750+" },
];

const WHO = [
  { title:"Accountants & Bookkeepers", desc:"Your clients already need business plans and forecasts. Refer them instead of turning the work away." },
  { title:"Business & Startup Coaches", desc:"You advise founders on strategy. Refer them to Budruum for the execution — and earn while you do it." },
  { title:"Immigration Advisors", desc:"Innovator Founder, Start-up Visa — your clients need compliant business plans. We write them properly." },
  { title:"Content Creators & Bloggers", desc:"Running a startup newsletter, YouTube channel or blog? Recommend Budruum and earn on every conversion." },
  { title:"Incubators & Accelerators", desc:"Support your cohort with professional documents while earning on every referral that converts." },
  { title:"Community Managers", desc:"Running a founder WhatsApp group or online community? Share your link and earn on every conversion." },
];

const FAQS = [
  { q:"How does tracking work?", a:"You get a unique referral link. Anyone who clicks it and purchases within 30 days is credited to you — even if they do not buy immediately." },
  { q:"When do I get paid?", a:"We pay on the 15th of each month for all commissions confirmed in the previous month via UK bank transfer." },
  { q:"Is there a minimum payout?", a:"No minimum for your first payout. From your second month, there is a £50 threshold — easily met with one referral." },
  { q:"Do I need a UK audience?", a:"Budruum serves UK-based founders. Your audience should include people starting or growing businesses in the UK." },
  { q:"Can I refer existing clients?", a:"Yes — if you refer someone who has not previously engaged with Budruum, that counts as a valid referral regardless of how you know them." },
  { q:"How do I apply?", a:"Click Apply below. Fill in the short form and we will respond within 48 hours with your unique link and dashboard access." },
];

export default function AffiliatePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[92px]">
        <motion.div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.07) 0%,transparent 65%)" }}
          animate={{ scale: [1,1.1,1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
          <p className="eyebrow">Affiliate Programme</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            Earn <em className="not-italic text-[#A88F84]">10% commission</em> on every founder you refer.
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            Share Budruum with your network — accountants, coaches, startup founders, immigration advisors. Every referral that converts earns you a direct commission. No caps. No complicated tiers.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <Link href="/affiliate-portal" className="btn-primary">Apply to Join <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
            <a href="#how-it-works" className="btn-outline">See how it works</a>
          </div>
        </motion.div>

        {/* Animated dashboard panel */}
        <motion.div className="relative"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="bg-white border border-[#E8E8E8] rounded-[8px] overflow-hidden" style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}>
            <div className="flex items-center gap-[10px] px-5 py-4 border-b border-[#E8E8E8]">
              <div className="flex gap-[6px]">
                {["#FFBD2E","#27C93F","#FF5F57"].map(c => <div key={c} className="w-[10px] h-[10px] rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-[11.5px] text-[#6B6B6B] tracking-[.06em]">Affiliate Dashboard</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <motion.div className="bg-[#F8F8F8] rounded-[6px] p-[14px_16px]"
                  animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                  <div className="text-[10px] tracking-[.12em] uppercase text-[#6B6B6B] mb-[6px]">Earnings</div>
                  <div className="font-display text-[26px] font-light text-[#1A1A1A]">£1,240</div>
                </motion.div>
                <motion.div className="bg-[#F8F8F8] rounded-[6px] p-[14px_16px]"
                  animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                  <div className="text-[10px] tracking-[.12em] uppercase text-[#6B6B6B] mb-[6px]">Referrals</div>
                  <div className="font-display text-[26px] font-light text-[#A88F84]">7</div>
                </motion.div>
              </div>
              <div className="flex flex-col gap-[6px]">
                {[
                  { n:"Sarah M. — Business Plan", s:"Paid", bg:"#E8F5EE", c:"#2D7D46" },
                  { n:"James K. — Full Package", s:"Pending", bg:"#FFF8E7", c:"#B08000" },
                  { n:"Amara T. — Forecasting", s:"Confirmed", bg:"#EAF0FF", c:"#2255CC" },
                ].map((r,i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-[10px] bg-[#F8F8F8] rounded text-[12.5px]">
                    <span className="text-[#6B6B6B]">{r.n}</span>
                    <span className="px-[9px] py-[3px] rounded-[20px] text-[11px] font-medium" style={{ background: r.bg, color: r.c }}>{r.s}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#A88F84] rounded-[6px] px-4 py-[14px] flex items-center justify-between">
                <span className="text-[13px] text-white">Next payout — 15 July</span>
                <span className="font-display text-[22px] text-white font-light">£620</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STAT BAR */}
      <div className="bg-white border-b border-[#E8E8E8] grid grid-cols-2 lg:grid-cols-4 gap-6 text-center px-5 sm:px-8 lg:px-14 py-8 lg:py-9">
        {[
          { n:"10%", l:"Commission Per Sale" },
          { n:"30", l:"Day Cookie Window" },
          { n:"£200+", l:"Average Commission" },
          { n:"Monthly", l:"Payout Schedule" },
        ].map((s,i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
            <div className="font-display text-[40px] font-light text-[#A88F84] leading-tight">{s.n}</div>
            <div className="text-[13px] text-[#6B6B6B] mt-1">{s.l}</div>
          </motion.div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">The Process</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Simple to start. <em className="not-italic text-[#A88F84]">Simple to earn.</em></h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85] max-w-[500px]">Three steps between you and your first commission. No technical setup needed — just a link and an audience that trusts you.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { n:"01", t:"Apply & Get Approved", d:"Fill in the short application form. We review within 48 hours and approve partners whose audience aligns with UK founders, startups, or business owners." },
            { n:"02", t:"Share Your Unique Link", d:"You receive a personal tracking link and a dashboard showing clicks, conversions and earnings in real time. Share via email, content, social or directly with clients." },
            { n:"03", t:"Get Paid Every Month", d:"Commissions are confirmed once client payment clears. We pay on the 15th of each month via UK bank transfer. No minimum threshold for your first payout." },
          ].map((s,i) => (
            <motion.div key={i} className="border border-[#E8E8E8] rounded-[10px] bg-[#F8F8F8]" style={{ padding: "32px 28px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
              <span className="font-display text-[36px] font-light text-[#A88F84] block mb-4">{s.n}</span>
              <h3 className="font-display text-[20px] font-light text-[#1A1A1A] mb-3">{s.t}</h3>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.8]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EARNINGS BREAKDOWN */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Earnings</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)" }}>10% on every sale. <em className="not-italic text-[#A88F84]">No cap. No tiers.</em></h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85] mb-7">Our services start from £1,000 and go up to £7,500+. At 10%, a single business plan referral earns you £200. Refer a mentorship or full package client and you could earn £620–£750 from one conversation.</p>
          <div className="flex flex-col gap-3">
            {["30-day cookie — you get credit even if they return later","Commission confirmed on cleared payment, not just enquiry","Real-time dashboard — see clicks, conversions, earnings live","Paid monthly via UK bank transfer on the 15th"].map((c,i) => (
              <div key={i} className="flex items-start gap-3 text-[13.5px] text-[#6B6B6B]">
                <div className="w-5 h-5 rounded-full bg-[#A88F84] flex items-center justify-center flex-shrink-0 mt-[1px]">
                  <svg viewBox="0 0 10 8" fill="none" width="10" height="10"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {c}
              </div>
            ))}
          </div>
        </motion.div>
        <div className="flex flex-col gap-4">
          {[
            { l:"Business Plan Referral", a:"£200+", s:"10% of from £2,000 service", featured:false },
            { l:"Mentorship Referral", a:"£620", s:"10% of £6,200 service", featured:false },
            { l:"Full Founder Package", a:"£750", s:"10% of from £7,500 package", featured:true },
          ].map((c,i) => (
            <motion.div key={i} className={`rounded-[10px] border p-6 ${c.featured ? "border-[#A88F84] bg-[#A88F84]" : "border-[#E8E8E8] bg-white"}`}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
              <div className={`text-[12px] font-medium mb-1 ${c.featured ? "text-white/70" : "text-[#6B6B6B]"}`}>{c.l}</div>
              <div className={`font-display text-[40px] font-light mb-1 ${c.featured ? "text-white" : "text-[#1A1A1A]"}`}>{c.a}</div>
              <div className={`text-[12.5px] ${c.featured ? "text-white/60" : "text-[#6B6B6B]"}`}>{c.s}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES TABLE */}
      <section className="border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">What You Are Promoting</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-3" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Premium services. <em className="not-italic text-[#A88F84]">Real prices.</em></h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">These are the services your referrals will purchase. High-ticket, high-quality — founders take this seriously.</p>
        </motion.div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-[#E8E8E8]">
                {["Service","Who Buys It","Price Range","Your Commission"].map(h => (
                  <th key={h} className="text-left text-[11px] font-medium tracking-[.15em] uppercase text-[#6B6B6B] pb-4 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SVC_TABLE.map((r,i) => (
                <tr key={i} className="border-b border-[#E8E8E8]">
                  <td className="py-4 pr-6 text-[14px] font-medium text-[#1A1A1A]">{r.s}</td>
                  <td className="py-4 pr-6 text-[13.5px] text-[#6B6B6B]">{r.w}</td>
                  <td className="py-4 pr-6 text-[14px] text-[#1A1A1A]">{r.p}</td>
                  <td className="py-4 text-[14px] font-medium text-[#A88F84]">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Is This For You?</p>
          <h2 className="font-display font-light text-[#1A1A1A]" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Best suited for people with <em className="not-italic text-[#A88F84]">trusted audiences.</em></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHO.map((w,i) => (
            <motion.div key={i} className="bg-white border border-[#E8E8E8] rounded-[10px]" style={{ padding: "28px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.07 }}>
              <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-3">{w.title}</h3>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.8]">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Common Questions</p>
          <h2 className="font-display font-light text-[#1A1A1A]" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Everything you need <em className="not-italic text-[#A88F84]">to know.</em></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FAQS.map((f,i) => (
            <motion.div key={i} className="border border-[#E8E8E8] rounded-[8px] bg-white" style={{ padding: "24px" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.07 }}>
              <p className="text-[14px] font-medium text-[#1A1A1A] mb-3">{f.q}</p>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.75]">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[#1A1A1A] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(32px,4vw,52px)" }}>Ready to start <em className="not-italic text-[#A88F84]">earning?</em></h2>
          <p className="text-[15px] text-white/60 max-w-[420px] mx-auto mb-9 leading-[1.85]">Join Budruum&apos;s affiliate programme today. Applications take under 2 minutes and we approve within 48 hours.</p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link href="/affiliate-portal" className="btn-primary">Apply Now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
            <Link href="/contact" className="px-7 py-3 border border-white/40 text-white text-[13.5px] font-medium rounded transition-all hover:border-white/80 inline-flex items-center gap-2">Ask a Question</Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACT STRIP */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-between flex-wrap gap-4 px-5 sm:px-8 lg:px-14 py-5">
        <span className="text-[14px] text-[#6B6B6B]">Questions? Reach us at <a href="mailto:booking@budruum.co.uk" className="text-[#A88F84]">booking@budruum.co.uk</a></span>
        <div className="flex items-center gap-6 flex-wrap">
          {["booking@budruum.co.uk","Response within 24 hours","Available globally"].map((t,i) => (
            <span key={i} className="text-[13.5px] text-[#6B6B6B]">{t}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
