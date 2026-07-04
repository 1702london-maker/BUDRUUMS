"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Related = { eyebrow: string; title: string; excerpt: string; href: string };
export type Article = {
  slug: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  subtitle: string;
  read: string;
  ctaService: string;
  ctaHref: string;
  ctaTitle: string;
  ctaDesc: string;
  body: string;
  related: Related[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ArticleClient({ article }: { article: Article }) {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding:"80px 56px 72px", background:"#F8F8F8", borderBottom:"1px solid #E8E8E8", textAlign:"center" }}>
        <motion.p className="eyebrow" style={{ marginBottom:"16px" }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.55, ease:EASE }}>
          {article.eyebrow}
        </motion.p>
        <motion.h1 className="font-display font-light text-t1"
          style={{ fontSize:"clamp(34px,5vw,62px)", lineHeight:1.1, marginBottom:"20px" }}
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.1, ease:EASE }}>
          {article.title} <em style={{ fontStyle:"italic", color:"#A88F84" }}>{article.titleEm}</em>
        </motion.h1>
        <motion.p style={{ fontSize:"16px", color:"#6B6B6B", maxWidth:"600px", margin:"0 auto 24px", lineHeight:1.7 }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.2, ease:EASE }}>
          {article.subtitle}
        </motion.p>
        <motion.div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"20px", fontSize:"13px", color:"#6B6B6B" }}
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.5, delay:0.35 }}>
          <span style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {article.read}
          </span>
          <span>By Budruum</span>
          <span>Published June 2026</span>
        </motion.div>
      </section>

      {/* Body — two-column: article left, sidebar right */}
      <div style={{ padding:"80px 56px", display:"grid", gridTemplateColumns:"1fr 320px", gap:"64px", alignItems:"start" }}>
        <motion.article
          className="insight-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
          initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.75, delay:0.15, ease:EASE }}
        />

        {/* Sidebar */}
        <motion.aside style={{ position:"sticky", top:"90px" }}
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.75, delay:0.3, ease:EASE }}>
          <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderTop:"3px solid #A88F84", borderRadius:"4px", padding:"28px 24px", marginBottom:"24px" }}>
            <p className="eyebrow" style={{ marginBottom:"10px" }}>{article.ctaService}</p>
            <h3 className="font-display" style={{ fontSize:"20px", fontWeight:400, marginBottom:"10px", lineHeight:1.3 }}>{article.ctaTitle}</h3>
            <p style={{ fontSize:"13px", color:"#6B6B6B", marginBottom:"20px", lineHeight:1.7 }}>{article.ctaDesc}</p>
            <Link href={article.ctaHref} className="btn-primary" style={{ fontSize:"13px", width:"100%", justifyContent:"center" }}>View Service →</Link>
          </div>
          <div style={{ background:"#F8F8F8", border:"1px solid #E8E8E8", borderRadius:"4px", padding:"24px" }}>
            <p style={{ fontSize:"13px", fontWeight:500, marginBottom:"14px", color:"#1A1A1A" }}>Book a free consultation</p>
            <p style={{ fontSize:"12.5px", color:"#6B6B6B", marginBottom:"16px", lineHeight:1.65 }}>Speak to the Budruum team directly — no commitment required.</p>
            <Link href="/booking" className="btn-primary" style={{ fontSize:"13px", width:"100%", justifyContent:"center" }}>Book Now →</Link>
          </div>
        </motion.aside>
      </div>

      {/* Related */}
      <section style={{ padding:"72px 56px", background:"#F8F8F8", borderTop:"1px solid #E8E8E8" }}>
        <motion.h2 className="font-display font-light text-t1"
          style={{ fontSize:"clamp(28px,3vw,40px)", marginBottom:"32px" }}
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, ease:EASE }}>
          Continue <em style={{ fontStyle:"italic", color:"#A88F84" }}>reading</em>
        </motion.h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
          {article.related.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.55, delay: i * 0.12, ease:EASE }}>
              <Link href={r.href}
                style={{ display:"flex", flexDirection:"column", padding:"28px", background:"#fff", border:"1px solid #E8E8E8", borderRadius:"4px", textDecoration:"none", transition:"all .3s", height:"100%" }}
                className="hover:border-[#A88F84]/50 hover:shadow-md">
                <p className="eyebrow" style={{ marginBottom:"10px" }}>{r.eyebrow}</p>
                <h4 className="font-display" style={{ fontSize:"19px", fontWeight:400, marginBottom:"10px", lineHeight:1.3, color:"#1A1A1A" }}>{r.title}</h4>
                <p style={{ fontSize:"13px", color:"#6B6B6B", flex:1, lineHeight:1.7 }}>{r.excerpt}</p>
                <span style={{ fontSize:"12.5px", color:"#A88F84", fontWeight:500, marginTop:"16px" }}>Read article →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section style={{ padding:"100px 56px", textAlign:"center" }}
        initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.65, delay:0.1, ease:EASE }}>
        <p className="eyebrow">Work With Budruum</p>
        <h2 className="font-display font-light text-t1" style={{ fontSize:"clamp(32px,4vw,52px)", marginBottom:"16px" }}>
          Ready to build <em style={{ fontStyle:"italic", color:"#A88F84" }}>properly?</em>
        </h2>
        <p style={{ fontSize:"15px", color:"#6B6B6B", maxWidth:"420px", margin:"0 auto 36px", lineHeight:1.85 }}>
          Whether you need a business plan, a financial forecast or end-to-end startup consultancy — we help UK founders build with structure and confidence.
        </p>
        <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/booking" className="btn-primary">Book a Free Consultation →</Link>
          <Link href="/services" className="btn-outline">View All Services</Link>
        </div>
      </motion.section>
    </main>
  );
}
