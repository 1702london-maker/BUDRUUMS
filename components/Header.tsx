"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Start", href: "/start" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Referral", href: "/referral" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) setAccountOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/98 border-b border-br transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-5 sm:px-8 lg:px-14 h-[70px] max-w-screen-2xl mx-auto">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="Budruum" width={220} height={56} className="h-[56px] w-auto" priority />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-[22px]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`text-[12.5px] font-normal tracking-[0.01em] transition-colors duration-200 ${
                    pathname === n.href || pathname?.startsWith(n.href + "/")
                      ? "text-t1"
                      : "text-t2 hover:text-t1"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className="inline-flex items-center justify-center w-11 h-11 border border-br rounded-full text-t1 hover:border-ac hover:text-ac transition-colors"
              aria-label="Account"
              aria-expanded={accountOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="4" />
              </svg>
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-[52px] w-[210px] bg-white border border-br rounded shadow-sm overflow-hidden">
                <Link href="/referral-portal" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-[13px] text-t1 hover:bg-[#F8F8F8]">
                  Affiliate / Partner
                </Link>
                <Link href="/booking/portal" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-[13px] text-t1 hover:bg-[#F8F8F8] border-t border-br">
                  Client
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all duration-200 hover:-translate-y-px whitespace-nowrap"
          >
            Book Consultation
          </Link>
        </div>

        <button
          className="lg:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[2px] bg-t1 rounded transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-t1 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-t1 rounded transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden fixed inset-0 top-[70px] bg-white z-40 px-6 py-8 overflow-y-auto border-t border-br">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href} className="border-b border-br">
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[15px] text-t1"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border border-br rounded overflow-hidden">
            <Link href="/referral-portal" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-4 text-[15px] text-t1 border-b border-br">
              <span>Account</span>
              <span className="text-[12px] text-t2">Affiliate / Partner</span>
            </Link>
            <Link href="/booking/portal" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-4 text-[15px] text-t1">
              <span>Account</span>
              <span className="text-[12px] text-t2">Client</span>
            </Link>
          </div>
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-6 py-3 rounded"
          >
            Book Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
