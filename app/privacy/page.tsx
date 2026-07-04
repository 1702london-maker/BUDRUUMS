"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_ITEMS = [
  { id:"s1",  label:"Who We Are" },
  { id:"s2",  label:"Information We Collect" },
  { id:"s3",  label:"How We Use It" },
  { id:"s4",  label:"Legal Basis" },
  { id:"s5",  label:"Data Sharing" },
  { id:"s6",  label:"Data Retention" },
  { id:"s7",  label:"Your Rights" },
  { id:"s8",  label:"Cookies" },
  { id:"s9",  label:"Third-Party Links" },
  { id:"s10", label:"Security" },
  { id:"s11", label:"Children" },
  { id:"s12", label:"Changes" },
  { id:"s13", label:"Contact Us" },
];

export default function PrivacyPage() {
  const [active, setActive] = useState("s1");

  useEffect(() => {
    const onScroll = () => {
      let current = "s1";
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chevron = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;
  const check   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
  const shield  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

  return (
    <main>
      {/* HERO */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-[#F8F8F8] border-b border-[#E8E8E8] text-center relative overflow-hidden">
        <div style={{ position:"absolute", top:"-100px", left:"50%", transform:"translateX(-50%)", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(168,143,132,.05) 0%,transparent 65%)", pointerEvents:"none" }} />
        <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:EASE }}>Legal</motion.p>
        <motion.h1 className="font-display font-light text-[#1A1A1A]"
          style={{ fontSize:"clamp(36px,4vw,52px)", lineHeight:1.12, marginBottom:"18px" }}
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1, ease:EASE }}>
          Privacy Policy
        </motion.h1>
        <motion.p style={{ fontSize:"15px", color:"#6B6B6B", lineHeight:1.8, maxWidth:"520px", margin:"0 auto 28px" }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2, ease:EASE }}>
          Budruum is committed to handling personal information with care, transparency and respect. This policy explains what we collect, why we collect it and how it is used.
        </motion.p>
        <motion.div style={{ display:"inline-flex", alignItems:"center", gap:"22px", flexWrap:"wrap", justifyContent:"center" }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.35 }}>
          {[
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text:"Last updated: 1 January 2025" },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, text:"Jurisdiction: United Kingdom" },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text:"UK GDPR Compliant" },
          ].map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"7px", fontSize:"12.5px", color:"#6B6B6B" }}>
              <span style={{ color:"#A88F84" }}>{m.icon}</span>{m.text}
            </div>
          ))}
        </motion.div>
      </section>

      {/* BODY */}
      <div className="px-5 py-12 sm:px-8 sm:py-14 lg:px-14 lg:py-[72px] grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-[64px] items-start">

        {/* Sidebar */}
        <motion.aside className="hidden lg:block" style={{ position:"sticky", top:"90px" }}
          initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.2, ease:EASE }}>
          <div style={{ fontSize:"11px", fontWeight:500, letterSpacing:".16em", textTransform:"uppercase" as const, color:"#6B6B6B", marginBottom:"16px" }}>Contents</div>
          <div style={{ display:"flex", flexDirection:"column" as const, gap:"2px" }}>
            {NAV_ITEMS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} style={{
                display:"block", padding:"9px 14px", borderRadius:"6px", fontSize:"13px", transition:"all .2s", textDecoration:"none",
                color: active===id ? "#A88F84" : "#6B6B6B",
                background: active===id ? "#F8F8F8" : "transparent",
                borderLeft: `2px solid ${active===id ? "#A88F84" : "transparent"}`,
                fontWeight: active===id ? 500 : 400,
              }}>{label}</a>
            ))}
          </div>
        </motion.aside>

        {/* Content */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.15, ease:EASE }}>

          <Sec id="s1" num="Section 01" title="Who We Are">
            <p style={P}>Budruum Ltd ("Budruum", "we", "us" or "our") is a business consultancy registered in the United Kingdom. We provide services including business planning, brand development, financial forecasting, web and app development, product consultancy and startup support.</p>
            <p style={P}>Our registered address and company details are available upon request. For all privacy-related correspondence, please contact us using the details provided at the end of this document.</p>
            <p style={P}>Budruum acts as the data controller for personal information collected through our website, enquiry forms, booking system and direct communications.</p>
          </Sec>

          <Sec id="s2" num="Section 02" title="Information We Collect">
            <p style={P}>We collect personal information in the following ways:</p>
            <H3>Information you provide directly</H3>
            <Ul icon={chevron} items={[
              "Full name, email address and phone number submitted via our enquiry or contact forms",
              "Business or brand name, country of residence and project details shared during enquiries",
              "Consultation booking details including selected service, date and preferred time slot",
              "Payment information processed via Stripe — we do not store card details directly",
              "Communications sent to us via email, WhatsApp or iMessage",
              "Newsletter subscription requests including email address",
            ]} />
            <H3>Information collected automatically</H3>
            <Ul icon={chevron} items={[
              "Browser type, device type and operating system when visiting our website",
              "IP address and approximate geographic location",
              "Pages visited, time spent on pages and referring URLs",
              "Cookie data as described in Section 08",
            ]} />
          </Sec>

          <Sec id="s3" num="Section 03" title="How We Use Your Information">
            <p style={P}>Personal information collected by Budruum is used only for the purposes for which it was provided and for legitimate business operations. Specifically, we use your information to:</p>
            <Ul icon={check} items={[
              "Respond to enquiries and assess the suitability of a potential engagement",
              "Confirm and manage consultation bookings",
              "Process payments securely via our payment provider",
              "Deliver services agreed during onboarding",
              "Send newsletters and insights to subscribers who have opted in",
              "Improve the quality and performance of our website",
              "Comply with legal and regulatory obligations",
            ]} />
            <HL>We do not sell, rent or trade personal information to any third party for marketing purposes. <strong style={{ color:"#1A1A1A", fontStyle:"normal" }}>Your data is never used commercially beyond delivering the services you have requested.</strong></HL>
          </Sec>

          <Sec id="s4" num="Section 04" title="Legal Basis for Processing">
            <p style={P}>Under UK GDPR, we are required to identify a lawful basis for processing your personal data. Depending on the nature of your interaction with Budruum, we rely on the following legal bases:</p>
            <Ul icon={chevron} items={[
              <><strong style={{ color:"#1A1A1A" }}>Contract:</strong> Processing necessary to deliver a service you have engaged us to provide or to take steps at your request prior to entering an agreement.</>,
              <><strong style={{ color:"#1A1A1A" }}>Legitimate Interests:</strong> Processing necessary for our genuine business interests, such as responding to enquiries or improving our website, where those interests are not overridden by your rights.</>,
              <><strong style={{ color:"#1A1A1A" }}>Consent:</strong> Where you have actively opted in — for example, to receive our newsletter. You may withdraw consent at any time.</>,
              <><strong style={{ color:"#1A1A1A" }}>Legal Obligation:</strong> Where we are required to process data to comply with applicable law.</>,
            ]} />
          </Sec>

          <Sec id="s5" num="Section 05" title="Data Sharing and Disclosure">
            <p style={P}>Budruum does not share personal data with third parties except in the following limited circumstances:</p>
            <Ul icon={chevron} items={[
              <><strong style={{ color:"#1A1A1A" }}>Service Providers:</strong> Trusted third-party tools used to operate our business, including Stripe for payment processing, email delivery services and website hosting. These providers are contractually bound to handle data securely and only for the purposes we specify.</>,
              <><strong style={{ color:"#1A1A1A" }}>Legal Requirements:</strong> Where disclosure is required by law, court order or regulatory authority.</>,
              <><strong style={{ color:"#1A1A1A" }}>Business Transfers:</strong> In the unlikely event of a merger, acquisition or sale of assets, personal data may be transferred to the relevant successor entity, subject to equivalent protections.</>,
            ]} />
            <p style={P}>We do not transfer personal data outside of the United Kingdom or European Economic Area unless appropriate safeguards are in place in accordance with UK GDPR requirements.</p>
          </Sec>

          <Sec id="s6" num="Section 06" title="Data Retention">
            <p style={P}>We retain personal information only for as long as is necessary to fulfil the purposes for which it was collected, or to comply with legal, regulatory or contractual obligations.</p>
            <Ul icon={chevron} items={[
              "Enquiry data from non-proceeding contacts is deleted within 12 months of last correspondence",
              "Client records relating to completed engagements are retained for up to 6 years for accounting and legal purposes",
              "Newsletter subscriber data is retained until you unsubscribe or withdraw consent",
              "Website analytics data is retained in anonymised or aggregated form",
            ]} />
            <p style={P}>When data is no longer required, it is securely deleted or anonymised in a manner that prevents identification.</p>
          </Sec>

          <Sec id="s7" num="Section 07" title="Your Rights">
            <p style={P}>Under UK data protection law, you have the following rights in relation to your personal information:</p>
            <Ul icon={chevron} items={[
              <><strong style={{ color:"#1A1A1A" }}>Right of Access:</strong> To request a copy of the personal data we hold about you.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Rectification:</strong> To request correction of inaccurate or incomplete personal data.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Erasure:</strong> To request deletion of your personal data where there is no longer a lawful basis for its retention.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Restrict Processing:</strong> To request that we limit the use of your data in certain circumstances.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Data Portability:</strong> To receive your data in a structured, commonly used and machine-readable format.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Object:</strong> To object to processing based on legitimate interests or for direct marketing purposes.</>,
              <><strong style={{ color:"#1A1A1A" }}>Right to Withdraw Consent:</strong> Where processing is based on consent, to withdraw it at any time without affecting the lawfulness of prior processing.</>,
            ]} />
            <HL>To exercise any of these rights, please contact us at <strong style={{ color:"#1A1A1A", fontStyle:"normal" }}>booking@budruum.co.uk</strong>. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at <strong style={{ color:"#1A1A1A", fontStyle:"normal" }}>ico.org.uk</strong>.</HL>
          </Sec>

          <Sec id="s8" num="Section 08" title="Cookies">
            <p style={P}>Our website uses cookies — small text files placed on your device — to support the proper functioning of the site and to understand how visitors interact with our content.</p>
            <H3>Types of cookies we use</H3>
            <Ul icon={chevron} items={[
              <><strong style={{ color:"#1A1A1A" }}>Essential cookies:</strong> Required for the website to function correctly. These cannot be disabled.</>,
              <><strong style={{ color:"#1A1A1A" }}>Analytics cookies:</strong> Used to understand how visitors use the website, which pages are visited most and where visitors come from. Data collected is aggregated and does not identify individuals.</>,
              <><strong style={{ color:"#1A1A1A" }}>Preference cookies:</strong> Used to remember choices you have made, such as language or display settings.</>,
            ]} />
            <p style={P}>You may adjust your cookie preferences through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of the website. We do not use cookies to serve targeted advertising.</p>
          </Sec>

          <Sec id="s9" num="Section 09" title="Third-Party Links">
            <p style={P}>Our website may contain links to external websites, platforms and services operated by third parties — including social media platforms, payment processors and partner services. These links are provided for your convenience.</p>
            <p style={P}>Budruum is not responsible for the privacy practices, content or security of third-party websites. We encourage you to review the privacy policies of any external sites you visit. The presence of a link does not constitute an endorsement of the linked site or its operators.</p>
          </Sec>

          <Sec id="s10" num="Section 10" title="Security">
            <p style={P}>Budruum takes the security of personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, alteration or disclosure.</p>
            <Ul icon={shield} items={[
              "All data transmission on our website is encrypted using SSL/TLS",
              "Payment information is handled exclusively by Stripe, which is PCI-DSS certified",
              "Access to personal data within our organisation is limited to those with a legitimate need",
              "We review our security practices regularly and update them as appropriate",
            ]} />
            <p style={P}>While we take all reasonable precautions, no method of electronic transmission or storage is entirely secure. We cannot guarantee absolute security but commit to acting promptly in the event of any breach that affects your rights.</p>
          </Sec>

          <Sec id="s11" num="Section 11" title="Children's Privacy">
            <p style={P}>Our services are directed exclusively at individuals aged 18 and over. Budruum does not knowingly collect personal information from anyone under the age of 18.</p>
            <p style={P}>If you believe that a minor has submitted personal information to us without parental consent, please contact us immediately at <a href="mailto:booking@budruum.co.uk" style={{ color:"#A88F84" }}>booking@budruum.co.uk</a> and we will take appropriate steps to remove that information from our records.</p>
          </Sec>

          <Sec id="s12" num="Section 12" title="Changes to This Policy">
            <p style={P}>We may update this Privacy Policy periodically to reflect changes in our practices, legal obligations or the services we provide. When we do so, the revised version will be published on this page with an updated effective date.</p>
            <p style={P}>We encourage you to review this policy from time to time. Continued use of our website or services after any update constitutes your acceptance of the revised terms. Where changes are material, we will endeavour to notify active clients directly.</p>
            <p style={P}>This policy was last reviewed and updated on <strong style={{ color:"#1A1A1A" }}>1 January 2025</strong>.</p>
          </Sec>

          <Sec id="s13" num="Section 13" title="Contact Us" last>
            <p style={P}>If you have any questions about this Privacy Policy, wish to exercise your data rights or have a concern about how your information has been handled, please contact us using the details below. We will respond to all privacy-related enquiries within 30 days.</p>
            <div style={{ marginTop:"24px", padding:"24px 28px", background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"10px" }}>
              <h4 style={{ fontSize:"14.5px", fontWeight:500, color:"#1A1A1A", marginBottom:"14px" }}>Budruum Ltd — Privacy Enquiries</h4>
              {[
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, content:<a href="mailto:booking@budruum.co.uk" style={{ color:"#A88F84" }}>booking@budruum.co.uk</a> },
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, content:<span>United Kingdom</span> },
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, content:<span>UK ICO registration details available on request</span> },
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 15 15"/></svg>, content:<span>We respond to all enquiries within 30 calendar days</span> },
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"13.5px", color:"#6B6B6B", marginBottom: i < 3 ? "10px" : 0 }}>
                  <span style={{ color:"#A88F84", flexShrink:0 }}>{item.icon}</span>{item.content}
                </div>
              ))}
            </div>
          </Sec>

        </motion.div>
      </div>

      {/* CTA */}
      <motion.section style={{ padding:"80px 56px", background:"#F2F2F2", borderTop:"1px solid #E8E8E8", textAlign:"center" }}
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease:EASE }}>
        <p className="eyebrow">Any Questions?</p>
        <h2 className="font-display font-light" style={{ fontSize:"clamp(26px,3vw,38px)", color:"#1A1A1A", marginBottom:"12px" }}>We are always available<br/>to clarify.</h2>
        <p style={{ fontSize:"14.5px", color:"#6B6B6B", maxWidth:"420px", margin:"0 auto 32px", lineHeight:1.8 }}>If anything in this policy is unclear or you would like to discuss how your data is handled, reach out directly and we will respond personally.</p>
        <Link href="/contact" className="btn-primary">Contact Us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
      </motion.section>

      {/* Contact strip */}
      <div style={{ background:"#F8F8F8", padding:"40px 56px", borderTop:"1px solid #E8E8E8", borderBottom:"1px solid #E8E8E8", display:"flex", alignItems:"center", justifyContent:"center", gap:"56px", flexWrap:"wrap" }}>
        <ContactItem href="https://wa.me/447919643752" label="WhatsApp" sub="Chat with us instantly"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>} />
        <ContactItem href="sms:+447919643752" label="iMessage" sub="Message us on iMessage"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
        <ContactItem href="mailto:booking@budruum.co.uk" label="Email" sub="booking@budruum.co.uk"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} />
      </div>
    </main>
  );
}

