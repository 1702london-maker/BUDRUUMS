"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function VisaPanel() {
  const stages = ["Eligibility","Business Plan","Endorsement","Application","Approval"];
  return (
    <div className="absolute inset-0 p-6 flex flex-col justify-center items-center gap-6">
      {/* Passport book */}
      <motion.div className="relative w-[120px] h-[160px] bg-[#1A1A1A] rounded-[10px] flex flex-col items-center justify-center gap-2 shadow-xl"
        initial={{rotateY:45, opacity:0}} animate={{rotateY:0, opacity:1}}
        transition={{duration:0.8, delay:0.2, ease:[0.22,1,0.36,1]}}>
        <div className="w-10 h-10 rounded-full border-2 border-[#A88F84] flex items-center justify-center">
          <span className="font-display text-[16px] text-[#A88F84]">UK</span>
        </div>
        <p className="text-[8px] tracking-[.2em] text-white/60 uppercase">Innovator Visa</p>
        {/* Stamp */}
        <motion.div className="absolute -top-2 -right-2 w-9 h-9 rounded-full border-2 border-[#A88F84] bg-white flex items-center justify-center"
          initial={{scale:0, rotate:-20}} animate={{scale:1, rotate:0}}
          transition={{delay:1.0, type:"spring", stiffness:250}}>
          <span className="text-[8px] font-bold text-[#A88F84] leading-tight text-center">✓</span>
        </motion.div>
      </motion.div>
      {/* Progress stages */}
      <div className="flex items-center gap-1 w-full justify-center">
        {stages.map((s,i)=>(
          <div key={i} className="flex items-center gap-1">
            <motion.div className="flex flex-col items-center gap-[4px]"
              initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
              transition={{delay:0.6+i*0.15}}>
              <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] ${i<4?"bg-[#A88F84] text-white":"bg-[#F2F2F2] border border-[#E8E8E8] text-[#6B6B6B]"}`}>
                {i<4?"✓":i+1}
              </div>
              <span className="text-[7px] text-[#6B6B6B] text-center w-[36px] leading-tight">{s}</span>
            </motion.div>
            {i<stages.length-1 && (
              <motion.div className="w-4 h-[1px] bg-[#A88F84] mb-3"
                initial={{scaleX:0}} animate={{scaleX:1}}
                transition={{delay:0.7+i*0.15}}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const STAGES = [
  { num:"01", title:"Eligibility Assessment",   desc:"We review your business idea, background, and readiness against the visa criteria." },
  { num:"02", title:"Business Plan Preparation", desc:"We write and structure the business plan to meet endorsing body requirements." },
  { num:"03", title:"Endorsement Support",       desc:"We prepare you for the endorsement interview and review all documentation." },
  { num:"04", title:"Application Filing",        desc:"We guide the full visa application submission and respond to any Home Office requests." },
];

export default function InnovatorVisaPage() {
  return (
    <main>
      <PageHero eyebrow="Innovator Founder Visa" title="Your Path to" titleAccent="Building in the UK."
        subtitle="Full-service UK Innovator Founder Visa support — from eligibility assessment to endorsement documentation and application filing."
        panel={<VisaPanel />} />

      <section className="py-16 bg-ac/10 border-y border-ac/20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[{v:"From £1,500",l:"Service Fee"},{v:"3–6 months",l:"Typical Timeline"},{v:"5+ years",l:"Visa Duration"},{v:"Global",l:"Applicants Supported"},{v:"Endorsed",l:"Business Required"},{v:"No cap",l:"On Investments"} ].slice(0,3).map((s,i)=>(
            <motion.div key={s.l} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:i*0.1}}>
              <div className="font-display text-[36px] font-light text-ac">{s.v}</div>
              <div className="text-[13px] text-t2 mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gl">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <p className="eyebrow mb-4">How We Support You</p>
          <h2 className="font-display text-[38px] font-light text-t1 mb-12">End-to-End Visa Support</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAGES.map((s,i)=>(
              <motion.div key={s.num} className="bg-white rounded-xl p-7 border border-br hover:border-ac/40 hover:shadow-md transition-all duration-300"
                initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:i*0.12}}>
                <div className="w-11 h-11 rounded-full bg-ac/10 border border-ac/20 flex items-center justify-center mb-5">
                  <span className="text-[12px] font-medium text-ac">{s.num}</span>
                </div>
                <h3 className="font-display text-[19px] font-medium text-t1 mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-t2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 bg-white rounded-xl p-8 border border-br max-w-[640px]">
            <h3 className="font-display text-[26px] font-light text-t1 mb-3">Start with an eligibility call</h3>
            <p className="text-[14px] text-t2 mb-6">Before any commitment, we assess your eligibility and advise on the strongest approach for your situation.</p>
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac hover:bg-ach text-white text-[13.5px] font-medium px-7 py-3 rounded transition-all">Book Assessment Call</a>
          </div>
        </div>
      </section>
      <PageCTA />
    </main>
  );
}
