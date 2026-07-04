"use client";
import { motion } from "framer-motion";
import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  bg?: string;
  panel?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, titleAccent, subtitle, bg = "bg-white", panel }: PageHeroProps) {
  if (panel) {
    return (
      <section className={`relative overflow-hidden border-b border-[#E8E8E8] ${bg}`}
        style={{ padding: "92px 56px 84px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div className="h-[3px] bg-[#A88F84] mb-6 origin-left rounded-full"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }} style={{ width: "56px" }} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-5" style={{ fontSize: "clamp(36px,4.5vw,58px)", lineHeight: 1.1 }}>
            {title}{titleAccent && <em className="not-italic text-[#A88F84]"> {titleAccent}</em>}
          </h1>
          {subtitle && <p className="text-[15.5px] text-[#6B6B6B] leading-[1.82] max-w-[480px]">{subtitle}</p>}
        </motion.div>
        <motion.div className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8]"
          style={{ height: "400px", boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          {panel}
        </motion.div>
      </section>
    );
  }

  return (
    <section className={`relative pt-28 pb-24 overflow-hidden ${bg}`}>
      <motion.div className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full bg-[#F2F2F2] pointer-events-none"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{ translateX: "28%", translateY: "-28%" }} />
      <div className="max-w-screen-2xl mx-auto px-14 relative z-10">
        <motion.div className="h-[3px] bg-[#A88F84] mb-8 origin-left rounded-full"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }} style={{ width: "72px" }} />
        <motion.p className="eyebrow mb-5"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>{eyebrow}</motion.p>
        <motion.h1 className="font-display text-[58px] md:text-[70px] lg:text-[82px] leading-[1.02] font-light text-[#1A1A1A] max-w-[820px]"
          initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {title}{titleAccent && <em className="not-italic text-[#A88F84]"> {titleAccent}</em>}
        </motion.h1>
        {subtitle && (
          <motion.p className="text-[16.5px] text-[#6B6B6B] max-w-[560px] leading-relaxed mt-7"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}>{subtitle}</motion.p>
        )}
        <motion.div className="h-px bg-[#E8E8E8] mt-12 origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.65 }} />
      </div>
    </section>
  );
}
