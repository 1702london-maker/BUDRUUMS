"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

const TYPES = [
  { title: "Free Discovery Call",    duration: "30 min",   price: "Free",     desc: "A focused conversation to understand your goals and see if we're the right fit. No commitment." },
  { title: "Strategy Consultation",  duration: "60 min",   price: "£300",     desc: "A deep-dive session on a specific challenge — positioning, fundraising, GTM, or operational structure." },
  { title: "Business Planning",      duration: "90 min",   price: "£500",     desc: "A structured session to scope and begin your business plan, with a full brief prepared and agreed." },
  { title: "Full Blueprint Review",  duration: "Half-day", price: "From £750", desc: "A comprehensive review of your entire business model, brand, and financial position with actionable output." },
];

export default function BookingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Book a Consultation"
        title="One Conversation"
        titleAccent="Changes Everything."
        subtitle="Choose the session that fits where you are. All sessions are conducted by senior members of the Budruum team."
      />

      {/* Session types */}
      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="mb-12">
            <p className="eyebrow mb-4">Session Types</p>
            <h2 className="font-display text-[38px] font-light text-t1">Choose Your Session</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TYPES.map((t, i) => (
              <motion.div
                key={t.title}
                className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-t2 bg-gl px-2 py-1 rounded">{t.duration}</span>
                  <span className="font-display text-[20px] text-ac">{t.price}</span>
                </div>
                <h3 className="font-display text-[20px] font-medium text-t1 mb-3">{t.title}</h3>
                <p className="text-[13px] text-t2 leading-relaxed flex-1 mb-6">{t.desc}</p>
                <a href="https://cal.com/budruum" target="_blank" rel="noopener noreferrer"
                  className="w-full text-center bg-ac hover:bg-ach text-white text-[13px] font-medium py-3 rounded transition-all duration-200">
                  Book This Session
                </a>
              </motion.div>
            ))}
          </div>

          {/* Cal embed placeholder */}
          <motion.div
            className="bg-white rounded-xl border border-br p-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ac">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3 className="font-display text-[28px] font-light text-t1 mb-3">Book via Cal.com</h3>
            <p className="text-[14.5px] text-t2 mb-6 max-w-[400px] mx-auto">Select a time that works for you. You'll receive a confirmation and a short briefing form immediately after booking.</p>
            <a href="https://cal.com/budruum" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-t1 hover:bg-t2 text-white text-[13.5px] font-medium px-8 py-4 rounded transition-all duration-200">
              Open Booking Calendar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-14">
          <p className="eyebrow mb-4">What to Expect</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-10">Before, During & After</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "Before", title: "You Book", body: "Choose a session, pick a time, and complete a short briefing form so we come prepared. No homework needed on your end." },
              { step: "During", title: "We Talk", body: "A senior Budruum team member leads the session. We listen first, then ask the questions that reveal the real challenges and opportunities." },
              { step: "After",  title: "You Receive", body: "Within 48 hours of a Discovery Call, you'll receive a scoped proposal. Paid sessions include written notes and next steps." },
            ].map((w, i) => (
              <motion.div
                key={w.step}
                className="flex gap-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center">
                  <span className="text-[11px] font-medium text-ac tracking-wide">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-ac mb-1">{w.step}</p>
                  <h4 className="font-display text-[20px] font-medium text-t1 mb-2">{w.title}</h4>
                  <p className="text-[13.5px] text-t2 leading-relaxed">{w.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
