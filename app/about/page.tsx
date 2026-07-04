"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const VALUES = [
  { num: "01", title: "Build on Truth", body: "We only recommend what we genuinely believe will work. No upselling, no padding. Every engagement is scoped to what you actually need." },
  { num: "02", title: "Execution Over Advice", body: "Consultants talk. We build. Every engagement ends with a tangible asset — a brand, a plan, a model, a site — not just a slide deck." },
  { num: "03", title: "Founder First", body: "We structure our pricing, processes, and communication around the reality of being a founder — lean on time, big on ambition." },
  { num: "04", title: "Long-Term Thinking", body: "The assets we build are designed to compound. A brand that still feels right in 10 years. A financial model you can actually maintain." },
];

const TEAM = [
  { name: "Director", role: "Strategy & Growth", bio: "Built and scaled multiple UK ventures across tech, hospitality, and consulting. Founded Budruum to give every founder access to the support previously reserved for funded startups." },
  { name: "Brand Lead", role: "Identity & Design", bio: "15 years shaping visual identities for startups and established brands. Specialises in translating complex ideas into clear, compelling brand systems." },
  { name: "Finance Director", role: "Financial Modelling", bio: "Chartered accountant with deep experience in startup finance. Has supported over 60 founders with investment-grade financial models." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Budruum"
        title="Built by Founders,"
        titleAccent="for Founders."
        subtitle="Budruum exists because the support most founders need — real strategy, proper structure, expert execution — shouldn't require a Series A to access."
      />

      {/* MISSION — animated counter stats */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="eyebrow mb-5">Our Mission</p>
            <h2 className="font-display text-[42px] lg:text-[52px] font-light text-t1 leading-tight mb-6">
              Every founder deserves a proper foundation.
            </h2>
            <p className="text-[15.5px] text-t2 leading-relaxed mb-5">
              We started Budruum after watching too many good ideas fail — not because the market wasn't there, but because the foundations weren't. No clear brand. No financial model. No strategy document that could survive a tough investor question.
            </p>
            <p className="text-[15.5px] text-t2 leading-relaxed mb-8">
              We built the firm we wished existed when we were starting out. One that gives you real outputs, real expertise, and a team that treats your business like it matters — because it does.
            </p>
            <Link href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">
              Book a Free Discovery Call
            </Link>
          </div>
          {/* Animated stat blocks */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "180+", label: "Founders Supported", delay: 0 },
              { value: "£40M+", label: "Client Capital Raised", delay: 0.1 },
              { value: "12", label: "Industry Sectors", delay: 0.2 },
              { value: "8", label: "Portfolio Ventures", delay: 0.3 },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="bg-white rounded-xl p-8 border border-br text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: s.delay }}
              >
                <div className="font-display text-[42px] font-light text-ac">{s.value}</div>
                <div className="text-[12.5px] text-t2 mt-2 tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — staggered reveal */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="mb-14">
            <p className="eyebrow mb-4">What We Stand For</p>
            <h2 className="font-display text-[42px] lg:text-[52px] font-light text-t1">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                className="border-t-2 border-ac pt-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
              >
                <span className="text-[11px] font-medium tracking-[0.2em] text-ac uppercase">{v.num}</span>
                <h3 className="font-display text-[22px] font-medium text-t1 mt-3 mb-3">{v.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — cards with hover lift */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="mb-14">
            <p className="eyebrow mb-4">The Team</p>
            <h2 className="font-display text-[42px] lg:text-[52px] font-light text-t1">People Behind the Work</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                className="bg-white rounded-xl p-8 border border-br hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
              >
                <div className="w-16 h-16 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mb-5">
                  <span className="font-display text-[24px] text-ac font-light">{t.name[0]}</span>
                </div>
                <h3 className="font-display text-[22px] font-medium text-t1 mb-1">{t.name}</h3>
                <p className="text-[12px] tracking-[0.12em] uppercase text-ac mb-4">{t.role}</p>
                <p className="text-[13.5px] text-t2 leading-relaxed">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
