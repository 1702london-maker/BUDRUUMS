import Link from "next/link";

export default function PageCTA() {
  return (
    <>
      <section className="py-24 bg-t1 text-center">
        <div className="max-w-screen-2xl mx-auto px-14">
          <h2 className="font-display text-[clamp(40px,5vw,64px)] font-light text-white italic mb-5">
            Ready to build something real?
          </h2>
          <p className="text-[15px] text-white/60 max-w-[480px] mx-auto mb-9">
            Start with one focused conversation. It changes everything that follows.
          </p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all duration-200">
            Book a Consultation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>
      <div className="bg-gl border-y border-br">
        <div className="max-w-screen-2xl mx-auto px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13.5px] text-t2">
            Questions? Reach us at{" "}
            <a href="mailto:booking@budruum.co.uk" className="text-t1 font-medium border-b border-t1">booking@budruum.co.uk</a>
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[13px] text-t2">
            <span className="flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Response within 24 hours</span>
            <span className="flex items-center gap-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Available globally</span>
          </div>
        </div>
      </div>
    </>
  );
}
