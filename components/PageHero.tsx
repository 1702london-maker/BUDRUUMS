"use client";
import { motion } from "framer-motion";
import React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

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
      <section className={`relative overflow-hidden border-b border-[#E8E8E8] ${bg}
        px-5 pt-14 pb-10
        sm:px-8 sm:pt-16 sm:pb-14
        lg:px-14 lg:pt-[92px] lg:pb-[84px]
        grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-center`}>
        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <motion.div className="h-[3px] bg-[#A88F84] mb-6 origin-left rounded-full"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }} style={{ width: "56px" }} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-5"
            style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 1.1 }}>
            {title}{titleAccent && <em className="not-italic text-[#A88F84]"> {titleAccent}</em>}
          </h1>
          {subtitle && <p className="text-[15px] lg:text-[15.5px] text-[#6B6B6B] leading-[1.82] max-w-[480px]">{subtitle}</p>}
        </motion.div>

        {/* Panel — visible on all screen sizes */}
        <motion.div
          className="relative rounded-[14px] overflow-hidden bg-[#F2F2F2] border border-[#E8E8E8] w-full h-[260px] sm:h-[320px] lg:h-[400px]"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,.09)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {panel}
        </motion.div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden ${bg}
      pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-24`}>
      <motion.div
        className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[640px] lg:h-[640px] rounded-full bg-[#F2F2F2] pointer-events-none"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.0, ease: EASE }}
        style={{ translateX: "28%", translateY: "-28%" }} />
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 relative z-10">
        <motion.div className="h-[3px] bg-[#A88F84] mb-6 lg:mb-8 origin-left rounded-full"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }} style={{ width: "72px" }} />
        <motion.p className="eyebrow mb-4 lg:mb-5"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>{eyebrow}</motion.p>
        <motion.h1
          className="font-display leading-[1.05] font-light text-[#1A1A1A] max-w-[820px]"
          style={{ fontSize: "clamp(38px,6vw,82px)" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: EASE }}>
          {title}{titleAccent && <em className="not-italic text-[#A88F84]"> {titleAccent}</em>}
        </motion.h1>
        {subtitle && (
          <motion.p className="text-[15px] lg:text-[16.5px] text-[#6B6B6B] max-w-[560px] leading-relaxed mt-5 lg:mt-7"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}>{subtitle}</motion.p>
        )}
        <motion.div className="h-px bg-[#E8E8E8] mt-8 lg:mt-12 origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.65 }} />
      </div>
    </section>
  );
}
