"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function BizPlanPanel() {
  const lines = [
    { w:"70%", label:"Executive Summary" },
    { w:"55%", label:"Market Analysis" },
    { w:"80%", label:"Revenue Model" },
    { w:"60%", label:"Financial Projections" },
    { w:"50%", label:"Go-to-Market" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-8 gap-3">
      <motion.p className="text-[10px] tracking-[.2em] uppercase text-[#A88F84] mb-1"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
        Business Plan · Draft
      </motion.p>
      {lines.map((l,i)=>(
        <motion.div key={i} className="flex flex-col gap-[5px]"
          initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}}
          transition={{duration:0.45, delay:0.35+i*0.15}}>
          <span className="text-[11px] text-[#6B6B6B] tracking-wide">{l.label}</span>
          <div className="h-[6px] bg-[#E8E8E8] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#A88F84] rounded-full"
              initial={{width:0}} animate={{width:l.w}}
              transition={{duration:0.7, delay:0.55+i*0.15, ease:[0.22,1,0.36,1]}}/>
          </div>
        </motion.div>
      ))}
      <motion.div className="mt-3 flex items-center gap-2"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>
        <motion.div className="w-2 h-2 rounded-full bg-[#A88F84]"
          animate={{scale:[1,1.4,1]}} transition={{duration:1.5,repeat:Infinity}}/>
        <span className="text-[11px] text-[#A88F84] tracking-wide">Building your plan...</span>
      </motion.div>
    </div>
  );
}

const PILLARS = [
  { title: "Business Model", desc: "How the business earns, operates and delivers at its core." },
  { title: "Market Understanding", desc: "The landscape, the audience and the opportunity." },
  { title: "Revenue Direction", desc: "Where income comes from and how it grows over time." },
  { title: "Operations", desc: "What is needed to run, deliver and scale the business." },
  { title: "Growth Planning", desc: "The strategy for expansion, reach and commercial development." },
  { title: "Risk Awareness", desc: "Identifying challenges and preparing for stronger decisions." },
];

const FAILURES = [
  { title: "Too generic", body: "Copied structure, no commercial specificity. It could describe any business, not this one." },
  { title: "Written without understanding the business", body: "No clarity on how the model works or what actually drives revenue." },
  { title: "No clear revenue model", body: "Vague ideas about income with no logic explaining how the money actually flows." },
  { title: "Weak market research", body: "Surface-level observations that do not demonstrate real understanding of the audience or competitive landscape." },
  { title: "Unrealistic projections", body: "Numbers that have no grounded assumptions behind them and unravel under the first question." },
  { title: "No operational logic", body: "No explanation of how the business will actually function day to day to deliver what it promises." },
  { title: "Too much theory, not enough commercial thinking", body: "Academic framing that impresses no one who has actually run or funded a business." },
];

const BUILD_CARDS = [
  { title: "Business Model Clarity", body: "We define how the business will operate, earn, deliver and grow. No ambiguity. Every mechanism is explained so the model is fully understood — by you, by investors and by anyone who reads the plan." },
  { title: "Market & Customer Positioning", body: "We identify who the business serves, why they will buy and how the brand should position itself within its market. This is not generic research — it is specific, commercial and grounded in your actual audience." },
  { title: "Service / Product Structure", body: "We organise what you offer so it feels clear, commercial and scalable. Everything is structured so that what you sell makes sense, can be priced properly and can grow without complication." },
  { title: "Revenue Strategy", body: "We explain how money enters the business, what drives income and where growth can come from. The revenue logic is mapped clearly so projections can later be attached with proper grounding." },
  { title: "Operational Plan", body: "We show how the business will run, what is needed and how delivery will be managed. From resource requirements to process logic — the operational section proves the idea can actually function." },
  { title: "Financial Direction", body: "We align the plan with forecasts, assumptions and realistic commercial logic. The financial section is written to hold up under scrutiny — not to fill pages with aspirational numbers." },
  { title: "Risk & Growth Considerations", body: "We identify potential challenges and prepare the business for stronger decision-making. Understanding risk is not pessimism — it is what separates a plan that is taken seriously from one that is not. We also map where the real growth opportunities exist." },
];

const FOR_LIST = [
  "Startups preparing to launch and needing structured direction from the beginning",
  "Founders applying for funding who need an investment-ready document",
  "Businesses seeking bank loans, grants or sponsorship backing",
  "Companies preparing expansion plans into new markets or territories",
  "Existing businesses that need to reframe their direction with greater clarity",
  "Vision-led clients who have strong ideas but need them structured properly on paper",
];

