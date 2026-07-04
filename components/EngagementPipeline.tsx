"use client";
import { motion } from "framer-motion";

const STAGES = [
  {
    step: "01",
    label: "Discovery",
    desc: "A free 30-minute call to map your goals, gaps, and the right starting point.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    step: "02",
    label: "Strategy",
    desc: "We define your roadmap, deliverables, timelines, and the team who will execute.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    step: "03",
    label: "Execution",
    desc: "Our team works alongside yours — building, writing, designing, and delivering.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    step: "04",
    label: "Review",
    desc: "Structured feedback loops, revisions, and refinements until it's exactly right.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    step: "05",
    label: "Launch",
    desc: "Go live with confidence — and ongoing support available as you scale.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
  },
];

export default function EngagementPipeline() {
  return (
    <section className="py-28 bg-gl">
      <div className="max-w-screen-2xl mx-auto px-14">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">How It Works</p>
          <h2 className="font-display text-[46px] lg:text-[56px] leading-[1.06] font-light text-t1">
            From Discovery to Launch
          </h2>
        </div>

        {/* Animated step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {/* Connector dots between cards — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(20%-12px)] right-[calc(20%-12px)] h-px border-t border-dashed border-ac/30 z-0" />

          {STAGES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-white border border-br rounded-xl p-7 flex flex-col items-start hover:border-ac/40 hover:shadow-md transition-all duration-300 group"
            >
              {/* Step number badge */}
              <div className="w-11 h-11 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mb-5 group-hover:bg-ac group-hover:border-ac transition-all duration-300">
                <span className="font-display text-[13px] font-medium text-ac group-hover:text-white transition-colors duration-300">
                  {s.step}
                </span>
              </div>

              {/* Icon */}
              <div className="text-ac mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>

              <h3 className="font-display text-[20px] font-medium text-t1 mb-2">{s.label}</h3>
              <p className="text-[13px] text-t2 leading-relaxed">{s.desc}</p>

              {/* Bottom accent bar */}
              <motion.div
                className="absolute bottom-0 left-6 right-6 h-[2px] bg-ac rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.13, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200"
          >
            Start with a Free Discovery Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
