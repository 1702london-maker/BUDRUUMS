"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const VENTURES = [
  { category: "Care Tech",      label: "Digital health platform scaling across UK primary care networks.", tags: ["Strategy", "Branding", "Web Dev"] },
  { category: "Luxury Retail",  label: "Premium lifestyle brand repositioned for high-net-worth London market.", tags: ["Brand Identity", "Business Plan"] },
  { category: "Hospitality",    label: "Boutique hospitality group structured for franchise expansion.", tags: ["Financial Forecasting", "Strategy"] },
  { category: "Beauty Tech",    label: "AI-powered beauty marketplace entering the European market.", tags: ["Business Plan", "Web Dev", "Branding"] },
  { category: "Logistics",      label: "Last-mile delivery startup built for B2B contract clients.", tags: ["Financial Modelling", "Strategy"] },
  { category: "Education",      label: "Online skills platform for underrepresented founder communities.", tags: ["Branding", "Web Dev"] },
  { category: "Social Impact",  label: "Community-led housing initiative secured £2M in grant funding.", tags: ["Business Plan", "Financial Forecasting"] },
  { category: "Founder Brand",  label: "Personal brand platform for a multi-exit serial entrepreneur.", tags: ["Strategy", "Web Dev", "Branding"] },
];

const STATS = [
  { value: "£40M+", label: "Raised by portfolio clients" },
  { value: "8",     label: "Active venture categories" },
  { value: "12",    label: "Industries represented" },
  { value: "94%",   label: "Client retention rate" },
];

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title="The Work Speaks"
        titleAccent="for Itself."
        subtitle="We work across industries. What connects every engagement is the quality of thinking, the depth of execution, and the outcomes that follow."
      />

      {/* Animated stats */}
      <section className="py-16 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-display text-[48px] font-light text-ac leading-none">{s.value}</div>
                <div className="text-[12.5px] text-t2 mt-3 tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venture cards */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="mb-12">
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="font-display text-[42px] lg:text-[50px] font-light text-t1">Ventures We've Built With</h2>
            <p className="text-[14px] text-t2 mt-3 max-w-[480px]">Category-level labels are used to protect client confidentiality. Full case studies available on request.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTURES.map((v, i) => (
              <motion.div
                key={v.category}
                className="group bg-gl rounded-xl p-7 border border-br hover:border-ac/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                {/* Animated category bar */}
                <motion.div
                  className="h-[3px] bg-ac rounded-full mb-5 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (i % 4) * 0.1 }}
                />
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-ac mb-3">{v.category}</p>
                <p className="text-[14px] text-t1 leading-relaxed mb-5">{v.label}</p>
                <div className="flex flex-wrap gap-2">
                  {v.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-t2 bg-white border border-br px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study CTA */}
      <section className="py-16 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-[32px] font-light text-t1">Want the full picture?</h3>
            <p className="text-[14.5px] text-t2 mt-2">Detailed case studies are available under NDA. Book a discovery call to request access.</p>
          </div>
          <a href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200 whitespace-nowrap">
            Request Case Studies
          </a>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
