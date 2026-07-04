"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const DELIVERABLES = ["Executive summary","Market analysis & sizing","Competitive landscape","Business model & revenue streams","Operations plan","Marketing & GTM strategy","Financial overview & projections","Risk analysis & mitigation","Appendices & supporting data"];
const FORMATS = [
  { title: "Investor-Ready Plan", price: "From £800",   desc: "Written for due diligence. Structured to answer every question before it's asked." },
  { title: "Grant Application Plan", price: "From £950", desc: "Aligned to grant criteria with impact narrative and measurable outcomes." },
  { title: "Visa Business Plan",  price: "From £1,100", desc: "Tailored for UK Innovator Founder Visa endorsement body requirements." },
];

export default function BusinessPlanPage() {
  return (
    <main>
      <PageHero eyebrow="Business Plan" title="Plans That" titleAccent="Pass Scrutiny."
        subtitle="We write investor-ready business plans that answer every question before it's asked — structured, evidenced, and built to open doors." />

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="eyebrow mb-5">What's Included</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-8">A complete document, not a template.</h2>
            <ul className="space-y-3">
              {DELIVERABLES.map((d, i) => (
                <motion.li key={i} className="flex items-center gap-3 text-[14.5px] text-t2"
                  initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <p className="eyebrow mb-5">Plan Formats</p>
            {FORMATS.map((f, i) => (
              <motion.div key={f.title} className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-sm transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-[20px] font-medium text-t1">{f.title}</h3>
                  <span className="font-display text-[18px] text-ac">{f.price}</span>
                </div>
                <p className="text-[13.5px] text-t2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
            <a href="/booking" className="block w-full text-center bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-4 rounded transition-all">Book a Discovery Call</a>
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
