"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

/* ─── Calendar Panel (hero animation) ─────────────────────── */
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

/* ─── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  { name: "Free Discovery Call",      dur: "5 or 15 minutes · No payment", price: "Free",    isFree: true },
  { name: "Strategy Consultation",    dur: "60 minutes",                   price: "£300",   isFree: false },
  { name: "Business Planning Session",dur: "90 minutes",                   price: "£500",   isFree: false },
  { name: "Full Build Consultation",  dur: "Custom",                       price: "Custom", isFree: false },
];

const TIMES = ["09:00 AM","10:00 AM","11:00 AM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];

const OPT_CARDS = [
  {
    num:"00", tag:"Free", tagFree:true, title:"Free Discovery Call", price:"Free",
    items:["Quick intro or general question (5 min)","Service-specific discovery (15 min)","No credit card needed","We'll confirm within 24 hours"],
  },
  {
    num:"01", tag:"Most Popular", tagFree:false, title:"Strategy Consultation", price:"£300 / 60 min",
    items:["60-minute private session","Business idea review","Direction and positioning","Practical next steps"],
  },
  {
    num:"02", tag:null, tagFree:false, title:"Business Planning Session", price:"£500 / session",
    items:["Business model review","Planning support","Financial direction","Growth recommendations"],
  },
  {
    num:"03", tag:null, tagFree:false, title:"Full Build Consultation", price:"Custom / proposal",
    items:["End-to-end project review","Brand, digital & operational direction","Implementation roadmap","Custom proposal after consultation"],
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon-based offset
  return { daysInMonth, offset };
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ─── Pay Button ────────────────────────────────────────────── */
type FormState = { fname:string; lname:string; email:string; phone:string; biz:string; msg:string };
type SvcType = { name:string; dur:string; price:string; isFree:boolean };

