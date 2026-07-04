"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const VENTURES = [
  { label: "Care Tech",      baseAngle: 0,   r: 178, size: 7,  speed: 0.18 },
  { label: "Luxury Retail",  baseAngle: 45,  r: 205, size: 6,  speed: -0.14 },
  { label: "Hospitality",    baseAngle: 100, r: 160, size: 6,  speed: 0.22 },
  { label: "Beauty Tech",    baseAngle: 155, r: 215, size: 7,  speed: -0.16 },
  { label: "Logistics",      baseAngle: 210, r: 172, size: 6,  speed: 0.20 },
  { label: "Education",      baseAngle: 260, r: 198, size: 6,  speed: -0.12 },
  { label: "Social Impact",  baseAngle: 310, r: 182, size: 6,  speed: 0.15 },
  { label: "Founder Brand",  baseAngle: 350, r: 208, size: 7,  speed: -0.18 },
];

const CX = 280;
const CY = 280;
const DEG = Math.PI / 180;

function pos(angleDeg: number, r: number) {
  const a = (angleDeg - 90) * DEG;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function OrbitingNodes() {
  const [angles, setAngles] = useState(() => VENTURES.map(v => v.baseAngle));
  const t = useRef(0);

  useAnimationFrame((_, delta) => {
    t.current += delta;
    const secs = t.current / 1000;
    setAngles(VENTURES.map(v => v.baseAngle + v.speed * secs * 20));
  });

  return (
    <>
      {VENTURES.map((v, i) => {
        const p = pos(angles[i], v.r);
        const labelP = pos(angles[i], v.r + 22);
        return (
          <g key={i}>
            <line
              x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="#A88F84" strokeWidth="0.7" strokeOpacity={0.22}
            />
            <circle cx={p.x} cy={p.y} r={v.size / 2} fill="#A88F84" />
            <text
              x={labelP.x} y={labelP.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="8.5" fill="#6B6B6B"
              fontFamily="var(--font-dm-sans)"
              letterSpacing="0.05em"
              style={{ userSelect: "none" }}
            >
              {v.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </>
  );
}

export default function VentureConstellation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full max-w-[560px] aspect-square mx-auto select-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 560 560"
        fill="none"
      >
        {/* Static orbit rings */}
        {[95, 168, 218].map((r, i) => (
          <circle
            key={i}
            cx={CX} cy={CY} r={r}
            stroke="#A88F84"
            strokeWidth="0.5"
            strokeOpacity={0.10}
            strokeDasharray="4 6"
          />
        ))}

        {/* Orbiting nodes (client-only, updates every frame) */}
        {mounted && <OrbitingNodes />}
      </svg>

      {/* Centre hub */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-[68px] h-[68px] rounded-full border border-ac/40 flex items-center justify-center bg-white shadow-md"
            animate={{ boxShadow: ["0 0 0 0px rgba(168,143,132,0.2)", "0 0 0 14px rgba(168,143,132,0)", "0 0 0 0px rgba(168,143,132,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          >
            <span className="font-display text-[22px] font-light text-t1 tracking-tight">B</span>
          </motion.div>
          <p className="mt-3 text-[10px] tracking-[0.18em] text-t2 uppercase font-medium">Portfolio</p>
        </div>
      </div>
    </div>
  );
}
