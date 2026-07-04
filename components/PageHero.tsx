"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  bg?: string;
}

export default function PageHero({ eyebrow, title, titleAccent, subtitle, bg = "bg-white" }: PageHeroProps) {
  return (
    <section className={`relative pt-24 pb-20 overflow-hidden ${bg}`}>
      {/* Decorative animated background shapes */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gs opacity-50 pointer-events-none"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ translateX: "30%", translateY: "-30%" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gs opacity-30 pointer-events-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        style={{ translateX: "-40%", translateY: "40%" }}
      />

      <div className="max-w-screen-2xl mx-auto px-14 relative z-10">
        {/* Animated accent line */}
        <motion.div
          className="h-px bg-ac mb-8 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "60px" }}
        />

        <motion.p
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          className="font-display text-[58px] md:text-[70px] lg:text-[80px] leading-[1.02] font-light text-t1 max-w-[800px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
          {titleAccent && <em className="not-italic text-ac"> {titleAccent}</em>}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-[16px] text-t2 max-w-[560px] leading-relaxed mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
