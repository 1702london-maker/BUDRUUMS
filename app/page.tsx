import Link from "next/link";
import { Metadata } from "next";
import VentureConstellation from "@/components/VentureConstellation";
import EngagementPipeline from "@/components/EngagementPipeline";
import { metadataFor } from "@/app/seo";

export const metadata: Metadata = metadataFor("home");

const SERVICES = [
  { icon: "◈", title: "Brand Identity",         price: "From £1,200",    href: "/services/branding",            desc: "Logo, colour palette, typography and full brand guidelines that set your business apart." },
  { icon: "◎", title: "Business Plan",           price: "From £800",      href: "/services/business-plan",       desc: "Investor-ready plans that articulate your vision, market, and route to profitability." },
  { icon: "◉", title: "Financial Forecasting",   price: "From £600",      href: "/services/financial-forecasting", desc: "3–5 year models with scenario analysis that give you and investors total clarity." },
  { icon: "◐", title: "Web Development",         price: "From £2,500",    href: "/services/web-development",     desc: "High-performance sites and web apps built for conversion and brand expression." },
  { icon: "◑", title: "Startup Consultancy",     price: "From £350/hr",   href: "/services/startup-consultancy", desc: "Advisory sessions that cover strategy, operations, and growth frameworks." },
  { icon: "◒", title: "Founder Blueprint",       price: "From £4,500",    href: "/services/founder-blueprint",   desc: "A complete operating system for your business: strategy, process, team, and growth." },
  { icon: "◓", title: "Mentorship",              price: "From £300",      href: "/services/mentorship",          desc: "One-to-one guidance from a founder who has built and scaled multiple ventures." },
  { icon: "◔", title: "Innovator Visa",          price: "From £1,500",    href: "/services/innovator-visa",      desc: "End-to-end support for your UK Innovator Founder Visa application and endorsement." },
];

const STATS = [
  { value: "180+",  label: "Founders Supported" },
  { value: "£40M+", label: "Capital Raised by Clients" },
  { value: "12",    label: "Industry Sectors" },
  { value: "8",     label: "Portfolio Ventures" },
];

const PILLARS = [
  { title: "Strategy First",      body: "Every engagement begins with a thorough understanding of your market, competitors, and goals." },
  { title: "Founder-Focused",     body: "Our team has built businesses. We advise from experience, not theory." },
  { title: "Execution Support",   body: "We don't just hand over a document. We stay with you through implementation." },
  { title: "Long-term Thinking",  body: "We build assets that compound — brand, strategy, and systems that keep working." },
];

const TESTIMONIALS = [
  { quote: "Budruum didn't just write a business plan — they helped me think through the entire architecture of my business. Three months later we closed our first investment round.", name: "Amara K.",  role: "HealthTech Founder, London" },
  { quote: "I came in with an idea and left with a brand, a plan, and the confidence to launch. The team genuinely cares about your success, not just the deliverable.",                name: "James F.", role: "Hospitality Entrepreneur" },
  { quote: "The financial model they built has become the north star for every decision we make. Worth every penny.",                                                                    name: "Sade O.",  role: "E-commerce Founder, Manchester" },
];

