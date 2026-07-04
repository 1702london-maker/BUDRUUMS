"use client";
import Link from "next/link";
import Image from "next/image";

const COMPANY_LINKS = [
  { label: "About",             href: "/about" },
  { label: "Portfolio",         href: "/portfolio" },
  { label: "FAQ",               href: "/faq" },
  { label: "Careers",           href: "/careers" },
  { label: "Affiliate",         href: "/affiliate" },
  { label: "Contact",           href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Brand Identity",          href: "/services/branding" },
  { label: "Business Plan",           href: "/services/business-plan" },
  { label: "Financial Forecasting",   href: "/services/financial-forecasting" },
  { label: "Web & App Development",   href: "/services/web-development" },
  { label: "Social Media Marketing",  href: "/services/social-media-marketing" },
  { label: "Innovator Visa",          href: "/services/innovator-visa" },
];

const FOUNDERS_LINKS = [
  { label: "Founder Blueprint",       href: "/services/founder-blueprint" },
  { label: "Mentorship",              href: "/services/mentorship" },
  { label: "Startup Consultancy",     href: "/start" },
  { label: "Insights",                href: "/insights" },
  { label: "Resources",               href: "/insights" },
  { label: "Book a Consultation",     href: "/booking" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #E8E8E8" }}>
      <div className="max-w-screen-2xl mx-auto px-14 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Col 1 — Brand */}
        <div className="lg:col-span-1">
          <Link href="/">
            <Image src="/logo.png" alt="Budruum" width={200} height={51} className="h-[51px] w-auto mb-4" />
          </Link>
          <p className="text-[13px] text-t2 leading-[1.7] mt-2 max-w-[220px]">
            Budruum partners with founders and growing businesses to build the strategy, structure, and assets they need to succeed.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://www.instagram.com/budruum?igsh=MWV2cjI4ajZjaDNkdQ==" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-br rounded-full flex items-center justify-center text-t2 hover:border-ac hover:text-ac transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@budruumglobal" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-br rounded-full flex items-center justify-center text-t2 hover:border-ac hover:text-ac transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Company */}
        <div>
          <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-t1 mb-5">Company</h6>
          <ul className="space-y-3">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13.5px] text-t2 hover:text-t1 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-t1 mb-5">Services</h6>
          <ul className="space-y-3">
            {SERVICE_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-t2 hover:text-t1 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Founders Corner */}
        <div>
          <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-t1 mb-5">Founders Corner</h6>
          <ul className="space-y-3">
            {FOUNDERS_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13.5px] text-t2 hover:text-t1 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5 — Newsletter (same structure as original) */}
        <div>
          <h6 className="text-[11px] font-medium tracking-[0.18em] uppercase text-t1 mb-5">Newsletter</h6>
          <p className="text-[13px] text-t2 leading-relaxed mb-4">
            Insights, strategies and updates to help your business grow.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-stretch border border-br rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 text-[13px] px-4 py-3 bg-white outline-none text-t1 placeholder:text-t2/60 min-w-0"
            />
            <button type="submit" className="px-4 bg-ac hover:bg-ach text-white transition-colors flex-shrink-0 flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom bar — copyright + payment icons + legal links */}
      <div style={{ borderTop: "1px solid #E8E8E8" }} className="max-w-screen-2xl mx-auto px-14 py-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12.5px] text-t2">© {new Date().getFullYear()} Budruum Ltd. All Rights Reserved.</p>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-2 py-1 border border-br rounded text-[10px] font-bold text-[#1A1F71] tracking-wider">VISA</span>
          <span className="flex items-center">
            <span className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90 inline-block" />
            <span className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 inline-block -ml-2" />
          </span>
          <span className="px-2 py-1 border border-br rounded text-[10px] font-semibold text-[#3C4043]">G Pay</span>
          <span className="px-2 py-1 border border-br rounded text-[10px] font-semibold text-t1">⌘ Pay</span>
          <span className="px-2 py-1 border border-br rounded text-[10px] font-bold text-t1" style={{ fontFamily: "Arial, sans-serif" }}>klarna</span>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/privacy"  className="text-[12.5px] text-t2 hover:text-t1 transition-colors">Privacy Policy</Link>
          <Link href="/terms"    className="text-[12.5px] text-t2 hover:text-t1 transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
