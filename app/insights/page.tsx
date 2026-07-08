"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageCTA from "@/components/PageCTA";

const ARTICLES = [
  { cat: "Practical Guides", href: "/insights/insight-business-plan-cost", title: "How Much Does a Business Plan Cost in the UK?", excerpt: "Prices range from £300 to £5,000+. Understanding what drives the cost — and what you should expect at each level — helps you make a decision based on value rather than just price.", read: "6 min read" },
  { cat: "Strategy", href: "/insights/insight-business-plan-vs-forecast", title: "Business Plan vs Financial Forecast: What You Actually Need", excerpt: "Two different documents with two different jobs. Most founders need both — but not always at the same time, and not always at the same level of depth.", read: "5 min read" },
  { cat: "Finance", href: "/insights/insight-cash-flow-forecast-startups", title: "Cash Flow Forecast for Startups: A Simple UK Guide", excerpt: "More businesses fail from running out of cash than from running out of customers. Here is how to build a forecast that actually protects your business.", read: "7 min read" },
  { cat: "Investment", href: "/insights/insight-what-investors-look-for", title: "What Investors Look For in a Business Plan", excerpt: "Investors read hundreds of plans. Here is what separates the ones they fund from the ones they pass on — and how to ensure yours is on the right side of that line.", read: "7 min read" },
  { cat: "Planning", href: "/insights/insight-startup-costs-checklist", title: "Startup Costs Checklist UK 2026", excerpt: "The costs most first-time founders underestimate — from company formation and insurance to branding, tech and professional fees. Know before you spend.", read: "8 min read" },
  { cat: "Funding", href: "/insights/insight-how-to-write-business-plan-funding", title: "How to Write a Business Plan for Funding", excerpt: "A funding-ready business plan is not a general strategy document. It has a specific structure, a specific audience and a specific job. Here is how to build one that works.", read: "8 min read" },
  { cat: "Finance", href: "/insights/insight-12-vs-36-month-forecast", title: "12-Month vs 36-Month Financial Forecast: Which Do You Need?", excerpt: "The answer depends on your purpose and audience. Knowing which to build — and how to build it credibly — is where most founders need the clearest guidance.", read: "6 min read" },
  { cat: "Strategy", href: "/insights/insight-why-startup-plans-fail", title: "Why Most Startup Business Plans Fail", excerpt: "The patterns appear consistently. Understanding them does not require a business degree — it requires knowing what the reader on the other side of the table is actually looking for.", read: "6 min read" },
  { cat: "Planning", href: "/insights/insight-business-plan-visa-funding-strategy", title: "Business Plan for Visa, Funding, or Strategy: What Changes?", excerpt: "A business plan for a UK visa, bank funding, investor pitch and internal strategy are four very different documents. Here is what changes — and what every good plan shares.", read: "6 min read" },
  { cat: "Start Up", href: "/insights/insight-idea-to-company-structure", title: "How to Turn a Business Idea Into a Real Company", excerpt: "The practical steps that take a founder from idea to a properly structured, legally registered, trading UK business — made in the right order.", read: "8 min read" },
];

const FILTERS = ["All Articles", "Practical Guides", "Strategy", "Finance", "Investment", "Planning", "Funding", "Start Up"];

