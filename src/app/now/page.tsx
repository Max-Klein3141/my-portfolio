"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

/* ─── Section shell ──────────────────────────────────────────────── */

function Section({
  index,
  label,
  heading,
  tinted = false,
  className = "",
  children,
}: {
  index: string;
  label: string;
  heading: string;
  tinted?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`px-6 md:px-16 lg:px-24 py-16 md:py-24 ${className}`}
      style={tinted ? { background: "rgba(255,255,255,0.013)" } : undefined}
    >
      <div className="max-w-[1080px] mx-auto w-full">
        <RevealLine className="mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-14 lg:gap-20">
          {/* Left label */}
          <Reveal>
            <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-5">
              {index} — {label}
            </p>
            <h2 className="text-now-section font-[275] text-white/65">
              {heading}
            </h2>
          </Reveal>

          {/* Right content */}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Book row (Reading) ─────────────────────────────────────────── */

function BookRow({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay} className="py-7 border-b border-white/[0.06] first:border-t">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <p className="text-[17px] font-[380] tracking-[-0.01em] text-white/70 italic">
          [PLACEHOLDER — book title]
        </p>
        <p className="text-[11px] font-[440] tracking-[0.18em] uppercase text-white/22">
          [PLACEHOLDER — author]
        </p>
      </div>
      <p className="text-[13.5px] font-[340] leading-[1.8] text-white/28">
        [PLACEHOLDER — one sentence on why]
      </p>
    </Reveal>
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
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-16 lg:px-24 pt-44 pb-8">
          <div className="max-w-[1080px] mx-auto w-full">

            <Reveal delay={0}>
              <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
                <p className="text-[10px] font-[500] tracking-[0.36em] uppercase text-white/18">
                  Now — Max Klein
                </p>
                {/* Last-updated timestamp */}
                <div className="inline-flex items-center gap-2.5">
                  <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full
                                     rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-[6px] w-[6px]
                                     rounded-full bg-emerald-400/70" />
                  </span>
                  <span className="text-[10px] font-[480] tracking-[0.2em] uppercase
                                   text-white/20">
                    Last updated — [PLACEHOLDER — Month Year]
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Giant "Now" */}
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
                  [PLACEHOLDER — one-line snapshot of what currently holds your attention]
                </p>
              </Reveal>
            </div>

            {/* Spacer needed because the text is absolute */}
            <div className="h-28 md:h-20" />

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            §1  BUILDING
        ══════════════════════════════════════════════════════ */}
        <Section index="01" label="Building" heading="What I am building.">
          <Reveal delay={0.08}>
            <p className="text-[17px] font-[340] leading-[1.9] text-white/40 max-w-[560px]">
              [PLACEHOLDER — what you are actively building right now, 2-3 sentences]
            </p>
          </Reveal>
        </Section>

        {/* ══════════════════════════════════════════════════════
            §2  READING
        ══════════════════════════════════════════════════════ */}
        <Section index="02" label="Reading" heading="The intellectual diet." tinted>
          <BookRow />
          <BookRow delay={0.08} />
        </Section>

        {/* ══════════════════════════════════════════════════════
            §3  THINKING ABOUT
        ══════════════════════════════════════════════════════ */}
        <Section index="03" label="Thinking About" heading="Open questions.">
          <div className="space-y-7">
            <Reveal delay={0.08}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/40 max-w-[560px]">
                [PLACEHOLDER — an open question or idea you are wrestling with]
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/40 max-w-[560px]">
                [PLACEHOLDER — a second open question or idea you are wrestling with]
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            §4  COMPETING
        ══════════════════════════════════════════════════════ */}
        <Section index="04" label="Competing" heading="On the pitch." tinted className="pb-44">
          <Reveal delay={0.08}>
            <p className="text-[17px] font-[340] leading-[1.9] text-white/40 max-w-[560px]">
              [PLACEHOLDER — soccer status, season/offseason, what the sport gives you right now]
            </p>
          </Reveal>
        </Section>

      </div>
    </main>
  );
}
