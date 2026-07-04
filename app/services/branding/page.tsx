"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function BrandPanel() {
  const swatches = ["#A88F84","#1A1A1A","#F2F2F2","#6B6B6B","#E8D5CF"];
  const letters = ["B","R","A","N","D"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
      {/* Logo building */}
      <div className="flex items-center gap-1">
        {letters.map((l,i)=>(
          <motion.span key={i} className="font-display text-[32px] font-light text-[#A88F84]"
            initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}
            transition={{duration:0.5, delay:0.3+i*0.12, ease:[0.22,1,0.36,1]}}>
            {l}
          </motion.span>
        ))}
      </div>
      {/* Colour swatches */}
      <div className="flex gap-3">
        {swatches.map((c,i)=>(
          <motion.div key={i} className="rounded-full border border-white/60"
            style={{backgroundColor:c, boxShadow:"0 2px 8px rgba(0,0,0,.12)"}}
            initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}}
            transition={{duration:0.4, delay:0.9+i*0.09, type:"spring", stiffness:200}}>
            <div style={{width:38,height:38,borderRadius:"50%"}}/>
          </motion.div>
        ))}
      </div>
      {/* Typography bar */}
      <motion.div className="w-full max-w-[260px]"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>
        <motion.div className="h-[2px] bg-[#A88F84] mb-3 origin-left"
          initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:0.6,delay:1.6}}/>
        <p className="text-[11px] tracking-[.2em] uppercase text-[#6B6B6B]">Typography · Colour · Identity</p>
      </motion.div>
      {/* Pulsing brand mark */}
      <motion.div className="absolute top-6 right-6 w-14 h-14 rounded-full border border-[#A88F84]/30 flex items-center justify-center"
        animate={{scale:[1,1.08,1], borderColor:["rgba(168,143,132,.3)","rgba(168,143,132,.7)","rgba(168,143,132,.3)"]}}
        transition={{duration:3, repeat:Infinity, ease:"easeInOut"}}>
        <span className="font-display text-[18px] text-[#A88F84]">B</span>
      </motion.div>
    </div>
  );
}

