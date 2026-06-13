"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  FormEvent,
  KeyboardEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { ChatMessage } from "@/app/api/chat/route";

/* ─── Constants ──────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const DEFAULT_PROMPTS = [
  "[PLACEHOLDER — example question 1]",
  "[PLACEHOLDER — example question 2]",
  "[PLACEHOLDER — example question 3]",
];

/* ─── Primitives ─────────────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.78, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Typewriter drain buffer ────────────────────────────────────── */
/*
 * Decouples the *displayed* text from the *received* text. The network may
 * deliver characters in chunky bursts; this reveals them to the UI at a
 * steady, near-constant cadence via requestAnimationFrame. It catches up
 * gracefully when the buffer runs ahead, and finishes promptly the moment
 * the stream ends — so it always feels snappy, never laggy.
 */

const REVEAL_CPS = 420;
const FLUSH_CPS = 1800;
const CATCHUP_THRESHOLD = 90;

function useTypewriter(full: string, streaming: boolean): number {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  const fullRef = useRef(full);
  const streamingRef = useRef(streaming);
  const countRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const accRef = useRef(0);

  fullRef.current = full;
  streamingRef.current = streaming;

  const instant = reduced || full.length < count;

  useEffect(() => {
    if (instant) {
      countRef.current = full.length;
      accRef.current = 0;
      setCount(full.length);
      return;
    }

    const tick = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dtMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const target = fullRef.current.length;
      const current = countRef.current;
      const remaining = target - current;

      if (remaining <= 0) {
        accRef.current = 0;
        lastTsRef.current = null;
        rafRef.current = null;
        return;
      }

      let cps = streamingRef.current ? REVEAL_CPS : FLUSH_CPS;
      if (streamingRef.current && remaining > CATCHUP_THRESHOLD) {
        cps += (remaining - CATCHUP_THRESHOLD) * 14;
      }

      accRef.current += (dtMs / 1000) * cps;
      let advance = Math.floor(accRef.current);

      if (advance >= 1) {
        accRef.current -= advance;
        if (advance > remaining) advance = remaining;
        const next = current + advance;
        countRef.current = next;
        setCount(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    if (countRef.current < full.length && rafRef.current === null) {
      lastTsRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
    };
  }, [full.length, full, streaming, instant]);

  return instant ? full.length : count;
}

/* ─── Typing cursor ──────────────────────────────────────────────── */

function Cursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1.05em] bg-white/45
                 ml-[1px] -mb-[0.12em] align-baseline rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.85, 0.15, 0.85] }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 1.05, repeat: Infinity, ease: "easeInOut" },
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Message bubble ─────────────────────────────────────────────── */

