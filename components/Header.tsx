"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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

        <Link
          href="/booking"
          className="hidden lg:inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all duration-200 hover:-translate-y-px whitespace-nowrap"
        >
          Book Consultation
        </Link>

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
