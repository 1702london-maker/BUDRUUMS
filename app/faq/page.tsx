"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageCTA from "@/components/PageCTA";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item border-b border-[#E8E8E8]${open ? " open" : ""}`}>
      <button
        className="w-full flex items-center justify-between gap-5 py-5 text-left bg-transparent border-none cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={`text-[14.5px] font-medium transition-colors duration-200 ${open ? "text-[#A88F84]" : "text-[#1A1A1A]"}`}>{q}</span>
        <span className={`w-[26px] h-[26px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${open ? "bg-[#A88F84] border-[#A88F84]" : "border-[#E8E8E8]"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? "#fff" : "#6B6B6B"} strokeWidth="2.5"
            style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-[22px] text-[13.5px] text-[#6B6B6B] leading-[1.9] max-w-[600px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("cat-about");

  const jumpTo = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[92px]">
        <motion.div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.07) 0%,transparent 65%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Knowledge Base</p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1, marginBottom: "22px", color: "#1A1A1A" }}>
            Frequently Asked<br/><em className="not-italic" style={{ color: "#A88F84" }}>Questions.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            Clear answers on how Budruum works, what we offer and what to expect when you work with us.
          </p>
          <div className="flex gap-[10px] flex-wrap">
            {["Services","Pricing","Process","Booking"].map(t => (
              <span key={t} className="px-4 py-[7px] border border-[#E8E8E8] rounded-[20px] text-[12.5px] text-[#6B6B6B] bg-white">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Live Q&A animation */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] h-[320px] sm:h-[340px] lg:h-[400px]"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="absolute inset-0 flex flex-col justify-center gap-3 sm:gap-4 px-4 sm:px-8 py-5 sm:py-6">
            {[
              { side: "left",  label: "Q", text: "How long does a project take?", delay: 0.2 },
              { side: "right", label: "A", text: "Most are delivered within 5–10 working days.", delay: 0.8 },
              { side: "left",  label: "Q", text: "Do you work with international clients?", delay: 1.4 },
              { side: "right", label: "A", text: "Yes — we work with founders globally.", delay: 2.0 },
              { side: "left",  label: "Q", text: "Is there a minimum budget?", delay: 2.6 },
              { side: "right", label: "A", text: "Our consultations start from £300.", delay: 3.2 },
            ].map((msg, i) => (
              <motion.div key={i}
                className={`flex items-end gap-2 ${msg.side === "right" ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: msg.side === "left" ? -20 : 20, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, delay: msg.delay, ease: [0.22, 1, 0.36, 1] }}>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${msg.side === "left" ? "bg-[#E8E8E8] text-[#6B6B6B]" : "bg-[#A88F84] text-white"}`}>
                  {msg.label}
                </div>
                <div className={`rounded-[12px] px-3 sm:px-4 py-2 max-w-[82%] sm:max-w-[75%] text-[11.5px] sm:text-[12.5px] leading-[1.5] sm:leading-[1.6] ${msg.side === "left" ? "bg-white border border-[#E8E8E8] text-[#1A1A1A] rounded-bl-[4px]" : "bg-[#A88F84]/10 border border-[#A88F84]/20 text-[#1A1A1A] rounded-br-[4px]"}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <motion.div className="flex items-end gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, delay: 3.8, repeat: Infinity, repeatDelay: 3 }}>
              <div className="w-7 h-7 rounded-full bg-[#A88F84] flex items-center justify-center text-[10px] font-bold text-white flex-row-reverse self-end">A</div>
              <div className="bg-[#A88F84]/10 border border-[#A88F84]/20 rounded-[12px] rounded-br-[4px] px-4 py-3 flex gap-1 items-center">
                {[0, 0.2, 0.4].map((d, i) => (
                  <motion.div key={i} className="w-[5px] h-[5px] rounded-full bg-[#A88F84]"
                    animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-20 items-start max-w-[1120px] mx-auto">

        {/* SIDEBAR — hidden on mobile */}
        <aside className="hidden lg:block" style={{ position: "sticky", top: "90px" }}>
          <div className="text-[11px] font-medium tracking-[.16em] uppercase text-[#6B6B6B] mb-4">Browse by topic</div>
          <div className="flex flex-col gap-[2px]">
            {[
              { id: "cat-about", label: "About Budruum" },
              { id: "cat-services", label: "Our Services" },
              { id: "cat-process", label: "Working With Us" },
              { id: "cat-practical", label: "Practical Questions" },
            ].map(c => (
              <button key={c.id} onClick={() => jumpTo(c.id)}
                className={`text-[13px] px-[14px] py-[9px] rounded-[5px] text-left transition-all duration-200 border-none cursor-pointer font-sans
                  ${activeCategory === c.id ? "text-[#A88F84] bg-[rgba(168,143,132,.08)] font-medium" : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F8F8] bg-transparent"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-8 p-5 bg-[#F8F8F8] rounded-[8px] border border-[#E8E8E8]">
            <p className="text-[12.5px] text-[#6B6B6B] leading-[1.7] mb-3">Can&apos;t find what you&apos;re looking for? We&apos;re happy to help directly.</p>
            <Link href="/contact" className="text-[12.5px] text-[#A88F84] font-medium inline-flex items-center gap-1.5 hover:text-[#8f7870]">
              Get in touch <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="min-w-0">

          {/* ABOUT BUDRUUM */}
          <div className="mb-[72px]" id="cat-about">
            <div className="mb-7 rounded-[10px] bg-[#F8F8F8] border border-[#E8E8E8] p-8 flex items-center gap-8">
              <div className="flex-1">
                <p className="eyebrow">Who we are</p>
                <h3 className="font-display text-[22px] font-light text-[#1A1A1A] mb-[7px] leading-[1.2]">Understanding Budruum</h3>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.75] max-w-[360px]">A premium consultancy built around clarity, structure and long-term positioning — not quick fixes or generic advice.</p>
              </div>
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center ml-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
            </div>
            <div className="flex flex-col">
              <FAQItem q="What does Budruum do?" a="Budruum is a high-end business consultancy that helps founders and businesses build with structure, clarity and long-term vision. We work across branding, business planning, financial forecasting, web and app development, product development, outsourcing, social media marketing, startup consultancy and vision implementation." />
              <FAQItem q="Who is Budruum for?" a="We work with ambitious founders, early-stage startups and growing businesses who are serious about building properly. Our clients value precision, structure and strategic thinking over shortcuts. If you want to build something that lasts, Budruum is the right partner." />
              <FAQItem q="What makes Budruum different from other consultancies?" a="We prioritise clarity before execution. We do not offer generic advice or off-the-shelf solutions. Every engagement is tailored, structured and delivered with the long-term in mind. We combine strategic thinking with real, tangible deliverables — so you always leave with something actionable." />
              <FAQItem q="Do you work with startups or established businesses?" a="Both. We support pre-launch founders who need structure from day one, and established businesses that need to reposition, scale or introduce better systems. Our approach adapts to exactly where you are — not the other way around." />
              <FAQItem q="Do you work with clients outside the UK?" a="Yes. While we are headquartered in the UK, we work with clients internationally. All engagements can be delivered remotely with structured communication, clear timelines and dedicated support throughout the entire process." />
            </div>
          </div>

          {/* PILLARS BAND */}
          <motion.div className="mb-[72px] rounded-[10px] overflow-hidden border border-[#E8E8E8] grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E8E8E8]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: "Clarity First", desc: "Every engagement begins with deep understanding before any action is taken." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: "Structured Delivery", desc: "Every service comes with clear frameworks, defined timelines and measurable outcomes." },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title: "Long-Term Vision", desc: "We position you for where you are going — not just where you stand today." },
            ].map((p, i) => (
              <div key={i} className="bg-white p-10 text-center">
                <div className="w-[52px] h-[52px] rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center mx-auto mb-5">{p.icon}</div>
                <h4 className="font-display text-[20px] font-light text-[#1A1A1A] mb-[10px]">{p.title}</h4>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.8]">{p.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* OUR SERVICES */}
          <div className="mb-[72px]" id="cat-services">
            <div className="mb-7 rounded-[10px] bg-[#F8F8F8] border border-[#E8E8E8] p-8 flex items-center gap-8">
              <div className="flex-1">
                <p className="eyebrow">What we offer</p>
                <h3 className="font-display text-[22px] font-light text-[#1A1A1A] mb-[7px] leading-[1.2]">Our Services Explained</h3>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.75] max-w-[360px]">From branding to financial forecasting — every service is designed to produce lasting, real-world results.</p>
              </div>
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center ml-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
            </div>
            <div className="flex flex-col">
              <FAQItem q="What is included in your Business Planning service?" a="Our business planning service covers your full business model — market analysis, competitor positioning, revenue streams, operational structure and go-to-market strategy. The output is a professionally structured business plan built for investors, lenders or internal strategic use." />
              <FAQItem q="What does the Branding service include?" a="Branding with Budruum goes well beyond a logo. We develop your full brand identity — visual direction, tone of voice, positioning strategy and brand guidelines — so your business communicates consistently and commands the right perception in your market from day one." />
              <FAQItem q="How does Financial Forecasting work?" a="We model your revenue, costs, cash flow and growth projections across a defined period — typically 12 to 36 months. The result is a grounded financial forecast that gives you and any investors clarity on where your business is headed and exactly what it needs to get there." />
              <FAQItem q="Can you build my website or app?" a="Yes. Our Web & App Development service covers strategy, design and build. We do not simply produce code — we ensure your digital product is aligned with your brand, your business model and your end user. Every project runs from brief to launch with precision and purpose." />
              <FAQItem q="What is Vision Implementation?" a="Vision Implementation is for business owners who know where they want to go but need structured support to get there. We translate your vision into a clear, actionable roadmap — covering operations, positioning, team structure and priorities — and work alongside you through execution." />
              <FAQItem q="Do you offer Product Outsourcing?" a="Yes. If you need to source, manufacture or distribute a product, we manage the entire outsourcing process on your behalf — from supplier identification and vetting to quality control and logistics coordination. We bring structure to a process most businesses find overwhelming." />
              <FAQItem q="What is your Social Media Marketing service?" a="Our Social Media Marketing is strategy-led, not content for content's sake. We define your positioning, content pillars, platform strategy and growth approach — then execute with consistency. The goal is always to build brand authority and generate real business outcomes, not just follower counts." />
            </div>
          </div>

          {/* WORKING WITH US */}
          <div className="mb-[72px]" id="cat-process">
            <div className="mb-7 rounded-[10px] bg-[#F8F8F8] border border-[#E8E8E8] p-8 flex items-center gap-8">
              <div className="flex-1">
                <p className="eyebrow">The process</p>
                <h3 className="font-display text-[22px] font-light text-[#1A1A1A] mb-[7px] leading-[1.2]">Working With Budruum</h3>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.75] max-w-[360px]">Structured, transparent and built entirely around your goals from the very first conversation.</p>
              </div>
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center ml-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
            </div>
            <div className="flex flex-col">
              <FAQItem q="How do I get started with Budruum?" a="The first step is a consultation, which you can book directly through our website. We use this session to understand your business, your goals and where you currently are. From there we propose the right service — or combination of services — for where you want to go." />
              <FAQItem q="What is Startup Consultancy?" a="Startup Consultancy is for founders in the early stages who need experienced guidance across multiple areas at once. Rather than hiring a full leadership team too early, you gain structured strategic support on business model, operations, positioning and growth — precisely when you need it most." />
              <FAQItem q="How long does a typical engagement take?" a="It depends on the service. A branding project typically takes two to four weeks. A full business plan can take one to three weeks. Development projects vary based on scope. Every engagement begins with a clear timeline so you always know what to expect and when to expect it." />
              <FAQItem q="Can I use multiple Budruum services together?" a="Absolutely. Many of our clients use multiple services in sequence or simultaneously. A startup might begin with branding and business planning, progress into financial forecasting and move into web development. We coordinate across all services to ensure everything remains fully aligned." />
              <FAQItem q="Do you sign NDAs?" a="Yes. We take confidentiality seriously and are happy to sign a non-disclosure agreement before any sensitive information is shared. The protection of your ideas and business data is a standard part of how we operate — not an exception." />
            </div>
          </div>

          {/* PRACTICAL QUESTIONS */}
          <div id="cat-practical">
            <div className="mb-7 rounded-[10px] bg-[#F8F8F8] border border-[#E8E8E8] p-8 flex items-center gap-8">
              <div className="flex-1">
                <p className="eyebrow">Good to know</p>
                <h3 className="font-display text-[22px] font-light text-[#1A1A1A] mb-[7px] leading-[1.2]">Practical Questions</h3>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.75] max-w-[360px]">Pricing, decisions and everything else worth knowing before you take the next step.</p>
              </div>
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center ml-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
            </div>
            <div className="flex flex-col">
              <FAQItem q="How much do your services cost?" a="Pricing is tailored to the scope and complexity of each engagement. We do not use one-size-fits-all pricing because no two businesses are the same. Following your consultation, we provide a transparent proposal with a clear breakdown of what is included and what the investment is." />
              <FAQItem q="How do I know which service is right for me?" a="That is exactly what the consultation is for. We listen first, ask the right questions and only then make a recommendation. You will never be pushed toward a service that does not serve your actual situation. Clarity before execution — that is how we begin every relationship." />
              <FAQItem q="What happens after my consultation?" a="After your consultation we provide a structured proposal outlining the recommended service, scope, timeline and investment. There is no pressure and no ambiguity. You review it, ask any questions and we move forward only when you are fully ready and confident to do so." />
            </div>
          </div>

        </div>
      </div>

      {/* CTA */}
      <motion.section className="text-center border-t border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[88px]"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow">Still have a question?</p>
        <h2 className="font-display font-light text-[#1A1A1A] mb-[14px]" style={{ fontSize: "clamp(28px,3vw,42px)" }}>Let&apos;s talk it through</h2>
        <p className="text-[14.5px] text-[#6B6B6B] max-w-[420px] mx-auto mb-[34px] leading-[1.85]">We would rather give you the right answer than a fast one. Reach out and we will respond with clarity.</p>
        <Link href="/booking" className="btn-primary inline-flex items-center gap-2">
          Book a Consultation <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </motion.section>

      {/* CONTACT STRIP */}
      <section className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-center gap-10 flex-wrap px-5 sm:px-8 lg:px-14 py-8 lg:py-10">
        {[
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, label: "WhatsApp", sub: "Quick replies via WhatsApp" },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: "iMessage", sub: "Message us on iMessage" },
          { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", sub: "booking@budruum.co.uk" },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-[14px]">
            <div className="w-[44px] h-[44px] rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center flex-shrink-0" style={{ boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>{c.icon}</div>
            <div><span className="block text-[14px] font-medium text-[#1A1A1A]">{c.label}</span><small className="text-[12.5px] text-[#6B6B6B]">{c.sub}</small></div>
          </div>
        ))}
      </section>

      <PageCTA />
    </main>
  );
}