function MessageRow({
  msg,
  isStreaming,
}: {
  msg: ChatMessage & { id: string };
  isStreaming: boolean;
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-7`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      {isUser ? (
        <div
          className="max-w-[72%] md:max-w-[60%] px-5 py-3 rounded-2xl
                     bg-white/[0.06] border border-white/[0.09]"
        >
          <p className="text-[15px] font-[360] leading-[1.78] text-white/72
                        whitespace-pre-wrap">
            {msg.content}
          </p>
        </div>
      ) : (
        <AssistantMessage content={msg.content} isStreaming={isStreaming} />
      )}
    </motion.div>
  );
}

/* ─── Assistant message — typewriter-revealed prose ──────────────── */

function AssistantMessage({
  content,
  isStreaming,
}: {
  content: string;
  isStreaming: boolean;
}) {
  const revealed = useTypewriter(content, isStreaming);
  const text = content.slice(0, revealed);
  const showCursor = isStreaming || revealed < content.length;

  return (
    <div className="max-w-[84%] md:max-w-[75%]">
      <p className="text-[10px] font-[500] tracking-[0.28em] uppercase
                     text-white/18 mb-3 ml-1">
        Max Klein · AI
      </p>
      <div
        className="text-[15.5px] font-[340] leading-[1.94] text-white/62
                    whitespace-pre-wrap"
      >
        {text}
        <AnimatePresence>{showCursor && <Cursor key="caret" />}</AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Suggested prompt pill ──────────────────────────────────────── */

function SuggestedPill({
  text,
  onClick,
  index,
}: {
  text: string;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="text-left px-4 py-3 rounded-xl border border-white/[0.07]
                 bg-white/[0.02] text-[12.5px] font-[360] leading-[1.6]
                 text-white/32 hover:text-white/58 hover:border-white/[0.14]
                 hover:bg-white/[0.04] transition-all duration-250
                 cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 + 0.1 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.button>
  );
}

/* ─── Empty state ────────────────────────────────────────────────── */

function EmptyState({
  eyebrow,
  title,
  subtitle,
  prompts,
  onSelect,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  prompts: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full
                 px-4 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <motion.p
        className="text-[10px] font-[500] tracking-[0.34em] uppercase
                   text-white/16 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-[255]
                   tracking-[-0.03em] leading-[1.1] text-white/70
                   mb-5 max-w-[480px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.08 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-[14px] font-[340] leading-[1.82] text-white/26
                   max-w-[380px] mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
      >
        {subtitle}
      </motion.p>

      <div className="w-full max-w-[560px] grid grid-cols-1 gap-2.5">
        {prompts.map((p, i) => (
          <SuggestedPill key={i} text={p} index={i} onClick={() => onSelect(p)} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Chat hook ──────────────────────────────────────────────────── */

type MsgWithId = ChatMessage & { id: string };

function useChat() {
  const [messages, setMessages] = useState<MsgWithId[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const uid = () => Math.random().toString(36).slice(2, 9);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);

    const userMsg: MsgWithId = { id: uid(), role: "user", content: trimmed };
    const assistantId = uid();
    const assistantMsg: MsgWithId = { id: assistantId, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreaming(true);
    setStreamingId(assistantId);

    const history: ChatMessage[] = [
      ...messages.map(({ role, content }) => ({ role, content })),
      { role: "user", content: trimmed },
    ];

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snap = accumulated;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: snap } : m))
        );
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
      setStreamingId(null);
      abortRef.current = null;
    }
  }, [messages, streaming]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setStreaming(false);
    setStreamingId(null);
    setError(null);
  }, []);

  return { messages, input, setInput, streaming, streamingId, error, send, reset };
}

/* ─── ChatExperience ─────────────────────────────────────────────── */

export default function ChatExperience({
  eyebrow = "AI Interface",
  title = "Ask me anything.",
  emptyTitle = "Ask me anything.",
  emptySubtitle = "An AI trained on my work, thinking, and background. Ask about my projects, views, or what I'm building.",
  inputPlaceholder = "Ask me anything…",
  suggestedPrompts = DEFAULT_PROMPTS,
  metaHint = "Powered by Claude · Shift+Enter for new line",
}: {
  eyebrow?: string;
  title?: string;
  emptyTitle?: string;
  emptySubtitle?: string;
  inputPlaceholder?: string;
  suggestedPrompts?: string[];
  metaHint?: string;
}) {
  const {
    messages,
    input,
    setInput,
    streaming,
    streamingId,
    error,
    send,
    reset,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <main
      className="relative flex flex-col bg-black min-h-screen"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >

      {/* ── Background ────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -top-48 -right-24 w-[700px] h-[700px] rounded-full
                        bg-violet-600/[0.07] blur-[160px] animate-drift-a" />
        <div className="absolute -bottom-48 -left-24 w-[600px] h-[600px] rounded-full
                        bg-indigo-600/[0.05] blur-[150px] animate-drift-b" />
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute inset-0
                        bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,transparent_15%,#000_100%)]" />
      </div>

      {/* ── Header bar ────────────────────────────────────────── */}
      <Reveal className="relative z-20 flex-shrink-0">
        <div className="flex items-center justify-between
                        px-6 md:px-10 pt-28 pb-6">
          <div>
            <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                          text-white/18 mb-1.5">
              {eyebrow}
            </p>
            <h1 className="text-[clamp(1.1rem,2.2vw,1.6rem)] font-[270]
                           tracking-[-0.02em] text-white/72">
              {title}
            </h1>
          </div>

          {hasMessages && (
            <motion.button
              onClick={reset}
              className="flex items-center gap-2 text-[11px] font-[440]
                         tracking-[0.12em] uppercase text-white/20
                         hover:text-white/45 transition-colors duration-250
                         border border-white/[0.07] hover:border-white/[0.14]
                         rounded-lg px-3 py-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease }}
              whileTap={{ scale: 0.96 }}
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M2 6a4 4 0 1 0 4-4 4 4 0 0 0-3.46 2"
                      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M2.5 2.5V5h2.5" stroke="currentColor"
                      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              New
            </motion.button>
          )}
        </div>

        {/* Divider */}
        <div className="mx-6 md:mx-10 h-px bg-white/[0.06]" />
      </Reveal>

      {/* ── Message area ──────────────────────────────────────── */}
      <div className="relative z-10 flex-1 overflow-y-auto
                      px-6 md:px-10 pt-6 pb-2
                      [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <div className="max-w-[720px] mx-auto">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <EmptyState
                key="empty"
                eyebrow={eyebrow}
                title={emptyTitle}
                subtitle={emptySubtitle}
                prompts={suggestedPrompts}
                onSelect={(t) => { setInput(t); send(t); }}
              />
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {messages.map((msg) => (
                  <MessageRow
                    key={msg.id}
                    msg={msg}
                    isStreaming={streaming && msg.id === streamingId}
                  />
                ))}

                {/* Error state */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl
                                 border border-red-500/15 bg-red-500/[0.04]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-[13px] font-[380] text-red-400/60 leading-[1.7]">
                        {error} — Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} className="h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Input bar ─────────────────────────────────────────── */}
      <div className="relative z-20 flex-shrink-0 px-6 md:px-10 pb-8 pt-4">

        {/* Gradient fade above input */}
        <div className="absolute left-0 right-0 -top-12 h-12
                        bg-gradient-to-t from-black to-transparent
                        pointer-events-none" />

        <div className="max-w-[720px] mx-auto">
          <form onSubmit={handleSubmit}>
            <div
              className="relative flex items-end gap-3 rounded-2xl border
                         border-white/[0.09] bg-white/[0.03]
                         px-5 py-4 transition-all duration-300
                         focus-within:border-white/[0.16]
                         focus-within:bg-white/[0.045]"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={inputPlaceholder}
                disabled={streaming}
                rows={1}
                aria-label="Message input"
                className="flex-1 resize-none bg-transparent border-none outline-none
                           text-[14.5px] font-[350] leading-[1.75] text-white/70
                           placeholder:text-white/18
                           disabled:opacity-40 disabled:cursor-not-allowed
                           [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              />

              <motion.button
                type="submit"
                disabled={!input.trim() || streaming}
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
                           bg-white/[0.08] border border-white/[0.12]
                           text-white/40 hover:text-white/70 hover:bg-white/[0.12]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-200"
                aria-label="Send message"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.15 }}
              >
                {streaming ? (
                  <motion.span
                    className="w-[5px] h-[5px] rounded-full bg-white/50"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                ) : (
                  <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
                    <path d="M7 11.5V2.5M2.5 7l4.5-4.5L11.5 7"
                          stroke="currentColor" strokeWidth="1.4"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Meta hint */}
            <p className="mt-2.5 text-[10px] font-[400] tracking-[0.05em]
                          text-white/12 text-center">
              {metaHint}
            </p>
          </form>
        </div>
      </div>

    </main>
  );
}
