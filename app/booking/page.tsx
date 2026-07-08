"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

/* ─── Calendar Panel ────────────────────────────────────────── */
function CalendarPanel() {
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  const booked = [3,8,11,16];
  const selected = 14;
  return (
    <div className="absolute inset-0 p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
      <motion.div className="flex items-center justify-between"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>
        <p className="font-display text-[15px] sm:text-[16px] text-[#1A1A1A]">July 2026</p>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded border border-[#E8E8E8] flex items-center justify-center text-[10px] text-[#6B6B6B]">‹</div>
          <div className="w-6 h-6 rounded border border-[#E8E8E8] flex items-center justify-center text-[10px] text-[#6B6B6B]">›</div>
        </div>
      </motion.div>
      <div className="grid grid-cols-7 gap-1">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d=>(
          <div key={d} className="text-center text-[9px] text-[#6B6B6B] font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1">
        {days.map((d,i)=>{
          const isBooked = booked.includes(d);
          const isSel = d === selected;
          return (
            <motion.div key={d}
              className={`aspect-square rounded-[5px] flex items-center justify-center text-[10px] sm:text-[11px] font-medium cursor-pointer transition-colors
                ${isSel?"bg-[#A88F84] text-white":isBooked?"bg-[#F2F2F2] text-[#6B6B6B]":"bg-white border border-[#E8E8E8] text-[#1A1A1A] hover:border-[#A88F84]"}`}
              initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}}
              transition={{duration:0.25, delay:0.3+i*0.03, type:"spring"}}>
              {d}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="flex items-center gap-3 border-t border-[#E8E8E8] pt-3"
        initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:1.2}}>
        <div className="w-2 h-2 rounded-full bg-[#A88F84]"/>
        <span className="text-[11px] text-[#1A1A1A]">Tuesday 14 Jul · 10:00 AM</span>
        <motion.span className="ml-auto text-[10px] text-[#A88F84] font-medium"
          animate={{opacity:[1,0.5,1]}} transition={{duration:1.5, repeat:Infinity}}>
          Available
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ─── Services ──────────────────────────────────────────────── */
const SERVICES = [
  { name: "Free Discovery Call",       price: "Free",          note: "5 or 15 min intro, no payment needed" },
  { name: "Strategy Consultation",     price: "£300",          note: "60-minute focused session" },
  { name: "Business Planning Session", price: "£500",          note: "90-minute deep-dive" },
  { name: "Business Plan Writing",     price: "From £2,000",   note: "Investor & visa-ready business plans" },
  { name: "Financial Forecasting",     price: "From £3,500",   note: "Investor-ready projections & models" },
  { name: "Branding & Identity",       price: "From £1,000",   note: "Brand launch or rebrand" },
  { name: "Startup Consultancy",       price: "From £2,500",   note: "Early-stage structure & direction" },
  { name: "Website Development",       price: "From £5,000",   note: "Professional web presence" },
  { name: "Mentorship",                price: "£6,200",        note: "Ongoing strategic guidance" },
  { name: "Full Founder Package",      price: "From £7,500",   note: "Complete setup — brand, digital & ops" },
  { name: "Full Build Consultation",   price: "Custom",        note: "End-to-end project review & roadmap" },
];

const TIMES = ["09:00 AM","10:00 AM","11:00 AM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  return { daysInMonth, offset };
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type FormState = { fname:string; lname:string; email:string; phone:string; biz:string; msg:string };

/* ─── Page ──────────────────────────────────────────────────── */
export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selSvc, setSelSvc] = useState(0);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(6);
  const [selDay, setSelDay] = useState<number|null>(null);
  const [selTime, setSelTime] = useState("11:00 AM");
  const [form, setForm] = useState<FormState>({ fname:"", lname:"", email:"", phone:"", biz:"", msg:"" });
  const [submitting, setSubmitting] = useState(false);

  const svc = SERVICES[selSvc];

  function goToStep(n: number) {
    setStep(n);
    setTimeout(() => {
      document.getElementById("booking-flow")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }, 50);
  }

  function changeMonth(dir: number) {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setCalMonth(m); setCalYear(y); setSelDay(null);
  }

  const { daysInMonth, offset } = getMonthDays(calYear, calMonth);
  const today = new Date();

  function isDayDisabled(d: number) {
    const date = new Date(calYear, calMonth, d);
    const dow = date.getDay();
    return date < today || dow === 0 || dow === 6;
  }

  const selDateStr = selDay ? `${selDay} ${MONTH_NAMES[calMonth]} ${calYear}` : "";

  const stepLabels = ["Select Service","Date & Time","Your Details","Confirmation"];

  async function submitBooking() {
    setSubmitting(true);
    try {
      await fetch("/api/booking", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          name: `${form.fname} ${form.lname}`.trim(),
          email: form.email, phone: form.phone,
          service: svc.name, stage: form.biz, message: form.msg,
          date: selDateStr, time: selTime,
        }),
      });
    } catch { /* proceed */ }
    setSubmitting(false);
    goToStep(4);
  }

  const ArrowRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
  const ArrowLeft = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );

  return (
    <main>
      <PageHero
        eyebrow="Book a Session"
        title="Start with the right"
        titleAccent="conversation."
        subtitle="Choose your service, pick a time that works, and we'll confirm within 24 hours."
        panel={<CalendarPanel />}
      />

      {/* ── Service Cards ─────────────────────────────────────── */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px]">
        <div className="text-center mb-10">
          <p className="eyebrow">Services</p>
          <h2 className="font-display font-light text-t1" style={{fontSize:"clamp(32px,4vw,46px)", marginBottom:"10px"}}>
            Choose the service you need.
          </h2>
          <p className="text-t2 text-[14.5px] max-w-[460px] mx-auto">
            Select a service below to start your booking. Prices are listed so you know exactly what to expect.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
          {SERVICES.map((s, i) => (
            <motion.div key={i}
              initial={{opacity:0, y:16}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.05}}
              onClick={() => { setSelSvc(i); document.getElementById("booking-flow")?.scrollIntoView({behavior:"smooth"}); }}
              style={{
                padding:"20px 22px",
                border:`1px solid ${selSvc===i?"#A88F84":"#E8E8E8"}`,
                borderTop:`2px solid ${selSvc===i?"#A88F84":"transparent"}`,
                borderRadius:"2px", cursor:"pointer",
                background: selSvc===i ? "rgba(168,143,132,.04)" : "#fff",
                transition:"all .2s",
              }}>
              <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"8px", marginBottom:"6px"}}>
                <h3 style={{fontSize:"13.5px", fontWeight:600, color:"#1A1A1A", lineHeight:1.35}}>{s.name}</h3>
                <span style={{fontSize:"13px", fontWeight:700, color:"#A88F84", whiteSpace:"nowrap", flexShrink:0}}>{s.price}</span>
              </div>
              <p style={{fontSize:"11.5px", color:"#6B6B6B", lineHeight:1.5, margin:0}}>{s.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Booking Flow ──────────────────────────────────────── */}
      <section id="booking-flow" className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-[#F8F8F8]">
        <div className="text-center mb-10">
          <p className="eyebrow">Book Your Session</p>
          <h2 className="font-display font-light text-t1" style={{fontSize:"clamp(30px,4vw,44px)"}}>Complete your booking below.</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 max-w-[900px] mx-auto">

          {/* Sidebar */}
          <div className="hidden lg:block" style={{background:"#fff", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"28px", height:"fit-content"}}>
            <p style={{fontSize:"11px", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"#6B6B6B", marginBottom:"20px"}}>Steps</p>
            {stepLabels.map((label, i) => {
              const n = i+1;
              const isActive = step === n;
              const isDone = step > n;
              return (
                <div key={n} style={{display:"flex", alignItems:"center", gap:"12px", padding:"12px 0", borderBottom:i<3?"1px solid #E8E8E8":"none", cursor:isDone?"pointer":"default"}}
                  onClick={() => isDone && goToStep(n)}>
                  <div style={{
                    width:"26px", height:"26px", borderRadius:"50%", flexShrink:0,
                    background: isActive?"#A88F84": isDone?"#1A1A1A":"transparent",
                    border: isActive?"1.5px solid #A88F84": isDone?"1.5px solid #1A1A1A":"1.5px solid #E8E8E8",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"11px", fontWeight:500,
                    color: isActive||isDone?"#fff":"#6B6B6B",
                  }}>
                    {isDone ? "✓" : n}
                  </div>
                  <span style={{fontSize:"13px", color:isActive?"#1A1A1A":"#6B6B6B", fontWeight:isActive?500:400}}>{label}</span>
                </div>
              );
            })}
            {/* Selected service summary */}
            {step > 1 && (
              <div style={{marginTop:"20px", padding:"12px", background:"#F8F8F8", borderRadius:"4px"}}>
                <p style={{fontSize:"10px", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"#A88F84", marginBottom:"4px"}}>Selected</p>
                <p style={{fontSize:"12.5px", fontWeight:500, color:"#1A1A1A", marginBottom:"2px"}}>{svc.name}</p>
                <p style={{fontSize:"12px", color:"#6B6B6B"}}>{svc.price}</p>
              </div>
            )}
          </div>

          {/* Panel */}
          <div style={{background:"#fff", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"36px"}}>
            <AnimatePresence mode="wait">

              {/* STEP 1 — Select Service */}
              {step === 1 && (
                <motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <h3 className="font-display" style={{fontSize:"26px", fontWeight:400, marginBottom:"6px"}}>Select your service</h3>
                  <p style={{fontSize:"13.5px", color:"#6B6B6B", marginBottom:"24px"}}>Choose the service that fits what you need right now.</p>
                  <div style={{display:"flex", flexDirection:"column", gap:"8px", marginBottom:"28px"}}>
                    {SERVICES.map((s, i) => (
                      <div key={i} onClick={() => setSelSvc(i)}
                        style={{
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                          padding:"13px 16px", border:`1.5px solid ${selSvc===i?"#A88F84":"#E8E8E8"}`,
                          borderRadius:"4px", cursor:"pointer", transition:"all .15s",
                          background: selSvc===i ? "rgba(168,143,132,.04)" : "#fff",
                        }}>
                        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                          <div style={{
                            width:"16px", height:"16px", borderRadius:"50%", flexShrink:0,
                            border:`2px solid ${selSvc===i?"#A88F84":"#D0D0D0"}`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }}>
                            {selSvc===i && <div style={{width:"7px", height:"7px", borderRadius:"50%", background:"#A88F84"}}/>}
                          </div>
                          <div>
                            <div style={{fontSize:"13.5px", fontWeight:500, color:"#1A1A1A"}}>{s.name}</div>
                            <div style={{fontSize:"11.5px", color:"#6B6B6B"}}>{s.note}</div>
                          </div>
                        </div>
                        <div style={{fontSize:"13.5px", fontWeight:600, color:"#A88F84", flexShrink:0, marginLeft:"12px"}}>{s.price}</div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{width:"100%", justifyContent:"center", padding:"13px"}} onClick={() => goToStep(2)}>
                    Continue <ArrowRight />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Date & Time */}
              {step === 2 && (
                <motion.div key="s2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <h3 className="font-display" style={{fontSize:"26px", fontWeight:400, marginBottom:"6px"}}>Select date &amp; time</h3>
                  <p style={{fontSize:"13.5px", color:"#6B6B6B", marginBottom:"24px"}}>Pick a weekday that works for you.</p>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px"}}>
                    <button onClick={() => changeMonth(-1)} style={{background:"none", border:"1px solid #E8E8E8", width:"30px", height:"30px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6B6B6B"}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span className="font-display" style={{fontSize:"18px", fontWeight:400}}>{MONTH_NAMES[calMonth]} {calYear}</span>
                    <button onClick={() => changeMonth(1)} style={{background:"none", border:"1px solid #E8E8E8", width:"30px", height:"30px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6B6B6B"}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"3px", marginBottom:"20px"}}>
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
                      <div key={d} style={{textAlign:"center", fontSize:"10px", fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:"#6B6B6B", padding:"6px 0"}}>{d}</div>
                    ))}
                    {Array.from({length:offset}).map((_,i)=><div key={`e${i}`}/>)}
                    {Array.from({length:daysInMonth}).map((_,i)=>{
                      const d = i+1;
                      const disabled = isDayDisabled(d);
                      const isSel = selDay === d;
                      return (
                        <div key={d} onClick={() => !disabled && setSelDay(d)}
                          style={{
                            textAlign:"center", padding:"9px 4px", fontSize:"13px",
                            borderRadius:"4px", cursor:disabled?"not-allowed":"pointer",
                            background:isSel?"#A88F84":"transparent",
                            color:isSel?"#fff":disabled?"#D0D0D0":"#1A1A1A",
                            transition:"all .15s",
                          }}>
                          {d}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"6px", marginBottom:"28px"}}>
                    {TIMES.map(t=>(
                      <div key={t} onClick={() => setSelTime(t)}
                        style={{
                          padding:"9px 6px", border:`1px solid ${selTime===t?"#A88F84":"#E8E8E8"}`,
                          borderRadius:"4px", fontSize:"12.5px", textAlign:"center", cursor:"pointer",
                          background:selTime===t?"#A88F84":"#fff",
                          color:selTime===t?"#fff":"#1A1A1A", transition:"all .15s",
                        }}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={() => goToStep(1)} style={{background:"none", border:"1.5px solid #E8E8E8", color:"#6B6B6B", padding:"11px 18px", borderRadius:"4px", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"6px", cursor:"pointer"}}><ArrowLeft/> Back</button>
                    <button className="btn-primary" style={{flex:1, justifyContent:"center", padding:"13px"}} onClick={() => selDay && goToStep(3)} disabled={!selDay}>
                      Continue <ArrowRight/>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Details */}
              {step === 3 && (
                <motion.div key="s3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <h3 className="font-display" style={{fontSize:"26px", fontWeight:400, marginBottom:"6px"}}>Your details</h3>
                  <p style={{fontSize:"13.5px", color:"#6B6B6B", marginBottom:"24px"}}>Tell us about yourself so we can prepare for your session.</p>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px"}}>
                    <div>
                      <label style={{display:"block", fontSize:"12px", fontWeight:600, marginBottom:"6px"}}>First Name</label>
                      <input type="text" placeholder="First name" value={form.fname}
                        onChange={e=>setForm(f=>({...f,fname:e.target.value}))}
                        style={{width:"100%", padding:"10px 13px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"13.5px", outline:"none", fontFamily:"inherit"}}/>
                    </div>
                    <div>
                      <label style={{display:"block", fontSize:"12px", fontWeight:600, marginBottom:"6px"}}>Last Name</label>
                      <input type="text" placeholder="Last name" value={form.lname}
                        onChange={e=>setForm(f=>({...f,lname:e.target.value}))}
                        style={{width:"100%", padding:"10px 13px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"13.5px", outline:"none", fontFamily:"inherit"}}/>
                    </div>
                  </div>
                  {[
                    {label:"Email Address", key:"email", type:"email", ph:"your@email.com"},
                    {label:"Phone Number", key:"phone", type:"tel", ph:"+44 7000 000000"},
                    {label:"Business / Project Name (optional)", key:"biz", type:"text", ph:"Your business or project"},
                  ].map(f=>(
                    <div key={f.key} style={{marginBottom:"14px"}}>
                      <label style={{display:"block", fontSize:"12px", fontWeight:600, marginBottom:"6px"}}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph} value={form[f.key as keyof FormState]}
                        onChange={e=>setForm(s=>({...s,[f.key]:e.target.value}))}
                        style={{width:"100%", padding:"10px 13px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"13.5px", outline:"none", fontFamily:"inherit"}}/>
                    </div>
                  ))}
                  <div style={{marginBottom:"24px"}}>
                    <label style={{display:"block", fontSize:"12px", fontWeight:600, marginBottom:"6px"}}>What would you like to discuss? (optional)</label>
                    <textarea placeholder="A brief overview of what you need help with…" value={form.msg}
                      onChange={e=>setForm(f=>({...f,msg:e.target.value}))}
                      style={{width:"100%", padding:"10px 13px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"13.5px", outline:"none", fontFamily:"inherit", resize:"vertical", minHeight:"80px"}}/>
                  </div>
                  <div style={{display:"flex", gap:"10px"}}>
                    <button onClick={() => goToStep(2)} style={{background:"none", border:"1.5px solid #E8E8E8", color:"#6B6B6B", padding:"11px 18px", borderRadius:"4px", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"6px", cursor:"pointer"}}><ArrowLeft/> Back</button>
                    <button className="btn-primary" style={{flex:1, justifyContent:"center", padding:"13px"}}
                      onClick={submitBooking}
                      disabled={!form.fname || !form.email || !form.phone || submitting}>
                      {submitting ? "Submitting…" : "Confirm Booking"} {!submitting && <ArrowRight/>}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Confirmation */}
              {step === 4 && (
                <motion.div key="s4" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.35}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{width:"60px", height:"60px", background:"#f0faf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px"}}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2d9a5a" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 className="font-display" style={{fontSize:"30px", fontWeight:400, marginBottom:"8px"}}>Request Received</h3>
                    <p style={{fontSize:"13.5px", color:"#6B6B6B", maxWidth:"360px", margin:"0 auto 24px", lineHeight:1.75}}>
                      We will review your request and confirm within 24 hours. A confirmation email is on its way to {form.email}.
                    </p>
                    <div style={{background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"18px", textAlign:"left", marginBottom:"24px"}}>
                      {[
                        {label:"Service", val:svc.name},
                        {label:"Price", val:svc.price},
                        {label:"Date", val:selDateStr || "To be confirmed"},
                        {label:"Time", val:selTime},
                        {label:"Name", val:`${form.fname} ${form.lname}`.trim()},
                      ].map((row,i)=>(
                        <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:i<4?"1px solid #E8E8E8":"none", fontSize:"13px"}}>
                          <span style={{color:"#6B6B6B"}}>{row.label}</span>
                          <span style={{fontWeight:500}}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn-primary" style={{justifyContent:"center"}}
                      onClick={() => { setStep(1); setSelDay(null); setForm({fname:"",lname:"",email:"",phone:"",biz:"",msg:""}); }}>
                      Book Another Session
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Help ──────────────────────────────────────────────── */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[80px] items-center max-w-[1100px] mx-auto">
          <div>
            <h2 className="font-display font-light text-t1" style={{fontSize:"clamp(32px,4vw,44px)", marginBottom:"14px"}}>
              Not sure which service is right for you?
            </h2>
            <p style={{fontSize:"14.5px", color:"#6B6B6B", lineHeight:1.8}}>
              Reach out and we will help you decide. Book a Free Discovery Call or message us directly — we would rather have a quick conversation than have you choose the wrong thing.
            </p>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
            {[
              {icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="#A88F84"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, label:"WhatsApp", sub:"Message us — we respond fast", href:"https://wa.me/447919643752"},
              {icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email", sub:"booking@budruum.co.uk", href:"mailto:booking@budruum.co.uk"},
            ].map((c,i)=>(
              <a key={i} href={c.href} target={c.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{display:"flex", alignItems:"center", gap:"14px", padding:"18px 20px", background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", textDecoration:"none"}}>
                <div style={{width:"36px", height:"36px", background:"#fff", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:"1px solid #E8E8E8"}}>{c.icon}</div>
                <div>
                  <h5 style={{fontSize:"13.5px", fontWeight:600, marginBottom:"2px", color:"#1A1A1A"}}>{c.label}</h5>
                  <p style={{fontSize:"12px", color:"#6B6B6B", margin:0}}>{c.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
