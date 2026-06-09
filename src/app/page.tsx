"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  viewport,
} from "@/lib/motion";
import AmbientBackground from "@/components/ui/AmbientBackground";
import Button from "@/components/ui/Button";

/* ── Data ─────────────────────────────────────────────────────────── */

const TICKER = [
  { label: "AI Infrastructure",  value: "+12.4%", up: true  },
  { label: "Global FinTech",      value: "+8.7%",  up: true  },
  { label: "S&P 500",             value: "+0.9%",  up: true  },
  { label: "Emerging Markets",    value: "+3.2%",  up: true  },
  { label: "Crypto Markets",      value: "−0.8%",  up: false },
  { label: "OpenAI Valuation",    value: "+21.3%", up: true  },
  { label: "VC Funding '25",      value: "+15.1%", up: true  },
  { label: "Frontier AI Index",   value: "+34.2%", up: true  },
  { label: "DeFi Markets",        value: "−2.1%",  up: false },
  { label: "Tech Innovation",     value: "+6.4%",  up: true  },
];

const FOCUS = [
  "AI Systems",
  "Financial Technology",
  "Global Entrepreneurship",
  "High Performance",
];

const ANCHORS = [
  {
    label: "Currently reading",
    value: "The Sovereign Individual",
    href:  "/now",
  },
  {
    label: "Latest project",
    value: "Portfolio Intelligence OS",
    href:  "/projects",
  },
  {
    label: "Recent role",
    value: "Private Banking — Julius Bär",
    href:  "/experience",
  },
];

/* ── Icons ────────────────────────────────────────────────────────── */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center
                          min-h-screen page-x text-center pb-24">

        {/* Status badge */}
        <motion.div
          variants={scaleIn(0)}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 mb-10"
        >
          <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                             bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
          </span>
          <span className="text-white/30 text-[10.5px] tracking-[0.26em] uppercase font-medium">
            Currently exploring AI and financial systems
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

        {/* Headline */}
        <motion.h1
          variants={fadeUp(20, 0.08)}
          initial="hidden"
          animate="visible"
          className="text-hero font-[700] text-white max-w-[860px] mb-7 relative z-10"
        >
          Building at the intersection of{" "}
          <span className="text-gradient">AI, finance,</span>
          {" "}and global entrepreneurship.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(16, 0.18)}
          initial="hidden"
          animate="visible"
          className="max-w-[440px] text-white/35 text-[16px] leading-[1.72]
                     font-light mb-12 relative z-10"
        >
          International student-athlete striving for academic excellence
          and innovation-driven impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerContainer(0.08, 0.28)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3 mb-14 relative z-10"
        >
          <motion.div variants={fadeUp(12)}>
            <Button href="/experience" arrow>
              View Experience
            </Button>
          </motion.div>

          <motion.div variants={fadeUp(12)}>
            <Button href="/projects" variant="ghost" arrow>
              View Projects
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
        <motion.div
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.once}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px
                     border border-white/[0.06] rounded-xl overflow-hidden"
        >
          {ANCHORS.map(({ label, value, href }) => (
            <motion.div key={label} variants={fadeUp(12)}>
              <Link
                href={href}
                className="group flex flex-col gap-1 p-6
                           bg-white/[0.018] hover:bg-white/[0.035]
                           transition-colors duration-300"
              >
                <span className="text-white/25 text-[9.5px] tracking-[0.28em] uppercase font-medium">
                  {label}
                </span>
                <span className="text-white/60 text-[13.5px] font-light
                                 group-hover:text-white/85 transition-colors duration-200
                                 flex items-center gap-1.5">
                  {value}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                         -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Market ticker ──────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20
                   border-t border-white/[0.05]
                   bg-black/30 backdrop-blur-sm overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 py-[9px] text-[10px]">
                <span className="text-white/20 font-medium tracking-wide">{item.label}</span>
                <span className={`font-mono font-medium tabular-nums ${
                  item.up ? "text-emerald-500/40" : "text-red-500/35"
                }`}>
                  {item.value}
                </span>
                <span className="text-white/[0.07] mx-1">·</span>
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16
                          bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16
                          bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>

    </main>
  );
}
