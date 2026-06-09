"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { ease } from "@/lib/motion";
import { Reveal, RevealLine } from "@/components/ui/Reveal";
import AmbientBackground from "@/components/ui/AmbientBackground";

/* ─── Data ───────────────────────────────────────────────────────── */

type Status = "ongoing" | "completed" | "forming";

interface Experience {
  id: string;
  period: string;
  category: string;
  environment: string;
  context: string;
  tags: string[];
  reflection: string;
  status: Status;
}

const EXPERIENCES: Experience[] = [
  {
    id: "01",
    period: "2021 — Present",
    category: "Athletics",
    environment: "Division I Student-Athlete",
    context:
      "Competing at the highest collegiate level demands a particular relationship with time, failure, and the compounding returns of consistent effort. Soccer taught me that meaningful progress is rarely dramatic — it is built through repetition, resilience, and a relentless obsession with marginal improvement.",
    tags: ["Discipline", "High Performance", "Long-Term Orientation"],
    reflection:
      "The game is long. Playing it that way changes how you approach everything.",
    status: "ongoing",
  },
  {
    id: "02",
    period: "2023",
    category: "Finance",
    environment: "Audit & Financial Assurance",
    context:
      "Exposure to how large organizations verify, report, and account for the truth. Audit reveals the gap between how institutions present themselves and how they actually operate — a perspective that permanently sharpens judgment about trust, rigor, and the integrity of systems.",
    tags: ["Financial Reporting", "Internal Controls", "Regulatory Framework"],
    reflection:
      "Every institution has a story it tells itself. Audit teaches you to read between the lines.",
    status: "completed",
  },
  {
    id: "03",
    period: "2023 — 2024",
    category: "Finance",
    environment: "Private Banking",
    context:
      "Wealth management and institutional client advisory at the highest tier of financial services. Working with high-net-worth individuals and institutional portfolios exposed me to how capital moves at scale, how it compounds across generations, and how the world's most sophisticated allocators think about risk, trust, and time.",
    tags: ["Wealth Management", "Portfolio Advisory", "Capital Allocation"],
    reflection:
      "Capital, at its core, is deferred trust. The best allocators understand both deeply.",
    status: "completed",
  },
  {
    id: "04",
    period: "2024",
    category: "Consulting",
    environment: "Real Estate Consulting",
    context:
      "Market analysis, asset valuation, and strategic advisory across property investment decisions. Real estate sits at the intersection of capital allocation, demographic trends, and behavioral finance — one of the world's most information-dense markets, disguised as a physical asset class.",
    tags: ["Market Analysis", "Asset Valuation", "Investment Strategy"],
    reflection:
      "The most interesting decisions in real estate are rarely about the property itself.",
    status: "completed",
  },
  {
    id: "05",
    period: "2025 — Present",
    category: "Innovation",
    environment: "Technology & Entrepreneurship",
    context:
      "Moving from understanding existing systems to questioning their fundamental architecture. Building at the intersection of AI, finance, and global markets — exploring where the next generation of financial and technological infrastructure will emerge, and who will design it.",
    tags: ["Artificial Intelligence", "Systems Design", "Entrepreneurship"],
    reflection:
      "The best time to understand a system is just before you decide to replace it.",
    status: "ongoing",
  },
];

const STAT_ITEMS = [
  { value: "3", label: "Industries" },
  { value: "D·I", label: "Athletics", mono: true },
  { value: "4+", label: "Countries" },
  { value: "∞", label: "Long-term", mono: true },
];

/* ─── Sub-components ─────────────────────────────────────────────── */

function StatusBadge({ status }: { status: Status }) {
  if (status === "ongoing") {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-[6px] w-[6px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-400/70" />
        </span>
        <span className="text-[10px] font-[500] tracking-[0.22em] uppercase text-emerald-400/50">
          Ongoing
        </span>
      </span>
    );
  }
  if (status === "forming") {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-amber-400/50" />
        <span className="text-[10px] font-[500] tracking-[0.22em] uppercase text-amber-400/40">
          Forming
        </span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-[6px] h-[6px] rounded-full bg-white/15" />
      <span className="text-[10px] font-[500] tracking-[0.22em] uppercase text-white/18">
        Completed
      </span>
    </span>
  );
}

function TimelineNode({ status, index }: { status: Status; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const isOngoing = status === "ongoing";

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 mt-[6px]"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease, delay: index * 0.06 + 0.1 }}
    >
      {isOngoing && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 rounded-full bg-emerald-500/10 animate-ping" />
        </span>
      )}
      <div
        className={`relative w-[9px] h-[9px] rounded-full border
          ${
            isOngoing
              ? "bg-emerald-500/30 border-emerald-500/50"
              : "bg-white/[0.07] border-white/[0.18]"
          }`}
      />
    </motion.div>
  );
}

