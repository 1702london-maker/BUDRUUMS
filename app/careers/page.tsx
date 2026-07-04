"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ROLES = [
  { title: "Web Developer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: "App Developer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { title: "Graphic Designer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
  { title: "Brand Strategist", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
  { title: "Business Consultant", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
];

export default function CareersPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", role: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function handleApply() {
    if (!form.fname || !form.email || !form.role) return;
    setStatus("sending");
    try {
      const r = await fetch("https://padfgbudntpmzfnuiupt.supabase.co/functions/v1/website-handler?action=contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.fname+" "+form.lname, email: form.email, service: form.role, message: form.message }),
      });
      const d = await r.json();
      setStatus(d.success ? "sent" : "error");
    } catch { setStatus("error"); }
  }

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
          <p className="eyebrow">Careers at Budruum</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            Build with people<br/>who build <em className="not-italic text-[#A88F84]">properly.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            Budruum is a team of thinkers, creators and builders working on ideas that are meant to last. We do not chase volume. We build things that matter.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {["Remote-Friendly","Structured Work","Real Projects","Collaborative Culture","Long-Term Growth"].map(t => (
              <span key={t} className="px-4 py-[7px] border border-[#E8E8E8] rounded-[20px] text-[12.5px] text-[#6B6B6B] bg-white">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Hiring board animation — role cards being built up, like a real team forming */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "400px", boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="absolute inset-0 flex flex-col justify-center gap-[10px] px-7 py-6">
            {/* Header row */}
            <motion.div className="flex items-center gap-2 mb-1"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="w-2 h-2 rounded-full bg-[#A88F84]" />
              <span className="text-[10px] tracking-[.18em] uppercase text-[#6B6B6B] font-medium">Open Roles — Budruum</span>
              <motion.div className="ml-auto px-2 py-[2px] rounded bg-[#A88F84]/15 text-[10px] text-[#A88F84] font-medium"
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>● Hiring</motion.div>
            </motion.div>
            {[
              { role: "Web Developer",       type: "Contract", status: "Open",   dot: "#22c55e" },
              { role: "Brand Strategist",    type: "Part-time", status: "Open",  dot: "#22c55e" },
              { role: "Business Consultant", type: "Freelance", status: "Open",  dot: "#22c55e" },
              { role: "App Developer",       type: "Contract", status: "Review", dot: "#f59e0b" },
              { role: "Graphic Designer",    type: "Freelance", status: "Open",  dot: "#22c55e" },
            ].map((r, i) => (
              <motion.div key={r.role}
                className="flex items-center gap-3 bg-white border border-[#E8E8E8] rounded-[8px] px-4 py-[10px]"
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <div className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: r.dot }} />
                <span className="text-[12.5px] font-medium text-[#1A1A1A] flex-1">{r.role}</span>
                <span className="text-[11px] text-[#6B6B6B]">{r.type}</span>
                <span className={`text-[10px] px-2 py-[2px] rounded font-medium ${r.status === "Open" ? "bg-[#A88F84]/10 text-[#A88F84]" : "bg-amber-50 text-amber-600"}`}>{r.status}</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", borderBottom: "1px solid #E8E8E8" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Why Budruum</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-5" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>
            Not a volume agency.<br/>Never has been.
          </h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.9] mb-4">
            We focus on thoughtful work, structured execution and building things that actually make sense long-term. Every project we take on has intention behind it — and so does every person we bring into the team.
          </p>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.9]">
            At Budruum, you are not filling a seat. You are contributing to something that is designed to last. That distinction shapes everything — how we communicate, how we plan, how we deliver and how we grow together.
          </p>
        </motion.div>
        <motion.div className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-[12px] flex flex-col gap-6" style={{ padding: "40px" }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          {[
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Small Team", sub: "Everyone's contribution is felt and valued" },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "High Standards", sub: "We care deeply about the quality of our output" },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, title: "Long-Term Thinking", sub: "We plan ahead — for clients and for our own team" },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: "Cross-Discipline", sub: "Creativity and structure working side by side" },
          ].map((s,i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#A88F84]/10 flex items-center justify-center flex-shrink-0">{s.icon}</div>
              <div>
                <strong className="block font-display text-[20px] font-medium text-[#1A1A1A] leading-tight">{s.title}</strong>
                <span className="text-[12.5px] text-[#6B6B6B]">{s.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* TEAM */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8]" style={{ padding: "80px 56px" }}>
        <motion.div className="max-w-[580px] mb-[52px]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">The Team</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>Surrounded by people who get it.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">Our team spans disciplines — but everyone speaks the same language: structure, intention and execution. No silos. No politics. Just people doing focused work, together.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", marginBottom: "40px" }}>
          {[
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title: "Web Developers", desc: "Building digital experiences that perform and impress." },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: "App Developers", desc: "Turning product visions into functional, scalable apps." },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>, title: "Designers", desc: "Crafting identities and interfaces with meaning behind every choice." },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, title: "Strategists", desc: "Thinking deeply so the execution is never guesswork." },
            { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, title: "Consultants", desc: "Guiding clients from where they are to where they need to be." },
          ].map((r,i) => (
            <motion.div key={i} className="bg-white border border-[#E8E8E8] rounded-[10px] text-center transition-all duration-200 hover:border-[#A88F84] hover:shadow-sm"
              style={{ padding: "24px 20px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.07 }}>
              <div className="w-11 h-11 rounded-full bg-[#A88F84]/8 flex items-center justify-center mx-auto mb-4">{r.icon}</div>
              <h4 className="text-[13px] font-medium text-[#1A1A1A] mb-2">{r.title}</h4>
              <p className="text-[12px] text-[#6B6B6B] leading-[1.6]">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-white border border-[#E8E8E8] rounded-r-[8px]" style={{ borderLeft: "3px solid #A88F84", padding: "20px 24px" }}>
          <p className="text-[14px] text-[#6B6B6B] leading-[1.8]">The team works collaboratively, not in silos. <strong className="text-[#1A1A1A]">You are surrounded by people who understand both creativity and structure</strong> — and know that the best work happens where the two meet.</p>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">How We Work</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>Direction before execution. Always.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">We do not move fast and break things. We think, plan and then build — with the kind of care that produces work worth keeping. Every project here has a clear purpose and a clear path.</p>
        </motion.div>
        <div className="flex flex-col gap-5">
          {[
            { n: "01", t: "Focused Projects", d: "We take on fewer things and do them properly. No rushing, no cutting corners." },
            { n: "02", t: "Clear Direction Before Execution", d: "Every piece of work begins with clarity on what we are building and why." },
            { n: "03", t: "Collaboration Across Roles", d: "Developers, designers, strategists and consultants work in the same conversation." },
            { n: "04", t: "Quality Over Quantity", d: "We measure success by the standard of what we produce, not the volume of it." },
          ].map((item, i) => (
            <motion.div key={i} className="flex items-start gap-[18px] bg-[#F8F8F8] rounded-[10px] border border-[#E8E8E8] transition-colors duration-200 hover:border-[#A88F84]/40"
              style={{ padding: "22px 24px" }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
              <span className="font-display text-[28px] font-light text-[#A88F84] leading-none flex-shrink-0 w-9">{item.n}</span>
              <div>
                <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-[5px]">{item.t}</h4>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.7]">{item.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8]" style={{ padding: "80px 56px" }}>
        <motion.div className="text-center max-w-[540px] mx-auto mb-[56px]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Culture & Experience</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>A place worth being part of.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">We believe the environment shapes the output. So we invest in making Budruum a place where thoughtful people actually want to work.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
          {[
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5c-1.5-1.5-3.5-1.5-5 0l-3.5 3.5L3 6 2 19l3.5-.5 4-4 7 1.8c.5.1 1.2-.1 1.3-.6z"/></svg>, title: "Quarterly Retreats", desc: "Team bonding, strategy sessions and travel. We invest in time together — away from screens and inside real conversations about where we are going." },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: "Remote-Friendly", desc: "Work from where you work best. We operate with structured collaboration that keeps everyone aligned — without requiring everyone in the same room." },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Creative Freedom", desc: "You are trusted to bring your perspective. There is room to think differently here — as long as the thinking is grounded and the direction is clear." },
            { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: "Real Work, Real Impact", desc: "You will work on real business ideas with real outcomes — not internal tasks that disappear into a pipeline. Your work here has a name on it." },
          ].map((c,i) => (
            <motion.div key={i} className="bg-white border border-[#E8E8E8] rounded-[12px] transition-all duration-200 hover:shadow-[0_6px_28px_rgba(0,0,0,.09)] hover:border-[#A88F84]/30"
              style={{ padding: "32px 30px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.08 }}>
              <div className="w-12 h-12 rounded-[10px] bg-[#A88F84]/8 flex items-center justify-center mb-[18px]">{c.icon}</div>
              <h4 className="font-display text-[19px] font-light text-[#1A1A1A] mb-[10px]">{c.title}</h4>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.8]">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO WE LOOK FOR */}
      <section className="border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Who We Look For</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>People who think before they act.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">Talent matters. But so does the way you approach your work. We look for people who bring judgement, not just skill — and who care about the difference between good and actually good.</p>
        </motion.div>
        <div className="flex flex-col gap-[14px]">
          {[
            { t: "Thinkers first, doers second", d: "People who consider before they execute and understand that clarity prevents waste." },
            { t: "People who value structure", d: "You do not need to be rigid — but you appreciate that good structure is what lets great work happen." },
            { t: "Designers who understand positioning", d: "Not just aesthetics. You think about what the work communicates and why that matters." },
            { t: "Developers who understand business", d: "You write code, but you also understand the problem the code is solving. That distinction matters here." },
            { t: "People who want to grow properly", d: "Not just accumulate titles. You want to get better at something real, surrounded by people doing the same." },
          ].map((tr, i) => (
            <motion.div key={i} className="flex items-start gap-[14px] border border-[#E8E8E8] rounded-[8px] bg-white transition-colors duration-200 hover:border-[#A88F84]"
              style={{ padding: "18px 20px" }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i*0.09 }}>
              <div className="w-2 h-2 rounded-full bg-[#A88F84] flex-shrink-0 mt-[6px]" />
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.7]">
                <strong className="block text-[#1A1A1A] mb-[2px]">{tr.t}</strong>{tr.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8]" style={{ padding: "80px 56px" }}>
        <motion.div className="max-w-[520px] mb-11" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Open Roles</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>Current opportunities.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">We hire when we find the right person — not just when there is an open slot. These are the areas we are actively building in.</p>
        </motion.div>
        <div>
          {ROLES.map((role, i) => (
            <div key={i} className={`flex items-center justify-between gap-5 py-[22px] border-b border-[#E8E8E8] ${i===0?"border-t border-[#E8E8E8]":""}`}>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">{role.icon}</div>
                <div>
                  <h4 className="text-[14.5px] font-medium text-[#1A1A1A] mb-[3px]">{role.title}</h4>
                  <span className="text-[12.5px] text-[#6B6B6B]">Full-time · Remote-friendly</span>
                </div>
              </div>
              <button onClick={() => setApplyOpen(true)} className="px-[14px] py-[5px] rounded-[20px] text-[11.5px] font-medium text-[#A88F84] border border-[#A88F84]/20 bg-[#A88F84]/8 cursor-pointer transition-colors hover:bg-[#A88F84]/15">
                Apply
              </button>
            </div>
          ))}
        </div>
        <div className="mt-7 p-[20px_24px] bg-white border border-[#E8E8E8] rounded-[8px] flex items-center gap-[14px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <p className="text-[13.5px] text-[#6B6B6B] leading-[1.7]"><strong className="text-[#1A1A1A]">Don&apos;t see your role listed?</strong> We are always open to strong talent. If you believe you belong at Budruum, make the case — we are listening.</p>
        </div>
      </section>

      {/* APPLICATION */}
      <section className="border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Apply</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>If you believe you can contribute to the way we build.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.9] mb-7">
            We would like to hear from you. Not a cover letter full of buzzwords — just a clear, honest account of who you are, what you do well and why Budruum makes sense for where you want to go.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <button onClick={() => setApplyOpen(true)} className="btn-primary">
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="mailto:career@budruum.co.uk" className="btn-outline">Email Us Directly</a>
          </div>
        </motion.div>
        <motion.div className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-[12px]" style={{ padding: "36px" }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <h4 className="font-display text-[18px] font-light text-[#1A1A1A] mb-5">What to expect</h4>
          <div className="flex flex-col gap-[18px]">
            {[
              { n:"1", t:"Initial Conversation", d:"A relaxed first call to understand who you are and what you are looking for." },
              { n:"2", t:"Work Review", d:"We look at what you have done — not just what you say you can do." },
              { n:"3", t:"Team Introduction", d:"You meet the people you would be working with. No panels, no pressure." },
              { n:"4", t:"Clear Decision", d:"We move quickly and communicate clearly — no ambiguity, no ghosting." },
            ].map((s,i) => (
              <div key={i} className="flex items-start gap-[14px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#A88F84] text-white text-[11px] font-medium flex items-center justify-center flex-shrink-0 mt-[1px]">{s.n}</div>
                <div>
                  <h5 className="text-[13.5px] font-medium text-[#1A1A1A] mb-[3px]">{s.t}</h5>
                  <p className="text-[12.5px] text-[#6B6B6B] leading-[1.6]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#F2F2F2] border-t border-[#E8E8E8] text-center" style={{ padding: "96px 56px" }}>
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.06) 0%,transparent 65%)" }}
          animate={{ scale: [1,1.15,1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Join Budruum</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1 }}>
            Do work that<br/><em className="not-italic text-[#A88F84]">actually matters.</em>
          </h2>
          <p className="text-[15px] text-[#6B6B6B] max-w-[420px] mx-auto mb-9 leading-[1.85]">
            Join a team that values thinking, structure and execution — and understands that the best work comes from people who genuinely care.
          </p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">Get in Touch <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/faq" className="btn-outline">Read Our FAQ</Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8]" style={{ padding: "40px 56px", display: "flex", alignItems: "center", justifyContent: "center", gap: "56px", flexWrap: "wrap" }}>
        {[
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, label: "WhatsApp", sub: "Quick replies via WhatsApp" },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "iMessage", sub: "Message us on iMessage" },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", sub: "booking@budruum.co.uk" },
        ].map((c,i) => (
          <div key={i} className="flex items-center gap-[14px]">
            <div className="w-11 h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center shadow-sm flex-shrink-0">{c.icon}</div>
            <div><span className="block text-[14px] font-medium text-[#1A1A1A]">{c.label}</span><small className="text-[12.5px] text-[#6B6B6B]">{c.sub}</small></div>
          </div>
        ))}
      </section>

      {/* APPLY MODAL */}
      {applyOpen && (
        <div className="fixed inset-0 bg-black/55 z-[1000] flex items-center justify-center p-5" onClick={() => setApplyOpen(false)}>
          <div className="bg-white rounded-[10px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,.18)] relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 p-[28px_32px_24px] border-b border-[#E8E8E8]">
              <div>
                <h3 className="font-display text-[26px] font-light text-[#1A1A1A] leading-[1.2]">Apply to Budruum</h3>
                <p className="text-[13px] text-[#6B6B6B] mt-1">Tell us who you are and what you do well.</p>
              </div>
              <button onClick={() => setApplyOpen(false)} className="w-8 h-8 border border-[#E8E8E8] rounded-full bg-white flex items-center justify-center text-[#6B6B6B] text-[18px] transition-all hover:border-[#A88F84]">&times;</button>
            </div>
            {status === "sent" ? (
              <div className="p-[48px_32px] text-center">
                <div className="w-14 h-14 rounded-full bg-[#A88F84]/10 border border-[#A88F84]/25 flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="font-display text-[24px] font-light text-[#1A1A1A] mb-[10px]">Application Received</h4>
                <p className="text-[14px] text-[#6B6B6B] leading-[1.8] max-w-[360px] mx-auto mb-6">Thank you for reaching out. We will review your application and get back to you.</p>
                <button onClick={() => { setApplyOpen(false); setStatus("idle"); }} className="bg-[#A88F84] text-white px-7 py-3 rounded text-[13.5px] font-medium border-none cursor-pointer hover:bg-[#8f7870] transition-colors">Done</button>
              </div>
            ) : (
              <div className="p-[28px_32px]">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[12.5px] font-medium text-[#1A1A1A]">First Name</label>
                    <input value={form.fname} onChange={e=>setForm(f=>({...f,fname:e.target.value}))} className="px-[14px] py-[10px] border border-[#E8E8E8] rounded text-[13.5px] outline-none focus:border-[#A88F84] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[12.5px] font-medium text-[#1A1A1A]">Last Name</label>
                    <input value={form.lname} onChange={e=>setForm(f=>({...f,lname:e.target.value}))} className="px-[14px] py-[10px] border border-[#E8E8E8] rounded text-[13.5px] outline-none focus:border-[#A88F84] transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] mb-4">
                  <label className="text-[12.5px] font-medium text-[#1A1A1A]">Email Address</label>
                  <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="px-[14px] py-[10px] border border-[#E8E8E8] rounded text-[13.5px] outline-none focus:border-[#A88F84] transition-colors" />
                </div>
                <div className="flex flex-col gap-[6px] mb-4">
                  <label className="text-[12.5px] font-medium text-[#1A1A1A]">Role Applying For</label>
                  <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} className="px-[14px] py-[10px] border border-[#E8E8E8] rounded text-[13.5px] outline-none focus:border-[#A88F84] transition-colors bg-white">
                    <option value="">Select a role</option>
                    <option>Web Developer</option><option>App Developer</option><option>Graphic Designer</option>
                    <option>Brand Strategist</option><option>Business Consultant</option><option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] mb-4">
                  <label className="text-[12.5px] font-medium text-[#1A1A1A]">Tell us about yourself</label>
                  <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={4}
                    className="px-[14px] py-[10px] border border-[#E8E8E8] rounded text-[13.5px] outline-none focus:border-[#A88F84] transition-colors resize-vertical" style={{ minHeight:"110px" }} />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleApply} disabled={status==="sending"} className="flex-1 bg-[#A88F84] text-white py-[13px] rounded text-[13.5px] font-medium border-none cursor-pointer hover:bg-[#8f7870] transition-colors">
                    {status==="sending"?"Sending...":"Submit Application"}
                  </button>
                  <button onClick={()=>setApplyOpen(false)} className="px-5 py-[13px] border border-[#E8E8E8] rounded text-[13.5px] text-[#6B6B6B] bg-white cursor-pointer hover:border-[#A88F84] transition-colors">Cancel</button>
                </div>
                {status==="error" && <p className="text-red-500 text-[13px] mt-3">Something went wrong. Please try again.</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