function PayButton({ svc, form, selDateStr, selTime, goToStep }: {
  svc: SvcType; form: FormState; selDateStr: string; selTime: string; goToStep: (n:number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    // Custom quote — just confirm, no Stripe
    if (svc.price === "Custom") {
      try {
        await fetch("/api/booking", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name:`${form.fname} ${form.lname}`.trim(), email:form.email, phone:form.phone, service:svc.name, stage:form.biz, message:form.msg, date:selDateStr, time:selTime }),
        });
      } catch { /* proceed */ }
      goToStep(5);
      return;
    }
    // Free — confirm immediately
    if (svc.isFree) {
      try {
        await fetch("/api/booking", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name:`${form.fname} ${form.lname}`.trim(), email:form.email, phone:form.phone, service:svc.name, stage:form.biz, message:form.msg, date:selDateStr, time:selTime }),
        });
      } catch { /* proceed */ }
      goToStep(5);
      return;
    }
    // Paid — redirect to Stripe Checkout
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service:svc.name, name:`${form.fname} ${form.lname}`.trim(), email:form.email, phone:form.phone, biz:form.biz, msg:form.msg, date:selDateStr, time:selTime }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else setError("Could not start payment. Please try again or contact us.");
    } catch {
      setError("Could not start payment. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ flex:1 }}>
      <button className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"14px" }}
        onClick={handleClick} disabled={loading}>
        {loading ? "Redirecting to payment…" : svc.isFree ? "Confirm Booking" : svc.price === "Custom" ? "Request Consultation" : "Proceed to Payment"}
        {!loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>}
      </button>
      {error && <p style={{ fontSize:"12.5px", color:"#e53e3e", marginTop:"8px", textAlign:"center" }}>{error}</p>}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selSvc, setSelSvc] = useState(1); // index into SERVICES
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(6); // 0-based, 6 = July
  const [selDay, setSelDay] = useState<number|null>(null);
  const [selTime, setSelTime] = useState("11:00 AM");
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", biz:"", msg:"" });

  const svc = SERVICES[selSvc];

  function goToStep(n: number) {
    setStep(n);
    setTimeout(() => {
      document.getElementById("booking-flow")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function changeMonth(dir: number) {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setCalMonth(m);
    setCalYear(y);
    setSelDay(null);
  }

  const { daysInMonth, offset } = getMonthDays(calYear, calMonth);
  const today = new Date();

  function isDayDisabled(d: number) {
    const date = new Date(calYear, calMonth, d);
    const dow = date.getDay(); // 0=Sun, 6=Sat
    return date < today || dow === 0 || dow === 6;
  }

  const selDateStr = selDay
    ? `${selDay} ${MONTH_NAMES[calMonth]} ${calYear}`
    : "—";

  const stepLabels = ["Select Service","Select Date & Time","Your Details","Payment","Confirmation"];

  return (
    <main>
      <PageHero
        eyebrow="Book a Session"
        title="Start with the right"
        titleAccent="conversation."
        subtitle="Choose your consultation type, select a time that works, and confirm your session below."
        panel={<CalendarPanel />}
      />

      {/* ── Consultation Options ──────────────────────────────── */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px]">
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <p className="eyebrow">Consultation Options</p>
          <h2 className="font-display font-light text-t1" style={{ fontSize:"clamp(34px,4vw,48px)", marginBottom:"12px" }}>
            Choose the right session for your stage.
          </h2>
          <p className="text-t2" style={{ fontSize:"15px", maxWidth:"480px", margin:"0 auto" }}>
            Every consultation fee can be credited toward your project if you decide to proceed with Budruum.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
          {OPT_CARDS.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:i*0.1 }}
              onClick={() => { setSelSvc(i); goToStep(1); document.getElementById("booking-flow")?.scrollIntoView({ behavior:"smooth" }); }}
              style={{
                padding:"44px 36px", border:`1px solid #E8E8E8`,
                borderTop:`3px solid ${selSvc===i?"#A88F84":"transparent"}`,
                borderRadius:"2px", position:"relative", cursor:"pointer",
                boxShadow: selSvc===i ? "0 8px 32px rgba(0,0,0,.08)" : "none",
                transform: selSvc===i ? "translateY(-3px)" : "none",
                transition:"all .3s",
              }}>
              {c.tag && (
                <span style={{ position:"absolute", top:"20px", right:"20px", background:"#A88F84", color:"#fff", fontSize:"11px", fontWeight:500, padding:"4px 12px", borderRadius:"20px", letterSpacing:".06em", textTransform:"uppercase" }}>
                  {c.tag}
                </span>
              )}
              <div className="font-display" style={{ fontSize:"44px", fontWeight:300, color:"#F2F2F2", marginBottom:"16px", lineHeight:1 }}>{c.num}</div>
              <h3 className="font-display" style={{ fontSize:"24px", fontWeight:400, marginBottom:"8px" }}>{c.title}</h3>
              <div style={{ fontSize:"20px", fontWeight:500, marginBottom:"20px", color:"#1A1A1A" }}>{c.price}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {c.items.map((item,j)=>(
                  <div key={j} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"13px", color:"#6B6B6B" }}>
                    <span style={{ color:"#A88F84", flexShrink:0 }}><CheckIcon /></span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign:"center", fontSize:"13px", color:"#6B6B6B", padding:"16px", background:"#F8F8F8", borderRadius:"4px", border:"1px solid #E8E8E8" }}>
          <strong style={{ color:"#1A1A1A" }}>Your consultation fee is deducted from your project</strong> if you proceed with Budruum.
        </div>
      </section>

      {/* ── Booking Flow ──────────────────────────────────────── */}
      <section id="booking-flow" className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-[#F8F8F8]">
        <div style={{ textAlign:"center", marginBottom:"48px" }}>
          <p className="eyebrow">Book Your Session</p>
          <h2 className="font-display font-light text-t1" style={{ fontSize:"clamp(34px,4vw,48px)" }}>Complete your booking below.</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 max-w-[960px] mx-auto">

          {/* Steps sidebar — hidden on mobile */}
          <div className="hidden lg:block" style={{ background:"#fff", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"32px", height:"fit-content" }}>
            <p style={{ fontSize:"13px", fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:"#6B6B6B", marginBottom:"24px" }}>Booking Steps</p>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {stepLabels.map((label, i) => {
                const n = i + 1;
                const isActive = step === n;
                const isDone = step > n;
                return (
                  <div key={n} style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 0", borderBottom: i<4?"1px solid #E8E8E8":"none", cursor:"pointer" }}
                    onClick={() => isDone && goToStep(n)}>
                    <div style={{
                      width:"28px", height:"28px", borderRadius:"50%", flexShrink:0,
                      background: isActive?"#A88F84": isDone?"#1A1A1A":"transparent",
                      border: isActive?"1.5px solid #A88F84": isDone?"1.5px solid #1A1A1A":"1.5px solid #E8E8E8",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"12px", fontWeight:500,
                      color: isActive||isDone?"#fff":"#6B6B6B",
                      transition:"all .2s",
                    }}>
                      {isDone ? "✓" : n}
                    </div>
                    <span style={{ fontSize:"13.5px", color: isActive?"#1A1A1A":"#6B6B6B", fontWeight: isActive?500:400 }}>{label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"24px", padding:"12px", background:"#F8F8F8", borderRadius:"4px", fontSize:"12px", color:"#6B6B6B" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secure booking
            </div>
          </div>

          {/* Panel */}
          <div style={{ background:"#fff", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"40px" }}>
            <AnimatePresence mode="wait">

              {/* STEP 1 — Select Service */}
              {step === 1 && (
                <motion.div key="step1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}}>
                  <div style={{ marginBottom:"32px" }}>
                    <h3 className="font-display" style={{ fontSize:"28px", fontWeight:400, marginBottom:"8px" }}>Select your service</h3>
                    <p style={{ fontSize:"14px", color:"#6B6B6B" }}>Choose the consultation type that fits your needs.</p>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"32px" }}>
                    {SERVICES.map((s, i) => (
                      <div key={i}
                        onClick={() => setSelSvc(i)}
                        style={{
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                          padding:"16px 20px", border:`1.5px solid ${selSvc===i?"#A88F84":"#E8E8E8"}`,
                          borderRadius:"4px", cursor:"pointer", transition:"all .2s",
                          background: selSvc===i ? "rgba(168,143,132,.04)" : "#fff",
                        }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                          <div style={{
                            width:"18px", height:"18px", borderRadius:"50%",
                            border:`2px solid ${selSvc===i?"#A88F84":"#E8E8E8"}`,
                            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                          }}>
                            {selSvc===i && <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#A88F84" }}/>}
                          </div>
                          <div>
                            <div style={{ fontSize:"14.5px", fontWeight:500 }}>{s.name}</div>
                            <div style={{ fontSize:"12px", color:"#6B6B6B" }}>{s.dur}</div>
                          </div>
                        </div>
                        <div style={{ fontSize:"15px", fontWeight:500 }}>{s.price}</div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:"14px", padding:"14px" }}
                    onClick={() => goToStep(2)}>
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Date & Time */}
              {step === 2 && (
                <motion.div key="step2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}}>
                  <div style={{ marginBottom:"32px" }}>
                    <h3 className="font-display" style={{ fontSize:"28px", fontWeight:400, marginBottom:"8px" }}>Select date &amp; time</h3>
                    <p style={{ fontSize:"14px", color:"#6B6B6B" }}>Pick an available date and a time slot that works for you.</p>
                  </div>
                  {/* Calendar */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
                    <button onClick={() => changeMonth(-1)} style={{ background:"none", border:"1px solid #E8E8E8", width:"32px", height:"32px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6B6B6B" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <span className="font-display" style={{ fontSize:"20px", fontWeight:400 }}>{MONTH_NAMES[calMonth]} {calYear}</span>
                    <button onClick={() => changeMonth(1)} style={{ background:"none", border:"1px solid #E8E8E8", width:"32px", height:"32px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#6B6B6B" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"4px", marginBottom:"24px" }}>
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
                      <div key={d} style={{ textAlign:"center", fontSize:"11px", fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:"#6B6B6B", padding:"8px 0" }}>{d}</div>
                    ))}
                    {Array.from({ length: offset }).map((_,i)=>(
                      <div key={`e${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_,i)=>{
                      const d = i+1;
                      const disabled = isDayDisabled(d);
                      const isSel = selDay === d;
                      return (
                        <div key={d}
                          onClick={() => !disabled && setSelDay(d)}
                          style={{
                            textAlign:"center", padding:"10px 4px", fontSize:"13.5px",
                            borderRadius:"4px", cursor: disabled?"not-allowed":"pointer",
                            background: isSel?"#A88F84": "transparent",
                            color: isSel?"#fff": disabled?"#E8E8E8":"#1A1A1A",
                            transition:"all .2s",
                            position:"relative",
                          }}>
                          {d}
                          {!disabled && !isSel && (
                            <span style={{ position:"absolute", bottom:"3px", left:"50%", transform:"translateX(-50%)", width:"4px", height:"4px", background:"#A88F84", borderRadius:"50%", display:"block" }}/>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Time slots */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px", marginBottom:"32px" }}>
                    {TIMES.map(t => (
                      <div key={t}
                        onClick={() => setSelTime(t)}
                        style={{
                          padding:"10px 8px", border:`1px solid ${selTime===t?"#A88F84":"#E8E8E8"}`,
                          borderRadius:"4px", fontSize:"13px", textAlign:"center", cursor:"pointer",
                          background: selTime===t?"#A88F84":"#fff",
                          color: selTime===t?"#fff":"#1A1A1A",
                          transition:"all .2s",
                        }}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <button onClick={() => goToStep(1)} style={{ background:"none", border:"1.5px solid #E8E8E8", color:"#6B6B6B", padding:"12px 20px", borderRadius:"4px", fontSize:"13.5px", display:"inline-flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back
                    </button>
                    <button className="btn-primary" style={{ flex:1, justifyContent:"center", padding:"14px" }}
                      onClick={() => selDay && goToStep(3)} disabled={!selDay}>
                      Continue
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Your Details */}
              {step === 3 && (
                <motion.div key="step3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}}>
                  <div style={{ marginBottom:"32px" }}>
                    <h3 className="font-display" style={{ fontSize:"28px", fontWeight:400, marginBottom:"8px" }}>Your details</h3>
                    <p style={{ fontSize:"14px", color:"#6B6B6B" }}>Tell us a little about yourself and your business.</p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
                    <div style={{ marginBottom:"20px" }}>
                      <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>First Name</label>
                      <input type="text" placeholder="First name" value={form.fname}
                        onChange={e => setForm(f=>({...f, fname:e.target.value}))}
                        style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit" }}/>
                    </div>
                    <div style={{ marginBottom:"20px" }}>
                      <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>Last Name</label>
                      <input type="text" placeholder="Last name" value={form.lname}
                        onChange={e => setForm(f=>({...f, lname:e.target.value}))}
                        style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit" }}/>
                    </div>
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>Email Address</label>
                    <input type="email" placeholder="your@email.com" value={form.email}
                      onChange={e => setForm(f=>({...f, email:e.target.value}))}
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit" }}/>
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>Phone Number</label>
                    <input type="tel" placeholder="+44 7000 000000" value={form.phone}
                      onChange={e => setForm(f=>({...f, phone:e.target.value}))}
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit" }}/>
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>Business / Project Name <span style={{ color:"#6B6B6B", fontWeight:400 }}>(optional)</span></label>
                    <input type="text" placeholder="Your business or project name" value={form.biz}
                      onChange={e => setForm(f=>({...f, biz:e.target.value}))}
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit" }}/>
                  </div>
                  <div style={{ marginBottom:"24px" }}>
                    <label style={{ display:"block", fontSize:"13px", fontWeight:500, marginBottom:"8px" }}>Tell us about your project <span style={{ color:"#6B6B6B", fontWeight:400 }}>(optional)</span></label>
                    <textarea placeholder="A brief overview of what you'd like to discuss…" value={form.msg}
                      onChange={e => setForm(f=>({...f, msg:e.target.value}))}
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #E8E8E8", borderRadius:"4px", fontSize:"14px", outline:"none", fontFamily:"inherit", resize:"vertical", minHeight:"90px" }}/>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <button onClick={() => goToStep(2)} style={{ background:"none", border:"1.5px solid #E8E8E8", color:"#6B6B6B", padding:"12px 20px", borderRadius:"4px", fontSize:"13.5px", display:"inline-flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back
                    </button>
                    <button className="btn-primary" style={{ flex:1, justifyContent:"center", padding:"14px" }}
                      onClick={() => (form.fname && form.email && form.phone) && goToStep(4)}
                      disabled={!form.fname || !form.email || !form.phone}>
                      Continue
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Payment */}
              {step === 4 && (
                <motion.div key="step4" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.3}}>
                  <div style={{ marginBottom:"32px" }}>
                    <h3 className="font-display" style={{ fontSize:"28px", fontWeight:400, marginBottom:"8px" }}>Review &amp; payment</h3>
                    <p style={{ fontSize:"14px", color:"#6B6B6B" }}>Confirm your booking details and complete payment.</p>
                  </div>
                  {/* Summary */}
                  <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"20px", marginBottom:"24px" }}>
                    <p style={{ fontSize:"12px", fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:"#6B6B6B", marginBottom:"14px" }}>Booking Summary</p>
                    {[
                      { label:"Service", val:svc.name },
                      { label:"Date", val:selDateStr },
                      { label:"Time", val:selTime },
                      { label:"Name", val:`${form.fname} ${form.lname}`.trim() },
                      { label:"Email", val:form.email },
                    ].map((row,i)=>(
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid #E8E8E8", fontSize:"13.5px" }}>
                        <span style={{ color:"#6B6B6B" }}>{row.label}</span>
                        <span style={{ fontWeight:500 }}>{row.val||"—"}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0 7px", fontSize:"14.5px", fontWeight:600 }}>
                      <span style={{ color:"#6B6B6B" }}>Total</span>
                      <span>{svc.price}</span>
                    </div>
                  </div>
                  {/* Stripe note */}
                  <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"24px", marginBottom:"24px", textAlign:"center" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5" style={{ margin:"0 auto 12px" }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <p style={{ fontSize:"14px", color:"#1A1A1A", fontWeight:500, marginBottom:"6px" }}>Secure Payment via Stripe</p>
                    <p style={{ fontSize:"13px", color:"#6B6B6B", lineHeight:1.65 }}>
                      {svc.isFree
                        ? "No payment required. We will confirm your free discovery call within 24 hours."
                        : "You'll be redirected to Stripe's secure checkout to complete payment for this consultation."}
                    </p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <button onClick={() => goToStep(3)} style={{ background:"none", border:"1.5px solid #E8E8E8", color:"#6B6B6B", padding:"12px 20px", borderRadius:"4px", fontSize:"13.5px", display:"inline-flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      Back
                    </button>
                    <PayButton svc={svc} form={form} selDateStr={selDateStr} selTime={selTime} goToStep={goToStep} />
                  </div>
                </motion.div>
              )}

              {/* STEP 5 — Confirmation */}
              {step === 5 && (
                <motion.div key="step5" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ width:"64px", height:"64px", background:"#f0faf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d9a5a" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-display" style={{ fontSize:"32px", fontWeight:400, marginBottom:"10px" }}>
                      {svc.isFree ? "Request Received" : "Booking Confirmed"}
                    </h3>
                    <p style={{ fontSize:"14px", color:"#6B6B6B", maxWidth:"380px", margin:"0 auto 24px", lineHeight:1.7 }}>
                      {svc.isFree
                        ? "We'll be in touch within 24 hours to confirm your discovery call."
                        : `Your ${svc.name} has been booked. A confirmation has been sent to ${form.email}.`}
                    </p>
                    <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"20px", textAlign:"left", marginBottom:"24px" }}>
                      {[
                        { label:"Service", val:svc.name },
                        { label:"Date", val:selDateStr },
                        { label:"Time", val:selTime },
                        { label:"Confirmation to", val:form.email },
                      ].map((row,i)=>(
                        <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:i<3?"1px solid #E8E8E8":"none", fontSize:"13.5px" }}>
                          <span style={{ color:"#6B6B6B" }}>{row.label}</span>
                          <span style={{ fontWeight:500 }}>{row.val||"—"}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn-primary" style={{ justifyContent:"center" }}
                      onClick={() => { setStep(1); setSelDay(null); setForm({ fname:"", lname:"", email:"", phone:"", biz:"", msg:"" }); }}>
                      Book Another Session
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Payment note ──────────────────────────────────────── */}
      <section className="text-center px-5 sm:px-8 lg:px-14 py-10 sm:py-12 lg:py-[48px]">
        <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"40px", maxWidth:"560px", margin:"0 auto", display:"flex", alignItems:"center", gap:"20px" }}>
          <div style={{ width:"48px", height:"48px", background:"#fff", border:"1px solid #E8E8E8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div style={{ textAlign:"left" }}>
            <h4 style={{ fontSize:"15px", fontWeight:500, marginBottom:"6px" }}>All payments are processed securely via Stripe</h4>
            <p style={{ fontSize:"13.5px", color:"#6B6B6B", lineHeight:1.65 }}>Your payment details are never stored on our servers. Stripe handles all transactions with bank-level encryption.</p>
          </div>
        </div>
      </section>

      {/* ── Help section ──────────────────────────────────────── */}
      <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-[80px] bg-[#F8F8F8]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[80px] items-center max-w-[1100px] mx-auto">
          <div>
            <h2 className="font-display font-light text-t1" style={{ fontSize:"clamp(36px,4vw,48px)", marginBottom:"16px" }}>
              Not sure which session is right for you?
            </h2>
            <p style={{ fontSize:"15px", color:"#6B6B6B", lineHeight:1.75 }}>
              Reach out directly and we'll help you choose. Every business situation is different — we'd rather have a quick conversation than have you book the wrong thing.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <a href="https://wa.me/447919643752" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", gap:"16px", padding:"20px 24px", background:"#fff", border:"1px solid #E8E8E8", borderRadius:"2px", textDecoration:"none", transition:"all .3s" }}>
              <div style={{ width:"40px", height:"40px", background:"#F8F8F8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#A88F84"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <h5 style={{ fontSize:"14px", fontWeight:500, marginBottom:"2px" }}>WhatsApp</h5>
                <p style={{ fontSize:"12.5px", color:"#6B6B6B", margin:0 }}>Message us directly — we respond fast</p>
              </div>
            </a>
            <a href="sms:+447919643752"
              style={{ display:"flex", alignItems:"center", gap:"16px", padding:"20px 24px", background:"#fff", border:"1px solid #E8E8E8", borderRadius:"2px", textDecoration:"none", transition:"all .3s" }}>
              <div style={{ width:"40px", height:"40px", background:"#F8F8F8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <h5 style={{ fontSize:"14px", fontWeight:500, marginBottom:"2px" }}>iMessage</h5>
                <p style={{ fontSize:"12.5px", color:"#6B6B6B", margin:0 }}>+44 7919 643 752</p>
              </div>
            </a>
            <a href="mailto:booking@budruum.co.uk"
              style={{ display:"flex", alignItems:"center", gap:"16px", padding:"20px 24px", background:"#fff", border:"1px solid #E8E8E8", borderRadius:"2px", textDecoration:"none", transition:"all .3s" }}>
              <div style={{ width:"40px", height:"40px", background:"#F8F8F8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h5 style={{ fontSize:"14px", fontWeight:500, marginBottom:"2px" }}>Email</h5>
                <p style={{ fontSize:"12.5px", color:"#6B6B6B", margin:0 }}>booking@budruum.co.uk</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