function ExperienceEntry({
  exp,
  index,
  isLast,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">

      {/* Left spine column */}
      <div className="flex flex-col items-center flex-shrink-0 w-[9px]">
        <TimelineNode status={exp.status} index={index} />
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-3 origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease, delay: index * 0.08 + 0.3 }}
          />
        )}
      </div>

      {/* Entry content */}
      <div className={`flex-1 pb-20 md:pb-24 ${isLast ? "pb-0" : ""}`}>

        {/* Top meta row */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: index * 0.07 + 0.06 }}
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[10.5px]
                           font-[500] tracking-[0.18em] text-white/22">
            {exp.period}
          </span>
          <span className="w-px h-3 bg-white/[0.1]" />
          <span className="text-[10px] font-[500] tracking-[0.24em] uppercase text-white/20">
            {exp.category}
          </span>
          <span className="w-px h-3 bg-white/[0.1]" />
          <StatusBadge status={exp.status} />
        </motion.div>

        {/* Ghost chapter number */}
        <div className="relative">
          <motion.p
            className="font-[family-name:var(--font-geist-mono)] font-[700]
                       leading-none tracking-tighter text-white/[0.04]
                       select-none absolute -top-2 left-0"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease, delay: index * 0.08 + 0.1 }}
            aria-hidden="true"
          >
            {exp.id}
          </motion.p>

          {/* Role / Environment */}
          <motion.h2
            className="text-exp-role font-[285] text-white/80 mb-6 relative z-10
                       pt-2 max-w-[640px]"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.78, ease, delay: index * 0.07 + 0.12 }}
          >
            {exp.environment}
          </motion.h2>
        </div>

        {/* Context paragraph */}
        <motion.p
          className="text-[16.5px] font-[340] leading-[1.88] text-white/38
                     max-w-[580px] mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease, delay: index * 0.07 + 0.18 }}
        >
          {exp.context}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-9"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease, delay: index * 0.07 + 0.24 }}
        >
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-[7px] rounded-lg border border-white/[0.07]
                         bg-white/[0.025] text-white/28 text-[11px]
                         font-[420] tracking-[0.06em]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Reflection quote */}
        <motion.div
          className="border-l border-white/[0.09] pl-6"
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: index * 0.07 + 0.3 }}
        >
          <p className="text-[14.5px] font-[340] leading-[1.82]
                         text-white/24 italic max-w-[460px]">
            "{exp.reflection}"
          </p>
        </motion.div>

      </div>
    </div>
  );
}

/* ─── Scroll-driven timeline spine ───────────────────────────────── */

