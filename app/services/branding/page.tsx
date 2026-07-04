"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const DELIVERABLES = ["Primary logo (full colour + mono + reversed)", "Secondary logo & icon variations", "Colour palette with usage guidelines", "Typography system (primary + secondary)", "Brand guidelines document (PDF)", "Business card & letterhead templates", "Social media asset templates", "Brand tone of voice guide"];
const PROCESS = [
  { step: "Discovery", desc: "Brand audit, competitor mapping, audience profiling, and positioning workshop." },
  { step: "Concept",   desc: "Three distinct creative directions presented with rationale and mood boards." },
  { step: "Develop",   desc: "Chosen direction refined across all brand touchpoints through feedback rounds." },
  { step: "Deliver",   desc: "Final files in all formats, brand guidelines, and a handover session." },
];

export default function BrandingPage() {
  return (
    <main>
      <PageHero eyebrow="Brand Identity" title="A Brand That" titleAccent="Means Something."
        subtitle="Brand identity is the single most leveraged asset your business has. We build identities that position, differentiate, and endure." />

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="eyebrow mb-5">What's Included</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-8">Everything you need, nothing you don't.</h2>
            <ul className="space-y-3">
              {DELIVERABLES.map((d, i) => (
                <motion.li key={i} className="flex items-start gap-3 text-[14.5px] text-t2"
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {d}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 p-6 bg-white rounded-xl border border-br">
              <p className="text-[12px] tracking-[0.15em] uppercase text-t2 mb-1">Investment</p>
              <div className="font-display text-[36px] font-light text-ac">From £1,200</div>
              <p className="text-[13px] text-t2 mt-1">3–5 week delivery. Payment plans available.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">Our Process</p>
            <div className="space-y-5">
              {PROCESS.map((p, i) => (
                <motion.div key={p.step} className="bg-white rounded-xl p-6 border border-br flex gap-5 hover:border-ac/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                  <div className="w-10 h-10 rounded-full bg-ac/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-medium text-ac">{String(i+1).padStart(2,"0")}</span>
                  </div>
                  <div>
                    <h4 className="font-display text-[18px] font-medium text-t1 mb-1">{p.step}</h4>
                    <p className="text-[13.5px] text-t2 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
