"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

const SECTIONS = [
  { title: "Services & Engagements", body: "All engagements begin with a signed proposal or statement of work. Services are delivered as specified in the proposal. Budruum Ltd reserves the right to decline or discontinue engagements that conflict with our values or code of conduct." },
  { title: "Payment Terms", body: "Fees are due as specified in the proposal. Standard payment terms are 50% upfront, 50% on delivery unless otherwise agreed. Late payments may incur a 5% monthly charge. All prices are exclusive of VAT unless stated." },
  { title: "Intellectual Property", body: "Upon full payment, all deliverables become the property of the client. Budruum retains the right to reference completed work in its portfolio unless the client requests otherwise in writing." },
  { title: "Confidentiality", body: "We treat all client information as strictly confidential. We do not share your business details, financial information, or strategic plans with third parties without your written consent." },
  { title: "Limitation of Liability", body: "Budruum Ltd is not liable for business decisions made based on our advice or deliverables. Our total liability in any engagement is limited to the fees paid for that engagement." },
  { title: "Governing Law", body: "These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts." },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero eyebrow="Legal" title="Terms &amp; Conditions" subtitle="Last updated: January 2026. These terms govern all engagements and use of the Budruum website." />
      <section className="py-24 bg-white">
        <div className="max-w-[720px] mx-auto px-14">
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <h2 className="font-display text-[24px] font-medium text-t1 mb-3">{s.title}</h2>
                <p className="text-[14.5px] text-t2 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
