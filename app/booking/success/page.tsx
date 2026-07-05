"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) setVerified(true);
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-5 py-20">
      <motion.div
        className="bg-white border border-[#E8E8E8] rounded-[12px] w-full max-w-[520px] text-center p-12 shadow-[0_8px_40px_rgba(0,0,0,.07)]"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>

        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(168,143,132,.1)", border: "1px solid rgba(168,143,132,.25)" }}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 200 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
          <p className="text-[11px] tracking-[.18em] uppercase text-[#A88F84] font-medium mb-3">Payment Confirmed</p>
          <h1 className="font-display font-light text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px,3.5vw,38px)", lineHeight: 1.15 }}>
            Your session is<br /><em className="not-italic text-[#A88F84]">booked.</em>
          </h1>
          <p className="text-[14.5px] text-[#6B6B6B] leading-[1.8] mb-8 max-w-[360px] mx-auto">
            Payment received. A confirmation has been sent to your email. We look forward to speaking with you.
          </p>

          <div className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-[8px] p-5 mb-8 text-left">
            <p className="text-[11px] tracking-[.15em] uppercase text-[#6B6B6B] font-medium mb-3">What happens next</p>
            {[
              "You will receive a calendar invite within 2 hours",
              "We will send a short brief form to prepare for the call",
              "Your consultation fee is credited if you proceed with a project",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                <div className="w-[6px] h-[6px] rounded-full bg-[#A88F84] flex-shrink-0 mt-[7px]" />
                <p className="text-[13px] text-[#6B6B6B] leading-[1.65]">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="btn-primary">
              Back to Home
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="https://wa.me/447919643752" target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F8F8]" />}>
      <SuccessContent />
    </Suspense>
  );
}
