"use client";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

function SocialPanel() {
  const posts = [
    { likes: "2.4k", comments: "184", label: "Brand story post" },
    { likes: "5.1k", comments: "302", label: "Product launch reel" },
    { likes: "3.8k", comments: "246", label: "Founder insight" },
  ];
  return (
    <div className="absolute inset-0 p-5 flex flex-col justify-center gap-3">
      {posts.map((p,i)=>(
        <motion.div key={i}
          className="bg-white rounded-[10px] border border-[#E8E8E8] flex items-center gap-4 px-4 py-3"
          initial={{opacity:0, x:40}} animate={{opacity:1, x:0}}
          transition={{duration:0.5, delay:0.3+i*0.2, ease:[0.22,1,0.36,1]}}>
          <div className="w-9 h-9 rounded-[6px] bg-[#F2F2F2] border border-[#E8E8E8] flex-shrink-0"/>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-[#1A1A1A] font-medium truncate">{p.label}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-[#6B6B6B]">♥ {p.likes}</span>
              <span className="text-[10px] text-[#6B6B6B]">💬 {p.comments}</span>
            </div>
          </div>
          <div className="w-[40px] h-[4px] bg-[#F2F2F2] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#A88F84] rounded-full"
              initial={{width:0}} animate={{width:"100%"}}
              transition={{duration:0.6, delay:0.6+i*0.2}}/>
          </div>
        </motion.div>
      ))}
      <motion.div className="flex items-center justify-center gap-6 pt-2"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>
        {[{v:"↑ 284%",l:"Reach"},{v:"↑ 91%",l:"Engagement"},{v:"↑ 47%",l:"Conversions"}].map((s,i)=>(
          <div key={i} className="text-center">
            <div className="text-[12px] font-medium text-[#A88F84]">{s.v}</div>
            <div className="text-[9px] text-[#6B6B6B]">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const MEANING_PILLARS = [
  { title: "Content Strategy", desc: "A content plan aligned to your brand voice, audience and business goals — not just posting for the sake of it." },
  { title: "Audience Behaviour", desc: "Understanding what your audience engages with, when they are active and what drives them to take action." },
  { title: "Algorithm Understanding", desc: "Each platform rewards different behaviour. We know what each algorithm favours and how to work within it." },
  { title: "Posting Timing", desc: "The right content posted at the wrong time underperforms. Timing is a strategic variable, not a guess." },
  { title: "Creator Partnerships", desc: "Identifying and working with the right creators to reach audiences that trust the messenger." },
  { title: "Performance Tracking", desc: "Reading the numbers correctly — knowing which metrics matter and what the data is actually telling you." },
];

const PROBLEMS = [
  { title: "Reaching the wrong audience", desc: "High follower counts mean nothing if the followers are not potential clients or customers. Distribution matters more than volume." },
  { title: "Poor timing", desc: "Publishing content when your audience is not active wastes creative effort. The algorithm also penalises low initial engagement." },
  { title: "Weak messaging", desc: "Content that does not communicate a clear value, hook or reason to stop scrolling gets ignored — no matter how well it is designed." },
  { title: "No trend understanding", desc: "Using the wrong trend, at the wrong time, for the wrong brand creates the wrong impression. Not every viral moment is relevant to every brand." },
  { title: "No performance review", desc: "Without reviewing what worked and why, every week is a fresh guess. Growth requires learning from data, not just creating more content." },
  { title: "Content that looks good but does not convert", desc: "Aesthetically polished content that generates no enquiries, clicks or purchases is a branding cost, not a marketing asset." },
];

const CREATOR_TYPES = [
  { title: "Influencers", desc: "Creators with large, engaged followings in a specific niche or lifestyle category. Effective for awareness and aspiration." },
  { title: "Content Creators", desc: "Individuals who produce high-quality content in a consistent format — reels, reviews, tutorials — that audiences trust and follow." },
  { title: "Brand Ambassadors", desc: "Longer-term partnerships where a creator represents the brand across multiple pieces of content over time. Builds deeper association." },
  { title: "Niche Creators", desc: "Smaller audiences in highly specific categories — often with significantly higher engagement rates than general lifestyle influencers." },
  { title: "Visual Storytellers", desc: "Photographers, videographers and directors who create content that elevates how a brand looks and feels on screen." },
];

const METRICS = [
  { title: "Engagement Rate", desc: "The percentage of your audience that interacts with each piece of content. A far more meaningful metric than follower count." },
  { title: "Reach", desc: "The number of unique accounts that saw your content. Tells you how widely your message is being distributed." },
  { title: "Impressions", desc: "The total number of times your content was displayed — including repeat views. Used to understand content visibility." },
  { title: "Watch Time", desc: "For video content — how long people watch before scrolling away. The single most important metric for video-first platforms." },
  { title: "Saves", desc: "When users save your content, they are signalling high intent. Saves are one of the strongest engagement signals on Instagram." },
  { title: "Shares", desc: "Content shared to stories or sent to others extends reach organically. A high share rate signals genuinely valuable content." },
  { title: "Click-Through Behaviour", desc: "How often viewers move from the content to your profile, your bio link or your website. The bridge between content and commercial intent." },
  { title: "Conversion Signals", desc: "Enquiries, DMs, purchases or sign-ups that can be attributed to social activity. The metric that ultimately justifies the investment." },
];

const TIMING_ITEMS = [
  { title: "Best Posting Windows", desc: "Platform analytics show exactly when your audience is most active. We post within these windows consistently." },
  { title: "Audience Activity Mapping", desc: "Different audiences behave differently. We map your specific audience's activity patterns rather than applying generic timing rules." },
  { title: "Seasonal & Campaign Timing", desc: "Content planned around key commercial moments — product launches, seasonal peaks, industry events — performs better than evergreen content alone." },
  { title: "Trend Relevance Assessment", desc: "Before incorporating a trend, we assess whether it is appropriate for the brand, the audience and the timing. Not every trend belongs to every brand." },
  { title: "Content Calendar Planning", desc: "A structured calendar that maps content type, format, timing and objective across the month — so nothing is reactive and everything is intentional." },
  { title: "Platform-Specific Behaviour", desc: "Instagram, TikTok, LinkedIn and YouTube all have different peak times, content formats and algorithmic preferences. Each is managed accordingly." },
];

const DELIVER_CARDS = [
  { title: "Social Media Strategy", desc: "A documented strategy covering platform selection, content pillars, tone of voice, audience targeting and commercial objectives." },
  { title: "Content Planning", desc: "A structured content calendar mapped to your goals — each post planned with purpose, not just scheduled to fill a slot." },
  { title: "Creator & Influencer Direction", desc: "Identification, outreach and management of creators who align with your brand and audience — briefed properly and managed throughout." },
  { title: "Performance Review", desc: "Regular reporting on the metrics that matter — with analysis and recommendations, not just numbers on a slide." },
  { title: "Brand Positioning Online", desc: "Ensuring your social presence reinforces your broader brand identity — same tone, same positioning, same quality across every platform." },
  { title: "Campaign Planning", desc: "Launch campaigns, product campaigns and awareness campaigns planned and executed with clear objectives and measured outcomes." },
];

const PLATFORM_CARDS = [
  { name: "Instagram", desc: "Visual storytelling, reels, brand presence and community building. Effective for lifestyle, product and service brands." },
  { name: "TikTok", desc: "Short-form video content with organic reach potential. Highly algorithm-driven — rewards consistency, authenticity and trend awareness." },
  { name: "LinkedIn", desc: "Professional audience, B2B positioning, thought leadership and brand authority. The primary platform for business-to-business growth." },
  { name: "Facebook", desc: "Community building, targeted paid advertising and local business awareness. Still the largest social platform by active users globally." },
  { name: "YouTube Shorts", desc: "Short-form video content on the world's second-largest search engine. Strong for evergreen content and SEO-adjacent visibility." },
];

const SMM_PROCESS = [
  { num: "01", title: "Understand the Brand", desc: "We learn your positioning, your audience, your voice and what you want social media to achieve for the business." },
  { num: "02", title: "Define the Audience", desc: "We profile your target audience by behaviour, platform and content preference — not just demographics." },
  { num: "03", title: "Plan Content Direction", desc: "We establish content pillars, formats, tone and a calendar structure that serves the strategy." },
  { num: "04", title: "Identify Creator Opportunities", desc: "We identify and brief creators or influencers whose audience overlaps with yours in a commercially relevant way." },
  { num: "05", title: "Track Performance", desc: "We monitor the metrics that matter — engagement, reach, saves, conversions — and report on what the data means." },
  { num: "06", title: "Refine and Scale", desc: "We use performance data to improve what works and remove what does not — iterating toward consistent, compounding growth." },
];

const WHO_FOR_ITEMS = [
  { title: "Startups Building Awareness", desc: "Businesses at the early stage that need to establish a social presence quickly and build an audience from scratch." },
  { title: "Product Brands Needing Visibility", desc: "Brands with a physical or digital product that need content-driven visibility to reach buyers and drive purchase intent." },
  { title: "Service Businesses Seeking Trust", desc: "Professionals and service brands that need social media to demonstrate expertise, build credibility and generate enquiries." },
  { title: "Luxury & Lifestyle Brands", desc: "Brands where the quality of content is as important as the quality of the product — where perception is part of the value proposition." },
  { title: "Businesses Tired of Posting Without Results", desc: "Any business that has been active on social media without seeing commercial return — and wants a strategic approach that actually connects content to outcomes." },
];

export default function SocialMediaMarketingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Social Media Marketing"
        title="Content That"
        titleAccent="Converts."
        subtitle="Strategy-led social media management for founders and brands who want real results — not vanity metrics."
        panel={<SocialPanel />}
      />

      {/* 1. WHAT IT ACTUALLY MEANS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-16">
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
              <p className="eyebrow mb-4">What It Actually Means</p>
              <h2 className="font-display text-[38px] font-light text-t1 leading-tight">Social media done properly is not about volume.<br/>It is about placement.</h2>
            </motion.div>
            <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.15}}>
              <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Posting frequently is not a strategy. Being visible to the wrong people is not growth. Social media marketing — done properly — is a placement exercise. The goal is to get the right content in front of the right audience, at the right time, in a format that makes them stop, pay attention and take action.</p>
              <p className="text-[14.5px] text-t2 leading-relaxed">That requires strategy before content, understanding before execution, and data-led refinement rather than guesswork. It also requires an honest assessment of what each platform can do for your specific business — and what it cannot.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-br border border-br rounded-xl overflow-hidden">
            {MEANING_PILLARS.map((p, i) => (
              <motion.div key={i} className="bg-white p-7 hover:bg-gl transition-colors"
                initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4, delay:i*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{p.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE REAL PROBLEM */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Posting consistently is not the same as marketing.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">Most businesses with active social media accounts are not doing social media marketing. They are doing social media maintenance — keeping accounts alive, filling grids, generating activity that feels productive but generates very little commercial return.</p>
            <div className="p-5 bg-white border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">Content without direction is activity, not marketing.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-3">
            {PROBLEMS.map((p, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-5 bg-white border border-br rounded-xl hover:border-[rgba(168,143,132,.4)] transition-colors"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.07}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <p className="text-[13.5px] text-t2 leading-relaxed"><strong className="text-t1 block mb-0.5">{p.title}</strong>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INFLUENCERS & CREATORS */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Influencers & Creators</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">The right creator reaches the right room.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">Influencer and creator marketing is not about finding someone with a large following and asking them to post about your product. It is about identifying creators whose audience overlaps with yours in a commercially meaningful way — and briefing them to communicate your brand in a way that feels authentic rather than promotional.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">The most effective creator partnerships are based on alignment — between the creator's audience and your target customer, between their content style and your brand tone, and between their credibility and your positioning.</p>
            <div className="p-5 bg-gl border border-br rounded-xl">
              <p className="text-[13px] text-t2 leading-relaxed"><strong className="text-t1">Note:</strong> The goal is not visibility for its own sake — it is visibility in front of the people who are likely to buy, book or enquire.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-4">
            {CREATOR_TYPES.map((type, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-6 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.1}}>
                <div className="w-8 h-8 rounded-full bg-white border border-br flex items-center justify-center flex-shrink-0 font-display text-[14px] font-light text-ac">
                  {i+1}
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-t1 mb-1">{type.title}</h4>
                  <p className="text-[13px] text-t2 leading-relaxed">{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FIGURES & ALGORITHMS */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Figures & Algorithms</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">The numbers tell you everything — if you know what to read.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Most social media reporting focuses on the metrics that look impressive in a presentation. Budruum focuses on the metrics that tell you whether your content is actually working — and uses that data to improve what comes next.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {METRICS.map((metric, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] hover:shadow-sm transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%4)*0.07}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{metric.title}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIMING, TRENDS & PLACEMENT */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Timing, Trends & Placement</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">When you post matters as much as what you post.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-4">The social media algorithms on every major platform are engineered to show users more of what they engage with. That means initial engagement — in the first hour after posting — is critical. Content that gains early traction gets pushed to wider audiences. Content that doesn't is buried.</p>
            <p className="text-[14.5px] text-t2 leading-relaxed mb-6">This is why timing is a strategic variable. Understanding when your specific audience is most active — and posting consistently within those windows — is one of the highest-leverage, lowest-cost improvements any brand can make.</p>
            <div className="p-5 bg-gl border-l-[3px] border-ac rounded-r-xl">
              <p className="text-[14px] text-t1 font-medium leading-relaxed">Not every viral sound or trend belongs to every brand. Using the wrong trend damages credibility faster than not using it at all.</p>
            </div>
          </motion.div>
          <div className="flex flex-col gap-3">
            {TIMING_ITEMS.map((item, i) => (
              <motion.div key={i} className="flex items-start gap-4 p-5 bg-gs border border-br rounded-xl hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.4, delay:i*0.08}}>
                <div className="w-2 h-2 rounded-full bg-ac flex-shrink-0 mt-2"/>
                <div>
                  <h4 className="text-[13.5px] font-medium text-t1 mb-1">{item.title}</h4>
                  <p className="text-[12.5px] text-t2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT YOU RECEIVE */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">What You Receive</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">Strategy, direction and execution — not just posting.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every engagement includes a strategic foundation and ongoing execution — because without strategy, execution is just noise, and without execution, strategy is just a document.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELIVER_CARDS.map((card, i) => (
              <motion.div key={i} className="bg-white rounded-xl p-7 border border-br hover:border-[rgba(168,143,132,.3)] hover:shadow-sm transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%3)*0.08}}>
                <div className="w-5 h-5 rounded-full bg-[rgba(168,143,132,.12)] flex items-center justify-center mb-4">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A88F84" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{card.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PLATFORMS WE SUPPORT */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Platforms We Support</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">The right platform for the right brand.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Not every brand should be on every platform. We identify which platforms your audience uses, what format performs best there and how to build a presence that grows — rather than spreading effort thinly across accounts that do nothing.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PLATFORM_CARDS.map((p, i) => (
              <motion.div key={i} className="bg-gs rounded-xl p-7 border border-br hover:bg-white hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:i*0.08}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{p.name}</h4>
                <p className="text-[12.5px] text-t2 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] text-t2 mt-6 italic">Platform selection is always driven by where your audience is and what format your brand communicates most effectively — not by what is trending.</p>
        </div>
      </section>

      {/* 8. OUR PROCESS */}
      <section className="py-24 bg-gl border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center max-w-[520px] mx-auto mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2 className="font-display text-[38px] font-light text-t1 mb-4">Six stages from understanding to growth.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">Every social media engagement starts with strategy and ends with measurable growth — because without the former, the latter is impossible.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SMM_PROCESS.map((step, i) => (
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

      {/* 9. WHO THIS IS FOR */}
      <section className="py-24 bg-white border-b border-br">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div className="max-w-[560px] mb-14" initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <p className="eyebrow mb-4">Who This Is For</p>
            <h2 className="font-display text-[38px] font-light text-t1 leading-tight mb-4">For brands that are done posting without results.</h2>
            <p className="text-[14.5px] text-t2 leading-relaxed">If your social media activity is not generating enquiries, growing an audience that buys or building the credibility your brand needs — it is not a content problem. It is a strategy problem. That is what we fix.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_FOR_ITEMS.map((item, i) => (
              <motion.div key={i} className={`bg-gs rounded-xl p-7 border border-br hover:bg-white hover:shadow-sm hover:border-[rgba(168,143,132,.3)] transition-all ${i === WHO_FOR_ITEMS.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4, delay:(i%3)*0.08}}>
                <h4 className="text-[14px] font-medium text-t1 mb-2">{item.title}</h4>
                <p className="text-[13px] text-t2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/booking" className="inline-flex items-center gap-2 bg-ac text-white text-[13.5px] font-medium px-8 py-4 rounded transition-all hover:opacity-90">
              Book a Strategy Session
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      <PageCTA />
    </main>
  );
}
