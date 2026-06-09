"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AmbientBackground from "@/components/ui/AmbientBackground";

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
  "Artificial Intelligence",
  "Financial Infrastructure",
  "Venture Capital",
  "Autonomous Systems",
  "Fintech",
  "Productivity",
  "Transformative Technology",
  "Global Markets",
];

const EXPERIENCES = [
  {
    role: "Private Banking",
    description: "Wealth management, portfolio advisory, and institutional client relationships at the highest level of financial services.",
    tag: "Finance",
  },
  {
    role: "Audit",
    description: "Financial reporting, internal controls, and regulatory compliance across complex organizational structures.",
    tag: "Assurance",
  },
  {
    role: "Real Estate Consulting",
    description: "Market analysis, asset evaluation, and strategic advisory for property investment decisions.",
    tag: "Consulting",
  },
];

const DISCIPLINES = ["Repetition", "Resilience", "Long-term orientation"];

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
                I build at the intersection of{" "}
                <span className="text-gradient">AI, finance,</span>
                {" "}and global entrepreneurship.
              </h1>
            </Reveal>

            <Reveal delay={0.17}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/35
                            max-w-[500px]">
                International student-athlete. Long-term thinker.
                Aspiring founder at the frontier of transformative technology.
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
            §2  ORIGIN — Immesheim
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
                    140
                  </motion.p>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/18 mt-4">
                    Residents — Immesheim, Germany
                  </p>
                </div>
              </Reveal>

              {/* Right — prose */}
              <div className="space-y-6 lg:pt-16">
                <Reveal delay={0.09}>
                  <p className="text-[17.5px] font-[340] leading-[1.9] text-white/58">
                    I grew up in Immesheim — a small village in Germany with fewer than
                    140 residents. A place quiet enough to teach perspective, discipline,
                    and the value of long-term thinking.
                  </p>
                </Reveal>
                <Reveal delay={0.17}>
                  <p className="text-[17px] font-[340] leading-[1.9] text-white/36">
                    Immesheim does not appear on maps of innovation. It is not the kind
                    of place referenced in startup conferences or investment memos. But
                    growing up in that quiet — surrounded by space, time, and very few
                    distractions — shaped something more durable than ambition: the
                    ability to think slowly, plan long, and remain unaffected by noise.
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <p className="text-[17px] font-[340] leading-[1.9] text-white/36">
                    That environment is not incidental to where I am going.
                    It is foundational to it.
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §3  DISCIPLINE — The Athlete
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
                    Soccer taught me that meaningful progress is rarely dramatic.
                  </h2>
                </Reveal>
                <Reveal delay={0.13}>
                  <p className="text-[17px] font-[340] leading-[1.9] text-white/50 mb-5">
                    I study Economics and Finance with a minor in Data Science while
                    competing as a Division I athlete — balancing high-performance
                    academics with the discipline and consistency that elite sport demands.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-[17px] font-[340] leading-[1.9] text-white/34">
                    Meaningful progress is built through repetition, resilience, and an
                    obsession with improvement over time. That mindset now shapes how
                    I approach technology, business, and life. The game is long.
                    I am playing it that way.
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
                    D·I
                  </p>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-white/18 mt-4 mb-10">
                    Division I Student-Athlete
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
                "I'm fascinated by systems that influence how the world allocates capital,
                creates opportunity, and scales intelligence."
              </blockquote>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-0 mb-16">
              <Reveal delay={0.14} className="lg:pr-16">
                <p className="text-[17px] font-[340] leading-[1.9] text-white/38">
                  My interests sit at the convergence of autonomous systems, financial
                  infrastructure, venture capital, productivity, and transformative
                  technology — fields that I believe will define the next generation
                  of global innovation.
                </p>
              </Reveal>
              <div className="hidden lg:block w-px bg-white/[0.06]" />
              <Reveal delay={0.2} className="lg:pl-16">
                <p className="text-[17px] font-[340] leading-[1.9] text-white/28">
                  Through that lens, I look at the world less as a set of problems
                  to be solved and more as a set of systems to be redesigned — and
                  I think the most consequential designers of the next century
                  will be technologists who understand capital.
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
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-36"
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
                  From understanding how industries operate
                  to questioning how they should evolve.
                </p>
              </Reveal>

              {/* Right — experience list */}
              <div>
                <div className="border-t border-white/[0.06]">
                  {EXPERIENCES.map((exp, i) => (
                    <motion.div
                      key={exp.role}
                      className="py-8 border-b border-white/[0.06]"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.72, ease, delay: i * 0.11 }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <p className="text-[18.5px] font-[400] tracking-[-0.01em]
                                        text-white/72 mb-2.5">
                            {exp.role}
                          </p>
                          <p className="text-[14px] font-[340] leading-[1.75] text-white/30">
                            {exp.description}
                          </p>
                        </div>
                        <span className="flex-shrink-0 mt-0.5 text-[10px] font-[480]
                                         tracking-[0.2em] uppercase text-white/18
                                         border border-white/[0.07] rounded-lg
                                         px-3 py-1.5">
                          {exp.tag}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Reveal delay={0.32} className="pt-10">
                  <p className="text-[15.5px] font-[340] leading-[1.88] text-white/25 italic">
                    "I became increasingly drawn not just to how industries operate,
                    but to how they evolve — and ultimately, how to build new ones."
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §6  PHILOSOPHY — Worldview
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 py-28 md:py-40">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-20" />

            <Reveal>
              <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-14">
                05 — Philosophy
              </p>
            </Reveal>

            <Reveal delay={0.07} y={22}>
              <p className="text-pull-quote font-[270] text-white/62 mb-10 max-w-[840px]">
                What motivates me most is{" "}
                <span className="text-white/84">curiosity paired with impact</span>
                {" "}— and the belief that the people who create the future are the ones
                who refuse to be passive in it.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/36
                            max-w-[580px] mb-16">
                Beyond academics and work, I'm deeply inspired by founders, investors,
                philosophers, and athletes who combine ambition with authenticity.
                Marcus Aurelius' Meditations shaped the way I think about discipline,
                responsibility, and perspective in an increasingly distracted world.
              </p>
            </Reveal>

            {/* Marcus Aurelius quote */}
            <Reveal delay={0.22}>
              <figure className="border-l-2 border-white/[0.09] pl-8">
                <blockquote>
                  <p className="text-[15.5px] font-[340] leading-[1.88] text-white/30 italic mb-5">
                    "You have power over your mind — not outside events.
                    Realize this, and you will find strength."
                  </p>
                </blockquote>
                <figcaption className="text-[10px] font-[480] tracking-[0.3em] uppercase text-white/18">
                  Marcus Aurelius — Meditations
                </figcaption>
              </figure>
            </Reveal>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────
            §7  VISION — Closing statement
        ─────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-16 lg:px-24 pt-16 pb-44">
          <div className="max-w-[1080px] mx-auto w-full">

            <RevealLine className="mb-24" />

            <Reveal delay={0.04}>
              <p className="text-[10px] font-[500] tracking-[0.34em] uppercase text-white/18 mb-14">
                06 — Vision
              </p>
            </Reveal>

            {/* Ghost typographic anchor */}
            <Reveal delay={0.08} y={50}>
              <p
                className="text-vision-ghost font-[240] text-white/[0.042] select-none
                           tracking-tighter leading-none mb-0"
                aria-hidden="true"
              >
                Builder.
              </p>
            </Reveal>

            {/* Main statement — overlapping ghost text */}
            <Reveal delay={0.16} y={30} className="-mt-6 md:-mt-10 lg:-mt-14">
              <h2 className="text-chapter-head font-[290] text-white/80
                             max-w-[760px] mb-10">
                The future belongs to builders — people willing to think independently,
                embrace uncertainty, and create what does not yet exist.
              </h2>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="text-[17px] font-[340] leading-[1.9] text-white/34
                            max-w-[520px] mb-14">
                I'm still early in my journey, but I approach it with a long-term horizon.
                My goal is not simply to participate in the future — but to help build it,
                thoughtfully, globally, and authentically.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.32}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <motion.a
                  href="mailto:max.klein05@outlook.com"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                             bg-white text-black text-[13px] font-[510] tracking-[0.02em]
                             transition-all duration-200"
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
                  href="/projects"
                  className="text-[13px] font-[380] text-white/25 hover:text-white/55
                             transition-colors duration-250 tracking-[0.03em]"
                >
                  View Projects →
                </Link>
              </div>
            </Reveal>

            {/* Bottom meta */}
            <Reveal delay={0.42} className="mt-24 pt-10 border-t border-white/[0.05]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center
                              justify-between gap-4">
                <p className="text-[11px] font-[400] tracking-[0.18em] uppercase text-white/14">
                  Max Klein — 2026
                </p>
                <div className="flex items-center gap-6">
                  {[
                    { label: "LinkedIn", href: "https://linkedin.com/in/maxklein" },
                    { label: "GitHub",   href: "https://github.com/maxklein" },
                    { label: "X",        href: "https://x.com/maxklein" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-[400] tracking-[0.18em] uppercase
                                 text-white/14 hover:text-white/40 transition-colors duration-250"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </section>

      </div>
    </main>
  );
}
