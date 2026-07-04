"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function BlueprintPanel() {
  /* Blueprint grid: lines appear, then module blocks snap in */
  const modules = [
    {x:10,y:10,w:36,h:22,label:"Strategy"},
    {x:54,y:10,w:36,h:22,label:"Brand"},
    {x:10,y:42,w:36,h:22,label:"Finance"},
    {x:54,y:42,w:36,h:22,label:"Operations"},
    {x:10,y:74,w:36,h:22,label:"Growth"},
    {x:54,y:74,w:36,h:22,label:"Investors"},
  ];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{padding:"4px"}}>
        {/* Grid lines */}
        {[0,25,50,75,100].map(v=>(
          <g key={v}>
            <motion.line x1={v} y1="0" x2={v} y2="100" stroke="#A88F84" strokeWidth="0.15" strokeOpacity="0.3"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1, duration:0.5}}/>
            <motion.line x1="0" y1={v} x2="100" y2={v} stroke="#A88F84" strokeWidth="0.15" strokeOpacity="0.3"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1, duration:0.5}}/>
          </g>
        ))}
        {/* Module blocks */}
        {modules.map((m,i)=>(
          <g key={i}>
            <motion.rect x={m.x} y={m.y} width={m.w} height={m.h}
              fill="rgba(168,143,132,.08)" stroke="#A88F84" strokeWidth="0.5"
              rx="1"
              initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}}
              style={{transformOrigin:`${m.x+m.w/2}px ${m.y+m.h/2}px`}}
              transition={{duration:0.4, delay:0.4+i*0.12, type:"spring", stiffness:200}}/>
            <motion.text x={m.x+m.w/2} y={m.y+m.h/2+2.5}
              textAnchor="middle" fontSize="4.5" fill="#A88F84" fontFamily="DM Sans, sans-serif"
              initial={{opacity:0}} animate={{opacity:1}}
              transition={{delay:0.7+i*0.12}}>
              {m.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const MODULES = [
  { icon: "◈", title: "Business Strategy",     desc: "Market analysis, competitive positioning, and a 3-year strategic roadmap." },
  { icon: "◎", title: "Brand & Identity",       desc: "Brand positioning, visual identity guidelines, and tone of voice." },
  { icon: "◉", title: "Financial Architecture", desc: "3-year financial model, unit economics, and investor-ready projections." },
  { icon: "◐", title: "Operational Structure",  desc: "Team design, process mapping, and systems for scale." },
  { icon: "◑", title: "Growth Roadmap",         desc: "12-month prioritised go-to-market and growth plan with KPIs." },
  { icon: "◒", title: "Investor Materials",     desc: "Pitch deck narrative, data room structure, and investor Q&A preparation." },
];

const TIERS = [
  { name: "Basic",    price: "£4,500",  delivery: "4–5 weeks", desc: "Core Blueprint covering strategy, brand positioning, and financial foundations.", included: ["Business Strategy", "Brand Positioning", "Financial Model", "12-Month Roadmap"] },
  { name: "Bespoke",  price: "POA",     delivery: "6–10 weeks", desc: "Fully custom Blueprint built around your specific sector, stage, and ambitions.", included: ["Everything in Basic", "Custom Investor Materials", "Operational Design", "Advisory Support", "Pitch Preparation"] },
];

export default function FounderBlueprintPage() {
  return (
    <main>
      <PageHero eyebrow="Founder & Business Operating Blueprint" title="Your Complete" titleAccent="Business OS."
        subtitle="The Founder Blueprint is our most comprehensive engagement — a full operating system built around your specific business, goals, and growth trajectory."
        panel={<BlueprintPanel />} />

      <section className="py-10 bg-ac/10 border-y border-ac/20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-[20px] text-t1 italic">From £4,500 · Basic to Fully Bespoke · 4–10 week delivery</p>
          <a href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all">Book a Discovery Call</a>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <p className="eyebrow mb-4">What's Inside</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Six modules. One complete foundation.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((m, i) => (
              <motion.div key={m.title} className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}>
                <span className="text-[26px] text-ac block mb-4">{m.icon}</span>
                <h3 className="font-display text-[20px] font-medium text-t1 mb-2">{m.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <p className="eyebrow mb-4">Pricing</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Choose Your Tier</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-[800px]">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} className={`rounded-xl p-8 border flex flex-col ${i === 1 ? "border-ac bg-ac/5" : "border-br bg-gl"}`}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.15 }}>
                {i === 1 && <span className="text-[10px] font-medium tracking-[0.15em] uppercase bg-ac text-white px-2 py-1 rounded w-fit mb-4">Most Comprehensive</span>}
                <div className="font-display text-[36px] font-light text-ac mb-1">{t.price}</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-t2 mb-2">{t.name} · {t.delivery}</div>
                <p className="text-[13.5px] text-t2 leading-relaxed mb-6">{t.desc}</p>
                <ul className="space-y-2 mb-8">
                  {t.included.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13.5px] text-t1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/booking" className="mt-auto text-center bg-ac hover:bg-ach text-white text-[13.5px] font-medium py-3 rounded transition-all">Get Started</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
