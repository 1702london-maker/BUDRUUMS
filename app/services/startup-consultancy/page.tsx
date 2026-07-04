"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const TOPICS = ["Business model validation","Pricing strategy","Fundraising readiness","Go-to-market planning","Team structure & hiring","Operational efficiency","Brand positioning","Partnership strategy","Growth frameworks","Market entry strategy"];

export default function StartupConsultancyPage() {
  return (
    <main>
      <PageHero eyebrow="Startup Consultancy" title="Strategy From" titleAccent="People Who've Done It."
        subtitle="Direct advisory sessions with senior Budruum founders. No generalist consultants — just experienced operators who've built real businesses." />
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="eyebrow mb-5">Session Options</p>
            <div className="space-y-5">
              {[
                { title: "Single Advisory Session", price: "£350/hr", desc: "A focused 60-minute session on one specific challenge or decision.", min: "60 mins minimum" },
                { title: "Half-Day Workshop",       price: "£1,200",  desc: "A deep-dive on a complex strategic question with written output.", min: "4 hours" },
                { title: "Full-Day Intensive",      price: "£2,000",  desc: "A complete strategic review across multiple areas with an action plan.", min: "Full day" },
              ].map((s, i) => (
                <motion.div key={s.title} className="bg-white rounded-xl p-7 border border-br hover:border-ac/30 transition-all"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-[20px] font-medium text-t1">{s.title}</h3>
                    <span className="font-display text-[18px] text-ac">{s.price}</span>
                  </div>
                  <p className="text-[13.5px] text-t2 mb-2">{s.desc}</p>
                  <span className="text-[11px] tracking-[0.1em] uppercase text-t2 bg-gl px-2 py-1 rounded">{s.min}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Topics We Cover</p>
            <h2 className="font-display text-[32px] font-light text-t1 mb-8">Any challenge. Any stage.</h2>
            <div className="flex flex-wrap gap-3">
              {TOPICS.map((t, i) => (
                <motion.span key={t} className="text-[13.5px] text-t1 border border-br bg-white px-4 py-2 rounded-full hover:border-ac hover:text-ac transition-all"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  {t}
                </motion.span>
              ))}
            </div>
            <a href="/booking" className="mt-10 block text-center bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-4 rounded transition-all">Book a Session</a>
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