export default function HomePage() {
  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="min-h-[calc(100svh-70px)] lg:min-h-[92vh] flex items-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gs rounded-full translate-x-1/3 -translate-y-1/3 opacity-60" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gs rounded-full -translate-x-1/2 translate-y-1/2 opacity-40" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 sm:py-14 lg:py-20 relative z-10">
          <div>
            <p className="eyebrow mb-4 lg:mb-6">UK Business Consultancy</p>
            <h1 className="font-display text-[clamp(42px,12vw,56px)] md:text-[64px] lg:text-[80px] leading-[1.02] font-light text-t1 mb-5 lg:mb-8 text-balance">
              Build Your Business <em className="not-italic text-ac">Properly.</em>
            </h1>
            <p className="text-[15.5px] sm:text-[16.5px] text-t2 max-w-[480px] leading-relaxed mb-7 lg:mb-10">
              From brand identity to investor-ready business plans — Budruum gives founders the strategy, structure, and execution support to build with confidence.
            </p>
            <div className="lg:hidden mb-8">
              <VentureConstellation compact />
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <Link href="/booking" className="inline-flex items-center justify-center gap-2 bg-ac hover:bg-ach text-white text-[14px] font-medium px-7 sm:px-8 py-4 rounded transition-all duration-200 hover:-translate-y-px">
                Book a Free Discovery Call
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 text-[14px] text-t1 font-medium border border-t1/20 hover:border-t1/50 px-7 sm:px-8 py-4 rounded transition-all duration-200">
                Explore Services
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-6 sm:gap-8 mt-9 lg:mt-12 pt-8 lg:pt-10 border-t border-br">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[28px] sm:text-[32px] font-light text-t1">{s.value}</div>
                  <div className="text-[12px] text-t2 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <VentureConstellation />
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="mb-16 max-w-[580px]">
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="font-display text-[38px] sm:text-[46px] lg:text-[56px] leading-[1.06] font-light text-t1">
              Services Built for Founders
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <span className="text-[24px] text-ac mb-5 block">{s.icon}</span>
                <h3 className="font-display text-[20px] font-medium text-t1 mb-2">{s.title}</h3>
                <p className="text-[13px] text-t2 leading-relaxed flex-1 mb-4">{s.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-br">
                  <span className="text-[12.5px] font-medium text-ac">{s.price}</span>
                  <span className="text-ac text-[18px] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-medium text-t1 border border-t1/20 hover:border-t1/50 px-8 py-4 rounded transition-all duration-200">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY BUDRUUM ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-6">Why Budruum</p>
            <h2 className="font-display text-[38px] sm:text-[46px] lg:text-[56px] leading-[1.06] font-light text-t1 mb-8">
              Most Businesses Fail on Foundations
            </h2>
            <p className="text-[15.5px] text-t2 leading-relaxed mb-6">
              We built Budruum because we have seen what happens when great ideas meet weak infrastructure. Poor brand communication, missing financial models, no clear strategy — these are fixable problems, but only if you address them early.
            </p>
            <p className="text-[15.5px] text-t2 leading-relaxed mb-8">
              Our team works directly with founders — not through layers of account managers — to build the pieces that allow your business to grow, attract capital, and compete at the highest level.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[14px] font-medium text-t1 hover:text-ac transition-colors group">
              Our Story <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {PILLARS.map((c) => (
              <div key={c.title} className="bg-gl rounded-xl p-6 border border-br hover:border-ac/30 transition-colors duration-300">
                <h4 className="font-display text-[18px] font-medium text-t1 mb-2">{c.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — light animated cards (no black) ──────────── */}
      <EngagementPipeline />

      {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="mb-16 max-w-[480px]">
            <p className="eyebrow mb-4">Client Stories</p>
            <h2 className="font-display text-[38px] sm:text-[46px] lg:text-[56px] leading-[1.06] font-light text-t1">
              What Founders Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gl rounded-xl p-8 border border-br hover:border-ac/30 hover:shadow-sm transition-all duration-300 flex flex-col">
                <span className="font-display text-[52px] text-ac/25 leading-none mb-4">&ldquo;</span>
                <p className="text-[15px] text-t1 leading-relaxed flex-1 mb-6">{t.quote}</p>
                <div>
                  <div className="font-medium text-[14px] text-t1">{t.name}</div>
                  <div className="text-[12.5px] text-t2 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SINGLE BLACK CTA — only black section on the page ────────── */}
      <section className="py-20 lg:py-24 bg-t1 text-center">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <h2 className="font-display text-[clamp(40px,5vw,64px)] font-light text-white italic mb-5">
            Ready to build something real?
          </h2>
          <p className="text-[15px] text-white/60 max-w-[480px] mx-auto mb-9">
            Start with one focused conversation. It changes everything that follows.
          </p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">
            Book a Consultation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── CONTACT STRIP ───────────────────────────────────────────── */}
      <div className="bg-gl border-y border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13.5px] text-t2">
            Questions? Reach us at{" "}
            <a href="mailto:booking@budruum.co.uk" className="text-t1 font-medium border-b border-t1">
              booking@budruum.co.uk
            </a>
            {" "}or call{" "}
            <a href="tel:+447919643752" className="text-t1 font-medium border-b border-t1">
              +44 7919 643 752
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { href: "mailto:booking@budruum.co.uk", icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>, extra: <polyline points="22,6 12,13 2,6"/>, label: "booking@budruum.co.uk" },
              { href: "tel:+447919643752", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.27-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>, extra: null, label: "+44 7919 643 752" },
              { href: "https://wa.me/447919643752", icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>, extra: null, label: "WhatsApp" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="flex items-center gap-2 text-[13px] text-t2 hover:text-t1 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0">
                  {item.icon}{item.extra}
                </svg>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
