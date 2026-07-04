"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

const STACK = ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "Framer Motion", "Stripe"];
const PACKAGES = [
  { name: "Landing Page",    price: "From £2,500",  desc: "High-converting single-page site with animations, contact form, and CMS-ready content." },
  { name: "Multi-Page Site", price: "From £4,500",  desc: "Full website with up to 10 pages, blog, booking system, and full brand integration." },
  { name: "Web Application", price: "From £8,500",  desc: "Custom web app with authentication, database, dashboards, and full backend logic." },
  { name: "E-commerce",      price: "From £5,500",  desc: "Shopify or custom-built storefront with payments, inventory, and order management." },
];

export default function WebDevPage() {
  return (
    <main>
      <PageHero eyebrow="Web Development" title="Sites That" titleAccent="Actually Work."
        subtitle="We build high-performance web products that convert visitors into clients — designed to your brand, built on modern stack, shipped fast." />
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">Packages</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">What We Build</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {PACKAGES.map((p, i) => (
              <motion.div key={p.name} className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <h3 className="font-display text-[21px] font-medium text-t1 mb-2">{p.name}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed flex-1 mb-6">{p.desc}</p>
                <div className="pt-4 border-t border-br">
                  <div className="font-display text-[22px] font-light text-ac">{p.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="eyebrow mb-6">Our Tech Stack</p>
          <div className="flex flex-wrap gap-3">
            {STACK.map((tech, i) => (
              <motion.span key={tech} className="text-[13.5px] font-medium text-t1 border border-br bg-white px-5 py-2 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
