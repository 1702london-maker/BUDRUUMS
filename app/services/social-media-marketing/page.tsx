"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const SERVICES = [
  { num: "01", title: "Content Strategy", desc: "A content plan aligned to your brand voice, audience, and business goals — not just posting for the sake of it." },
  { num: "02", title: "Content Creation", desc: "Scroll-stopping visuals, copy, and video content designed specifically for your platform and audience." },
  { num: "03", title: "Community Management", desc: "Active engagement with your audience: comments, DMs, partnerships — building a community, not just a following." },
  { num: "04", title: "Analytics & Reporting", desc: "Monthly performance reviews with actionable insights. You'll always know what's working and why." },
  { num: "05", title: "Paid Social", desc: "Meta and TikTok ad campaigns built to convert — from audience targeting to creative testing." },
  { num: "06", title: "Influencer Partnerships", desc: "We identify and manage collaborations with creators who align with your brand values and audience." },
];

const PLATFORMS = ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube", "Pinterest", "X (Twitter)"];

const PACKAGES = [
  { name: "Starter", price: "From £800/mo", desc: "2 platforms, 3 posts/week, monthly report", popular: false },
  { name: "Growth", price: "From £1,500/mo", desc: "3 platforms, daily content, paid ads, community management", popular: true },
  { name: "Scale", price: "From £2,800/mo", desc: "Full-service: all platforms, influencer management, weekly reporting", popular: false },
];

export default function SocialMediaMarketingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Social Media Marketing"
        title="Content That"
        titleAccent="Converts."
        subtitle="Strategy-led social media management for founders and brands who want real results — not vanity metrics."
      />

      <section className="py-16 bg-ac/10 border-y border-ac/20">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[{ v: "3–10×", l: "Avg. Engagement Lift" }, { v: "60 days", l: "To See Real Growth" }, { v: "All Platforms", l: "Covered" }, { v: "UK & Global", l: "Brands Served" }].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="font-display text-[36px] font-light text-ac">{s.v}</div>
                <div className="text-[13px] text-t2 mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Full-Service Social Management</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.num}
                className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}>
                <div className="w-10 h-10 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mb-5">
                  <span className="text-[11px] font-medium text-ac">{s.num}</span>
                </div>
                <h3 className="font-display text-[20px] font-medium text-t1 mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Platforms</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-10">Where We Work</h2>
          <div className="flex flex-wrap gap-3">
            {PLATFORMS.map((p, i) => (
              <motion.span key={p}
                className="px-5 py-2.5 rounded-full border border-br text-[13px] text-t1 hover:border-ac hover:text-ac transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gs">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Packages</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Choose Your Level</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-[880px]">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.name}
                className={`rounded-xl p-8 border transition-all duration-300 relative ${pkg.popular ? "border-ac bg-white shadow-lg" : "border-br bg-white hover:border-ac/40 hover:shadow-md"}`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 bg-ac text-white text-[11px] font-medium px-3 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="font-display text-[22px] font-medium text-t1 mb-1">{pkg.name}</h3>
                <div className="text-[28px] font-display font-light text-ac mb-3">{pkg.price}</div>
                <p className="text-[13px] text-t2 leading-relaxed mb-6">{pkg.desc}</p>
                <a href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[12.5px] font-medium px-6 py-3 rounded transition-all w-full justify-center">
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-[13px] text-t2 mt-6">All packages include onboarding, brand voice alignment, and a dedicated account manager.</p>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
