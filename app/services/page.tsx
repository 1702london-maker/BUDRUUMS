"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PILLARS = [
  { num: "01 — Build", title: "Build", items: ["Branding & Identity", "Website Design", "Product Development", "Business Setup"] },
  { num: "02 — Structure", title: "Structure", items: ["Business Planning", "Financial Forecasting", "Startup Consultancy", "Vision Implementation"] },
  { num: "03 — Scale", title: "Scale", items: ["Web & App Development", "Product Outsourcing", "Social Media Marketing", "Growth Strategy"] },
];

const FEATURED = [
  { num:"01", title:"Branding", href:"/services/branding", desc:"A complete brand identity — logo, colour palette, typography, brand guidelines — that positions you clearly and professionally." },
  { num:"02", title:"Website Design & Development", href:"/services/web-development", desc:"Custom-designed, performance-optimised websites that reflect your brand and convert your visitors." },
  { num:"03", title:"Business Plan & Financial Forecasting", href:"/services/business-plan", desc:"Investor-ready business plans and detailed financial models that give clarity on your path forward." },
  { num:"04", title:"Product Outsourcing", href:"/services/startup-consultancy", desc:"Strategic sourcing and production management for businesses that need to manufacture or deliver physical products at scale." },
  { num:"05", title:"App Development", href:"/services/web-development", desc:"Full-stack application development for startups and growing businesses — from MVP to production-grade software." },
  { num:"06", title:"Social Media Marketing", href:"/services/social-media-marketing", desc:"A complete social media strategy — content, scheduling, analytics, and growth — aligned with your brand and objectives." },
];

const HOW_STEPS = [
  { n:"01", t:"Understand your vision", d:"We begin by listening — to your goals, your market, your constraints, and what success looks like for you specifically." },
  { n:"02", t:"Structure the idea", d:"Before anything is built, we map out the strategy, scope, and direction so every decision that follows is grounded in clarity." },
  { n:"03", t:"Build the assets", d:"We produce the deliverables — brand, documents, digital products — to a standard that reflects the quality of your ambition." },
  { n:"04", t:"Position for growth", d:"We hand over work that is ready to use, with the guidance you need to move forward confidently and independently." },
];

export default function ServicesPage() {
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
          <p className="eyebrow">What We Offer</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            Services built for <em className="not-italic text-[#A88F84]">serious founders.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            From brand identity to financial forecasting, Budruum provides the full set of disciplines your business needs to move forward with confidence.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {["Branding","Business Planning","Web & App","Financial Forecasting","Product Development","Growth Strategy"].map(t => (
              <span key={t} className="px-4 py-[7px] border border-[#E8E8E8] rounded-[20px] text-[12.5px] text-[#6B6B6B] bg-white">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Animated panel replacing hero image */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] h-[260px] sm:h-[320px] lg:h-[400px]"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            {PILLARS.map((p, i) => (
              <motion.div key={i} className="flex items-center gap-4 bg-white border border-[#E8E8E8] rounded-[8px] px-5 py-3 w-[75%]"
                animate={{ x: [0, i%2===0 ? 5 : -5, 0] }}
                transition={{ duration: 3+i, repeat: Infinity, ease: "easeInOut" }}>
                <span className="font-display text-[15px] text-[#A88F84] font-light flex-shrink-0">{p.num}</span>
                <div className="h-4 w-[1px] bg-[#E8E8E8] flex-shrink-0" />
                <span className="text-[13px] text-[#1A1A1A] font-medium">{p.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SERVICE PILLARS */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Service Pillars</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div key={i} className="bg-white border border-[#E8E8E8] rounded-[10px]" style={{ padding: "32px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.1 }}>
              <div className="text-[11px] font-medium tracking-[.15em] uppercase text-[#A88F84] mb-3">{p.num}</div>
              <h3 className="font-display text-[28px] font-light text-[#1A1A1A] mb-5">{p.title}</h3>
              <div className="flex flex-col gap-3">
                {p.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 text-[13.5px] text-[#6B6B6B]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div className="mb-[52px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Featured Services</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Everything a serious business needs.</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.85]">Each service is delivered with the same standard — considered, thorough, and built to last.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((s, i) => (
            <motion.div key={i} className="border border-[#E8E8E8] rounded-[10px] bg-white transition-all duration-300 hover:border-[#A88F84]/50 hover:shadow-[0_4px_20px_rgba(0,0,0,.07)]" style={{ padding: "28px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.07 }}>
              <div className="font-display text-[36px] font-light text-[#A88F84]/30 mb-3">{s.num}</div>
              <h4 className="text-[16px] font-medium text-[#1A1A1A] mb-3">{s.title}</h4>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.8] mb-5">{s.desc}</p>
              <Link href={s.href} className="flex items-center gap-2 text-[13px] font-medium text-[#A88F84] hover:gap-3 transition-all">
                Get started <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-[#E8E8E8] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        {/* Animated panel replacing image */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] h-[260px] sm:h-[320px] lg:h-[380px]"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {[60, 100, 145].map((r, i) => (
              <motion.div key={i} className="absolute border border-[#A88F84]/15 rounded-full"
                style={{ width: r*2, height: r*2 }}
                animate={{ rotate: i%2===0 ? 360 : -360 }}
                transition={{ duration: 20+i*6, repeat: Infinity, ease: "linear" }} />
            ))}
            <motion.div className="w-16 h-16 rounded-full bg-[#A88F84]/10 border border-[#A88F84]/30 flex items-center justify-center"
              animate={{ scale: [1,1.1,1] }} transition={{ duration: 3, repeat: Infinity }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="eyebrow">How We Work</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-9" style={{ fontSize: "clamp(34px,4vw,48px)", fontWeight: 300 }}>A clear process. Every time.</h2>
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

      {/* CTA */}
      <section className="text-center bg-[#1A1A1A] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(32px,4vw,48px)" }}>Not sure what service you need?</h2>
          <p className="text-[15px] text-white/60 max-w-[420px] mx-auto mb-9 leading-[1.85]">Start with a consultation. We&apos;ll identify exactly what your business requires and where to begin.</p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">Book a Consultation <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="px-7 py-3 border border-white/40 text-white text-[13.5px] font-medium rounded transition-all hover:border-white/80 inline-flex items-center gap-2">Contact Us</Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACT STRIP */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-between flex-wrap gap-4 px-5 sm:px-8 lg:px-14 py-7">
        <span className="text-[14px] text-[#6B6B6B]">Questions? Reach us at <a href="mailto:booking@budruum.co.uk" className="text-[#A88F84]">booking@budruum.co.uk</a></span>
        <div className="flex items-center gap-6">
          {[
            { t: "booking@budruum.co.uk" },
            { t: "Response within 24 hours" },
            { t: "Available globally" },
          ].map((c,i) => (
            <span key={i} className="text-[13.5px] text-[#6B6B6B]">{c.t}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
