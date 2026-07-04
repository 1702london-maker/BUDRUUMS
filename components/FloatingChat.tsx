"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const GREET = "Hi! I'm Jen from Budruum. I can answer questions about our services, pricing, or help you figure out which engagement is right for you. How can I help?";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREET }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again or reach us on WhatsApp." }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 w-[calc(100vw-32px)] sm:w-[340px] bg-white rounded-xl shadow-2xl border border-[#E8E8E8] flex flex-col overflow-hidden"
            style={{ bottom: "148px", right: "16px", maxHeight: "min(500px, calc(100svh - 180px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#A88F84] flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-white text-[14px] leading-none">J</span>
                </div>
                <div>
                  <span className="text-[13px] font-medium text-white block leading-tight">Jen</span>
                  <span className="text-[10px] text-white/40 tracking-[.1em] uppercase">Budruum Advisor</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white text-xl leading-none transition-colors">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "180px", maxHeight: "min(340px, calc(100svh - 330px))" }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#A88F84] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <span className="font-display text-white text-[11px]">J</span>
                    </div>
                  )}
                  <div className={`max-w-[78%] px-3 py-2 rounded-lg text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#A88F84] text-white rounded-br-sm"
                      : "bg-[#F8F8F8] text-[#1A1A1A] rounded-bl-sm border border-[#E8E8E8]"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#A88F84] flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-white text-[11px]">J</span>
                  </div>
                  <div className="bg-[#F8F8F8] border border-[#E8E8E8] px-3 py-2 rounded-lg rounded-bl-sm flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 bg-[#A88F84] rounded-full"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#E8E8E8] flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask Jen anything..."
                className="flex-1 text-[13px] px-3 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:border-[#A88F84] bg-[#F8F8F8] placeholder:text-[#6B6B6B]/50"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="px-3 py-2 bg-[#A88F84] hover:bg-[#8F7870] text-white rounded-lg transition-colors disabled:opacity-40"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating buttons — WhatsApp on top, Jen below, stacked vertically */}
      <div className="fixed z-50 flex flex-col items-end gap-3" style={{ bottom: "max(20px, env(safe-area-inset-bottom))", right: "16px" }}>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/447919643752"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full flex items-center justify-center shadow-lg"
          style={{ width: "52px", height: "52px", background: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,.35)" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>

        {/* Jen chat button */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="rounded-full flex items-center justify-center shadow-lg transition-colors"
          style={{ width: "52px", height: "52px", background: open ? "#8F7870" : "#1A1A1A", boxShadow: "0 4px 16px rgba(0,0,0,.28)" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Chat with Jen"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="text-2xl text-white leading-none">×</motion.span>
            ) : (
              <motion.svg key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

      </div>
    </>
  );
}
