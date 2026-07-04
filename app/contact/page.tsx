"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function handleSubmit() {
    if (!form.fname || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.fname + " " + form.lname, email: form.email, service: form.service, message: form.message }),
      });
      const d = await r.json();
      setStatus(d.success ? "sent" : "error");
    } catch { setStatus("error"); }
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8]
        px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[92px]
        grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center">
        <motion.div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.07) 0%,transparent 65%)" }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Get In Touch</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            Let&apos;s start a<br/><em className="not-italic text-[#A88F84]">conversation.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            Whether you have a project in mind, a question about our services, or simply want to understand how Budruum can help — we are here.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {["Response within 24 hours", "Available globally", "Private & Confidential"].map(t => (
              <span key={t} className="px-4 py-[7px] border border-[#E8E8E8] rounded-[20px] text-[12.5px] text-[#6B6B6B] bg-white">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Contact flow animation */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] h-[260px] sm:h-[320px] lg:h-[400px]"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="absolute inset-0 flex flex-col justify-between px-7 py-6">

            {/* Top — mock email header bar */}
            <motion.div className="flex items-center gap-3 pb-4 border-b border-[#E8E8E8]"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <div className="flex gap-[6px]">
                {["#ff5f57","#ffbd2e","#28c840"].map((c, i) => (
                  <div key={i} className="w-[10px] h-[10px] rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex-1 bg-white rounded text-[11px] text-[#6B6B6B] px-3 py-1 border border-[#E8E8E8] text-center">booking@budruum.co.uk</div>
            </motion.div>

            {/* Middle — message thread */}
            <div className="flex flex-col gap-3 py-4 flex-1 justify-center">
              {/* Outgoing message from visitor */}
              <motion.div className="self-start max-w-[80%]"
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.6 }}>
                <div className="text-[10px] text-[#6B6B6B] mb-1">You — just now</div>
                <div className="bg-white border border-[#E8E8E8] rounded-[10px] rounded-tl-[3px] px-4 py-3 text-[12.5px] text-[#1A1A1A] leading-[1.6]">
                  Hi, I&apos;d like to discuss a business plan for my startup.
                </div>
              </motion.div>

              {/* Delivery status */}
              <motion.div className="self-start flex items-center gap-2 ml-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-[11px] text-[#22c55e] font-medium">Delivered</span>
              </motion.div>

              {/* Typing indicator — Budruum responding */}
              <motion.div className="self-end max-w-[80%]"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}>
                <div className="text-[10px] text-[#A88F84] mb-1 text-right">Budruum — typing…</div>
                <div className="bg-[#A88F84]/10 border border-[#A88F84]/20 rounded-[10px] rounded-tr-[3px] px-4 py-3 flex gap-1.5 items-center justify-center">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div key={i} className="w-[6px] h-[6px] rounded-full bg-[#A88F84]"
                      animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, delay: d, repeat: Infinity }} />
                  ))}
                </div>
              </motion.div>

              {/* Budruum reply appears */}
              <motion.div className="self-end max-w-[82%]"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 3.5 }}>
                <div className="text-[10px] text-[#A88F84] mb-1 text-right">Budruum — within 24 hrs</div>
                <div className="bg-[#A88F84] rounded-[10px] rounded-tr-[3px] px-4 py-3 text-[12.5px] text-white leading-[1.6]">
                  Absolutely — let&apos;s set up a consultation and get started.
                </div>
              </motion.div>
            </div>

            {/* Bottom — stat strip */}
            <motion.div className="flex gap-4 pt-4 border-t border-[#E8E8E8]"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
              {[
                { icon: "⏱", label: "24hr response" },
                { icon: "🌍", label: "Available globally" },
                { icon: "🔒", label: "Confidential" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 flex-1">
                  <span className="text-[13px]">{s.icon}</span>
                  <span className="text-[11px] text-[#6B6B6B]">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MAIN */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-[80px] items-start">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Reach Us</p>
            <h2 className="font-display font-light text-[#1A1A1A] mb-6" style={{ fontSize: "36px" }}>We respond within 24 hours.</h2>
            <p className="text-[14.5px] text-[#6B6B6B] leading-[1.8] mb-10">
              We take every enquiry seriously. Tell us what you are working on and we will get back to you with a considered, honest response.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { href: "mailto:booking@budruum.co.uk", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", val: "booking@budruum.co.uk" },
                { href: "tel:+442046523032", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Phone", val: "+44 (204) 652 - 3032" },
                { href: "https://wa.me/447919643752", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, label: "WhatsApp", val: "Message us directly" },
                { href: "/booking", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Book a session", val: "Schedule a consultation" },
              ].map((m, i) => (
                <a key={i} href={m.href} className="flex items-center gap-4 p-5 border border-[#E8E8E8] rounded-[2px] transition-all duration-300 hover:border-[#A88F84] hover:shadow-[0_4px_16px_rgba(0,0,0,.06)] hover:translate-x-1 no-underline">
                  <div className="w-[44px] h-[44px] bg-[#F8F8F8] rounded-full flex items-center justify-center flex-shrink-0 text-[#A88F84]">{m.icon}</div>
                  <div>
                    <div className="text-[11px] font-medium tracking-[.15em] uppercase text-[#6B6B6B] mb-1">{m.label}</div>
                    <div className="text-[14.5px] font-medium text-[#1A1A1A]">{m.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div className="bg-[#F8F8F8] rounded-[2px] p-6 sm:p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <h3 className="font-display text-[28px] font-light text-[#1A1A1A] mb-8">Send us a message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium tracking-[.1em] uppercase text-[#6B6B6B]">First Name</label>
                <input type="text" placeholder="John" value={form.fname} onChange={e => setForm(f => ({...f, fname: e.target.value}))}
                  className="px-4 py-3 border border-[#E8E8E8] rounded text-[14px] bg-white text-[#1A1A1A] outline-none focus:border-[#A88F84] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium tracking-[.1em] uppercase text-[#6B6B6B]">Last Name</label>
                <input type="text" placeholder="Smith" value={form.lname} onChange={e => setForm(f => ({...f, lname: e.target.value}))}
                  className="px-4 py-3 border border-[#E8E8E8] rounded text-[14px] bg-white text-[#1A1A1A] outline-none focus:border-[#A88F84] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[12px] font-medium tracking-[.1em] uppercase text-[#6B6B6B]">Email Address</label>
              <input type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="px-4 py-3 border border-[#E8E8E8] rounded text-[14px] bg-white text-[#1A1A1A] outline-none focus:border-[#A88F84] transition-colors" />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[12px] font-medium tracking-[.1em] uppercase text-[#6B6B6B]">Subject</label>
              <select value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))}
                className="px-4 py-3 border border-[#E8E8E8] rounded text-[14px] bg-white text-[#1A1A1A] outline-none focus:border-[#A88F84] transition-colors">
                <option value="">Select a topic</option>
                <option>General enquiry</option>
                <option>Project brief</option>
                <option>Consultation booking</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label className="text-[12px] font-medium tracking-[.1em] uppercase text-[#6B6B6B]">Message</label>
              <textarea placeholder="Tell us about your project or enquiry..." rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                className="px-4 py-3 border border-[#E8E8E8] rounded text-[14px] bg-white text-[#1A1A1A] outline-none focus:border-[#A88F84] transition-colors resize-vertical" style={{ minHeight: "120px" }} />
            </div>
            <button onClick={handleSubmit} disabled={status === "sending" || status === "sent"}
              className="btn-primary w-full justify-center"
              style={{ border: "none", cursor: "pointer" }}>
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send Message"}
              {status === "idle" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
            </button>
            {status === "sent" && <p className="mt-4 text-[13.5px] text-green-600">Message sent! We&apos;ll be in touch within 24 hours.</p>}
            {status === "error" && <p className="mt-4 text-[13.5px] text-red-500">Something went wrong. Please try again.</p>}
            <p className="text-[12.5px] text-[#6B6B6B] mt-4">We will respond within 24 hours. Your information is kept strictly confidential.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
