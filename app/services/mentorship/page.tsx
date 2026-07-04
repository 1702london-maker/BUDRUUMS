"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const TIERS = [
  { name: "Single Strategy Session", price: "£300", duration: "90 minutes", freq: "One-off", desc: "A focused session on one challenge — fundraising, pricing, team structure, GTM, or anything else you're working through.", includes: ["90-minute 1:1 session", "Pre-session brief review", "Written notes & action plan", "14-day follow-up by email"] },
  { name: "Monthly Founder Retainer", price: "£1,500", duration: "Monthly", freq: "Per month", desc: "Ongoing advisory access with a senior Budruum founder. Ideal for founders scaling past their first major milestone.", includes: ["2 × 60-min sessions per month", "Unlimited email access", "Priority document review", "Monthly progress check-in"] },
  { name: "Quarterly Advisory Board", price: "£4,000", duration: "Quarterly", freq: "Per quarter", desc: "A structured quarterly engagement for founders who want board-level thinking without a full-time appointment.", includes: ["4 × structured advisory sessions", "Strategic review & feedback", "Investor narrative support", "Access to Budruum network"] },
];

const TOPICS = ["Fundraising preparation", "Pricing strategy", "Team building", "Investor relations", "Go-to-market planning", "Brand positioning", "Operational structure", "Scaling decisions", "Partnership strategy", "Exit planning"];

export default function MentorshipPage() {
  return (
    <main>
      <PageHero eyebrow="Mentorship" title="Guidance From" titleAccent="Someone Who's Done It."
        subtitle="One-to-one mentorship from a founder with real experience building and scaling businesses across multiple sectors." />

      {/* Tiers */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Mentorship Tiers</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Choose the Level of Support You Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} className={`rounded-xl p-8 border flex flex-col ${i === 1 ? "border-ac bg-white shadow-lg" : "bg-white border-br"}`}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.15 }}>
                {i === 1 && <span className="text-[10px] font-medium tracking-[0.15em] uppercase bg-ac text-white px-2 py-1 rounded w-fit mb-4">Most Popular</span>}
                <p className="text-[11px] tracking-[0.15em] uppercase text-t2 mb-2">{t.freq}</p>
                <div className="font-display text-[40px] font-light text-ac leading-none mb-1">{t.price}</div>
                <h3 className="font-display text-[20px] font-medium text-t1 mt-3 mb-3">{t.name}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed mb-6 flex-1">{t.desc}</p>
                <ul className="space-y-2 mb-8">
                  {t.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13.5px] text-t2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/booking" className="text-center bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-3 rounded transition-all">Book This Tier</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">What We Cover</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-10">Topics Across Every Session</h2>
          <div className="flex flex-wrap gap-3">
            {TOPICS.map((topic, i) => (
              <motion.span key={topic} className="text-[13.5px] text-t1 border border-br bg-gl px-4 py-2 rounded-full hover:border-ac hover:text-ac transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                {topic}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
