"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AmbientBackground from "@/components/ui/AmbientBackground";

/* ─── Constants ──────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Motion primitives ──────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-56px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.84, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={`h-px bg-white/[0.07] origin-left ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.2, ease, delay }}
    />
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */

interface FocusArea {
  id: string;
  domain: string;
  headline: string;
  description: string;
  intensity: 1 | 2 | 3;
  status: "active" | "exploring" | "forming";
}

interface Book {
  title: string;
  author: string;
  note: string;
  status: "reading" | "ongoing" | "next";
}

interface Obsession {
  label: string;
  weight: 1 | 2 | 3;
}

interface Principle {
  numeral: string;
  text: string;
  reflection: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: "01",
    domain: "AI & Systems",
    headline: "Autonomous systems and the architecture of intelligence infrastructure",
    description:
      "Studying how agent frameworks, large language models, and autonomous workflows are reshaping the structure of knowledge work — and what that implies for every industry built on human judgment.",
    intensity: 3,
    status: "active",
  },
  {
    id: "02",
    domain: "Finance & Markets",
    headline: "The next generation of financial infrastructure",
    description:
      "Examining where traditional financial systems are most structurally fragile, and where AI-native financial products will create the most durable, compounding value over the next decade.",
    intensity: 3,
    status: "active",
  },
  {
    id: "03",
    domain: "Building & Innovation",
    headline: "The craft and psychology of building enduring technology companies",
    description:
      "Studying founding narratives, product philosophy, and the long-arc strategic decisions behind companies that defined categories — and which patterns apply to the next generation of builders.",
    intensity: 2,
    status: "active",
  },
  {
    id: "04",
    domain: "Long-Term Thinking",
    headline: "Compounding effort, patience, and the leverage of time horizons",
    description:
      "Exploring how the most durable careers and companies share a common operating principle: they were built slowly, with an unusually long time horizon and indifference to short-term perception.",
    intensity: 2,
    status: "exploring",
  },
  {
    id: "05",
    domain: "Discipline & Performance",
    headline: "The systems behind sustained elite performance over years",
    description:
      "Competing at Division I level has been the most rigorous laboratory for understanding how habits, recovery, pressure, and identity compound across thousands of repetitions.",
    intensity: 3,
    status: "active",
  },
];

const READING: Book[] = [
  {
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    note: "Mental models, latticework thinking, and the philosophy behind a lifetime of compound intellectual effort and independent judgment.",
    status: "reading",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    note: "On monopoly, secrets, and the precise kind of courage required to build something genuinely new rather than incrementally better.",
    status: "reading",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    note: "The operating system. Returned to repeatedly — each reading finds something the previous one missed.",
    status: "ongoing",
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    note: "How disruption happens from below — and why established institutions are almost always the last to see it coming.",
    status: "next",
  },
];

const CONCEPTS: string[] = [
  "Agentic AI workflows",
  "Reflexive capital allocation",
  "Second-order effects in markets",
  "Compounding and non-linearity",
  "Systems thinking and feedback loops",
  "Stoic decision frameworks",
  "Network effects at global scale",
  "Endogenous vs. exogenous risk",
];

const OBSESSIONS: Obsession[] = [
  { label: "Agentic AI",              weight: 3 },
  { label: "Compounding",             weight: 3 },
  { label: "Financial Infrastructure",weight: 3 },
  { label: "Long-Term Orientation",   weight: 3 },
  { label: "Systems Architecture",    weight: 2 },
  { label: "Venture Capital",         weight: 2 },
  { label: "Mental Models",           weight: 2 },
  { label: "Founder Psychology",      weight: 2 },
  { label: "Autonomous Systems",      weight: 2 },
  { label: "Stoic Philosophy",        weight: 2 },
  { label: "Global Markets",          weight: 1 },
  { label: "Macro Trends",            weight: 1 },
  { label: "Productivity Systems",    weight: 1 },
  { label: "Technology Infrastructure",weight: 1 },
];

const PRINCIPLES: Principle[] = [
  {
    numeral: "I",
    text: "Discipline compounds.",
    reflection:
      "The most powerful force in personal development is not intensity — it is the unbroken accumulation of consistent effort across time. Intensity is easy. Consistency is rare.",
  },
  {
    numeral: "II",
    text: "The future belongs to builders.",
    reflection:
      "Not observers. Not commentators. People who create what does not yet exist, and who are willing to spend years — sometimes decades — doing so without guarantee.",
  },
  {
    numeral: "III",
    text: "Long-term thinking creates leverage.",
    reflection:
      "The single most underrated competitive advantage in any domain is the willingness to operate with a time horizon that most others cannot or will not sustain.",
  },
  {
    numeral: "IV",
    text: "Think clearly. Act slowly. Build deliberately.",
    reflection:
      "Quality of judgment over speed of action. The right decision, made slowly and with full conviction, almost always outperforms the fast decision made under pressure.",
  },
];

