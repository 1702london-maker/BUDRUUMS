"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const STEPS = [
  { icon: "◈", title: "Validate Your Idea",      href: "/services/startup-consultancy", desc: "Before you invest time or money, make sure the idea is market-ready. We help you stress-test assumptions and identify the real opportunity." },
  { icon: "◎", title: "Build Your Brand",         href: "/services/branding",            desc: "Your brand is the first thing clients, investors, and partners will judge you on. Get it right from day one." },
  { icon: "◉", title: "Write Your Business Plan", href: "/services/business-plan",       desc: "Whether you need it for funding, a visa, or your own clarity — a proper business plan changes how you operate." },
  { icon: "◐", title: "Model Your Finances",      href: "/services/financial-forecasting", desc: "Understand your numbers before anyone else does. A financial model is your most powerful planning tool." },
  { icon: "◑", title: "Build Your Platform",      href: "/services/web-development",     desc: "Your online presence is your 24/7 sales team. We build sites and apps that work as hard as you do." },
  { icon: "◒", title: "Get the Right Guidance",   href: "/services/mentorship",          desc: "One conversation with someone who's been there can save you months of costly mistakes." },
];

export default function StartPage() {
  return (
    <main>
      <PageHero eyebrow="Start Your Business" title="The Right Way" titleAccent="to Begin."
        subtitle="Whether you're pre-idea or pre-launch, Budruum helps you build the foundations that give your business the best possible chance of success." />

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Your Starting Path</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">Six Steps Every Founder Should Take</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}>
                <Link href={s.href} className="group bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                  <span className="text-[26px] text-ac mb-5 block group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                  <div className="text-[11px] font-medium tracking-[0.15em] uppercase text-t2 mb-2">Step {String(i+1).padStart(2,"0")}</div>
                  <h3 className="font-display text-[21px] font-medium text-t1 mb-3">{s.title}</h3>
                  <p className="text-[13.5px] text-t2 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-5 pt-4 border-t border-br flex justify-end">
                    <span className="text-ac text-[16px] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <motion.div className="max-w-screen-2xl mx-auto px-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-[40px] font-light text-t1 mb-4">Not sure where to start?</h2>
          <p className="text-[15px] text-t2 max-w-[440px] mx-auto mb-8">Book a free discovery call and we'll map out exactly what you need and in what order.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-8 py-4 rounded transition-all">Book Free Discovery Call</Link>
        </motion.div>
      </section>
      <PageCTA />
    </main>
  );
}
