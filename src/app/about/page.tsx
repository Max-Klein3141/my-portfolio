"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import ExperienceJourney from "@/components/about/ExperienceJourney";

/* ─── Motion primitives ──────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.82, ease, delay }}
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

const DOMAINS = [
  "[PLACEHOLDER — interest 1]",
  "[PLACEHOLDER — interest 2]",
  "[PLACEHOLDER — interest 3]",
];

const DISCIPLINES = [
  "[PLACEHOLDER — trait 1]",
  "[PLACEHOLDER — trait 2]",
  "[PLACEHOLDER — trait 3]",
];

/* ─── Page ───────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main
      className="relative bg-black min-h-screen overflow-hidden"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >

      {/* ══════════════════════════════════════════════════════════
          BACKGROUND — fixed so it persists across all scroll
      ══════════════════════════════════════════════════════════ */}
      <AmbientBackground />

      {/* ══════════════════════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ───────────────────────────────────────────────────────
            §1  HERO — Identity Statement
        ─────────────────────────────────────────────────────── */}
        <section className="min-h-[94vh] flex flex-col justify-end
                            px-6 md:px-16 lg:px-24 pb-28 pt-40">
          <div className="max-w-[1080px] mx-auto w-full">

            <Reveal delay={0}>
              <p className="text-[10px] font-[500] tracking-[0.36em] uppercase text-white/18 mb-14">
                About — Max Klein
              </p>
            </Reveal>

            <Reveal delay={0.07} y={38}>
              <h1 className="text-about-hero font-[270] text-white/88 mb-9 max-w-[860px]">
                [PLACEHOLDER — your one-line{" "}
                <span className="text-gradient">positioning</span>
                {" "}statement]
              </h1>
            </Reveal>

            <Reveal delay={0.17}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/35
                            max-w-[500px]">
                [PLACEHOLDER — 1-2 sentence intro: who you are and what you are about]
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-20">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-white/12" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/16">
                  Origin story
                </span>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §2  ORIGIN
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-36">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] gap-16 lg:gap-24 items-start">

              {/* Left — visual anchor */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-10">
                  01 — Origin
                </p>
                <div>
                  <motion.p
                    className="font-[family-name:var(--font-geist-mono)] leading-none
                               tracking-tighter text-white/[0.055] select-none"
                    style={{ fontSize: "clamp(5rem, 13vw, 9.5rem)", fontWeight: 700 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.6, ease }}
                  >
                    [#]
                  </motion.p>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/18 mt-4">
                    [PLACEHOLDER — a defining number + place]
                  </p>
                </div>
              </Reveal>

              {/* Right — prose */}
              <div className="space-y-6 lg:pt-16">
                <Reveal delay={0.09}>
                  <p className="text-[17.5px] font-[340] leading-[1.9] text-white/58">
                    [PLACEHOLDER — origin story, hometown, what shaped you]
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §3  DISCIPLINE
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-36"
                 style={{ background: "rgba(255,255,255,0.013)" }}>
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-16 lg:gap-24 items-start">

              {/* Left — prose */}
              <div>
                <Reveal>
                  <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-10">
                    02 — Discipline
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="text-chapter-head font-[290] text-white/82 mb-9">
                    [PLACEHOLDER — a defining line about your discipline]
                  </h2>
                </Reveal>
                <Reveal delay={0.13}>
                  <p className="text-[17px] font-[340] leading-[1.9] text-white/50 mb-5">
                    [PLACEHOLDER — discipline narrative: sport, school, how they connect]
                  </p>
                </Reveal>
              </div>

              {/* Right — credential + traits */}
              <Reveal delay={0.1} className="lg:pt-[72px]">
                <div>
                  <p
                    className="font-[family-name:var(--font-geist-mono)] font-[700]
                               leading-none tracking-tight text-white/[0.065] select-none"
                    style={{ fontSize: "clamp(3.2rem, 7.5vw, 6rem)" }}
                  >
                    [—]
                  </p>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/18 mt-4 mb-10">
                    [PLACEHOLDER — credential]
                  </p>

                  <RevealLine delay={0.18} className="mb-8" />

                  <div className="space-y-4">
                    {DISCIPLINES.map((trait, i) => (
                      <motion.div
                        key={trait}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, ease, delay: i * 0.09 + 0.22 }}
                      >
                        <span className="w-[3px] h-[3px] rounded-full bg-white/22 flex-shrink-0" />
                        <span className="text-[13px] font-[360] tracking-[0.055em] text-white/28">
                          {trait}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §4  INTELLECTUAL LANDSCAPE
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            <Reveal>
              <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-14">
                03 — Intellectual Landscape
              </p>
            </Reveal>

            {/* Editorial pull-quote */}
            <Reveal delay={0.08} y={22}>
              <blockquote className="text-pull-quote font-[275] text-white/68 mb-14 max-w-[860px]">
                [PLACEHOLDER — a quote that captures your intellectual interests]
              </blockquote>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-0 mb-16">
              <Reveal delay={0.14} className="lg:pr-16">
                <p className="text-[17px] font-[340] leading-[1.9] text-white/38">
                  [PLACEHOLDER — your intellectual interests and why]
                </p>
              </Reveal>
              <div className="hidden lg:block w-px bg-white/[0.06]" />
              <Reveal delay={0.2} className="lg:pl-16">
                <p className="text-[17px] font-[340] leading-[1.9] text-white/28">
                  [PLACEHOLDER — and why they matter to you]
                </p>
              </Reveal>
            </div>

            {/* Domain tags — staggered */}
            <Reveal delay={0.08}>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map((domain, i) => (
                  <motion.span
                    key={domain}
                    className="px-4 py-[9px] rounded-xl border border-white/[0.07]
                               bg-white/[0.02] backdrop-blur-sm
                               text-white/28 text-[12px] font-[390] tracking-[0.05em]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease, delay: i * 0.055 + 0.06 }}
                  >
                    {domain}
                  </motion.span>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §5  EXPERIENCE
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-36 pb-44"
                 style={{ background: "rgba(255,255,255,0.013)" }}>
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 lg:gap-20">

              {/* Left — section label + framing */}
              <Reveal>
                <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-6">
                  04 — Experience
                </p>
                <p className="text-[15px] font-[340] leading-[1.85] text-white/28">
                  [PLACEHOLDER — one-line framing of your experience]
                </p>
              </Reveal>

              {/* Right — experience journey (visual spine) */}
              <div>
                <ExperienceJourney />

                <Reveal delay={0.32} className="pt-14">
                  <p className="text-[15.5px] font-[340] leading-[1.88] text-white/25 italic">
                    [PLACEHOLDER — a closing reflection on your experience]
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
