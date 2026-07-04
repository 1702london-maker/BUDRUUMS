"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Start a"
        titleAccent="Conversation."
        subtitle="Whether you have a clear brief or just an idea — we'd love to hear from you. Every engagement starts with a conversation."
      />

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20">
          {/* Contact details — animated cards */}
          <div>
            <p className="eyebrow mb-6">Contact Details</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-8">We're here when you're ready.</h2>
            <div className="space-y-5">
              {[
                { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>, label: "Phone", value: "+44 (204) 652 - 3032", href: "tel:+442046523032" },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, label: "Email", value: "booking@budruum.co.uk", href: "mailto:booking@budruum.co.uk" },
                { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, label: "Location", value: "London, United Kingdom", href: "#" },
              ].map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-5 bg-white rounded-xl p-5 border border-br hover:border-ac/40 hover:shadow-sm transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <div className="w-11 h-11 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ac group-hover:border-ac transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ac group-hover:text-white transition-colors duration-300">{c.icon}</svg>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-t2 mb-0.5">{c.label}</p>
                    <p className="text-[14.5px] font-medium text-t1">{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Animated availability strip */}
            <motion.div
              className="mt-8 bg-white rounded-xl p-6 border border-br"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[13px] font-medium text-t1">Currently accepting new clients</span>
              </div>
              <p className="text-[13px] text-t2">We respond to all enquiries within 24 hours on working days.</p>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sent ? (
              <div className="bg-white rounded-xl p-12 border border-br text-center h-full flex flex-col items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-ac/10 border border-ac/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac"><polyline points="20 6 9 17 4 12"/></svg>
                </motion.div>
                <h3 className="font-display text-[28px] font-light text-t1 mb-3">Message Sent</h3>
                <p className="text-[14.5px] text-t2">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-br space-y-5">
                <h3 className="font-display text-[26px] font-light text-t1 mb-2">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-t2 mb-1.5 tracking-wide">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full text-[13.5px] px-4 py-3 border border-br rounded outline-none focus:border-ac transition-colors bg-gl" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-t2 mb-1.5 tracking-wide">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full text-[13.5px] px-4 py-3 border border-br rounded outline-none focus:border-ac transition-colors bg-gl" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-t2 mb-1.5 tracking-wide">Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full text-[13.5px] px-4 py-3 border border-br rounded outline-none focus:border-ac transition-colors bg-gl" placeholder="+44..." />
                  </div>
                  <div>
                    <label className="block text-[12px] text-t2 mb-1.5 tracking-wide">Service Interest</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full text-[13.5px] px-4 py-3 border border-br rounded outline-none focus:border-ac transition-colors bg-gl text-t1">
                      <option value="">Select a service</option>
                      <option>Brand Identity</option>
                      <option>Business Plan</option>
                      <option>Financial Forecasting</option>
                      <option>Web Development</option>
                      <option>Founder Blueprint</option>
                      <option>Mentorship</option>
                      <option>Innovator Visa</option>
                      <option>Startup Consultancy</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-t2 mb-1.5 tracking-wide">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full text-[13.5px] px-4 py-3 border border-br rounded outline-none focus:border-ac transition-colors bg-gl resize-none" placeholder="Tell us about your business and what you need..." />
                </div>
                <button type="submit" className="w-full bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-4 rounded transition-all duration-200 hover:-translate-y-px">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
