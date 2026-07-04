"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const FEATURES = ["3–5 year P&L, balance sheet & cash flow","Unit economics & contribution margin analysis","Revenue scenario modelling (base / bull / bear)","Break-even & runway analysis","Investor-grade assumptions documentation","Sensitivity tables & KPI dashboards","Monthly and annual views","Excel & Google Sheets delivery"];

export default function FinancialForecastingPage() {
  return (
    <main>
      <PageHero eyebrow="Financial Forecasting" title="Numbers That" titleAccent="Tell the Truth."
        subtitle="We build financial models that give you and your investors complete clarity — built on sound assumptions, structured for due diligence." />
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="eyebrow mb-5">What's Included</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-8">A model you can defend in any room.</h2>
            <ul className="space-y-3 mb-10">
              {FEATURES.map((f, i) => (
                <motion.li key={i} className="flex items-center gap-3 text-[14.5px] text-t2"
                  initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </motion.li>
              ))}
            </ul>
            <div className="p-6 bg-white rounded-xl border border-br">
              <p className="text-[12px] tracking-[0.15em] uppercase text-t2 mb-1">Investment</p>
              <div className="font-display text-[36px] font-light text-ac">From £600</div>
              <p className="text-[13px] text-t2 mt-1">1–2 week delivery. Revisions included.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { label: "Scenario Types", value: "3", sub: "Base, Bull, Bear" },
              { label: "Forecast Horizon", value: "5yr", sub: "Monthly & annual" },
              { label: "Delivery", value: "2wk", sub: "Average turnaround" },
              { label: "Revisions", value: "∞", sub: "Until you're satisfied" },
            ].map((s, i) => (
              <motion.div key={s.label} className="bg-white rounded-xl p-6 border border-br text-center"
                initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                <div className="font-display text-[40px] font-light text-ac leading-none">{s.value}</div>
                <div className="font-medium text-[13px] text-t1 mt-2">{s.label}</div>
                <div className="text-[12px] text-t2 mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
