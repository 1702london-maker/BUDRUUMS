"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const TIERS = [
  { title: "Brand Identity",         commission: "£120", value: "From £1,200" },
  { title: "Business Plan",          commission: "£80",  value: "From £800" },
  { title: "Financial Forecasting",  commission: "£60",  value: "From £600" },
  { title: "Web Development",        commission: "£250", value: "From £2,500" },
  { title: "Founder Blueprint",      commission: "£450", value: "From £4,500" },
  { title: "Mentorship",             commission: "£30",  value: "From £300" },
];

const STEPS = [
  { num: "01", title: "Apply",      body: "Complete the affiliate application. We review all applications within 5 working days." },
  { num: "02", title: "Get Approved", body: "Once approved, receive your unique referral link and marketing materials." },
  { num: "03", title: "Refer",      body: "Share your link with your network. Anyone who books and converts earns you commission." },
  { num: "04", title: "Earn",       body: "Commission is paid within 30 days of a completed and paid engagement." },
];

export default function AffiliatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Affiliate Programme"
        title="Refer Founders."
        titleAccent="Earn Commission."
        subtitle="Join the Budruum affiliate programme and earn 10% commission on every successful referral. No cap. No complicated tiers."
      />

      {/* Stats banner */}
      <section className="py-12 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "10%",      label: "Commission Rate" },
              { value: "30 days",  label: "Payment Timeline" },
              { value: "No cap",   label: "Earning Limit" },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="font-display text-[40px] font-light text-ac">{s.value}</div>
                <div className="text-[13px] text-t2 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">The Process</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.num}
                className="relative"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
                <div className="w-12 h-12 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mb-5">
                  <span className="font-display text-[13px] font-medium text-ac">{s.num}</span>
                </div>
                <h3 className="font-display text-[21px] font-medium text-t1 mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission table */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">What You Earn</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-10">Commission by Service</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIERS.map((t, i) => (
              <motion.div key={t.title}
                className="bg-white rounded-xl p-6 border border-br hover:border-ac/30 hover:shadow-sm transition-all duration-300 flex items-center justify-between"
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}>
                <div>
                  <h4 className="font-medium text-t1 text-[14.5px]">{t.title}</h4>
                  <p className="text-[12.5px] text-t2 mt-0.5">{t.value}</p>
                </div>
                <div className="text-right">
                  <div className="font-display text-[26px] font-light text-ac">{t.commission}</div>
                  <div className="text-[11px] text-t2">per referral</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[12.5px] text-t2 mt-6">Commission is calculated at 10% of the base service fee on confirmed and paid engagements.</p>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-[40px] font-light text-t1 mb-4">Ready to start earning?</h2>
            <p className="text-[15px] text-t2 max-w-[440px] mx-auto mb-8">Apply for the affiliate programme today. Approval takes up to 5 working days.</p>
            <Link href="/affiliate-portal" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-8 py-4 rounded transition-all duration-200">
              Apply to the Programme
            </Link>
          </motion.div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
