"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function ConsultancyPanel() {
  const milestones = ["Ideation","Validation","Launch","Scale","Exit"];
  return (
    <div className="absolute inset-0 p-6 flex flex-col justify-between">
      <div className="flex-1 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[180px] h-[180px]" style={{overflow:"visible"}}>
          <motion.path d="M10 90 Q30 60 50 40 Q70 20 90 10"
            fill="none" stroke="#E8E8E8" strokeWidth="1" strokeDasharray="2 2"/>
          <motion.path d="M10 90 Q30 60 50 40 Q70 20 90 10"
            fill="none" stroke="#A88F84" strokeWidth="1.5"
            initial={{pathLength:0}} animate={{pathLength:1}}
            transition={{duration:1.4, delay:0.3, ease:[0.22,1,0.36,1]}}/>
          <motion.g
            initial={{x:0, y:0, opacity:0}} animate={{x:-30, y:-45, opacity:1}}
            transition={{duration:1.2, delay:0.5, ease:[0.22,1,0.36,1]}}>
            <motion.path d="M50 80 L47 90 L53 90 Z" fill="#A88F84" opacity="0.3"/>
            <motion.rect x="46" y="72" width="8" height="12" rx="3" fill="#A88F84"/>
            <motion.path d="M50 68 L46 76 L54 76 Z" fill="#1A1A1A"/>
          </motion.g>
          <motion.ellipse cx="50" cy="93" rx="3" ry="4" fill="#A88F84" opacity="0.5"
            animate={{ry:[4,6,4], opacity:[0.5,0.8,0.5]}}
            transition={{duration:0.5, repeat:Infinity}}/>
        </svg>
      </div>
      <div className="flex items-center justify-between">
        {milestones.map((m,i)=>(
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div className={`w-2 h-2 rounded-full ${i<3?"bg-[#A88F84]":"bg-[#E8E8E8]"}`}
              initial={{scale:0}} animate={{scale:1}}
              transition={{delay:0.8+i*0.15, type:"spring"}}/>
            <span className="text-[8px] text-[#6B6B6B]">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const WHAT_POINTS = [
  { title: "Structure from day one", desc: "Every business decision is made in context — not in isolation. Structure before spending." },
  { title: "Clarity before execution", desc: "We define direction, model and positioning before any execution begins. This prevents the most expensive mistakes." },
  { title: "A team across every function", desc: "Strategy, branding, legal guidance, finance, digital and operations — coordinated, not siloed." },
  { title: "Built to scale", desc: "Every decision we make is made with growth in mind. Nothing is built to be torn down and rebuilt at the next stage." },
];

const COVERS = [
  { title: "Business Direction & Idea Validation", desc: "Clarifying what the business is, whether it makes commercial sense and how it should be positioned in its market." },
  { title: "Brand Identity & Positioning", desc: "Creating a visual and verbal identity that communicates value, commands the right perception and stands out properly." },
  { title: "Company Registration Guidance", desc: "Navigating the registration process — company type, structure, director arrangements and statutory requirements." },
  { title: "Share Structure & Control", desc: "Defining how ownership is divided, how control is maintained and how the equity structure supports the business long-term." },
  { title: "Asset & Capital Planning", desc: "Understanding what the business owns, what it needs and how to plan capital contributions, protection and valuation." },
  { title: "Business Plan & Financial Structure", desc: "A professionally written business plan and financial forecast that supports the direction and makes the numbers clear." },
  { title: "Website & Digital Presence", desc: "Building a digital platform that reflects the brand and supports the business model — not just a designed page." },
  { title: "Product & Service Development", desc: "Structuring what is being sold — pricing, packaging, delivery and scalability — so the offering is commercially clear." },
  { title: "Outsourcing & Supplier Direction", desc: "Identifying the right suppliers, manufacturers and partners — and structuring those relationships for the business." },
];

const REALITY_ITEMS = [
  { title: "Spending before understanding", desc: "Capital allocated to branding, marketing or product before the business model is validated." },
  { title: "Weak company structure", desc: "Poorly designed share arrangements, unclear ownership and no control provisions that cause problems at growth." },
  { title: "No financial framework", desc: "Operating without forecasts, assumptions or cost understanding — until the cash position forces a rethink." },
  { title: "Disconnected positioning", desc: "Brand, website and messaging that do not align — because each was built by a different person without a shared brief." },
  { title: "Building to rebuild", desc: "Launching prematurely and then spending twice — once to build and once to fix what should have been right first time." },
];

const JOURNEY_STEPS = [
  { num: "Step 01", title: "The Idea", desc: "Clarifying what you are building, why it makes commercial sense and whether the opportunity is real." },
  { num: "Step 02", title: "The Direction", desc: "Understanding your market, positioning, audience and the business model that will support growth." },
  { num: "Step 03", title: "The Identity", desc: "Creating a brand that communicates value, commands the right perception and reflects the business properly." },
  { num: "Step 04", title: "The Structure", desc: "Setting up the business properly — registration, share structure, control arrangements and ownership planning." },
  { num: "Step 05", title: "The Numbers", desc: "Building a business plan and financial forecast that supports the idea and gives direction to every commercial decision." },
  { num: "Step 06", title: "The Build", desc: "Developing your website, digital platform or internal system — structured for the business, not just the design." },
  { num: "Step 07", title: "The Offering", desc: "Structuring your product or service clearly — pricing, packaging, delivery and the logic that makes it scalable." },
  { num: "Step 08", title: "The Network", desc: "Identifying suppliers, manufacturers, partners and outsourcing opportunities that support the model efficiently." },
  { num: "Step 09", title: "The Launch", desc: "Preparing everything for market entry — messaging, timing, channels, operations and the clarity that makes launch controlled." },
  { num: "Step 10", title: "The Growth", desc: "Positioning the business for structured scaling — with the systems, financials and operations already in place to support it." },
];

const SHARE_CARDS = [
  { title: "How Ownership Is Divided", desc: "Shares represent a percentage of the company. Who holds them, and in what proportion, determines who benefits from success — and who has standing to influence decisions." },
  { title: "Control vs Percentage Ownership", desc: "Owning 51% does not always mean controlling the company. Voting rights, share classes and reserved matters can give minority shareholders significant power — or protect founders from being outvoted at critical moments." },
  { title: "Asset Protection", desc: "Structuring the business correctly protects personal assets from company liabilities — a distinction that matters significantly if the business faces financial challenge or legal exposure." },
  { title: "Capital Contribution & Valuation", desc: "Understanding how capital is introduced, how it affects ownership and how early decisions around valuation shape what the business looks like to future investors or buyers." },
];

const SYSTEM_LEFT = [
  { title: "Structure & Legal", desc: "Company registration, ownership, share arrangement and control — the legal and commercial foundation." },
  { title: "Brand & Identity", desc: "How the business presents itself — visual, verbal and positional — so the right people trust it." },
  { title: "Financial Direction", desc: "Business plan, forecasting, cost structure and revenue logic — the numbers that validate the model." },
];

const SYSTEM_RIGHT = [
  { title: "Digital Presence", desc: "Website, platforms and digital tools that support the model and convert the right audience." },
  { title: "Product & Operations", desc: "What is being sold, how it is delivered, at what cost and with what margin — the commercial engine." },
  { title: "Market & Growth", desc: "Positioning, audience strategy, partnerships and the plan for entering and scaling within the market." },
];

const FOR_ITEMS = [
  { title: "First-Time Founders", desc: "Who have a strong idea but have not built a business before — and want to avoid the costly mistakes that come from learning by doing." },
  { title: "Professionals Starting a Business", desc: "Who have expertise in their field but are entering the commercial world for the first time and need the business built around them properly." },
  { title: "Investors Building Structured Ventures", desc: "Who are funding or co-founding a new business and need it built to a standard that reflects the investment and supports future capital raise." },
  { title: "Clients Relocating or Expanding", desc: "Who are entering the UK market or a new territory and need to establish a properly structured business presence from scratch." },
  { title: "Individuals Who Want Guidance Across Everything", desc: "Who do not want to manage five separate consultants, agencies and advisers — and would rather have one structured engagement that covers it all." },
];

export default function StartupConsultancyPage() {
  return (
    <main>
      <PageHero eyebrow="Startup Consultancy" title="Startup consultancy built for those who want to" titleAccent="get it right."
        subtitle="From idea to execution, Budruum provides a complete, structured pathway to building a business that is clear, controlled and commercially sound — from day one."
        panel={<ConsultancyPanel />} />

      {/* 1. WHAT THIS SERVICE REALLY IS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What This Service Really Is</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Not advice. A structured pathway to a real business.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Startup consultancy at Budruum is not a session where we listen and offer general guidance. It is structured engagement across every dimension of building a business — from choosing the right direction to creating the brand, registering the company, building the financial structure, developing the digital presence and preparing for market entry.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">We are involved where it matters. Every engagement is tailored to where the client is, how far they need to go and what they need to get there properly.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">This is a one-stop, high-level environment for clients who want their business built properly from the beginning — not reassembled later.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4">
            {WHAT_POINTS.map((p, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-6 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <div className="w-8 h-8 rounded-full bg-white border border-br flex items-center justify-center flex-shrink-0 font-display text-[14px] font-light text-ac">{i+1}</div>
                <div>
                  <h4 className="text-[14px] font-medium text-t1 mb-1">{p.title}</h4>
                  <p className="text-[13px] text-t2 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. HIGH-LEVEL OVERVIEW */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[600px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">High-Level Overview</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Every part of building a business — covered.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Budruum's startup consultancy spans every foundational area. Clients do not need to source separate providers for each function — we coordinate across all of them as a single, structured engagement.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COVERS.map((card, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%3)*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{card.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE REALITY */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">The Reality</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Most businesses are built backwards.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">The pattern is consistent: excitement drives action before structure is in place. Money is spent before the model is understood. The brand is built before the positioning is clear. By the time the problems surface, significant time and capital have already been lost.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">Budruum changes that sequencing entirely — introducing clarity before execution at every stage, so clients build with direction rather than momentum alone.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">The cost of getting it right at the beginning is a fraction of the cost of fixing it later.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-3">
            {REALITY_ITEMS.map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-5 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.4)] transition-colors"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.07}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <p className="text-[13.5px] text-t2 leading-relaxed"><strong className="text-t1 block mb-0.5">{item.title}</strong>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY — 10 STEPS */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[600px] mb-14 mx-auto text-center" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">The Journey</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Ten stages. One coherent build.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">From the first conversation about an idea to a fully structured, market-ready business — this is how Budruum takes clients from start to scale.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-6 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%5)*0.07}}>
                <p className="text-[10px] font-medium tracking-[.15em] uppercase text-ac mb-2">{step.num}</p>
                <h4 className="font-display text-[18px] font-light text-t1 mb-2">{step.title}</h4>
                <p className="text-[12px] text-t2 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OWNERSHIP & CONTROL */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Ownership & Control</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Share structure is not a legal formality. It is a business decision.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">How a company is owned — and who controls what — has lasting consequences. Most founders do not think about share structure until a dispute, a new investor or an exit forces the conversation. By that point, the damage is already done.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">Budruum introduces this thinking at the beginning, when the decisions are still clean and the options are open. We help founders understand not just how ownership is divided, but how control is maintained, how dilution works and how the structure they build today affects the business they will have in five years.</p>
            <div className="p-5 bg-gl border border-br rounded-xl">
              <p className="text-[13px] text-t2 leading-relaxed"><strong className="text-t1">Note:</strong> Budruum provides strategic guidance on share structure and ownership logic. For legally binding shareholder agreements and formal legal documents, we work alongside qualified solicitors and advise clients on when that engagement is required.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {SHARE_CARDS.map((card, i) => (
              <motion.div key={i} className="bg-gs rounded-xl p-6 border border-br hover:bg-white hover:shadow-sm transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.1}}>
                <h4 className="text-[13.5px] font-medium text-t1 mb-2">{card.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BUSINESS AS A SYSTEM */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[680px] mb-14 mx-auto text-center" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Business as a System</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Every part has to work. And they all have to work together.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">A business is not just a product or a service. It is a system — made up of structure, positioning, numbers, operations and delivery. When any one of these is weak or disconnected from the others, the whole system underperforms. Budruum ensures all parts are built in alignment from the beginning.</p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="flex flex-col gap-4">
              {SYSTEM_LEFT.map((node, i) => (
                <motion.div key={i} className="bg-white rounded-xl p-6 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all flex-1"
                  initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                  <h5 className="text-[13.5px] font-medium text-t1 mb-1">{node.title}</h5>
                  <p className="text-[12px] text-t2 leading-relaxed">{node.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div className="flex items-center justify-center"
              initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{duration:0.5, delay:0.3}}>
              <div className="w-[180px] h-[180px] rounded-full border-2 border-ac bg-white flex flex-col items-center justify-center shadow-md">
                <span className="font-display text-[22px] font-light text-t1">The Business</span>
                <span className="text-[10px] tracking-[.15em] uppercase text-ac mt-1">Budruum Aligned</span>
              </div>
            </motion.div>
            <div className="flex flex-col gap-4">
              {SYSTEM_RIGHT.map((node, i) => (
                <motion.div key={i} className="bg-white rounded-xl p-6 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all flex-1"
                  initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                  <h5 className="text-[13.5px] font-medium text-t1 mb-1">{node.title}</h5>
                  <p className="text-[12px] text-t2 leading-relaxed">{node.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="mt-12 p-6 bg-white border border-br rounded-xl text-center max-w-[680px] mx-auto"
            initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.5}}>
            <p className="font-display text-[20px] font-light text-t1 italic leading-snug">When structure, numbers, positioning, operations and delivery <em>all align</em> — the business works as a system, not a collection of parts.</p>
          </motion.div>
        </div>
      </section>

      {/* 7. WHO THIS IS FOR */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Who This Is For</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">For anyone serious about building properly.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-8">This service is not for clients who want quick answers. It is for people who understand that a business built with the right structure, clarity and commercial thinking from the beginning is worth significantly more — and costs significantly less to fix — than one built in a hurry.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["First-Time Founders","Professionals Pivoting","Investor-Backed Ventures","International Clients","Relocating Businesses"].map((tag, i) => (
                <motion.span key={i} className="text-[12px] text-ac border border-ac/30 bg-ac/5 px-3 py-1.5 rounded-full"
                  initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5+i*0.08}}>
                  {tag}
                </motion.span>
              ))}
            </div>
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all hover:opacity-90">
              Book a Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FOR_ITEMS.map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-5 bg-gs border border-br rounded-xl hover:bg-white hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.09}}>
                <div className="w-2 h-2 rounded-full bg-ac flex-shrink-0 mt-2"/>
                <div>
                  <h5 className="text-[13.5px] font-medium text-t1 mb-1">{item.title}</h5>
                  <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