export default function BrandingPage() {
  return (
    <main>
      <PageHero eyebrow="Brand Identity" title="A Brand That" titleAccent="Means Something."
        subtitle="Brand identity is the single most leveraged asset your business has. We build identities that position, differentiate, and endure."
        panel={<BrandPanel />} />

      {/* 1. WHAT BRANDING MEANS */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div className="rounded-xl border border-br bg-gs flex items-center justify-center"
            style={{minHeight:400}}
            initial={{opacity:0, x:-24}} animate={{opacity:1, x:0}} transition={{duration:0.6}}>
            <svg viewBox="0 0 320 280" width="85%" xmlns="http://www.w3.org/2000/svg">
              <rect x="60" y="30" width="200" height="220" rx="12" fill="white" stroke="#E8E8E8" strokeWidth="1"/>
              <rect x="80" y="55" width="100" height="12" rx="4" fill="rgba(168,143,132,.3)"/>
              <rect x="80" y="75" width="160" height="5" rx="2" fill="#F2F2F2"/>
              <rect x="80" y="87" width="140" height="5" rx="2" fill="#F2F2F2"/>
              <rect x="80" y="99" width="150" height="5" rx="2" fill="#F2F2F2"/>
              <rect x="80" y="120" width="60" height="8" rx="3" fill="rgba(168,143,132,.2)"/>
              <rect x="80" y="136" width="160" height="4" rx="2" fill="#F2F2F2"/>
              <rect x="80" y="148" width="140" height="4" rx="2" fill="#F2F2F2"/>
              <line x1="80" y1="168" x2="240" y2="168" stroke="#E8E8E8" strokeWidth="1"/>
              <circle cx="95" cy="185" r="6" fill="#A88F84" opacity="0.4"/>
              <rect x="110" y="181" width="80" height="5" rx="2" fill="#F2F2F2"/>
              <circle cx="95" cy="202" r="6" fill="#A88F84" opacity="0.25"/>
              <rect x="110" y="198" width="100" height="5" rx="2" fill="#F2F2F2"/>
              <circle cx="95" cy="219" r="6" fill="#A88F84" opacity="0.15"/>
              <rect x="110" y="215" width="70" height="5" rx="2" fill="#F2F2F2"/>
              <rect x="60" y="30" width="3" height="220" rx="2" fill="#A88F84"/>
            </svg>
          </motion.div>
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.6, delay:0.15}}>
            <p className="eyebrow mb-5">What Branding Means</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-6">Identity. Perception.<br/>Positioning.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Branding is not a logo. It is not a colour palette or a font selection. Those are outputs — the visible results of a much deeper process that begins with understanding who you are, who you serve and how you want to be perceived in the mind of the people who matter most to your venture.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">A brand is the sum of every interaction someone has with your business. It is the language you use, the values you embody, the promise you make and — critically — whether the reality of your offering matches the expectation your brand creates. When those things are aligned, trust follows. When they are not, no amount of design investment will compensate.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">Budruum approaches branding as a positioning exercise first and a creative exercise second. Before anything is designed, the strategic foundation must be solid — because every visual decision flows from it.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="font-display text-[20px] font-light text-t1 italic leading-snug">"A brand without a position is just decoration. Decoration without purpose rarely converts."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY IT MATTERS */}
      <section className="py-24 bg-gl border-y border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Why It Matters</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-5">Weak branding costs more<br/>than it saves.</h2>
            <p className="text-[14.5px] text-t2 max-w-[520px] mx-auto leading-relaxed">The businesses that underinvest in brand identity rarely save money — they simply defer the cost. Rebranding later is almost always more expensive, more disruptive and less effective than doing it properly from the outset.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Perception precedes performance",
                body: "Clients judge your capability before they experience your service. A weak visual identity, an inconsistent tone or a poorly defined positioning signals a lack of seriousness — regardless of how strong your offer actually is."
              },
              {
                title: "Brand determines price tolerance",
                body: "Premium positioning allows premium pricing. Brands that fail to communicate quality or credibility are forced into price competition — a race to the bottom that erodes margin and attracts the wrong clients."
              },
              {
                title: "Consistency builds recall",
                body: "Businesses that apply their brand inconsistently — different tones, mismatched visuals, no clear message — are harder to remember, harder to recommend and harder to trust. Consistency compounds over time."
              }
            ].map((card, i) => (
              <motion.div key={i} className="bg-white border border-br rounded-xl p-9 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.12}}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-ac origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
                <h3 className="font-display text-[21px] font-light text-t1 mb-3">{card.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DELIVER */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="eyebrow mb-5">What We Deliver</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Everything your brand needs to operate with authority.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-8">Each deliverable is built for purpose — not produced from a template, not adapted from a generic package. Every brand we develop is specific to the client, the market and the objective.</p>
            <div className="flex flex-col divide-y divide-br">
              {[
                { num: "01", title: "Brand Direction", body: "A strategic foundation that defines your positioning, your audience, your voice and your market differentiation. This is the thinking that informs everything that follows — not produced after the visuals, but before them." },
                { num: "02", title: "Visual Identity", body: "Logomark, typography system, colour palette, iconography and supporting design elements — developed as a cohesive system, not a collection of isolated assets. Every visual element has a rationale." },
                { num: "03", title: "Positioning Clarity", body: "A defined market position, value proposition and messaging framework that articulates what you do, who you do it for and why you are the most relevant choice. Applied consistently across every touchpoint." },
                { num: "04", title: "Application Guidance", body: "Brand guidelines that equip you — and any future collaborator — to apply the identity correctly across all contexts, from digital platforms to printed materials to social presence. Confidence in consistent application." },
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-5 items-start py-6 hover:translate-x-1 transition-transform"
                  initial={{opacity:0, x:-16}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                  <span className="font-display text-[28px] font-light text-br w-8 text-right flex-shrink-0 leading-none mt-1">{item.num}</span>
                  <div>
                    <h4 className="text-[15px] font-medium text-t1 mb-1.5">{item.title}</h4>
                    <p className="text-[13.5px] text-t2 leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="sticky top-24 rounded-xl border border-br bg-gs flex items-center justify-center"
            style={{minHeight:460}}
            initial={{opacity:0, x:24}} animate={{opacity:1, x:0}} transition={{duration:0.6, delay:0.2}}>
            <svg viewBox="0 0 320 320" width="85%" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="40" width="240" height="240" rx="12" fill="white" stroke="#E8E8E8" strokeWidth="1"/>
              <rect x="60" y="60" width="80" height="80" rx="8" fill="rgba(168,143,132,.1)" stroke="rgba(168,143,132,.3)" strokeWidth="1"/>
              <text x="100" y="108" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="32" fill="#A88F84" fontWeight="300">B</text>
              <rect x="60" y="156" width="200" height="4" rx="2" fill="#E8E8E8"/>
              <rect x="60" y="170" width="180" height="3" rx="1.5" fill="#F2F2F2"/>
              <rect x="60" y="181" width="160" height="3" rx="1.5" fill="#F2F2F2"/>
              <circle cx="160" cy="220" r="6" fill="#A88F84" opacity="0.8"/>
              <circle cx="175" cy="220" r="6" fill="#1A1A1A" opacity="0.6"/>
              <circle cx="190" cy="220" r="6" fill="#F2F2F2" stroke="#E8E8E8" strokeWidth="1"/>
              <circle cx="205" cy="220" r="6" fill="#6B6B6B" opacity="0.5"/>
              <rect x="60" y="240" width="120" height="20" rx="4" fill="rgba(168,143,132,.5)"/>
              <rect x="190" y="240" width="70" height="20" rx="4" fill="#F2F2F2" stroke="#E8E8E8" strokeWidth="1"/>
              <rect x="155" y="60" width="85" height="80" rx="8" fill="#F8F8F8" stroke="#E8E8E8" strokeWidth="1"/>
              <rect x="165" y="73" width="65" height="5" rx="2" fill="#E8E8E8"/>
              <rect x="165" y="85" width="55" height="4" rx="2" fill="#F2F2F2"/>
              <rect x="165" y="95" width="60" height="4" rx="2" fill="#F2F2F2"/>
              <rect x="165" y="105" width="50" height="4" rx="2" fill="rgba(168,143,132,.2)"/>
              <rect x="165" y="115" width="55" height="4" rx="2" fill="#F2F2F2"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 4. OUR PROCESS */}
      <section className="py-24 bg-gs border-t border-br border-b">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">From blank page to complete identity.</h2>
            <p className="text-[14.5px] text-t2 max-w-[460px] mx-auto leading-relaxed">Four deliberate stages. Each one builds on the last — because brand development done properly is sequential, not simultaneous.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Discovery", desc: "We learn your business, your market, your audience and what you want to be known for. No assumptions — everything begins with listening." },
              { label: "Direction", desc: "We establish the strategic brief — positioning, tone, values and visual direction. This stage is approved before any design begins." },
              { label: "Development", desc: "We build the visual identity system — logo, colour, type, supporting elements — and refine through structured feedback rounds." },
              { label: "Delivery", desc: "Final files, brand guidelines and application assets are packaged and handed over. You leave with everything needed to operate the brand confidently." },
            ].map((step, i) => (
              <motion.div key={i} className="flex flex-col items-center text-center"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.12}}>
                <div className="w-[54px] h-[54px] rounded-full bg-white border border-br flex items-center justify-center mb-5 shadow-sm font-display text-[20px] font-light text-ac">
                  {i+1}
                </div>
                <p className="text-[10.5px] font-medium tracking-[.12em] uppercase text-t2 mb-1">Stage 0{i+1}</p>
                <h4 className="font-display text-[20px] font-light text-t1 mb-2">{step.label}</h4>
                <p className="text-[13px] text-t2 leading-relaxed max-w-[180px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
