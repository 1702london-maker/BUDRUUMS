"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageCTA from "@/components/PageCTA";

export default function AboutPage() {
  return (
    <main>
      {/* ABOUT HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20 px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]" style={{ minHeight: "70vh" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Who We Are</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-6" style={{ fontSize: "clamp(44px,5vw,68px)", lineHeight: 1.1 }}>
            We build businesses with <em className="not-italic text-[#A88F84]">structure.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.75] max-w-[440px] mb-9">
            Budruum was founded for one reason — too many talented founders were building on guesswork. We exist to change that by providing the strategy, systems, and support that serious businesses require.
          </p>
          <Link href="/booking" className="btn-primary inline-flex items-center gap-2">
            Work With Us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </motion.div>

        <motion.div className="relative"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="w-full bg-[#F2F2F2] border border-[#E8E8E8] rounded-[2px] overflow-hidden flex items-center justify-center h-[320px] sm:h-[400px] lg:h-[500px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {[180, 130, 80].map((r, i) => (
                <motion.div key={i} className="absolute border border-[#A88F84]/20 rounded-full"
                  style={{ width: r * 2, height: r * 2 }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 22 + i * 9, repeat: Infinity, ease: "linear" }} />
              ))}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div key={i} className="absolute w-[7px] h-[7px] rounded-full bg-[#A88F84]"
                  style={{ left: `calc(50% + ${130 * Math.cos((angle - 90) * Math.PI / 180)}px - 3.5px)`, top: `calc(50% + ${130 * Math.sin((angle - 90) * Math.PI / 180)}px - 3.5px)` }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }} />
              ))}
              <motion.div className="relative flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 110, height: 110 }}>
                <div className="absolute inset-0 rounded-full bg-white border border-[#A88F84]/25" style={{ boxShadow: "0 4px 24px rgba(168,143,132,.2)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Budruum" style={{ width: 72, height: "auto", position: "relative", zIndex: 1, objectFit: "contain" }} />
              </motion.div>
              <motion.div className="absolute rounded-full border border-[#A88F84]/30"
                animate={{ width: [110, 160, 110], height: [110, 160, 110], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }} />
            </div>
          </div>
          <motion.div className="relative mt-4 bg-white border border-[#E8E8E8] rounded-[4px] p-4 sm:p-5 lg:absolute lg:mt-0 lg:bottom-10 lg:left-[-20px] shadow-[0_8px_32px_rgba(0,0,0,.08)]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <div className="font-display text-[30px] sm:text-[36px] font-light text-[#1A1A1A]">50+</div>
            <div className="text-[12px] text-[#6B6B6B] mt-[2px]">Businesses across 15+ countries</div>
          </motion.div>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="bg-[#F8F8F8] px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">Our Story</p>
            <h2 className="font-display font-light text-[#1A1A1A] mb-7" style={{ fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.2 }}>
              Built out of frustration with the way things were done.
            </h2>
            <p className="text-[14.5px] text-[#6B6B6B] leading-[1.8] mb-5">
              Budruum was created after witnessing the same pattern repeat itself — founders with genuine vision, real potential, and serious ambition, being let down by a lack of structure. No clear plan. No financial model. No brand that reflected what they were actually building.
            </p>
            <p className="text-[14.5px] text-[#6B6B6B] leading-[1.8] mb-5">
              We built Budruum to be the partner that changes that. Not a consultancy that tells you what you want to hear, but one that gives you what your business actually needs — strategy before speed, structure before scale.
            </p>
            <p className="text-[14.5px] text-[#6B6B6B] leading-[1.8]">
              Every client that comes through Budruum receives the same standard: careful, considered, and built to last. Whether you are at the idea stage or scaling an existing operation, we bring the same rigour to every engagement.
            </p>
          </motion.div>

          <motion.div className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex items-center justify-center h-[280px] sm:h-[380px] lg:h-[480px]"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="relative w-full h-full flex items-center justify-center p-10">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 480" fill="none">
                {[0, 1, 2, 3].map(i => (
                  <motion.path key={i}
                    d={`M ${50 + i * 80} 0 Q ${100 + i * 60} 240 ${50 + i * 80} 480`}
                    stroke="#A88F84" strokeWidth="0.5" strokeOpacity="0.3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: i * 0.3, ease: "easeInOut" }} />
                ))}
              </svg>
              <div className="relative z-10 text-center">
                <div className="font-display text-[80px] font-light leading-none" style={{ color: "rgba(26,26,26,0.05)" }}>2019</div>
                <div className="mt-4 space-y-3">
                  {["Strategy before speed", "Structure before scale", "Clarity before execution"].map((line, i) => (
                    <motion.div key={i} className="text-[13px] text-[#6B6B6B] tracking-[.1em]"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}>
                      — {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]">
        <div className="text-center mb-16">
          <p className="eyebrow">What We Stand For</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(36px,4vw,52px)", lineHeight: 1.2 }}>Principles that guide every engagement.</h2>
          <p className="text-[15px] text-[#6B6B6B] max-w-[520px] mx-auto">Our values are not decorative. They shape how we work, who we work with, and what we deliver.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px]">
          {[
            { n: "01", title: "Structure over guesswork", desc: "Every decision we make and every recommendation we give is grounded in research, analysis, and experience — never assumption." },
            { n: "02", title: "Strategy before execution", desc: "Moving fast without direction is expensive. We invest time in understanding your position before we build anything." },
            { n: "03", title: "Long-term growth over shortcuts", desc: "We build for businesses that want to last. That means we are not interested in tactics that look good today but create problems tomorrow." },
          ].map((v, i) => (
            <motion.div key={i} className="bg-[#F8F8F8] transition-colors duration-300 hover:border-t-[#A88F84]"
              style={{ padding: "52px 40px", borderTop: "3px solid transparent" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}>
              <p className="eyebrow mb-5">{v.n}</p>
              <h3 className="font-display text-[26px] font-light text-[#1A1A1A] mb-4">{v.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-[1.75]">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-[#F8F8F8] px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[460px]"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 460" fill="none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={46 * i} x2="400" y2={46 * i} stroke="#A88F84" strokeWidth="0.4" strokeOpacity="0.15"/>
                ))}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v${i}`} x1={50 * i} y1="0" x2={50 * i} y2="460" stroke="#A88F84" strokeWidth="0.4" strokeOpacity="0.15"/>
                ))}
              </svg>
              <div className="relative z-10 flex flex-col gap-4 p-8 w-full">
                {["01 We only work with founders we believe in", "02 We cover the full spectrum", "03 We deliver work that stands up"].map((item, i) => (
                  <motion.div key={i} className="bg-white/80 border border-[#E8E8E8] rounded p-4"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}>
                    <p className="text-[13px] text-[#6B6B6B]">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="eyebrow">What Makes Us Different</p>
            <h2 className="font-display font-light text-[#1A1A1A] mb-9" style={{ fontSize: "clamp(34px,4vw,48px)" }}>We are invested in your outcome.</h2>
            <div className="flex flex-col gap-7">
              {[
                { n: "01", title: "We only work with founders we believe in", desc: "Budruum is selective by design. Every client relationship begins with a consultation because the fit matters as much as the brief." },
                { n: "02", title: "We cover the full spectrum", desc: "From brand identity to financial forecasting, we provide joined-up support rather than isolated deliverables that don't connect." },
                { n: "03", title: "We deliver work that stands up", desc: "Every document, brand, or digital product we produce is built to a standard we would be proud to present to any investor, partner, or customer." },
              ].map((p, i) => (
                <div key={i} className="flex gap-5 pb-7 border-b border-[#E8E8E8] last:border-0">
                  <div className="font-display text-[28px] font-light text-[#A88F84] flex-shrink-0 leading-[1]">{p.n}</div>
                  <div>
                    <h4 className="text-[15px] font-medium text-[#1A1A1A] mb-2">{p.title}</h4>
                    <p className="text-[13.5px] text-[#6B6B6B] leading-[1.7]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]">
        <div className="text-center mb-14">
          <p className="eyebrow">Who We Work With</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(36px,4vw,52px)" }}>Built for builders.</h2>
          <p className="text-[15px] text-[#6B6B6B] max-w-[520px] mx-auto">Budruum works with a specific kind of client — one who values quality, moves with intention, and understands that the right foundation changes everything.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Founders", desc: "Individuals with a clear vision who need the structure, strategy, and assets to bring it to life properly." },
            { title: "Startups", desc: "Early-stage businesses that need to move from concept to credibility — fast, but without cutting corners." },
            { title: "Growing Businesses", desc: "Established operations looking to professionalise, rebrand, or build the infrastructure to support their next stage." },
            { title: "Vision-Led Brands", desc: "Businesses that know what they stand for and need a partner who can translate that into tangible, lasting assets." },
          ].map((c, i) => (
            <motion.div key={i} className="border border-[#E8E8E8] rounded-[2px] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,.08)] hover:-translate-y-1"
              style={{ padding: "36px 32px" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <h4 className="font-display text-[22px] font-light text-[#1A1A1A] mb-3">{c.title}</h4>
              <p className="text-[13.5px] text-[#6B6B6B] leading-[1.65]">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section className="text-center bg-[#1A1A1A] px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[100px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h2 className="font-display font-light text-white mb-5" style={{ fontSize: "clamp(40px,5vw,60px)", fontStyle: "italic" }}>Build it right from the start.</h2>
        <p className="text-[15px] max-w-[460px] mx-auto mb-9 leading-[1.85]" style={{ color: "rgba(255,255,255,.6)" }}>
          One focused conversation is all it takes to understand whether we are the right partner for your business.
        </p>
        <Link href="/booking" className="btn-primary inline-flex items-center gap-2">
          Book a Consultation <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </motion.section>

      {/* CONTACT STRIP */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-between gap-6 flex-wrap px-5 sm:px-8 lg:px-14 py-5">
        <p className="text-[13.5px] text-[#6B6B6B]">Questions? Reach us at <a href="mailto:booking@budruum.co.uk" className="text-[#1A1A1A] font-medium border-b border-[#1A1A1A]">booking@budruum.co.uk</a></p>
        <div className="flex gap-10 flex-wrap">
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "booking@budruum.co.uk" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: "Response within 24 hours" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: "Available globally" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-[10px] text-[13px] text-[#6B6B6B]">
              {item.icon}{item.text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
