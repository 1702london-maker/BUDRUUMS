"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function MentorshipPanel() {
  const messages = [
    { from:"mentor", text:"What's your biggest block right now?" },
    { from:"founder", text:"Fundraising pitch — can't land the close." },
    { from:"mentor", text:"Let's fix your narrative arc. Open with the problem you lived, not the product you built." },
    { from:"founder", text:"That's it. That changes everything." },
  ];
  return (
    <div className="absolute inset-0 p-5 flex flex-col justify-center gap-2">
      {/* Two avatars connected */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <motion.div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white text-[13px] font-display"
          initial={{scale:0}} animate={{scale:1}} transition={{delay:0.1,type:"spring",stiffness:200}}>M</motion.div>
        <motion.div className="flex-1 h-[2px] bg-gradient-to-r from-[#1A1A1A] to-[#A88F84]"
          initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.4, duration:0.5}}
          style={{maxWidth:60}}/>
        <motion.div className="w-10 h-10 rounded-full bg-[#A88F84] flex items-center justify-center text-white text-[13px] font-display"
          initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3,type:"spring",stiffness:200}}>F</motion.div>
      </div>
      {/* Chat bubbles */}
      {messages.map((m,i)=>(
        <motion.div key={i}
          className={`max-w-[80%] rounded-[10px] px-3 py-2 text-[11px] leading-[1.6] ${m.from==="mentor"?"bg-[#1A1A1A] text-white self-start":"bg-[#A88F84] text-white self-end ml-auto"}`}
          initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}
          transition={{duration:0.4, delay:0.5+i*0.35}}>
          {m.text}
        </motion.div>
      ))}
    </div>
  );
}

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
        subtitle="One-to-one mentorship from a founder with real experience building and scaling businesses across multiple sectors."
        panel={<MentorshipPanel />} />

      {/* Tiers */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <p className="eyebrow mb-4">Mentorship Tiers</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Choose the Level of Support You Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} className={`rounded-xl p-8 border flex flex-col ${i === 1 ? "border-ac bg-white shadow-lg" : "bg-white border-br"}`}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: i * 0.15 }}>
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
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <p className="eyebrow mb-4">What We Cover</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-10">Topics Across Every Session</h2>
          <div className="flex flex-wrap gap-3">
            {TOPICS.map((topic, i) => (
              <motion.span key={topic} className="text-[13.5px] text-t1 border border-br bg-gl px-4 py-2 rounded-full hover:border-ac hover:text-ac transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
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
