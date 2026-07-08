"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const COMPANY_LINKS = [
  { label: "About",             href: "/about" },
  { label: "Portfolio",         href: "/portfolio" },
  { label: "FAQ",               href: "/faq" },
  { label: "Careers",           href: "/careers" },
  { label: "Referral",          href: "/referral" },
  { label: "Account",           href: "/account" },
  { label: "Contact",           href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Brand Identity",         href: "/services/branding" },
  { label: "Business Plan",          href: "/services/business-plan" },
  { label: "Financial Forecasting",  href: "/services/financial-forecasting" },
  { label: "Web & App Development",  href: "/services/web-development" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Innovator Visa",         href: "/services/innovator-visa" },
];

const FOUNDERS_LINKS = [
  { label: "Founder Blueprint",    href: "/services/founder-blueprint" },
  { label: "Mentorship",           href: "/services/mentorship" },
  { label: "Startup Consultancy",  href: "/start" },
  { label: "Insights",             href: "/insights" },
  { label: "Book a Consultation",  href: "/booking" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link href={href} className="footer-link">
        <span className="footer-link-arrow">→</span>
        {label}
      </Link>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle"|"sending"|"sent">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("sending");
    try { await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); } catch {}
    setStatus("sent");
  }
  if (status === "sent") return <p className="text-[13px] text-[#A88F84]">You&apos;re subscribed. Welcome to Budruum Insights.</p>;
  return (
    <form onSubmit={submit} className="flex items-stretch border border-[#E8E8E8] rounded overflow-hidden">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 text-[13px] px-4 py-3 bg-white outline-none text-[#1A1A1A] placeholder:text-[#6B6B6B]/60 min-w-0" />
      <motion.button type="submit" disabled={status === "sending"}
        className="px-4 bg-[#A88F84] text-white flex-shrink-0 flex items-center justify-center disabled:opacity-60"
        whileHover={{ backgroundColor: "#8F7870", scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </motion.button>
    </form>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0px;
          font-size: 13.5px;
          color: #6B6B6B;
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
          position: relative;
        }
        .footer-link-arrow {
          font-size: 12px;
          color: #A88F84;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
          display: inline-block;
          width: 0;
          overflow: hidden;
          transition: width 0.22s ease, opacity 0.22s, transform 0.22s;
        }
        .footer-link:hover {
          color: #A88F84;
          gap: 6px;
        }
        .footer-link:hover .footer-link-arrow {
          opacity: 1;
          width: 16px;
          transform: translateX(0);
        }
      `}</style>

      <footer style={{ background: "#fff", borderTop: "1px solid #E8E8E8" }}>
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image src="/logo.png" alt="Budruum" width={200} height={51} className="h-[51px] w-auto mb-4" />
            </Link>
            <p className="text-[13px] text-[#6B6B6B] leading-[1.7] mt-2 max-w-[220px]">
              Budruum partners with founders and growing businesses to build the strategy, structure, and assets they need to succeed.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { href: "https://www.instagram.com/budruum?igsh=MWV2cjI4ajZjaDNkdQ==", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: "https://www.tiktok.com/@budruumglobal", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#E8E8E8] rounded-full flex items-center justify-center text-[#6B6B6B] hover:border-[#A88F84] hover:text-[#A88F84] transition-all"
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.92 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#1A1A1A] mb-5">Company</h6>
            <ul className="space-y-[14px]">
              {COMPANY_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#1A1A1A] mb-5">Services</h6>
            <ul className="space-y-[14px]">
              {SERVICE_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
            </ul>
          </div>

          {/* Col 4 — Founders Corner */}
          <div>
            <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#1A1A1A] mb-5">Founders Corner</h6>
            <ul className="space-y-[14px]">
              {FOUNDERS_LINKS.map(l => <FooterLink key={l.href} {...l} />)}
            </ul>
          </div>

          {/* Col 5 — Newsletter */}
          <div>
            <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#1A1A1A] mb-5">Newsletter</h6>
            <p className="text-[13px] text-[#6B6B6B] leading-relaxed mb-4">
              Insights, strategies and updates to help your business grow.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #E8E8E8" }} className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12.5px] text-[#6B6B6B]">© {new Date().getFullYear()} Budruum Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2 py-1 border border-[#E8E8E8] rounded text-[10px] font-bold text-[#1A1F71] tracking-wider">VISA</span>
            <span className="flex items-center">
              <span className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90 inline-block" />
              <span className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 inline-block -ml-2" />
            </span>
            <span className="px-2 py-1 border border-[#E8E8E8] rounded text-[10px] font-semibold text-[#3C4043]">G Pay</span>
            <span className="px-2 py-1 border border-[#E8E8E8] rounded text-[10px] font-semibold text-[#1A1A1A]">⌘ Pay</span>
            <span className="px-2 py-1 border border-[#E8E8E8] rounded text-[10px] font-bold text-[#1A1A1A]" style={{ fontFamily: "Arial, sans-serif" }}>klarna</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[12.5px] text-[#6B6B6B] hover:text-[#A88F84] transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="text-[12.5px] text-[#6B6B6B] hover:text-[#A88F84] transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
