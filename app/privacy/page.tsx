"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

const SECTIONS = [
  { title: "Information We Collect", body: "We collect information you provide directly — such as name, email, phone number, and business details when you complete a contact form, book a consultation, or subscribe to our newsletter. We also collect technical data via analytics tools (page views, session data) to improve site performance." },
  { title: "How We Use Your Information", body: "Your information is used to respond to enquiries, deliver services, send newsletters (with your consent), improve our website, and fulfil our legal obligations. We do not sell your data to third parties." },
  { title: "Data Retention", body: "We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by law. Client data related to completed engagements is retained for 7 years for legal and accounting purposes." },
  { title: "Your Rights", body: "Under UK GDPR, you have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. To exercise these rights, contact us at privacy@budruum.co.uk." },
  { title: "Cookies", body: "Our website uses essential cookies for functionality and optional analytics cookies to understand how visitors use our site. You can manage cookie preferences through your browser settings." },
  { title: "Contact", body: "For any privacy-related questions, contact us at privacy@budruum.co.uk or write to Budruum Ltd, London, United Kingdom." },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: January 2026. This policy explains how Budruum Ltd collects, uses, and protects your personal information." />
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
