"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageCTA from "@/components/PageCTA";

const OPTIONS = [
  { num:"01", title:"Strategy Consultation", price:"£300", per:"/ 60 minutes", featured:true, items:["60-minute private session","Business idea review","Direction and positioning","Practical next steps"], cta:"Select & Continue", href:"/booking" },
  { num:"02", title:"Business Planning Session", price:"£500", per:"/ session", featured:false, items:["Business model review","Planning support","Financial direction","Growth recommendations"], cta:"Select & Continue", href:"/booking" },
  { num:"03", title:"Full Build Consultation", price:"Custom", per:"/ proposal", featured:false, items:["End-to-end project review","Brand, digital and operational direction","Implementation roadmap","Custom proposal after consultation"], cta:"Get in Touch", href:"/contact" },
];

const HOW_STEPS = [
  { n:"01", t:"Book your consultation", d:"Choose the session that fits your stage. Pay to confirm your slot, and we will send through the details within 24 hours." },
  { n:"02", t:"Prepare your brief", d:"We send you a short pre-session document so the conversation starts in the right place — focused, relevant, and productive." },
  { n:"03", t:"Your session takes place", d:"A private, focused conversation — no sales pressure, no filler. Just honest, experienced input tailored to your specific situation." },
  { n:"04", t:"Receive your action summary", d:"Within 48 hours of your session, you receive a written summary of recommendations and next steps to move forward confidently." },
];

const WHO = [
  "Founders with a clear vision who need the right structure",
  "Entrepreneurs at the planning stage of a new venture",
  "Existing businesses looking to rebrand or reposition",
  "Startups preparing for investment or growth",
  "Anyone who wants to move forward without guesswork",
];

