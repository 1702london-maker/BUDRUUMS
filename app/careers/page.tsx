"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const ROLES = [
  { title: "Brand Strategist",        type: "Freelance / Contract", location: "Remote (UK)",  desc: "We're looking for a senior brand strategist to join our roster for client engagements. You'll lead discovery, identity development, and brand guideline creation." },
  { title: "Financial Analyst",       type: "Freelance / Contract", location: "Remote",       desc: "Chartered or qualified analyst with startup and SME experience. You'll build investor-grade financial models across a range of sectors." },
  { title: "Web Developer",           type: "Freelance / Contract", location: "Remote",       desc: "Next.js and React specialist. You'll build client-facing platforms and internal tools. Experience with Supabase or similar backends preferred." },
  { title: "Business Plan Writer",    type: "Freelance / Contract", location: "Remote",       desc: "Strong research and writing skills with a commercial mindset. You'll work on investor-ready business plans across a diverse client base." },
];

const PERKS = [
  { icon: "◎", label: "Flexible Working",     body: "Remote-first. Work where and when you're most effective." },
  { icon: "◈", label: "Meaningful Work",       body: "Every project helps a founder build something real. The work matters." },
  { icon: "◉", label: "Creative Freedom",      body: "We hire experts and trust their judgement. No micromanagement." },
  { icon: "◐", label: "Fair Compensation",     body: "Day rates and project fees that reflect the quality of work we expect." },
];

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title="Work That"
        titleAccent="Actually Matters."
        subtitle="We're building a team of experts who are serious about their craft and committed to helping founders win. If that's you, we'd love to hear from you."
      />

      {/* Why join */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Why Budruum</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">What Makes Us Different to Work With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.label}
                className="bg-white rounded-xl p-7 border border-br hover:border-ac/30 hover:shadow-sm transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-[26px] text-ac block mb-4">{p.icon}</span>
                <h4 className="font-display text-[19px] font-medium text-t1 mb-2">{p.label}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Open Roles</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Current Opportunities</h2>
          <div className="space-y-4">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                className="bg-gl rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-sm transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display text-[22px] font-medium text-t1">{r.title}</h3>
                    <span className="text-[11px] font-medium tracking-[0.1em] uppercase bg-ac/10 text-ac px-2 py-1 rounded">{r.type}</span>
                    <span className="text-[12px] text-t2">{r.location}</span>
                  </div>
                  <p className="text-[13.5px] text-t2 leading-relaxed">{r.desc}</p>
                </div>
                <a href={`mailto:team@budruum.co.uk?subject=Application: ${r.title}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13px] font-medium px-6 py-3 rounded transition-all duration-200 whitespace-nowrap">
                  Apply Now
                </a>
              </motion.div>
            ))}
          </div>

          {/* Speculative */}
          <motion.div
            className="mt-10 bg-gl rounded-xl p-8 border border-br text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-[26px] font-light text-t1 mb-3">Don't see your role?</h3>
            <p className="text-[14.5px] text-t2 mb-6">We're always interested in exceptional people. Send us your details and we'll keep you in mind.</p>
            <a href="mailto:team@budruum.co.uk?subject=Speculative Application"
              className="inline-flex items-center gap-2 border border-t1/20 hover:border-ac text-t1 hover:text-ac text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">
              Send a Speculative Application
            </a>
          </motion.div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
