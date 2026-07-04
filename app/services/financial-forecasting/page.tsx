"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function ForecastPanel() {
  const points = [
    {x:8,y:72},{x:20,y:65},{x:32,y:58},{x:44,y:62},{x:56,y:45},
    {x:68,y:38},{x:80,y:28},{x:92,y:18}
  ];
  const d = points.map((p,i)=>`${i===0?"M":"L"}${p.x} ${p.y}`).join(" ");
  return (
    <div className="absolute inset-0 p-6 flex flex-col justify-between">
      <svg viewBox="0 0 100 80" className="w-full flex-1" style={{overflow:"visible"}}>
        {[20,40,60,80].map(y=>(
          <line key={y} x1="5" y1={y} x2="95" y2={y} stroke="#E8E8E8" strokeWidth="0.4"/>
        ))}
        <motion.path d={`${d} L92 80 L8 80 Z`} fill="rgba(168,143,132,.1)"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0,duration:0.4}}/>
        <motion.path d={d} fill="none" stroke="#A88F84" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{pathLength:0}} animate={{pathLength:1}}
          transition={{duration:1.4, delay:0.3, ease:[0.22,1,0.36,1]}}/>
        {points.map((p,i)=>(
          <motion.circle key={i} cx={p.x} cy={p.y} r="1.6" fill="#A88F84"
            initial={{scale:0}} animate={{scale:1}}
            style={{transformOrigin:`${p.x}px ${p.y}px`}}
            transition={{duration:0.3, delay:0.4+i*0.15, type:"spring"}}/>
        ))}
      </svg>
      <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8]">
        {[{v:"↑ 340%",l:"Revenue"},{v:"18mo",l:"Runway"},{v:"£2.4M",l:"ARR"},{v:"94%",l:"Accuracy"}].map((s,i)=>(
          <motion.div key={i} className="text-center"
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:1.5+i*0.1}}>
            <div className="text-[13px] font-medium text-[#A88F84]">{s.v}</div>
            <div className="text-[9px] text-[#6B6B6B] tracking-wide">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PILLARS = [
  { title: "Revenue Streams", desc: "Every source of income, mapped and quantified with assumptions." },
  { title: "Cost Structure", desc: "Fixed, variable and hidden costs accounted for in full." },
  { title: "Cash Flow", desc: "When money arrives and when it leaves — not just profit." },
  { title: "Profitability", desc: "Gross margin, net margin and the path to sustainable profit." },
  { title: "Assets & Liabilities", desc: "What you own and what you owe — your true financial position." },
  { title: "Growth Assumptions", desc: "The logic behind every projection, documented and defensible." },
];

const COST_GROUPS = [
  { label: "Fixed Costs", items: ["Rent & premises", "Staff salaries", "Software & subscriptions", "Insurance & professional fees"] },
  { label: "Variable Costs", items: ["Cost of goods sold", "Delivery & fulfilment", "Marketing & advertising", "Commissions & fees"] },
  { label: "Hidden Costs", items: ["Payment processing charges", "Returns & refunds", "Downtime & disruption", "Compliance & licensing"] },
];

const PROFIT_CARDS = [
  { label: "Gross Revenue", value: "£840,000", formula: "All income before any deductions", desc: "The total value of all sales made across every revenue stream before any costs are subtracted." },
  { label: "Gross Profit", value: "£520,800", formula: "Revenue minus cost of goods sold", desc: "What remains after the direct cost of delivering your product or service is deducted. Reflects production or delivery efficiency." },
  { label: "Net Profit", value: "£112,000", formula: "Gross profit minus all operating costs", desc: "What the business actually keeps after every cost has been accounted for. The number that determines financial health." },
];

const CF_ITEMS = [
  { title: "Cash Inflow", desc: "Revenue received, investment received, loans drawn down, asset sales. Everything that brings money into the business in a given period." },
  { title: "Cash Outflow", desc: "Supplier payments, wages, rent, loan repayments, tax liabilities. Every obligation that requires cash to leave the business." },
  { title: "Payment Timing", desc: "When invoices are actually paid versus when they are issued. A 60-day payment term means 60 days of gap between earning and receiving." },
  { title: "Why Profitable Businesses Fail", desc: "A business can be profitable on paper and insolvent in reality if cash timing is not managed properly. Cash flow forecasting closes that gap." },
];

const ASSET_CARDS = [
  { title: "Tangible Assets", desc: "Physical items owned by the business — equipment, vehicles, stock, fixtures, property. These appear on the balance sheet at their current value." },
  { title: "Intangible Assets", desc: "Non-physical value owned by the business — brand, intellectual property, software, contracts, goodwill. Often underrepresented but commercially significant." },
  { title: "Current Assets", desc: "Assets that will convert to cash within twelve months — debtors, prepayments, inventory held for sale. Critical for assessing short-term liquidity." },
  { title: "Liabilities", desc: "What the business owes — to suppliers, to lenders, to HMRC, to employees. Liabilities are deducted from assets to determine net worth." },
];

const TAX_CARDS = [
  { title: "VAT Basics", desc: "VAT-registered businesses must charge VAT on taxable sales and submit returns to HMRC. The standard rate is 20% — but this does not mean it is 20% profit lost." },
  { title: "Output vs Input VAT", desc: "Output VAT is the VAT you collect from customers. Input VAT is the VAT you pay to suppliers. You remit the difference to HMRC — meaning your exposure is usually lower than it appears." },
  { title: "VAT & Pricing Impact", desc: "Your pricing strategy must account for VAT from the outset — whether you absorb it or pass it on affects margin. This is a commercial decision, not just an accounting one." },
  { title: "Corporation Tax", desc: "Profit is subject to corporation tax. The rate and any available reliefs (R&D credits, capital allowances) should be factored into financial modelling from day one." },
];

const DELIVER_CARDS = [
  { title: "Revenue Model", desc: "All income streams, pricing logic and volume assumptions built into the model." },
  { title: "Cost Structure", desc: "Fixed, variable and hidden costs mapped with full operational detail." },
  { title: "Profit & Loss Statement", desc: "A complete P&L showing gross revenue, gross profit and net profit across the forecast period." },
  { title: "Cash Flow Forecast", desc: "Month-by-month cash movement showing when money arrives and when it leaves." },
  { title: "Balance Sheet Projection", desc: "Assets, liabilities and net worth tracked across the forecast timeline." },
  { title: "VAT & Tax Awareness Summary", desc: "VAT obligations and corporation tax estimates included where applicable." },
];

const SCENARIOS = [
  { label: "Best Case", desc: "Optimistic assumptions — strong market uptake, high retention, favourable costs.", color: "rgba(168,143,132,.15)" },
  { label: "Realistic Case", desc: "Grounded assumptions — what we expect given the evidence and the market.", color: "rgba(168,143,132,.08)" },
  { label: "Worst Case", desc: "Conservative assumptions — slower growth, higher costs, delayed revenue.", color: "#F8F8F8" },
];

const FF_PROCESS = [
  { num: "01", title: "Understand Your Model", desc: "We learn how your business earns — every revenue stream, price point and volume driver." },
  { num: "02", title: "Break Down Revenue Streams", desc: "We isolate each income source and apply individual pricing and volume logic to each." },
  { num: "03", title: "Identify All Costs", desc: "We map fixed, variable and hidden costs — nothing is assumed, everything is documented." },
  { num: "04", title: "Build Financial Structure", desc: "We construct the P&L, cash flow and balance sheet as connected, living models." },
  { num: "05", title: "Project Forward", desc: "We run three scenarios — best, realistic, worst — so you have a range of outcomes to plan around." },
  { num: "06", title: "Deliver and Explain", desc: "We hand over the model with a full walkthrough so you understand every number in it." },
];

export default function FinancialForecastingPage() {
  return (
    <main>
      <PageHero eyebrow="Financial Forecasting" title="Numbers That" titleAccent="Tell the Truth."
        subtitle="We build financial models that give you and your investors complete clarity — built on sound assumptions, structured for due diligence."
        panel={<ForecastPanel />} />

      {/* 1. WHAT IT ACTUALLY IS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-16">
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
              <p className="eyebrow mb-4">What It Actually Is</p>
              <h2 className="font-display text-[38px] font-light text-t1 leading-tight">A structured picture of<br/>your financial future.</h2>
            </motion.div>
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.15}}>
              <p className="text-[14.5px] text-t2 leading-relaxed mb-4">A financial forecast is not a spreadsheet of guesses. It is a structured model of how your business is expected to generate income, incur costs and produce or lose profit — built on documented assumptions that can be tested, adjusted and defended.</p>
              <p className="text-[14.5px] text-t2 leading-relaxed">The goal is not to predict the future with certainty. The goal is to give you — and any investor, lender or board member — a clear, logical view of the financial mechanics of the business under different conditions. That clarity enables better decisions.</p>
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

      {/* 2. REVENUE & INCOME */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Understanding where your<br/>money comes from.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Revenue is not one number. It is a structure — a set of income streams, each with its own pricing logic, volume driver and timing. A financial forecast models each stream individually so the total is grounded in actual commercial logic, not an optimistic single figure.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Multiple Revenue Streams", desc: "Each income source is modelled separately — product sales, subscriptions, services, licensing — and aggregated into a total revenue figure." },
              { title: "Pricing Logic", desc: "Price points are documented and justified. Whether fixed, tiered or variable — pricing assumptions underpin every revenue calculation." },
              { title: "Volume Assumptions", desc: "How many units, clients or transactions are expected in each period? Volume drivers are modelled explicitly, not assumed in aggregate." },
              { title: "Recurring vs One-Time Income", desc: "Recurring revenue (subscriptions, retainers) is treated differently to one-time income — because predictability has commercial value." },
            ].map((item, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-6 border border-br hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.08}}>
                <h4 className="text-[13.5px] font-medium text-t1 mb-2">{item.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COST STRUCTURE */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Every pound spent needs<br/>to be in the model.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Most businesses significantly underestimate their cost base — especially in the early stages. A rigorous cost model does not miss anything: fixed overhead, variable costs that scale with revenue, and the hidden costs that only emerge once the business is running.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {COST_GROUPS.map((group, i) => (
              <motion.div key={i} className="bg-gs rounded-xl p-7 border border-br"
                initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.1}}>
                <h4 className="font-display text-[20px] font-light text-t1 mb-5 pb-4 border-b border-br">{group.label}</h4>
                <ul className="space-y-3">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-[13.5px] text-t2">
                      <div className="w-1.5 h-1.5 rounded-full bg-ac flex-shrink-0"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROFIT EXPLAINED */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Profit Explained</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Gross, net and everything between.</h2>
            <p className="text-[14.5px] text-t2 max-w-[480px] mx-auto leading-relaxed">There is only one number that matters at the end — net profit. But understanding how you get there is what enables you to improve it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROFIT_CARDS.map((card, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-8 border border-br text-center hover:shadow-md transition-all"
                initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.12}}>
                <p className="text-[11px] tracking-[.15em] uppercase text-t2 mb-3">{card.label}</p>
                <div className="font-display text-[40px] font-light text-ac mb-2">{card.value}</div>
                <p className="text-[12px] font-medium text-t1 mb-3 pb-3 border-b border-br">{card.formula}</p>
                <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASH FLOW */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Profit does not mean<br/>cash is available.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Cash flow and profit are not the same thing. A business can be profitable — showing positive income over expenses — while simultaneously running out of cash to pay its obligations. The mechanism is simple: timing.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">When revenue is recognised before it is received, costs must still be paid in real time. Cash flow forecasting maps the actual movement of money — not accounting profit — so you know what is available when it matters.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">Businesses do not fail because they are unprofitable. Many fail because they run out of cash — despite being owed money they never managed to collect in time.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4">
            {CF_ITEMS.map((item, i) => (
              <motion.div key={i} className="p-6 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{item.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ASSETS & FINANCIAL POSITION */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-12">
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
              <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">What you own shapes<br/>what you are worth.</h2>
              <p className="text-[14.5px] text-t2 leading-relaxed mb-4">The balance sheet is the financial statement that most early-stage businesses ignore — and most investors immediately review. It shows what the business owns, what it owes and what is left over. That remainder is net worth.</p>
              <p className="text-[14.5px] text-t2 leading-relaxed">Understanding your balance sheet position is not just a reporting exercise. It determines how creditworthy you are, how investable you appear and whether your business is building or destroying equity over time.</p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {ASSET_CARDS.map((card, i) => (
                <motion.div key={i} className="bg-white rounded-xl p-6 border border-br hover:shadow-sm transition-all"
                  initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.08}}>
                  <h4 className="text-[13.5px] font-medium text-t1 mb-2">{card.title}</h4>
                  <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-br rounded-xl p-6 flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center px-6 py-4">
              <p className="text-[11px] tracking-[.15em] uppercase text-t2 mb-1">Total Assets</p>
              <p className="font-display text-[28px] font-light text-t1">£420,000</p>
            </div>
            <div className="text-ac font-display text-[28px]">−</div>
            <div className="text-center px-6 py-4">
              <p className="text-[11px] tracking-[.15em] uppercase text-t2 mb-1">Total Liabilities</p>
              <p className="font-display text-[28px] font-light text-t1">£185,000</p>
            </div>
            <div className="text-t2 font-display text-[28px]">=</div>
            <div className="text-center px-6 py-4 bg-[rgba(168,143,132,.06)] rounded-lg">
              <p className="text-[11px] tracking-[.15em] uppercase text-ac mb-1">Net Worth</p>
              <p className="font-display text-[28px] font-light text-ac">£235,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VAT & TAX */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Tax is not optional planning.<br/>It is financial structure.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">VAT and corporation tax are not afterthoughts. They are built into the financial model from the outset — because failing to account for tax obligations is one of the most common reasons cash flow projections fail in practice.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {TAX_CARDS.map((card, i) => (
              <motion.div key={i} className="p-7 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.08}}>
                <h4 className="font-display text-[19px] font-light text-t1 mb-3">{card.title}</h4>
                <p className="text-[13.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] text-t2 mt-6 italic">Note: Budruum provides strategic financial modelling. All tax planning and compliance should be confirmed with a qualified accountant or tax adviser.</p>
        </div>
      </section>

      {/* 8. WHAT YOU RECEIVE */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What You Receive</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">A complete financial model built around your business.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Not a template with your numbers dropped in. A model built from scratch around your specific business structure, revenue logic and cost base.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {DELIVER_CARDS.map((card, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.07}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.12)] flex items-center justify-center mb-4">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{card.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-br border border-br rounded-xl overflow-hidden">
            {SCENARIOS.map((s, i) => (
              <div key={i} className="p-7" style={{backgroundColor:s.color}}>
                <p className="text-[11px] tracking-[.15em] uppercase text-t2 mb-2">{s.label}</p>
                <p className="text-[13.5px] text-t2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY IT MATTERS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Without financial clarity,<br/>every decision is a guess.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-8">Financial forecasting is not about producing an impressive-looking document. It is about giving you the ability to make informed decisions — to know whether you can afford to hire, whether your pricing works, whether the model is viable and what needs to change if it is not.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl mb-8">
              <p className="font-display text-[20px] font-light text-t1 italic leading-snug">"Numbers do not just support the business. They define whether it works."</p>
            </div>
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-6 py-3 rounded transition-all hover:opacity-90">
              Book a Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </motion.div>
          <div className="flex flex-col gap-4">
            {[
              { title: "Pricing that does not cover costs", desc: "Many businesses discover — too late — that their pricing does not generate sufficient margin to survive. A financial model exposes this before it becomes a crisis." },
              { title: "Growth that destroys cash flow", desc: "Rapid growth increases costs before revenue catches up. Without a cash flow model, businesses can grow themselves into insolvency." },
              { title: "Investor conversations without numbers", desc: "Investors will not take a business seriously without financial projections. A model is the entry ticket to that conversation." },
              { title: "Decisions made on assumption, not evidence", desc: "Every major business decision — hiring, investment, expansion — should be tested against financial projections before it is made." },
            ].map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-6 bg-gs border border-br rounded-xl"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <div className="w-2 h-2 rounded-full bg-ac flex-shrink-0 mt-2"/>
                <div>
                  <h4 className="text-[14px] font-medium text-t1 mb-1">{item.title}</h4>
                  <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. OUR PROCESS */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-14">
          <div className="text-center max-w-[520px] mx-auto mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">From understanding to delivery.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every financial model we build follows a structured process — from learning your business to delivering a model you fully understand.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FF_PROCESS.map((step, i) => (
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