function TimelineSpine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      className="absolute left-0 top-0 w-px origin-top"
      style={{
        height: "100%",
        scaleY,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(139,92,246,0.12), rgba(255,255,255,0.04))",
      }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

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
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 pt-44 pb-20">
          <div className="max-w-[1080px] mx-auto w-full">

            <Reveal delay={0}>
              <p className="text-[10px] font-[500] tracking-[0.36em] uppercase
                            text-white/18 mb-14">
                Experience — Max Klein
              </p>
            </Reveal>

            {/* Ghost / headline overlap */}
            <div className="relative mb-6">
              <Reveal delay={0.04} y={44}>
                <p
                  className="text-exp-ghost font-[220] tracking-tighter
                             leading-none text-white/[0.035] select-none"
                  aria-hidden="true"
                >
                  Trajectory
                </p>
              </Reveal>
              <Reveal delay={0.12} y={26} className="absolute bottom-0 left-0 pb-3">
                <h1 className="text-exp-hero font-[265] text-white/85">
                  Experience
                </h1>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-8">
              <p className="text-[17px] font-[340] leading-[1.88] text-white/30
                            max-w-[500px]">
                Exploring systems, industries, and environments that shape how
                the world builds, allocates capital, and scales innovation.
              </p>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.28} className="mt-14">
              <div className="flex items-center gap-0 flex-wrap">
                {STAT_ITEMS.map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    <div className="px-6 py-4 first:pl-0">
                      <p
                        className={`leading-none text-white/55 mb-1.5
                          ${s.mono
                            ? "font-[family-name:var(--font-geist-mono)] text-[1.5rem] font-[700] tracking-tight"
                            : "text-[2rem] font-[260] tracking-[-0.03em]"
                          }`}
                      >
                        {s.value}
                      </p>
                      <p className="text-[10px] font-[440] tracking-[0.22em]
                                    uppercase text-white/18">
                        {s.label}
                      </p>
                    </div>
                    {i < STAT_ITEMS.length - 1 && (
                      <div className="w-px h-8 bg-white/[0.07]" />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-20 md:py-24">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <Reveal delay={0.04}>
              <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                            text-white/18 mb-16">
                Chapters of Growth — {EXPERIENCES.length} Environments
              </p>
            </Reveal>

            {/* Timeline container */}
            <div
              ref={timelineRef}
              className="relative pl-6 md:pl-8"
            >
              {/* Scroll-driven spine */}
              <TimelineSpine containerRef={timelineRef as React.RefObject<HTMLDivElement>} />

              {/* Entries */}
              {EXPERIENCES.map((exp, i) => (
                <ExperienceEntry
                  key={exp.id}
                  exp={exp}
                  index={i}
                  isLast={i === EXPERIENCES.length - 1}
                />
              ))}

              {/* Future chapter — ghosted */}
              <div className="relative flex gap-6 md:gap-10 mt-4">
                <div className="flex flex-col items-center flex-shrink-0 w-[9px] pt-[5px]">
                  <div className="w-[9px] h-[9px] rounded-full border border-dashed
                                   border-white/[0.15] bg-transparent" />
                </div>
                <Reveal className="flex-1 pb-4" delay={0.06}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[10.5px]
                                     font-[500] tracking-[0.18em] text-white/14">
                      2026 — ?
                    </span>
                    <span className="w-px h-3 bg-white/[0.07]" />
                    <span className="text-[10px] font-[500] tracking-[0.24em]
                                     uppercase text-white/14">
                      Ventures
                    </span>
                  </div>
                  <h2 className="text-[clamp(1.4rem,2.8vw,2.4rem)] font-[265]
                                  tracking-[-0.025em] text-white/18 mb-4">
                    Next Chapter
                  </h2>
                  <p className="text-[14.5px] font-[340] leading-[1.82]
                                 text-white/14 max-w-[440px]">
                    Building at the frontier of AI and financial infrastructure.
                    Further details forthcoming.
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            THE THROUGH-LINE — editorial reflection
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 py-20 md:py-28"
                 style={{ background: "rgba(255,255,255,0.014)" }}>
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">

              {/* Left */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase
                              text-white/18 mb-6">
                  The Through-Line
                </p>
                <p className="text-[15px] font-[340] leading-[1.85] text-white/26">
                  Each environment was a different lens on the same underlying question:
                  how do complex systems actually work — and how could they be rebuilt?
                </p>
              </Reveal>

              {/* Right */}
              <div className="space-y-6">
                <Reveal delay={0.08}>
                  <p className="text-[clamp(1.3rem,2.6vw,2.1rem)] font-[275]
                                 tracking-[-0.022em] leading-[1.35] text-white/60">
                    From the discipline of elite athletics to the rigor of institutional
                    finance — each chapter added a layer of perspective that the last
                    could not have provided alone.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-[16.5px] font-[340] leading-[1.9] text-white/30">
                    Private banking revealed how the world's most sophisticated capital
                    thinks. Audit revealed how institutions account for themselves. Real
                    estate revealed how physical and financial worlds collide. Athletics
                    revealed what long-term commitment actually feels like in the body.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <p className="text-[16.5px] font-[340] leading-[1.9] text-white/24">
                    What they share: each required presence, rigor, and the willingness
                    to engage with a system on its own terms before questioning it.
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CLOSING — ghost + CTA
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 pt-16 pb-44">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            {/* Ghost anchor */}
            <Reveal y={50} delay={0.04}>
              <p
                className="text-exp-ghost font-[230] tracking-tighter
                           leading-none text-white/[0.038] select-none"
                aria-hidden="true"
              >
                Building.
              </p>
            </Reveal>

            {/* Statement overlapping ghost */}
            <Reveal delay={0.14} y={28} className="-mt-4 md:-mt-8 lg:-mt-12">
              <p
                className="text-[clamp(1.6rem,3.4vw,2.85rem)] font-[270]
                           tracking-[-0.028em] leading-[1.22]
                           text-white/68 max-w-[700px] mb-10"
              >
                Every environment I have worked in has made me more convinced:
                the most important systems of the next decade have not been built yet.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="text-[16.5px] font-[340] leading-[1.9]
                            text-white/28 max-w-[460px] mb-14">
                I am building toward that frontier — with the rigor of finance,
                the discipline of athletics, and the long-term orientation of a founder.
              </p>
            </Reveal>

            {/* CTA row */}
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
                  Max Klein — Experience — 2026
                </p>
                <p className="text-[11px] font-[400] tracking-[0.12em] text-white/12">
                  {EXPERIENCES.filter((e) => e.status === "ongoing").length} active ·{" "}
                  {EXPERIENCES.filter((e) => e.status === "completed").length} completed
                </p>
              </div>
            </Reveal>

          </div>
        </section>

      </div>
    </main>
  );
}
