"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function WebDevPanel() {
  const codeLines = [
    { text: "const hero = {", color: "#A88F84" },
    { text: '  title: "Built Different",', color: "#1A1A1A" },
    { text: '  stack: ["Next.js", "TS"],', color: "#1A1A1A" },
    { text: '  performance: "100/100",', color: "#6B6B6B" },
    { text: "};", color: "#A88F84" },
    { text: "export default hero;", color: "#6B6B6B" },
  ];
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      <div className="rounded-[8px] overflow-hidden border border-[#E8E8E8] bg-white shadow-sm flex-1 flex flex-col">
        <div className="flex items-center gap-[6px] px-3 py-2 border-b border-[#E8E8E8] bg-[#F8F8F8]">
          {["#FF5F57","#FEBC2E","#28C840"].map((c,i)=>(
            <div key={i} style={{width:10,height:10,borderRadius:"50%",background:c}}/>
          ))}
          <div className="ml-2 flex-1 h-[18px] bg-[#F2F2F2] rounded text-[9px] text-[#6B6B6B] flex items-center px-2">
            budruum.io/your-site
          </div>
        </div>
        <div className="flex-1 p-4 font-mono text-[11px] leading-[1.7] bg-[#FAFAFA]">
          {codeLines.map((l,i)=>(
            <motion.div key={i} style={{color:l.color}}
              initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}}
              transition={{duration:0.35, delay:0.4+i*0.18}}>
              {l.text}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div className="flex items-center gap-3 justify-center"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}>
        {[{v:"100",l:"Performance"},{v:"100",l:"SEO"},{v:"A+",l:"Speed"}].map((s,i)=>(
          <motion.div key={i} className="flex flex-col items-center gap-1"
            initial={{scale:0}} animate={{scale:1}}
            transition={{delay:1.9+i*0.12, type:"spring", stiffness:200}}>
            <div className="w-10 h-10 rounded-full border-2 border-[#A88F84] flex items-center justify-center text-[12px] font-bold text-[#A88F84]">{s.v}</div>
            <span className="text-[8px] text-[#6B6B6B] tracking-wide">{s.l}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const COVER_CARDS = [
  { title: "Web Design & Build", desc: "Custom-designed websites built to perform — responsive, fast, and fully aligned to your brand." },
  { title: "E-Commerce Solutions", desc: "Online stores built to convert — product pages, checkout flows, and payment integration." },
  { title: "Web Applications", desc: "Interactive platforms with user accounts, dashboards, and business logic built in." },
  { title: "Mobile App Planning", desc: "Architecture and feature mapping for iOS and Android applications before a line of code is written." },
  { title: "Client Portals", desc: "Secure, private areas where your clients can access information, documents or services." },
  { title: "Booking Systems", desc: "End-to-end booking flows that let clients schedule, confirm and manage appointments." },
  { title: "Payment-Ready Platforms", desc: "Integrated payment infrastructure — Stripe, subscriptions, one-time purchases, and invoicing." },
  { title: "Business Dashboards", desc: "Internal data views that surface the metrics, orders or operations your team needs daily." },
];

const PLATFORM_CARDS = [
  {
    label: "Website / Digital Presence",
    items: ["Primarily informational", "Showcases services or products", "No complex user interaction", "Fast to build and launch", "Ideal for brand awareness"],
    ideal: "Service businesses, consultancies, portfolio sites, brand presence"
  },
  {
    label: "Web App / Interactive System",
    items: ["Users log in and take action", "Data is stored and retrieved", "Business logic is built in", "Scales with users and usage", "Ideal for complex user journeys"],
    ideal: "SaaS products, client portals, booking platforms, marketplaces"
  },
  {
    label: "Mobile App / Product Experience",
    items: ["Native iOS or Android experience", "Push notifications and device features", "Offline capability where needed", "App store distribution", "Ideal for daily-use products"],
    ideal: "Consumer products, on-demand services, companion apps"
  },
];

const MATTERS_POINTS = [
  { title: "A weak website damages trust before you speak to anyone", desc: "Your digital presence is often the first interaction a potential client has with your business. A poorly designed or slow site signals a lack of care that no sales conversation can fully recover from." },
  { title: "A poorly planned app wastes significant money", desc: "Development is expensive. Building without a clear architecture, user journey and feature map leads to rebuilds, scope creep and cost overruns that could have been avoided entirely." },
  { title: "A strong digital system supports every other part of the business", desc: "Booking, payment, client communication, data collection — all of these can be handled digitally when a platform is built properly. The right build removes friction and creates capacity." },
  { title: "Security and scalability are not optional additions", desc: "They must be considered from the first architectural decision. Adding them retrospectively is technically challenging and commercially costly." },
];

const RECEIVES = [
  { title: "UX Direction", desc: "A clear understanding of the user journey — who your users are, what they need and how the platform should serve them." },
  { title: "Page Structure & Architecture", desc: "A mapped structure of every page, section and flow before any design or development begins." },
  { title: "Website Design", desc: "A fully designed interface built to your brand — not a theme with your logo placed on it." },
  { title: "Front-End Development", desc: "Clean, performant code. Fast load times, proper responsiveness and accessibility considered throughout." },
  { title: "Booking Flow Planning", desc: "If your business takes bookings — online or in-person — the flow is designed with conversion and clarity in mind." },
  { title: "Payment Integration Planning", desc: "Stripe, subscription billing, one-time purchases — the payment logic is mapped and integrated correctly." },
  { title: "App Feature Mapping", desc: "For clients building towards a web or mobile app, every feature is mapped, prioritised and scoped before build." },
  { title: "Client Journey Design", desc: "From first visit to conversion to repeat use — every touchpoint in the client journey is considered." },
  { title: "Launch Support", desc: "Go-live preparation, domain setup, performance checks and post-launch monitoring." },
];

const WEB_PROCESS = [
  { num: "01", title: "Understand the Business", desc: "We learn your model, your audience and what the platform needs to achieve — commercially and operationally." },
  { num: "02", title: "Map User Journey", desc: "We design the user flow before any interface — so every page, state and interaction has a clear purpose." },
  { num: "03", title: "Plan Features", desc: "We define the full feature set, prioritise by impact and create the architecture before development begins." },
  { num: "04", title: "Design Interface", desc: "We design the visual interface to your brand — every screen, state and component considered." },
  { num: "05", title: "Build the Platform", desc: "We develop the platform on a modern stack — clean, performant and built to scale." },
  { num: "06", title: "Test and Refine", desc: "Every flow is tested. Every edge case considered. The platform is refined until it performs correctly." },
  { num: "07", title: "Prepare for Launch", desc: "Domain, hosting, performance, security and go-live checklist — everything is confirmed before the platform is live." },
];

const FEATURES = [
  { title: "Booking Systems", desc: "Custom booking flows that handle availability, confirmation, reminders and cancellation — integrated with your calendar or CRM." },
  { title: "Payment Flows", desc: "Stripe integration, one-time payments, subscriptions and deposit logic — built correctly so money moves without friction." },
  { title: "User Dashboards", desc: "Custom views that surface the right data to the right user — admin panels, client portals, reporting interfaces." },
  { title: "Product Catalogues", desc: "Structured product or service listings with filtering, search and detail pages — built for conversion and clarity." },
  { title: "Service Pages", desc: "High-converting service pages that clearly explain what you offer, who it is for and how to take the next step." },
  { title: "Contact Forms", desc: "Forms that collect the right information, route enquiries correctly and feed into your CRM or inbox without manual handling." },
  { title: "Client Portals", desc: "Secure authenticated areas where clients can view their account, access deliverables, track progress or manage their relationship with you." },
  { title: "Admin Panels", desc: "Internal management interfaces for your team — order management, user management, content updates, reporting." },
];

const APP_PILLARS = [
  { title: "Scalable Content Architecture", desc: "Content and data structures are built so they can be extended — not rebuilt — when you are ready to move to an app." },
  { title: "User Account Planning", desc: "Authentication, roles and permissions are planned from the start so that adding user accounts later is an extension, not a rebuild." },
  { title: "Booking Flow Foundation", desc: "Booking logic built for the web is structured in a way that can be translated directly into a mobile app experience." },
  { title: "Payment Logic", desc: "Payment infrastructure is set up with the Stripe architecture that works across web and mobile — no duplication when you scale." },
  { title: "Client Data Structure", desc: "How client data is stored, accessed and displayed is planned for future app use from the first database decision." },
];

const WHO_FOR = [
  { title: "Service Businesses", desc: "Any business that delivers a service and needs a website that reflects its quality, communicates its value and generates enquiries or bookings." },
  { title: "Product Brands", desc: "Brands selling physical or digital products that need a storefront built for conversion — not just a shop template." },
  { title: "Startups", desc: "Early-stage businesses that need to establish a digital presence quickly, professionally and without the cost of an agency retainer." },
  { title: "Marketplaces", desc: "Platforms connecting buyers and sellers, service providers and clients, hosts and guests — requiring complex user journeys and architecture." },
  { title: "Businesses Preparing for App Development", desc: "Any business that knows a mobile app is part of its roadmap and wants its web platform built in a way that makes that transition logical rather than costly." },
];

export default function WebDevPage() {
  return (
    <main>
      <PageHero eyebrow="Web Development" title="Sites That" titleAccent="Actually Work."
        subtitle="We build high-performance web products that convert visitors into clients — designed to your brand, built on modern stack, shipped to last."
        panel={<WebDevPanel />} />

      {/* 1. WHAT THIS SERVICE COVERS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[600px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What This Service Covers</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Every type of digital build, handled properly.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Whether you need a marketing site, an e-commerce store, a booking platform or a full web application — we plan and build it with the same rigour. No templates. No shortcuts. No builds that need to be redone in twelve months.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COVER_CARDS.map((card, i) => (
              <motion.div key={i} className="p-7 bg-gs border border-br rounded-xl hover:bg-white hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%4)*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{card.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CHOOSING THE RIGHT PLATFORM */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Choosing the Right Platform</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Website. Web app. Mobile app.<br/>They are not interchangeable.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">The most expensive mistake in digital development is building the wrong thing. Understanding which type of platform your business needs — and why — is the first decision we make together.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLATFORM_CARDS.map((card, i) => (
              <motion.div key={i} className="bg-white rounded-xl border border-br overflow-hidden hover:shadow-md transition-all"
                initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:i*0.1}}>
                <div className="p-6 border-b border-br bg-gs">
                  <h4 className="font-display text-[19px] font-light text-t1">{card.label}</h4>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-5">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[13px] text-t2">
                        <div className="w-1.5 h-1.5 rounded-full bg-ac flex-shrink-0"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-br">
                    <p className="text-[10.5px] tracking-[.12em] uppercase text-t2 mb-1">Ideal for</p>
                    <p className="text-[12.5px] text-t2 leading-relaxed">{card.ideal}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY IT MATTERS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">A digital platform is<br/>a business decision.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Your website or application is not a marketing tool that sits alongside your business. For most companies, it is the primary mechanism through which clients find you, evaluate you and decide whether to engage. That makes it a commercial asset — and it should be treated as one.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">The quality of your digital platform communicates something about the quality of your business. It sets expectations. It creates trust — or destroys it. And it either supports your operations or creates friction that slows everything down.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">Digital development should follow business logic, not trend. The best platform is the one built for how your business actually works.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4">
            {MATTERS_POINTS.map((point, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-6 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <div className="w-2 h-2 rounded-full bg-ac flex-shrink-0 mt-2"/>
                <div>
                  <h4 className="text-[14px] font-medium text-t1 mb-1">{point.title}</h4>
                  <p className="text-[13px] text-t2 leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU RECEIVE */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What You Receive</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Direction, design and delivery — structured from start to launch.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every engagement covers the full build journey — from the first strategic decision to the day the platform goes live. Nothing is scoped separately to inflate cost. Everything needed for a properly functioning digital presence is included.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECEIVES.map((item, i) => (
              <motion.div key={i} className={`bg-white rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] hover:shadow-sm transition-all ${i === RECEIVES.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%3)*0.08}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.12)] flex items-center justify-center mb-4">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{item.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center max-w-[520px] mx-auto mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Seven stages. One coherent build.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every platform we build follows a structured process — because skipping stages is what creates expensive problems later.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WEB_PROCESS.map((step, i) => (
              <motion.div key={i} className={`bg-gs rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] transition-all ${i === WEB_PROCESS.length - 1 ? "sm:col-span-2 lg:col-span-4" : i === WEB_PROCESS.length - 2 ? "lg:col-span-2" : ""}`}
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:(i%4)*0.08}}>
                <div className="w-10 h-10 rounded-full bg-white border border-br flex items-center justify-center mb-4 font-display text-[16px] font-light text-ac">
                  {step.num}
                </div>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{step.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY FEATURES */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[520px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Key Features We Build</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">The components that make a platform work.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">These are not bolt-on additions. They are the building blocks of a functional, commercial digital presence — each one planned and built with the specific needs of the business in mind.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%4)*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{f.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. APP-READY THINKING */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">App-Ready Thinking</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Building your website with the app already in mind.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Most businesses that eventually build a mobile app started with a website. If that website was not built with future app development in mind, the transition is costly — because everything has to be restructured rather than extended.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Budruum builds web platforms with what comes next in mind. The architecture, the data structure, the authentication logic — all of it is planned so that moving from website to app is a natural progression, not an expensive rebuild.</p>
            <div className="p-5 bg-gl border border-br rounded-xl">
              <p className="text-[13px] text-t2 leading-relaxed"><strong className="text-t1">Note:</strong> App-ready thinking does not add cost to a web build. It adds foresight to the decisions that would otherwise need to be undone.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4">
            {APP_PILLARS.map((pillar, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-6 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <div className="w-8 h-8 rounded-full bg-white border border-br flex items-center justify-center flex-shrink-0 font-display text-[14px] font-light text-ac">
                  {i+1}
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-t1 mb-1">{pillar.title}</h4>
                  <p className="text-[13px] text-t2 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Who This Is For</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Built for any business that takes its digital presence seriously.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">If your website needs to do more than exist — if it needs to generate enquiries, process bookings, sell products or manage clients — then it needs to be built properly.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_FOR.map((item, i) => (
              <motion.div key={i} className={`bg-white rounded-xl p-7 border border-br hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all ${i === WHO_FOR.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%3)*0.08}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{item.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-8 py-4 rounded transition-all hover:opacity-90">
              Start Your Build
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
