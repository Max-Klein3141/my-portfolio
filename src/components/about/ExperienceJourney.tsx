"use client";

/**
 * ExperienceJourney — a visual representation of collected experience.
 *
 * Instead of a flat list, the roles sit on a luminous vertical "spine" that
 * draws itself in as the section scrolls into view (accent gradient, scroll-
 * linked). Each stop is a glowing node with an indexed marker; the content
 * brightens and lifts on hover, and a row of "signal" chips summarises what
 * each chapter sharpened. Pure transform/opacity. Reduced motion → the spine
 * is drawn statically and nodes don't pulse.
 */

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ease } from "@/lib/motion";

type Chapter = {
  role: string;
  focus: string;
  description: string;
  tag: string;
  signals: string[];
};

const JOURNEY: Chapter[] = [
  {
    role: "Private Banking",
    focus: "ODDO BHF",
    description:
      "Wealth management and institutional client advisory at the private banking division. Direct exposure to how sophisticated capital thinks — portfolio construction, client relationships, and the long-arc decisions behind wealth preservation and growth.",
    tag: "Finance",
    signals: ["Wealth Management", "Portfolio Advisory", "Capital Allocation"],
  },
  {
    role: "Financial Audit",
    focus: "Baker Tilly",
    description:
      "Financial reporting, internal controls, and regulatory compliance across complex organizational structures. Audit taught me to read between the lines of how institutions present themselves versus how they actually operate — a perspective that sharpens judgment permanently.",
    tag: "Assurance",
    signals: ["Financial Reporting", "Internal Controls", "Regulatory Framework"],
  },
  {
    role: "Real Estate Consulting",
    focus: "Albrings & Müller AG",
    description:
      "Market analysis, asset valuation, and strategic advisory for property investment decisions. Real estate sits at the intersection of capital allocation, demographic trends, and behavioral finance — one of the most information-dense markets, disguised as a physical asset class.",
    tag: "Consulting",
    signals: ["Market Analysis", "Asset Valuation", "Investment Strategy"],
  },
];

/* ── A single chapter on the spine ─────────────────────────────────── */

function ChapterRow({
  chapter,
  index,
  reduce,
}: {
  chapter: Chapter;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="group relative pl-14 pb-14 last:pb-0"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
    >
      {/* Node on the spine */}
      <div
        className="absolute left-0 top-0.5 flex h-[26px] w-[26px] items-center
                   justify-center"
        aria-hidden="true"
      >
        {/* Pulse halo — accent, breathes only when motion is allowed */}
        {!reduce && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(129,140,248,0.45) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{
              duration: 3.2,
              ease: "easeOut",
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        )}
        {/* Ring */}
        <span
          className="absolute inset-[3px] rounded-full border border-white/15
                     bg-black transition-colors duration-300
                     group-hover:border-indigo-300/50"
        />
        {/* Core dot */}
        <span
          className="relative h-[7px] w-[7px] rounded-full bg-indigo-300/70
                     transition-all duration-300 group-hover:bg-indigo-200
                     group-hover:shadow-[0_0_12px_2px_rgba(129,140,248,0.55)]"
        />
      </div>

      {/* Content — lifts + brightens on hover */}
      <motion.div
        className="transition-transform duration-300 ease-out
                   group-hover:translate-x-1"
      >
        {/* Index + tag */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px]
                           tabular-nums text-white/20 transition-colors duration-300
                           group-hover:text-indigo-300/55">
            0{index + 1}
          </span>
          <span className="h-px w-6 bg-white/[0.1]" aria-hidden="true" />
          <span className="text-[10px] font-[480] uppercase tracking-[0.2em]
                           text-white/22">
            {chapter.tag}
          </span>
        </div>

        {/* Role */}
        <p className="mb-2 text-[19px] font-[400] tracking-[-0.01em] text-white/72
                      transition-colors duration-300 group-hover:text-white/90">
          {chapter.role}
        </p>

        {/* Focus — the editorial one-liner */}
        <p className="mb-4 max-w-[440px] text-[14.5px] font-[340] italic
                      leading-[1.7] text-white/40">
          {chapter.focus}
        </p>

        {/* Description */}
        <p className="mb-5 max-w-[460px] text-[13.5px] font-[340] leading-[1.78]
                      text-white/28">
          {chapter.description}
        </p>

        {/* Signal chips */}
        <div className="flex flex-wrap gap-1.5">
          {chapter.signals.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-white/[0.07] bg-white/[0.02]
                         px-2.5 py-[5px] text-[10.5px] font-[400] tracking-[0.02em]
                         text-white/30 transition-colors duration-300
                         group-hover:border-white/[0.12] group-hover:text-white/45"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── The journey ───────────────────────────────────────────────────── */

export default function ExperienceJourney() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-linked draw of the spine as the section passes through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* The spine — a faint base rail + an accent gradient that draws in */}
      <div
        className="pointer-events-none absolute left-[12px] top-1 bottom-1 w-px"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-white/[0.07]" />
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b
                     from-violet-300/70 via-indigo-400/45 to-cyan-300/35"
          style={reduce ? { scaleY: 1 } : { scaleY: drawn }}
        />
      </div>

      {JOURNEY.map((chapter, i) => (
        <ChapterRow
          key={chapter.role}
          chapter={chapter}
          index={i}
          reduce={reduce}
        />
      ))}
    </div>
  );
}
