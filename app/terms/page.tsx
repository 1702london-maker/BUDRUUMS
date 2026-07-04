"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_ITEMS = [
  { id:"tc0",  label:"Introduction" },
  { id:"tc1",  label:"Services" },
  { id:"tc2",  label:"Consultations" },
  { id:"tc3",  label:"Payments" },
  { id:"tc4",  label:"Client Responsibilities" },
  { id:"tc5",  label:"Revisions & Scope" },
  { id:"tc6",  label:"Delivery & Timelines" },
  { id:"tc7",  label:"Intellectual Property" },
  { id:"tc8",  label:"Confidentiality" },
  { id:"tc9",  label:"Limitation of Liability" },
  { id:"tc10", label:"Termination" },
  { id:"tc11", label:"Governing Law" },
];

export default function TermsPage() {
  const [active, setActive] = useState("tc0");

  useEffect(() => {
    const onScroll = () => {
      let current = "tc0";
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
  const warn    = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

  return (
    <main>
      {/* HERO */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-[#F8F8F8] border-b border-[#E8E8E8] text-center relative overflow-hidden">
        <div style={{ position:"absolute", top:"-100px", left:"50%", transform:"translateX(-50%)", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(168,143,132,.05) 0%,transparent 65%)", pointerEvents:"none" }} />
        <motion.p className="eyebrow" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:EASE }}>Legal</motion.p>
        <motion.h1 className="font-display font-light text-[#1A1A1A]"
          style={{ fontSize:"clamp(36px,4vw,52px)", lineHeight:1.12, marginBottom:"18px" }}
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1, ease:EASE }}>
          Terms &amp; Conditions
        </motion.h1>
        <motion.p style={{ fontSize:"15px", color:"#6B6B6B", lineHeight:1.8, maxWidth:"520px", margin:"0 auto 28px" }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2, ease:EASE }}>
          The following terms outline how Budruum works with clients, delivers services and protects both parties throughout every engagement.
        </motion.p>
        <motion.div style={{ display:"inline-flex", alignItems:"center", gap:"22px", flexWrap:"wrap", justifyContent:"center" }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5, delay:0.35 }}>
          {[
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text:"Last updated: 1 January 2025" },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, text:"Governing Law: United Kingdom" },
            { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text:"Applies to all Budruum engagements" },
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

          {/* Intro */}
          <div id="tc0" style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderLeft:"3px solid #A88F84", borderRadius:"10px", padding:"28px 32px", marginBottom:"52px" }}>
            <p style={{ fontSize:"14px", color:"#6B6B6B", lineHeight:1.85 }}>
              These Terms &amp; Conditions ("Terms") govern all services provided by <strong style={{ color:"#1A1A1A" }}>Budruum Ltd</strong> ("Budruum", "we", "us" or "our") to clients and prospective clients ("you" or "the client"). By engaging Budruum — whether through a consultation booking, project agreement, enquiry form or any written or verbal instruction to proceed — you confirm that you have read, understood and agreed to be bound by these Terms in full. If you do not agree, you should not proceed with any engagement. These Terms apply to all services unless superseded by a separate written agreement signed by both parties.
            </p>
          </div>

          <Sec id="tc1" num="Clause 01" title="Services">
            <p style={P}>Budruum provides professional consultancy, business planning, brand development, financial forecasting, web design, application development, product consultancy, social media marketing, startup support and related strategic services (collectively referred to as "Services").</p>
            <p style={P}>The specific scope of Services applicable to each client is defined through a project proposal, scope of work document, booking confirmation or written agreement shared prior to commencement. Services provided outside of an agreed scope may be subject to additional fees.</p>
            <Ul icon={chevron} items={["All services are delivered in English and conducted primarily online unless otherwise agreed in writing","Budruum reserves the right to decline any project or enquiry at its discretion without obligation to provide a reason","Budruum may engage trusted third-party specialists or subcontractors to assist in service delivery where appropriate"]} />
          </Sec>

          <Sec id="tc2" num="Clause 02" title="Consultations">
            <p style={P}>Budruum operates a paid consultation model. A consultation fee is required before any substantive project engagement begins. This ensures that both parties invest appropriately in the initial assessment before committing to a larger scope of work.</p>
            <Ul icon={check} items={["Consultation fees are payable at the time of booking and must be confirmed before a session is secured","All consultation fees are non-refundable once a booking has been confirmed, regardless of whether the client subsequently proceeds with a project","At Budruum's discretion, the consultation fee may be credited in full or in part against the cost of a subsequent project engagement","Rescheduling is permitted with a minimum of 48 hours' notice — failure to provide adequate notice may result in forfeiture of the fee","Budruum reserves the right to cancel or reschedule a consultation in exceptional circumstances, in which case a full refund or alternative date will be offered"]} />
            <HL><strong>Important:</strong> Booking a consultation does not constitute a commitment by Budruum to take on the client's project. Commencement of a project is subject to a separate written agreement.</HL>
          </Sec>

          <Sec id="tc3" num="Clause 03" title="Payments">
            <p style={P}>All project fees are agreed in writing prior to commencement. Budruum does not begin substantive project work until payment has been received and confirmed.</p>
            <H3>Payment structure</H3>
            <Ul icon={chevron} items={["Projects may require full upfront payment or staged payments at agreed milestones, as specified in the project proposal","Work on each stage or deliverable begins only after the corresponding payment has been received in cleared funds","Invoices are due within the payment period stated — typically 7 days from issue unless otherwise agreed","Budruum accepts payment via the methods specified in the invoice, which may include bank transfer or Stripe"]} />
            <H3>Late payments</H3>
            <Ul icon={chevron} items={["Late or outstanding payments will result in the suspension of work until the account is brought into good standing","Budruum reserves the right to charge interest on overdue invoices in accordance with the Late Payment of Commercial Debts (Interest) Act 1998","Delivery timelines are contingent on prompt payment — delays in payment will extend the project timeline accordingly"]} />
            <WN icon={warn}>All fees are quoted exclusive of VAT unless otherwise stated. Where applicable, VAT will be added at the prevailing rate.</WN>
          </Sec>

          <Sec id="tc4" num="Clause 04" title="Client Responsibilities">
            <p style={P}>The successful delivery of any project is a collaborative process. Budruum requires the client's active participation and cooperation throughout the engagement. By proceeding, the client agrees to the following obligations:</p>
            <Ul icon={check} items={[
              <><strong style={{ color:"#1A1A1A" }}>Accuracy of information:</strong> The client is responsible for providing complete, accurate and up-to-date information necessary for the work. Budruum cannot be held accountable for outcomes resulting from inaccurate or incomplete information supplied by the client.</>,
              <><strong style={{ color:"#1A1A1A" }}>Timely responses:</strong> The client agrees to respond to requests for feedback, approvals, content or clarification within a reasonable time — typically within five working days unless otherwise agreed. Delays in response may impact delivery timelines.</>,
              <><strong style={{ color:"#1A1A1A" }}>Stage approvals:</strong> Where work is delivered in stages, the client must formally approve each stage before the next phase begins. Approval may be given in writing via email.</>,
              <><strong style={{ color:"#1A1A1A" }}>Legal compliance:</strong> The client warrants that all content, materials and instructions provided to Budruum are lawful, do not infringe any third-party rights and comply with applicable law.</>,
              <><strong style={{ color:"#1A1A1A" }}>Designated contact:</strong> The client should provide a single authorised point of contact for communications relating to the project to avoid conflicting instructions.</>,
            ]} />
          </Sec>

          <Sec id="tc5" num="Clause 05" title="Revisions & Scope Changes">
            <p style={P}>Each project proposal or agreement will specify the number of revision rounds included within the quoted fee. Budruum will accommodate reasonable amendments within the agreed scope — however, requests that fall outside that scope will be treated as additional work.</p>
            <Ul icon={chevron} items={["Revision requests must be submitted in writing and clearly identify the specific elements to be amended","Requests that represent a substantive change in direction, concept or scope may be treated as a new brief and quoted accordingly","Additional revision rounds beyond those included in the agreement will be charged at the applicable hourly or day rate","Scope changes requested after commencement may affect the project timeline and additional costs will be agreed before work proceeds"]} />
            <HL>Budruum will always notify the client in advance if a request is considered outside the agreed scope, and no additional charges will be incurred without written agreement from both parties.</HL>
          </Sec>

          <Sec id="tc6" num="Clause 06" title="Delivery & Timelines">
            <p style={P}>Budruum will always endeavour to deliver work within the timeframes discussed and agreed at the outset of a project. However, all timelines provided are estimates and not contractual guarantees unless expressly confirmed as fixed deadlines in a written agreement.</p>
            <Ul icon={chevron} items={["Timelines are calculated based on the information available at the time of project scoping and assume prompt client participation throughout","Delays caused by late client approvals, missing content, scope changes or outstanding payments will extend the delivery date by an equivalent or greater period","Budruum will communicate any anticipated delays proactively and agree a revised timeline with the client where necessary","Force majeure events — including but not limited to illness, technical failure or events outside Budruum's reasonable control — may affect timelines without liability"]} />
          </Sec>

          <Sec id="tc7" num="Clause 07" title="Intellectual Property">
            <p style={P}>The ownership and rights to intellectual property produced during an engagement are governed as follows:</p>
            <H3>Client ownership</H3>
            <Ul icon={check} items={["Upon receipt of full and final payment for a project, all final deliverables created specifically for the client transfer fully to the client's ownership","Prior to full payment, all work in progress remains the intellectual property of Budruum"]} />
            <H3>Budruum&apos;s rights</H3>
            <Ul icon={chevron} items={["Budruum retains the right to include completed work in its portfolio, case studies and promotional materials unless the client expressly requests otherwise in writing prior to project commencement","Budruum retains ownership of any pre-existing frameworks, methodologies, tools or materials used in the delivery of services","Third-party assets used during a project (such as licensed fonts, stock imagery or software) remain subject to their respective licence terms and are not included in the transfer of ownership to the client"]} />
          </Sec>

          <Sec id="tc8" num="Clause 08" title="Confidentiality">
            <p style={P}>Both Budruum and the client acknowledge that during the course of an engagement, sensitive and proprietary information may be shared. Both parties agree to treat all such information as strictly confidential.</p>
            <Ul icon={shield} items={["Neither party shall disclose the other's confidential information to any third party without prior written consent, except as required by law","Confidential information includes business plans, financial data, client lists, strategies, pricing and any materials marked as confidential by either party","This obligation of confidentiality survives the termination of the engagement and remains in force indefinitely","Where a formal Non-Disclosure Agreement (NDA) is required by either party, this can be requested and agreed separately in writing"]} />
          </Sec>

          <Sec id="tc9" num="Clause 09" title="Limitation of Liability">
            <p style={P}>Budruum provides services with care, diligence and professional integrity. However, the nature of consultancy and creative work means that outcomes cannot always be guaranteed. The following limitations apply to the fullest extent permitted by law:</p>
            <Ul icon={chevron} items={["Budruum shall not be liable for any indirect, consequential, incidental or special losses arising from the provision of services, including but not limited to loss of profit, loss of revenue, loss of anticipated savings or business interruption","Budruum's total liability in respect of any claim arising under or in connection with an engagement shall not exceed the total fees paid by the client for the specific service giving rise to the claim","Budruum is not liable for outcomes, decisions or consequences resulting from advice given during a consultation where the client has chosen to act on that advice at their own discretion","Budruum does not warrant that services will meet any specific commercial outcome, revenue target or business result","Nothing in these Terms shall limit liability for death or personal injury caused by negligence, fraud or any other matter that cannot lawfully be excluded"]} />
            <WN icon={warn}>Clients are encouraged to conduct their own due diligence and seek independent professional advice where appropriate before making significant business decisions.</WN>
          </Sec>

          <Sec id="tc10" num="Clause 10" title="Termination">
            <p style={P}>Either party may terminate a project engagement in certain circumstances. Termination does not relieve the client of the obligation to pay for work completed prior to the date of termination.</p>
            <H3>Termination by Budruum</H3>
            <Ul icon={chevron} items={["Budruum may suspend or terminate services if the client breaches any of these Terms, fails to make payment when due, or acts in a manner that is abusive, dishonest or contrary to the working relationship","Where Budruum terminates due to client breach, all fees paid for completed work are retained and any outstanding balance remains due"]} />
            <H3>Termination by the client</H3>
            <Ul icon={chevron} items={["The client may terminate an engagement by providing written notice — however, all payments made for work already completed or in progress at the time of termination are non-refundable","Where a staged payment structure is in place, any stage payment already made is non-refundable regardless of the reason for termination","Work in progress at the time of termination will be delivered in its current state — Budruum has no obligation to complete unstarted phases following termination"]} />
          </Sec>

          <Sec id="tc11" num="Clause 11" title="Governing Law" last>
            <p style={P}>These Terms and any disputes or claims arising from or in connection with them — including disputes regarding their existence, validity or termination — shall be governed by and construed in accordance with the laws of England and Wales.</p>
            <p style={P}>Both parties agree to submit to the exclusive jurisdiction of the courts of England and Wales for the resolution of any dispute that cannot be resolved through good-faith negotiation between the parties.</p>
            <p style={P}>Budruum will always seek to resolve disputes amicably in the first instance. If you have a concern about any aspect of your engagement or these Terms, please contact us directly at <a href="mailto:booking@budruum.co.uk" style={{ color:"#A88F84" }}>booking@budruum.co.uk</a> before initiating formal proceedings.</p>
            <HL>These Terms were last reviewed and updated on <strong>1 January 2025</strong>. Budruum reserves the right to amend these Terms from time to time. The version in force at the time of each engagement shall apply.</HL>
          </Sec>

        </motion.div>
      </div>

      {/* CTA */}
      <motion.section className="bg-[#F2F2F2] border-t border-[#E8E8E8] text-center px-5 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-[80px]"
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease:EASE }}>
        <p className="eyebrow">Any Questions?</p>
        <h2 className="font-display font-light" style={{ fontSize:"clamp(26px,3vw,38px)", color:"#1A1A1A", marginBottom:"12px" }}>Questions about our terms?</h2>
        <p style={{ fontSize:"14.5px", color:"#6B6B6B", maxWidth:"400px", margin:"0 auto 32px", lineHeight:1.8 }}>If anything here requires clarification before you proceed, we are happy to discuss it directly and openly.</p>
        <Link href="/contact" className="btn-primary">Contact Us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
      </motion.section>

      {/* Contact strip */}
      <div className="bg-[#F8F8F8] border-t border-b border-[#E8E8E8] flex items-center justify-center flex-wrap gap-10 px-5 sm:px-8 lg:px-14 py-10">
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
    <div id={id} style={{ marginBottom:last?0:"52px", paddingBottom:last?0:"52px", borderBottom:last?"none":"1px solid #E8E8E8" }}>
      <div style={{ fontSize:"11px", fontWeight:500, letterSpacing:".16em", color:"#A88F84", textTransform:"uppercase", marginBottom:"10px" }}>{num}</div>
      <h2 className="font-display" style={{ fontSize:"clamp(22px,2.5vw,32px)", fontWeight:400, color:"#1A1A1A", lineHeight:1.25, marginBottom:"18px" }}>{title}</h2>
      {children}
    </div>
  );
}