/* ── helpers ─────────────────────────────────────────────── */
const P: React.CSSProperties = { fontSize:"14px", color:"#6B6B6B", lineHeight:1.85, marginBottom:"14px" };

function Sec({ id, num, title, children, last }: { id:string; num:string; title:string; children:React.ReactNode; last?:boolean }) {
  return (
    <div id={id} style={{ marginBottom:last?0:"56px", paddingBottom:last?0:"56px", borderBottom:last?"none":"1px solid #E8E8E8" }}>
      <div style={{ fontSize:"11px", fontWeight:500, letterSpacing:".16em", color:"#A88F84", textTransform:"uppercase", marginBottom:"10px" }}>{num}</div>
      <h2 className="font-display" style={{ fontSize:"clamp(22px,2.5vw,32px)", fontWeight:400, color:"#1A1A1A", lineHeight:1.25, marginBottom:"20px" }}>{title}</h2>
      {children}
    </div>
  );
}

function H3({ children }: { children:React.ReactNode }) {
  return <h3 style={{ fontSize:"15px", fontWeight:500, color:"#1A1A1A", margin:"24px 0 10px" }}>{children}</h3>;
}

function Ul({ icon, items }: { icon:React.ReactNode; items:(string|React.ReactNode)[] }) {
  return (
    <ul style={{ display:"flex", flexDirection:"column", gap:"10px", margin:"16px 0" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", fontSize:"14px", color:"#6B6B6B", lineHeight:1.7 }}>
          <span style={{ color:"#A88F84", flexShrink:0, marginTop:"3px" }}>{icon}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HL({ children }:{ children:React.ReactNode }) {
  return <div style={{ padding:"20px 24px", background:"#F8F8F8", borderLeft:"3px solid #A88F84", borderRadius:"0 8px 8px 0", fontSize:"13.5px", color:"#6B6B6B", lineHeight:1.75, margin:"20px 0", fontStyle:"italic" }}>{children}</div>;
}

function ContactItem({ href, label, sub, icon }:{ href:string; label:string; sub:string; icon:React.ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={{ display:"flex", alignItems:"center", gap:"14px", textDecoration:"none" }}>
      <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"#fff", border:"1px solid #E8E8E8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
      <div><span style={{ display:"block", fontSize:"14px", fontWeight:500, color:"#1A1A1A" }}>{label}</span><small style={{ fontSize:"12.5px", color:"#6B6B6B" }}>{sub}</small></div>
    </a>
  );
}