const DELIVERS = [
  { title: "Full Written Business Plan", sub: "Complete, structured document written to professional standard" },
  { title: "Executive Summary", sub: "A concise, high-impact overview for busy stakeholders" },
  { title: "Business Model Explanation", sub: "A clear account of how the business earns and operates" },
  { title: "Market & Competitor Analysis", sub: "Research-backed understanding of your landscape and position" },
  { title: "Product or Service Structure", sub: "What you offer, how it is packaged and how it scales" },
  { title: "Marketing & Growth Strategy", sub: "How the business will reach, attract and retain its market" },
  { title: "Operations Plan", sub: "The resources, processes and structure needed to deliver" },
  { title: "Financial Assumptions Summary", sub: "The commercial logic that sits behind your numbers" },
  { title: "Risk & Opportunity Section", sub: "What could challenge the business and where the real upside lives" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery", desc: "We understand your idea, goals and current position before anything is written." },
  { num: "02", title: "Direction", desc: "We define the structure, model and commercial logic the plan will be built around." },
  { num: "03", title: "Research", desc: "We assess the market, audience, competitors and opportunities relevant to your business." },
  { num: "04", title: "Build", desc: "We write the plan with clarity, depth and strategic flow — every section intentional." },
  { num: "05", title: "Review", desc: "We refine the plan until it accurately and compellingly reflects the business." },
  { num: "06", title: "Delivery", desc: "You receive a polished, professional document that is ready for immediate use." },
];

export default function BusinessPlanPage() {
  return (
    <main>
      <PageHero eyebrow="Business Plan" title="Plans That" titleAccent="Pass Scrutiny."
        subtitle="We write investor-ready business plans that answer every question before it is asked — structured, evidenced, and built to open doors."
        panel={<BizPlanPanel />} />

      {/* 1. WHAT IT ACTUALLY IS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-16">
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
              <p className="eyebrow mb-4">What It Actually Is</p>
              <h2 className="font-display text-[38px] font-light text-t1 leading-tight">More than a document.<br/>It is a foundation.</h2>
            </motion.div>
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.15}}>
              <p className="text-[14.5px] text-t2 leading-relaxed mb-4">A proper business plan is not just pages of text. It is the foundation of decision-making. It helps you understand your model, market, pricing, operations, risks, financial direction and route to growth — all in one coherent, structured document.</p>
              <p className="text-[14.5px] text-t2 leading-relaxed">When built properly, a business plan does not just describe your idea. It stress-tests it, validates it commercially and positions it clearly for whoever needs to understand it — whether that is an investor, a lender, a partner or yourself.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-br border border-br rounded-xl overflow-hidden">
            {PILLARS.map((p, i) => (
              <motion.div key={i} className="bg-white p-8 hover:bg-gl transition-colors"
                initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4, delay:i*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{p.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY MOST PLANS FAIL */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">The Problem</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Why most business<br/>plans do not work.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-8">Most business plans are written to exist — not to actually direct a business. They are filled with borrowed language, template structures and projections that do not connect to reality. They look complete but say very little.</p>
            <div className="p-6 bg-white border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14.5px] text-t1 font-medium leading-relaxed">A business plan should not just sound good. It should make business sense.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAILURES.map((f, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-5 bg-white border border-br rounded-xl hover:border-[rgba(168,143,132,.4)] transition-colors"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.07}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <p className="text-[13.5px] text-t2 leading-relaxed"><strong className="text-t1 block mb-0.5">{f.title}</strong>{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BUILD */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[600px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What We Build</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Every component, built with intention.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">This is not a template exercise. Every section of your business plan is constructed around your specific idea, model and market — written to be read by people who know exactly what to look for.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {BUILD_CARDS.map((card, i) => (
              <motion.div key={i} className={`p-8 border border-br rounded-xl hover:shadow-md hover:border-[rgba(168,143,132,.3)] transition-all ${i === BUILD_CARDS.length - 1 ? "sm:col-span-2" : ""}`}
                initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:(i%2)*0.1}}>
                <div className="w-8 h-8 rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center mb-4">
                  <span className="text-[11px] font-medium text-ac">{String(i+1).padStart(2,"0")}</span>
                </div>
                <h4 className="font-display text-[19px] font-light text-t1 mb-3">{card.title}</h4>
                <p className="text-[13.5px] text-t2 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO THIS IS FOR */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Who This Is For</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Built for anyone who needs their idea taken seriously.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-8">Whether you are launching, raising or simply trying to think more clearly about your business — a properly built plan gives you the foundation to move forward with confidence.</p>
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all hover:opacity-90">
              Book a Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FOR_LIST.map((item, i) => (
              <motion.div key={i} className="flex items-center gap-4 p-4 bg-white border border-br rounded-xl hover:border-ac transition-colors"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.07}}>
                <div className="w-2 h-2 rounded-full bg-ac flex-shrink-0"/>
                <p className="text-[13.5px] text-t2 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT YOU RECEIVE */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What You Receive</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">A complete, polished business plan — ready to use.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every deliverable is written, structured and reviewed to a standard that reflects the quality of your business. Nothing is templated. Everything is built for your specific situation.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-px bg-br border border-br rounded-xl overflow-hidden mb-6">
            {DELIVERS.map((d, i) => (
              <motion.div key={i} className={`flex items-start gap-4 p-6 bg-white hover:bg-gl transition-colors ${i === DELIVERS.length - 1 ? "sm:col-span-2" : ""}`}
                initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4, delay:i*0.05}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.12)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h5 className="text-[13.5px] font-medium text-t1 mb-0.5">{d.title}</h5>
                  <p className="text-[12.5px] text-t2 leading-relaxed">{d.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-start gap-4 p-5 border border-br rounded-xl bg-gl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ac flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            <p className="text-[13.5px] text-t2 leading-relaxed"><strong className="text-t1">Optional add-on:</strong> Financial forecasting can be added as a separate service for clients who need full revenue, cost and cash flow projections alongside their business plan.</p>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center max-w-[520px] mx-auto mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Six stages. One clear outcome.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every business plan we build follows a structured process — so nothing important is skipped and the final document reflects the business properly.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] transition-all text-center"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.1}}>
                <div className="w-14 h-14 rounded-full bg-white border border-br flex items-center justify-center mx-auto mb-5 font-display text-[22px] font-light text-ac">
                  {step.num}
                </div>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{step.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