function H3({ children }: { children:React.ReactNode }) {
  return <h3 style={{ fontSize:"14.5px", fontWeight:500, color:"#1A1A1A", margin:"22px 0 10px" }}>{children}</h3>;
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
  return <div style={{ padding:"18px 22px", background:"#F8F8F8", borderLeft:"3px solid #A88F84", borderRadius:"0 8px 8px 0", fontSize:"13.5px", color:"#6B6B6B", lineHeight:1.75, margin:"20px 0" }}>{children}</div>;
}

function WN({ icon, children }:{ icon:React.ReactNode; children:React.ReactNode }) {
  return (
    <div style={{ padding:"18px 22px", background:"#fdf9f8", border:"1px solid rgba(168,143,132,.25)", borderRadius:"8px", fontSize:"13.5px", color:"#6B6B6B", lineHeight:1.75, margin:"20px 0", display:"flex", gap:"12px", alignItems:"flex-start" }}>
      <span style={{ color:"#A88F84", flexShrink:0, marginTop:"1px" }}>{icon}</span>{children}
    </div>
  );
}

function ContactItem({ href, label, sub, icon }:{ href:string; label:string; sub:string; icon:React.ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={{ display:"flex", alignItems:"center", gap:"14px", textDecoration:"none" }}>
      <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"#fff", border:"1px solid #E8E8E8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
      <div><span style={{ display:"block", fontSize:"14px", fontWeight:500, color:"#1A1A1A" }}>{label}</span><small style={{ fontSize:"12.5px", color:"#6B6B6B" }}>{sub}</small></div>
    </a>
  );
}