export default function InsightsPage() {
  const [active, setActive] = useState("All Articles");
  const filtered = active === "All Articles" ? ARTICLES : ARTICLES.filter(a => a.cat === active);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[92px]">

        {/* Left — text */}
        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
          <p className="eyebrow">Founder Insights</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[20px]" style={{ fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.08 }}>
            Build with knowledge.<br/><em className="not-italic text-[#A88F84]">Grow with clarity.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] mb-8">
            Practical guides for UK founders on business planning, financial forecasting, funding, and building a properly structured business from the ground up.
          </p>
          <Link href="/booking" className="btn-primary inline-flex">
            Book a Free Consultation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>

        {/* Right — floating article snippets rising upward, like knowledge flowing */}
        <motion.div
          className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] h-[260px] sm:h-[320px] lg:h-[400px]"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          {/* Faint top/bottom fade masks */}
          <div className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #F2F2F2, transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #F2F2F2, transparent)" }} />
          <div className="absolute inset-0 flex flex-col justify-end gap-[10px] px-6 pb-8">
            {[
              { cat: "Business Planning", title: "How to Write a Business Plan for Funding", delay: 0 },
              { cat: "Finance",           title: "Cash Flow Forecast for Startups", delay: 0.15 },
              { cat: "Strategy",          title: "Why Most Startup Business Plans Fail", delay: 0.3 },
              { cat: "Investment",        title: "What Investors Look For in a Business Plan", delay: 0.45 },
              { cat: "Planning",          title: "Startup Costs Checklist UK 2026", delay: 0.6 },
            ].map((a, i) => (
              <motion.div key={i}
                className="bg-white border border-[#E8E8E8] rounded-[8px] px-4 py-3 flex items-center gap-3"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + a.delay, ease: [0.22, 1, 0.36, 1] }}>
                <div className="w-[6px] h-[6px] rounded-full bg-[#A88F84] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[9px] tracking-[.15em] uppercase text-[#A88F84] font-medium mb-[2px]">{a.cat}</div>
                  <div className="text-[12px] text-[#1A1A1A] font-medium truncate">{a.title}</div>
                </div>
                <svg className="ml-auto flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-[70px] z-30 bg-[#F8F8F8] border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-[14px]">
        <div className="flex items-center gap-3 overflow-x-auto">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-5 py-[9px] rounded-[20px] text-[13px] font-medium whitespace-nowrap border transition-all ${active===f ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "border-[#E8E8E8] text-[#6B6B6B] hover:border-[#A88F84] hover:text-[#A88F84]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <section className="px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((a, i) => (
            <motion.a key={i} href={a.href}
              className="flex flex-col border border-[#E8E8E8] rounded-[10px] overflow-hidden bg-white transition-all duration-300 hover:border-[#A88F84]/50 hover:shadow-[0_6px_28px_rgba(0,0,0,.09)] no-underline group"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i*0.05 }}>
              <div className="flex flex-col flex-1 p-7">
                <p className="eyebrow mb-3">{a.cat}</p>
                <h2 className="font-display text-[21px] font-light text-[#1A1A1A] leading-[1.25] mb-4 group-hover:text-[#A88F84] transition-colors">{a.title}</h2>
                <p className="text-[13.5px] text-[#6B6B6B] leading-[1.8] flex-1">{a.excerpt}</p>
              </div>
              <div className="flex items-center justify-between px-7 py-4 border-t border-[#E8E8E8]">
                <span className="text-[12.5px] text-[#6B6B6B]">{a.read}</span>
                <span className="text-[13px] text-[#A88F84] font-medium">Read →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* DEEP READS STRIP */}
      <section className="text-center bg-[#F2F2F2] border-t border-b border-[#E8E8E8] px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[72px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>Deeper thinking for serious founders.</h2>
          <p className="text-[15px] text-[#6B6B6B] max-w-[500px] mx-auto mb-8 leading-[1.85]">Strategy, branding, finance, growth, mindset and networking — longer-form perspectives for founders building with intention.</p>
          <Link href="/insights" className="btn-primary inline-flex">Explore Deep Reads <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-[96px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Work With Budruum</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1 }}>
            Ready to build <em className="not-italic text-[#A88F84]">properly?</em>
          </h2>
          <p className="text-[15px] text-[#6B6B6B] max-w-[420px] mx-auto mb-9 leading-[1.85]">
            Whether you need a business plan, a financial forecast or end-to-end startup consultancy — we are here to help you build with structure and confidence.
          </p>
          <div className="flex gap-[14px] justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">Book a Free Consultation <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/services" className="btn-outline">View All Services</Link>
          </div>
        </motion.div>
      </section>

      {/* CONTACT STRIP */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-between flex-wrap gap-4 px-5 sm:px-8 lg:px-14 py-7">
        <span className="text-[14px] text-[#6B6B6B]">Questions? <Link href="/contact" className="text-[#A88F84] hover:underline">Get in touch</Link> — we respond within 24 hours.</span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[13.5px] text-[#6B6B6B]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            booking@budruum.co.uk
          </div>
          <div className="flex items-center gap-2 text-[13.5px] text-[#6B6B6B]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.07 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.05 12.05 0 00.57 2.57 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.51-.9a2 2 0 012.11-.45 12.05 12.05 0 002.57.57A2 2 0 0122 16.92z"/></svg>
            +44 7919 643 752
          </div>
        </div>
      </div>
    </main>
  );
}
