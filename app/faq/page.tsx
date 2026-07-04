"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const FAQS = [
  { q: "How does the process work?", a: "Every engagement begins with a free 30-minute discovery call. We listen, ask questions, and then scope a proposal tailored to your specific situation — timeline, deliverables, and investment. We only proceed when you're completely comfortable." },
  { q: "Do you work with very early-stage founders?", a: "Yes. Some of our best work happens at the idea stage. If you have a clear concept and the commitment to build it properly, we have the tools to help you structure it from day one." },
  { q: "How long does each service take?", a: "It depends on scope. Brand Identity typically takes 3–5 weeks. Business Plans 2–4 weeks. Financial Models 1–2 weeks. Web projects 6–12 weeks. We agree timelines before any work begins." },
  { q: "Can I combine multiple services?", a: "Absolutely — and we recommend it. Founders who combine branding, business planning, and financial modelling in one engagement benefit from consistency across all assets. We offer combined pricing for multi-service engagements." },
  { q: "What is the Founder Blueprint?", a: "The Founder Blueprint is our most comprehensive service — a full operating system for your business. It covers strategy, brand, financial foundations, operational structure, and a 12-month growth plan. Priced from £4,500, basic to fully bespoke." },
  { q: "Do you offer payment plans?", a: "Yes. We understand founder cashflow. We offer staged payment plans on most engagements — typically 50% upfront, 50% on delivery. Ask us about options during your discovery call." },
  { q: "What sectors do you work in?", a: "We are sector-agnostic. Our current portfolio spans care tech, luxury retail, hospitality, beauty, logistics, education, social enterprise, and personal brands. Good thinking translates across industries." },
  { q: "Can you help with the UK Innovator Founder Visa?", a: "Yes. We support founders through the full application process — from assessing eligibility to preparing endorsement documentation for approved endorsing bodies. This is a specialist service and requires an initial assessment call." },
  { q: "Are your services available outside the UK?", a: "Yes. We work with founders globally. Most of our services are delivered remotely, and we have supported founders in the US, Europe, West Africa, and the Middle East." },
  { q: "How do I get started?", a: "Book a free 30-minute discovery call through our booking page. No commitment, no sales pressure — just a focused conversation to understand where you are and where you want to go." },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-br"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (i % 5) * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 group"
      >
        <span className={`text-[15.5px] font-medium transition-colors duration-200 ${open ? "text-ac" : "text-t1 group-hover:text-ac"}`}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[24px] text-ac flex-shrink-0 leading-none"
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[14.5px] text-t2 leading-relaxed max-w-[640px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Your Questions,"
        titleAccent="Answered."
        subtitle="Everything founders typically ask before working with us. Can't find what you need? Just reach out."
      />

      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14 max-w-[800px]">
          <div className="divide-y-0">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
          <motion.div
            className="mt-14 bg-gl rounded-xl p-8 border border-br text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-[28px] font-light text-t1 mb-3">Still have questions?</h3>
            <p className="text-[14.5px] text-t2 mb-6">Book a free call and ask us directly. No commitment required.</p>
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">Book a Free Discovery Call</a>
          </motion.div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
