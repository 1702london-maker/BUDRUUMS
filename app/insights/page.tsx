"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const ARTICLES = [
  { category: "Strategy",     title: "Why Most Startup Business Plans Fail Investor Scrutiny",         date: "June 2026", read: "6 min read", excerpt: "The difference between a business plan that passes and one that fails often comes down to three overlooked sections." },
  { category: "Branding",     title: "How to Build a Brand That Survives Your First Five Years",        date: "May 2026",  read: "5 min read", excerpt: "Brand consistency isn't about rigid rules — it's about a foundation flexible enough to evolve without losing identity." },
  { category: "Finance",      title: "The Financial Model Every Pre-Seed Founder Needs",                date: "May 2026",  read: "8 min read", excerpt: "Before you speak to a single investor, you need three working models. Here's exactly what they should contain." },
  { category: "Visa",         title: "UK Innovator Founder Visa: A Complete 2026 Guide",               date: "April 2026", read: "10 min read", excerpt: "Everything you need to know about eligibility, endorsing bodies, and how to maximise your application's chance of success." },
  { category: "Growth",       title: "When to Hire vs When to Outsource as a Early-Stage Founder",     date: "April 2026", read: "5 min read", excerpt: "The decision that destroys more runway than any other. A framework for making it clearly." },
  { category: "Strategy",     title: "Building a GTM Strategy When You Have No Marketing Budget",       date: "March 2026", read: "7 min read", excerpt: "Resourcefulness beats budget almost every time in the early stages. Here's how to build reach without spending." },
];

const CATEGORIES = ["All", "Strategy", "Branding", "Finance", "Visa", "Growth"];

export default function InsightsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Insights & Resources"
        title="Knowledge That"
        titleAccent="Moves You Forward."
        subtitle="Practical guides, frameworks, and thinking from the Budruum team — written for founders who are building seriously."
      />

      {/* Category filter — animated */}
      <section className="bg-gl border-b border-br sticky top-[70px] z-30">
        <div className="max-w-screen-2xl mx-auto px-14 py-4 flex items-center gap-3 overflow-x-auto">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              className={`text-[12.5px] font-medium px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${cat === "All" ? "bg-ac text-white border-ac" : "bg-white text-t2 border-br hover:border-ac hover:text-ac"}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((a, i) => (
              <motion.article
                key={a.title}
                className="group border border-br rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}
              >
                {/* Animated colour band */}
                <motion.div
                  className="h-1 bg-ac origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + (i % 3) * 0.1 }}
                />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-ac bg-ac/10 px-2 py-1 rounded">{a.category}</span>
                    <span className="text-[12px] text-t2">{a.read}</span>
                  </div>
                  <h3 className="font-display text-[22px] font-medium text-t1 leading-snug mb-3 group-hover:text-ac transition-colors duration-200">{a.title}</h3>
                  <p className="text-[13.5px] text-t2 leading-relaxed flex-1 mb-6">{a.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-br">
                    <span className="text-[12px] text-t2">{a.date}</span>
                    <span className="text-[13px] font-medium text-ac flex items-center gap-1 group-hover:gap-2 transition-all duration-200">Read more →</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter inline */}
      <section className="py-16 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14 max-w-[600px] text-center mx-auto">
          <p className="eyebrow mb-4">Stay Informed</p>
          <h2 className="font-display text-[36px] font-light text-t1 mb-4">Get insights in your inbox</h2>
          <p className="text-[14.5px] text-t2 mb-7">No fluff. Just practical thinking to help you build better.</p>
          <form className="flex items-stretch gap-3 max-w-[420px] mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address" className="flex-1 text-[13.5px] px-4 py-3 border border-br rounded bg-white outline-none focus:border-ac transition-colors" />
            <button type="submit" className="px-5 py-3 bg-ac hover:bg-ach text-white text-[13.5px] font-medium rounded transition-colors whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
