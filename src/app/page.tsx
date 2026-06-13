"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import Button from "@/components/ui/Button";
import PointerGlow from "@/components/home/PointerGlow";
import KineticHeadline from "@/components/home/KineticHeadline";
import SignalConstellation from "@/components/home/SignalConstellation";
import AnchorStrip from "@/components/home/AnchorStrip";

/* ── Data ─────────────────────────────────────────────────────────── */

const FOCUS = [
  "AI Systems",
  "Financial Markets",
  "Venture Capital",
  "High Performance",
];

/* ── Icons ────────────────────────────────────────────────────────── */

function ChevronDown() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden="true">
      <path d="M5 1v11M2 8.5l3 3 3-3" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">

      {/* ── Fixed background ──────────────────────────────────────── */}
      <AmbientBackground variant="hero" />
      <PointerGlow />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center
                          min-h-screen page-x text-center pb-24">

        {/* Signature motif — signal graph behind the headline */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0
                     w-[min(1040px,94vw)] -translate-x-1/2 -translate-y-[54%]"
          aria-hidden="true"
        >
          <SignalConstellation className="h-auto w-full" />
        </div>

        {/* Status badge */}
        <motion.div
          variants={scaleIn(0)}
          initial="hidden"
          animate="visible"
          className="relative z-10 inline-flex items-center gap-2.5 mb-10"
        >
          <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                             bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
          </span>
          <span className="text-white/30 text-[10.5px] tracking-[0.26em] uppercase font-medium">
            Currently building — Portfolio Intelligence OS
          </span>
        </motion.div>

        {/* Ghost word — editorial backdrop */}
        <motion.span
          variants={fadeIn(0.1)}
          initial="hidden"
          animate="visible"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%]
                     text-[clamp(6rem,18vw,17rem)] font-[230] tracking-[-0.07em]
                     text-white/[0.025] select-none pointer-events-none leading-none
                     whitespace-nowrap"
          aria-hidden="true"
        >
          Builder
        </motion.span>

        {/* Headline — kinetic, word-by-word rise */}
        <KineticHeadline className="text-hero font-[700] text-white max-w-[860px] mb-7 relative z-10" />

        {/* Subtext */}
        <motion.p
          variants={fadeUp(16, 0.18)}
          initial="hidden"
          animate="visible"
          className="max-w-[440px] text-white/35 text-[16px] leading-[1.72]
                     font-light mb-12 relative z-10"
        >
          Double major in Economics &amp; Finance at Butler University. D1 soccer.
          Building AI-native tools for financial markets.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerContainer(0.08, 0.28)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3 mb-14 relative z-10"
        >
          <motion.div variants={fadeUp(12)}>
            <Button href="/projects" arrow>
              View My Work
            </Button>
          </motion.div>

          <motion.div variants={fadeUp(12)}>
            <Button href="/contact" variant="ghost" arrow>
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>

        {/* Focus pills */}
        <motion.div
          variants={staggerContainer(0.06, 0.44)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-2 relative z-10"
        >
          {FOCUS.map((label) => (
            <motion.span
              key={label}
              variants={scaleIn()}
              className="px-3.5 py-[5px] rounded-full
                         border border-white/[0.07] bg-white/[0.02]
                         text-white/25 text-[10.5px] tracking-wider
                         font-medium backdrop-blur-sm"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn(1.1)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-[6.5rem] left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1.5 animate-bob">
            <span className="text-white/15 text-[8px] tracking-[0.38em] uppercase">Scroll</span>
            <ChevronDown />
          </div>
        </motion.div>
      </section>

      {/* ── Anchor strip ──────────────────────────────────────────── */}
      <section className="relative z-10 page-x max-w-site mx-auto pb-32">
        <AnchorStrip />
      </section>

    </main>
  );
}
