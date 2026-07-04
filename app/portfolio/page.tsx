"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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

/* Animated bar chart representing portfolio impact */
function PortfolioChart() {
  const bars = [65, 80, 55, 90, 70, 85, 60, 95];
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[10px] px-8 pb-10 pt-16">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1">
          <motion.div
            className="w-full rounded-t-[3px] bg-[#A88F84]"
            style={{ opacity: 0.15 + (h / 100) * 0.55 }}
            initial={{ height: 0 }}
            animate={{ height: `${h * 1.8}px` }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="w-[6px] h-[6px] rounded-full bg-[#A88F84]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        </div>
      ))}
      {/* X-axis label */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] tracking-[.18em] uppercase text-[#6B6B6B]">Portfolio Growth</div>
    </div>
  );
}

/* Animated network graph — represents cross-industry connections */
function NetworkGraph() {
  const nodes = [
    { x: 50, y: 50, r: 20, label: "B" },
    { x: 18, y: 22, r: 10, label: "" },
    { x: 80, y: 18, r: 10, label: "" },
    { x: 85, y: 72, r: 10, label: "" },
    { x: 20, y: 78, r: 10, label: "" },
    { x: 52, y: 14, r: 7,  label: "" },
    { x: 88, y: 44, r: 7,  label: "" },
    { x: 14, y: 52, r: 7,  label: "" },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,5],[2,6],[3,4]];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: "8px" }}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#A88F84" strokeWidth="0.4" strokeOpacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.x} cy={n.y} r={n.r}
            fill={i === 0 ? "#A88F84" : "white"} stroke="#A88F84"
            strokeWidth={i === 0 ? 0 : 0.5} fillOpacity={i === 0 ? 0.15 : 0.8}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, type: "spring" }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
          {i === 0 && (
            <text x={n.x} y={n.y + 4} textAnchor="middle"
              fontSize="8" fontFamily="Cormorant Garamond, serif" fill="#A88F84">B</text>
          )}
          {/* Pulse on satellite nodes — scale instead of r */}
          {i > 0 && (
            <motion.circle cx={n.x} cy={n.y} r={n.r + 5}
              fill="none" stroke="#A88F84" strokeWidth="0.4"
              animate={{ scale: [0.6, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function PortfolioPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8]"
        style={{ padding: "92px 56px 84px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
        <motion.div className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(168,143,132,.07) 0%,transparent 65%)" }}
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Portfolio</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-[22px]" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            The work speaks<br /><em className="not-italic text-[#A88F84]">for itself.</em>
          </h1>
          <p className="text-[16px] text-[#6B6B6B] leading-[1.82] max-w-[460px] mb-8">
            We work across industries. What connects every engagement is the quality of thinking, the depth of execution, and the outcomes that follow.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <Link href="/booking" className="btn-primary">
              Request Case Studies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </motion.div>

        {/* Network graph — represents cross-industry connections Budruum has built */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "400px", boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <NetworkGraph />
          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="text-[11px] tracking-[.18em] uppercase text-[#6B6B6B]">Cross-Industry Network</span>
          </div>
        </motion.div>
      </section>

      {/* STATS — counting up feel */}
      <section className="bg-white border-b border-[#E8E8E8]" style={{ padding: "56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", textAlign: "center" }}>
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <motion.div className="font-display text-[52px] font-light text-[#A88F84] leading-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}>
                {s.value}
              </motion.div>
              <div className="text-[12.5px] text-[#6B6B6B] mt-3 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VENTURES — animated cards with growing accent bar */}
      <section style={{ padding: "80px 56px", borderBottom: "1px solid #E8E8E8" }}>
        <motion.div className="mb-[52px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Selected Work</p>
          <h2 className="font-display text-[42px] font-light text-[#1A1A1A] mb-3">Ventures We&apos;ve Built With</h2>
          <p className="text-[14px] text-[#6B6B6B] max-w-[480px]">Category-level labels are used to protect client confidentiality. Full case studies available on request.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {VENTURES.map((v, i) => (
            <motion.div key={v.category}
              className="group bg-[#F8F8F8] rounded-[10px] border border-[#E8E8E8] hover:border-[#A88F84]/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              style={{ padding: "28px" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.09 }}>
              {/* Accent bar animates from left on mount */}
              <motion.div
                className="h-[3px] bg-[#A88F84] rounded-full mb-5 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2 + (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <p className="text-[10px] font-medium tracking-[.2em] uppercase text-[#A88F84] mb-3">{v.category}</p>
              <p className="text-[13.5px] text-[#1A1A1A] leading-relaxed mb-5">{v.label}</p>
              <div className="flex flex-wrap gap-2">
                {v.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-[#6B6B6B] bg-white border border-[#E8E8E8] px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT CHART SECTION */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8]" style={{ padding: "80px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">The Difference</p>
          <h2 className="font-display font-light text-[#1A1A1A] mb-5" style={{ fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.2 }}>
            Built to last.<br /><em className="not-italic text-[#A88F84]">Measured in outcomes.</em>
          </h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.9] mb-6">
            Every engagement is measured by what it produces long after delivery — funding rounds closed, brands that hold, strategies still guiding decisions years on.
          </p>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.9]">
            Category-level labels protect client confidentiality. Full case studies with detail are available under NDA upon request.
          </p>
        </motion.div>

        {/* Bar chart — represents portfolio growth across ventures */}
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "340px" }}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}>
          <PortfolioChart />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F8F8] border-b border-[#E8E8E8]" style={{ padding: "64px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h3 className="font-display text-[32px] font-light text-[#1A1A1A] mb-2">Want the full picture?</h3>
          <p className="text-[14.5px] text-[#6B6B6B]">Detailed case studies are available under NDA. Book a discovery call to request access.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Link href="/booking" className="btn-primary">
            Request Case Studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
      </section>

      <PageCTA />
    </main>
  );
}