export default function StartPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8]"
        style={{ padding: "92px 56px 84px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
        <motion.div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.07) 0%,transparent 65%)" }}
          animate={{ scale: [1,1.1,1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
          <p className="eyebrow">Begin With Intention</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            Begin with <em className="not-italic text-[#A88F84]">intention.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            Starting a business is one of the most important decisions you will make. Budruum ensures you begin with the right foundation — not guesswork.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {["Business Planning","Strategic Advice","Professional Foundations","UK & Global"].map(t => (
              <span key={t} className="px-4 py-[7px] border border-[#E8E8E8] rounded-[20px] text-[12.5px] text-[#6B6B6B] bg-white">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Clock animation — represents "Begin with Intention / Time" */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "400px", boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <svg viewBox="0 0 200 200" width="220" height="220" style={{ overflow: "visible" }}>
              {/* Clock face outer ring */}
              <circle cx="100" cy="100" r="88" fill="white" stroke="#E8E8E8" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="82" fill="none" stroke="#A88F84" strokeWidth="0.5" strokeOpacity="0.3" />
              {/* Hour tick marks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 - 90) * Math.PI / 180;
                const x1 = 100 + 74 * Math.cos(a); const y1 = 100 + 74 * Math.sin(a);
                const x2 = 100 + 82 * Math.cos(a); const y2 = 100 + 82 * Math.sin(a);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A88F84" strokeWidth={i % 3 === 0 ? 2 : 0.8} strokeOpacity="0.6" />;
              })}
              {/* Hour numbers */}
              {[12,3,6,9].map((n, i) => {
                const a = (i * 90 - 90) * Math.PI / 180;
                const x = 100 + 60 * Math.cos(a); const y = 100 + 60 * Math.sin(a);
                return <text key={n} x={x} y={y + 4} textAnchor="middle" fontSize="10" fontFamily="Cormorant Garamond, serif" fill="#A88F84" fillOpacity="0.7">{n}</text>;
              })}
              {/* Minute hand — full revolution */}
              <motion.line x1="100" y1="100" x2="100" y2="28"
                stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }} />
              {/* Hour hand — slow revolution */}
              <motion.line x1="100" y1="100" x2="100" y2="46"
                stroke="#A88F84" strokeWidth="3" strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }} />
              {/* Second hand */}
              <motion.line x1="100" y1="110" x2="100" y2="24"
                stroke="#A88F84" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.5"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }} />
              {/* Centre dot */}
              <circle cx="100" cy="100" r="4" fill="#A88F84" />
              <circle cx="100" cy="100" r="2" fill="white" />
            </svg>
            <div className="text-[11px] tracking-[.2em] uppercase text-[#A88F84] mt-1">Begin with intention</div>
          </div>
        </motion.div>
      </section>

      {/* OPTIONS */}
      <section style={{ padding: "80px 56px", background: "#fff", borderBottom: "1px solid #E8E8E8" }}>
        <motion.div className="text-center mb-[52px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Choose Your Starting Point</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>The right beginning changes everything.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] max-w-[500px] mx-auto leading-[1.85]">Every Budruum engagement begins with a consultation. Choose the option that best fits where you are right now.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {OPTIONS.map((o, i) => (
            <motion.div key={i}
              className={`rounded-[10px] border flex flex-col relative ${o.featured ? "border-[#A88F84] bg-white shadow-[0_6px_28px_rgba(0,0,0,.09)]" : "border-[#E8E8E8] bg-white hover:border-[#A88F84]/40 hover:shadow-md"} transition-all duration-300`}
              style={{ padding: "32px 28px" }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
              {o.featured && <span className="absolute -top-3 left-6 bg-[#A88F84] text-white text-[11px] font-medium px-3 py-1 rounded-full">Most Popular</span>}
              <div className="font-display text-[28px] font-light text-[#A88F84] mb-2">{o.num}</div>
              <h3 className="font-display text-[22px] font-light text-[#1A1A1A] mb-2">{o.title}</h3>
              <div className="text-[26px] font-display font-light text-[#1A1A1A] mb-1">{o.price} <span className="text-[14px] text-[#6B6B6B]">{o.per}</span></div>
              <div className="flex flex-col gap-3 my-6">
                {o.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3 text-[13.5px] text-[#6B6B6B]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2" className="flex-shrink-0 mt-[2px]"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <Link href={o.href} className={`mt-auto text-center py-3 px-6 rounded text-[13.5px] font-medium transition-all ${o.featured ? "bg-[#A88F84] text-white hover:bg-[#8f7870]" : "border border-[#E8E8E8] text-[#1A1A1A] hover:border-[#A88F84] hover:text-[#A88F84]"}`}>
                {o.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        {/* Animated panel replacing image */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "420px" }}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            {HOW_STEPS.map((s, i) => (
              <motion.div key={i} className="flex items-center gap-4 bg-white border border-[#E8E8E8] rounded-[8px] px-5 py-3 w-[75%]"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i*0.75, ease: "easeInOut" }}>
                <span className="font-display text-[22px] text-[#A88F84] font-light w-8 flex-shrink-0">{s.n}</span>
                <span className="text-[13px] font-medium text-[#1A1A1A]">{s.t}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="eyebrow">How It Works</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-9" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 300 }}>A clear path from day one.</h2>
          <div className="flex flex-col gap-6">
            {HOW_STEPS.map((s,i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#A88F84]/10 border border-[#A88F84]/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-[16px] text-[#A88F84]">{s.n}</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-[5px]">{s.t}</h4>
                  <p className="text-[13.5px] text-[#6B6B6B] leading-[1.7]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Who This Is For</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-9" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 300 }}>Built for those who take it seriously.</h2>
          <div className="flex flex-col gap-4">
            {WHO.map((w, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-[#E8E8E8] text-[14.5px] text-[#6B6B6B]">
                <div className="w-2 h-2 rounded-full bg-[#A88F84] flex-shrink-0" />
                {w}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Animated panel replacing image */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "380px" }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {[60, 100, 140].map((r, i) => (
              <motion.div key={i} className="absolute border border-[#A88F84]/12 rounded-full"
                style={{ width: r*2, height: r*2 }}
                animate={{ rotate: i%2===0 ? 360 : -360 }}
                transition={{ duration: 20+i*8, repeat: Infinity, ease: "linear" }} />
            ))}
            <motion.div className="w-16 h-16 rounded-full bg-[#A88F84]/10 border border-[#A88F84]/30 flex items-center justify-center"
              animate={{ boxShadow: ["0 0 0 0px rgba(168,143,132,0.3)","0 0 0 20px rgba(168,143,132,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[#1A1A1A]" style={{ padding: "80px 56px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(32px,4vw,52px)" }}>The right beginning changes everything.</h2>
          <p className="text-[15px] text-white/60 max-w-[420px] mx-auto mb-9 leading-[1.85]">One focused session can save months of confusion and costly mistakes.</p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">Book Consultation <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="px-7 py-3 border border-white/40 text-white text-[13.5px] font-medium rounded transition-all hover:border-white/80 inline-flex items-center gap-2">Submit Your Project</Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACT STRIP */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8]" style={{ padding: "28px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <span className="text-[14px] text-[#6B6B6B]">Questions? Reach us at <a href="mailto:booking@budruum.co.uk" className="text-[#A88F84]">booking@budruum.co.uk</a></span>
        <div className="flex items-center gap-6">
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, t: "booking@budruum.co.uk" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, t: "Response within 24 hours" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, t: "Available globally" },
          ].map((c,i) => (
            <div key={i} className="flex items-center gap-2 text-[13.5px] text-[#6B6B6B]">{c.icon}{c.t}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