/* ─── Sub-components ─────────────────────────────────────────────── */

function IntensityDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`Intensity ${level} of 3`}>
      {([1, 2, 3] as const).map((i) => (
        <div
          key={i}
          className={`w-[4px] h-[4px] rounded-full transition-all ${
            i <= level ? "bg-white/45" : "bg-white/[0.1]"
          }`}
        />
      ))}
    </div>
  );
}

function StatusChip({ status }: { status: FocusArea["status"] }) {
  const config = {
    active:    { dot: "bg-emerald-400/60",  text: "text-emerald-400/45",  label: "Active" },
    exploring: { dot: "bg-amber-400/50",    text: "text-amber-400/40",    label: "Exploring" },
    forming:   { dot: "bg-white/20",        text: "text-white/22",        label: "Forming" },
  }[status];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${config.dot}`} />
      <span className={`text-[10px] font-[500] tracking-[0.2em] uppercase ${config.text}`}>
        {config.label}
      </span>
    </span>
  );
}

function FocusEntry({ item, index }: { item: FocusArea; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.div
      ref={ref}
      className="group relative border-l border-white/[0.07] pl-7 md:pl-9
                 py-8 md:py-9 hover:border-white/[0.14] transition-colors duration-400"
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.78, ease, delay: index * 0.07 }}
    >
      {/* Node on the line */}
      <motion.div
        className="absolute -left-[4.5px] top-[38px] w-[8px] h-[8px]
                   rounded-full border border-white/[0.2] bg-black"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease, delay: index * 0.07 + 0.1 }}
      />

      {/* Top meta */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px]
                         font-[500] tracking-[0.2em] text-white/18">
          {item.id}
        </span>
        <span className="w-px h-3 bg-white/[0.08]" />
        <span className="text-[10px] font-[500] tracking-[0.26em] uppercase text-white/24">
          {item.domain}
        </span>
        <span className="w-px h-3 bg-white/[0.08]" />
        <StatusChip status={item.status} />
        <span className="ml-auto">
          <IntensityDots level={item.intensity} />
        </span>
      </div>

      {/* Headline */}
      <h3
        className="text-[clamp(1.1rem,2.1vw,1.55rem)] font-[300]
                   tracking-[-0.018em] leading-[1.3] text-white/72
                   mb-4 max-w-[620px]
                   group-hover:text-white/82 transition-colors duration-300"
      >
        {item.headline}
      </h3>

      {/* Description */}
      <p className="text-[15px] font-[340] leading-[1.86] text-white/30
                   max-w-[560px]">
        {item.description}
      </p>
    </motion.div>
  );
}

function BookEntry({ book, index }: { book: Book; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const statusConfig = {
    reading: { label: "Reading",  color: "text-emerald-400/40 border-emerald-400/20" },
    ongoing: { label: "Ongoing",  color: "text-violet-400/40  border-violet-400/20" },
    next:    { label: "Up Next",  color: "text-white/20        border-white/[0.1]" },
  }[book.status];

  return (
    <motion.div
      ref={ref}
      className="py-7 border-b border-white/[0.06] first:border-t"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease, delay: index * 0.09 }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <p className="text-[17px] font-[380] tracking-[-0.01em] text-white/70 italic">
              {book.title}
            </p>
            <p className="text-[11px] font-[440] tracking-[0.18em] uppercase text-white/22">
              {book.author}
            </p>
          </div>
          <p className="text-[13.5px] font-[340] leading-[1.8] text-white/28">
            {book.note}
          </p>
        </div>
        <span
          className={`flex-shrink-0 mt-0.5 text-[10px] font-[480] tracking-[0.18em]
                      uppercase border rounded-lg px-2.5 py-1.5 ${statusConfig.color}`}
        >
          {statusConfig.label}
        </span>
      </div>
    </motion.div>
  );
}

function ObsessionWord({
  label,
  weight,
  index,
}: {
  label: string;
  weight: 1 | 2 | 3;
  index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const sizeMap = { 1: "text-[12px]", 2: "text-[14.5px]", 3: "text-[19px]" };
  const opacityMap = { 1: "text-white/16", 2: "text-white/32", 3: "text-white/56" };
  const weightMap = { 1: "font-[340]", 2: "font-[380]", 3: "font-[420]" };
  const trackMap = { 1: "tracking-[0.07em]", 2: "tracking-[0.04em]", 3: "tracking-[0.02em]" };

  return (
    <motion.span
      ref={ref}
      className={`${sizeMap[weight]} ${opacityMap[weight]} ${weightMap[weight]} ${trackMap[weight]}
                  hover:text-white/60 transition-colors duration-300 cursor-default`}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.04 + 0.05 }}
    >
      {label}
    </motion.span>
  );
}

function PrincipleEntry({ principle, index }: { principle: Principle; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[64px_1fr] gap-4 md:gap-10 py-9
                 border-b border-white/[0.06] first:border-t"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.76, ease, delay: index * 0.1 }}
    >
      {/* Roman numeral */}
      <div className="pt-1">
        <span
          className="font-[family-name:var(--font-geist-mono)] text-[11px]
                     font-[600] tracking-[0.14em] text-white/14"
        >
          {principle.numeral}
        </span>
      </div>

      {/* Content */}
      <div>
        <p
          className="text-[clamp(1.1rem,2vw,1.5rem)] font-[320]
                     tracking-[-0.015em] leading-[1.25] text-white/70 mb-4"
        >
          {principle.text}
        </p>
        <p className="text-[14px] font-[340] leading-[1.84] text-white/25 max-w-[500px]">
          {principle.reflection}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function NowPage() {
  return (
    <main
      className="relative bg-black min-h-screen overflow-hidden"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >

      {/* ══════════════════════════════════════════════════════════
          BACKGROUND
      ══════════════════════════════════════════════════════════ */}
      <AmbientBackground />

      <div className="relative z-10">

        {/* ══════════════════════════════════════════════════════
            §1  HERO
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 pt-44 pb-8">
          <div className="max-w-[1080px] mx-auto w-full">

            <Reveal delay={0}>
              <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
                <p className="text-[10px] font-[500] tracking-[0.36em] uppercase text-white/18">
                  Now — Max Klein
                </p>
                {/* Active indicator */}
                <div className="inline-flex items-center gap-2.5">
                  <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full
                                     rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-[6px] w-[6px]
                                     rounded-full bg-emerald-400/70" />
                  </span>
                  <span className="text-[10px] font-[480] tracking-[0.2em] uppercase
                                   text-white/20">
                    Updated — May 2026
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Giant "Now" — the statement itself is the design */}
            <div className="relative mb-10">
              <Reveal delay={0.04} y={50}>
                <h1
                  className="text-now-hero font-[220] tracking-tighter leading-none
                             text-white/[0.07] select-none"
                  aria-hidden="true"
                >
                  Now
                </h1>
              </Reveal>
              <Reveal delay={0.14} y={24} className="absolute bottom-5 left-1 md:left-2">
                <p
                  className="text-[clamp(1.1rem,2.2vw,1.8rem)] font-[300]
                             tracking-[-0.01em] leading-[1.45] text-white/55
                             max-w-[520px]"
                >
                  A snapshot of what currently holds my attention — ideas, systems,
                  disciplines, and directions shaping the next chapter.
                </p>
              </Reveal>
            </div>

            {/* Spacer needed because the text is absolute */}
            <div className="h-28 md:h-20" />

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §2  CURRENT FOCUS
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20">

              {/* Left label */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                              text-white/18 mb-5">
                  Current Focus
                </p>
                <h2 className="text-now-section font-[275] text-white/65 mb-5">
                  What holds my attention right now.
                </h2>
                <p className="text-[14px] font-[340] leading-[1.82] text-white/22">
                  Five areas where the majority of my intellectual energy
                  is directed at this point in time.
                </p>
              </Reveal>

              {/* Right — focus list */}
              <div className="space-y-0">
                {FOCUS_AREAS.map((item, i) => (
                  <FocusEntry key={item.id} item={item} index={i} />
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §3  CURRENTLY READING
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24"
                 style={{ background: "rgba(255,255,255,0.013)" }}>
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20">

              {/* Left label */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                              text-white/18 mb-5">
                  Reading & Learning
                </p>
                <h2 className="text-now-section font-[275] text-white/65 mb-5">
                  The intellectual diet.
                </h2>
                <p className="text-[14px] font-[340] leading-[1.82] text-white/22">
                  Books, frameworks, and ideas currently shaping
                  how I see the world.
                </p>
              </Reveal>

              {/* Right — reading list */}
              <div>
                {READING.map((book, i) => (
                  <BookEntry key={book.title} book={book} index={i} />
                ))}

                {/* Concepts block */}
                <Reveal delay={0.1} className="mt-12">
                  <p className="text-[10px] font-[500] tracking-[0.3em] uppercase
                                text-white/16 mb-7">
                    Concepts Under Active Exploration
                  </p>
                  <div className="space-y-3.5">
                    {CONCEPTS.map((concept, i) => (
                      <motion.div
                        key={concept}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.55, ease, delay: i * 0.055 + 0.06 }}
                      >
                        <span className="w-1 h-1 rounded-full bg-white/18 flex-shrink-0" />
                        <span className="text-[13.5px] font-[350] text-white/28
                                         tracking-[0.02em]">
                          {concept}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §4  CURRENT OBSESSIONS
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <Reveal className="mb-12">
              <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                            text-white/18 mb-5">
                Current Obsessions
              </p>
              <p className="text-[14px] font-[340] leading-[1.82] text-white/22 max-w-[380px]">
                Topics that occupy an unusual amount of mental space.
                Size reflects current intensity.
              </p>
            </Reveal>

            {/* Typographic scatter — larger words interleaved with smaller ones */}
            <Reveal delay={0.06}>
              <div className="flex flex-wrap gap-x-7 gap-y-5 max-w-[780px]">
                {OBSESSIONS.map((item, i) => (
                  <ObsessionWord
                    key={item.label}
                    label={item.label}
                    weight={item.weight}
                    index={i}
                  />
                ))}
              </div>
            </Reveal>

            {/* Horizontal separator with label */}
            <Reveal delay={0.18} className="mt-14">
              <div className="flex items-center gap-5">
                <div className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-[9px] font-[480] tracking-[0.34em] uppercase
                                 text-white/14 flex-shrink-0">
                  Actively evolving
                </span>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §5  OPERATING PRINCIPLES
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24"
                 style={{ background: "rgba(255,255,255,0.013)" }}>
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20">

              {/* Left label */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                              text-white/18 mb-5">
                  Operating Principles
                </p>
                <h2 className="text-now-section font-[275] text-white/65 mb-5">
                  The rules I try to live by.
                </h2>
                <p className="text-[14px] font-[340] leading-[1.82] text-white/22">
                  Refined slowly. Held firmly. Revisited often.
                </p>
              </Reveal>

              {/* Right — principles */}
              <div>
                {PRINCIPLES.map((p, i) => (
                  <PrincipleEntry key={p.numeral} principle={p} index={i} />
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §6  WHAT'S NEXT — Closing
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 pt-16 pb-44">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            {/* Ghost anchor */}
            <Reveal y={50} delay={0.04}>
              <p
                className="text-now-ghost font-[225] tracking-tighter
                           leading-none text-white/[0.038] select-none"
                aria-hidden="true"
              >
                Present.
              </p>
            </Reveal>

            {/* Closing statement */}
            <Reveal delay={0.14} y={26} className="-mt-3 md:-mt-7 lg:-mt-10">
              <p
                className="text-[clamp(1.55rem,3.2vw,2.75rem)] font-[270]
                           tracking-[-0.026em] leading-[1.23]
                           text-white/68 max-w-[720px] mb-10"
              >
                This page reflects where I am right now — not where I started,
                and not yet where I am going. Both of those are still being written.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="text-[16.5px] font-[340] leading-[1.9]
                            text-white/26 max-w-[460px] mb-14">
                The "Now" page is updated periodically as focus areas shift,
                reading changes, and thinking evolves. Last updated: May 2026.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <motion.a
                  href="mailto:max.klein05@outlook.com"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                             bg-white text-black text-[13px] font-[510] tracking-[0.02em]"
                  whileHover={{ scale: 1.025, backgroundColor: "rgba(230,230,230,1)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18, ease }}
                >
                  Get in Touch
                  <svg viewBox="0 0 13 13" fill="none" className="w-3 h-3" aria-hidden="true">
                    <path
                      d="M2 6.5h9M7.5 2.5l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
                <Link
                  href="/about"
                  className="text-[13px] font-[380] text-white/22
                             hover:text-white/50 transition-colors duration-250
                             tracking-[0.03em]"
                >
                  Read my story →
                </Link>
              </div>
            </Reveal>

            {/* Footer meta */}
            <Reveal delay={0.4} className="mt-24 pt-10 border-t border-white/[0.05]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center
                              justify-between gap-4">
                <p className="text-[11px] font-[400] tracking-[0.18em] uppercase text-white/12">
                  Max Klein — Now — May 2026
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-emerald-400/40" />
                  <p className="text-[11px] font-[400] tracking-[0.12em] text-white/12">
                    {FOCUS_AREAS.filter((f) => f.status === "active").length} active focus areas
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

      </div>
    </main>
  );
}
