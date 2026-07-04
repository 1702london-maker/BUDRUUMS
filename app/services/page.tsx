"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const SERVICES = [
  { icon: "◈", title: "Brand Identity",       price: "From £1,200",  href: "/services/branding",            desc: "Logo, colour palette, typography and brand guidelines built to last.", tag: "Most Popular" },
  { icon: "◎", title: "Business Plan",         price: "From £800",    href: "/services/business-plan",       desc: "Investor-ready documents that pass the toughest scrutiny.", tag: "" },
  { icon: "◉", title: "Financial Forecasting", price: "From £600",    href: "/services/financial-forecasting", desc: "3–5 year models with scenario analysis for investor and operator clarity.", tag: "" },
  { icon: "◐", title: "Web Development",       price: "From £2,500",  href: "/services/web-development",     desc: "High-performance sites and apps built for conversion.", tag: "" },
  { icon: "◑", title: "Founder Blueprint",     price: "From £4,500",  href: "/services/founder-blueprint",   desc: "A full operating system for your business — strategy, process, and growth.", tag: "Signature" },
  { icon: "◒", title: "Mentorship",            price: "From £300",    href: "/services/mentorship",          desc: "Direct access to a founder who has built and scaled multiple ventures.", tag: "" },
  { icon: "◓", title: "Innovator Visa",        price: "From £1,500",  href: "/services/innovator-visa",      desc: "End-to-end UK Innovator Founder Visa support and endorsement.", tag: "" },
  { icon: "◔", title: "Startup Consultancy",   price: "From £350/hr", href: "/services/startup-consultancy", desc: "Advisory sessions across strategy, operations, and growth.", tag: "" },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our Services"
        title="Everything a Founder"
        titleAccent="Needs to Build."
        subtitle="From brand to business plan, financial model to web presence — every service is designed to give founders a real, tangible advantage."
      />

      {/* Animated grid */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={s.href}
                  className="group bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  {s.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-medium tracking-[0.1em] uppercase bg-ac/10 text-ac px-2 py-1 rounded">
                      {s.tag}
                    </span>
                  )}
                  <span className="text-[26px] text-ac mb-5 block group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                  <h3 className="font-display text-[21px] font-medium text-t1 mb-2">{s.title}</h3>
                  <p className="text-[13px] text-t2 leading-relaxed flex-1 mb-5">{s.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-br">
                    <span className="text-[12.5px] font-medium text-ac">{s.price}</span>
                    <span className="text-ac text-[18px] group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                  {/* Animated bottom bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-ac origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + (i % 4) * 0.1 }}
                    style={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14 text-center">
          <p className="eyebrow mb-4">How We Work</p>
          <h2 className="font-display text-[38px] lg:text-[48px] font-light text-t1 mb-5">
            Every engagement starts with a free conversation.
          </h2>
          <p className="text-[15.5px] text-t2 max-w-[500px] mx-auto mb-8">
            No commitment required. We scope the work, agree the investment, and only proceed when you're completely confident.
          </p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">
            Book Free Discovery Call
          </Link>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
