"use client";

/**
 * AnchorStrip — the three "snapshot" links beneath the hero.
 *
 * Keeps the original IA (now / projects / experience) but upgrades the
 * interaction: each cell has a magnetic pull toward the cursor, a gradient
 * hairline that wipes across the top edge on hover, an indexed label, and a
 * value that brightens and nudges its arrow. Reduced-motion users get the
 * static (still very clean) version with no magnetism.
 */

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

type Anchor = { label: string; value: string; href: string };

const ANCHORS: Anchor[] = [
  { label: "Currently reading", value: "The Sovereign Individual — James Dale Davidson & William Rees-Mogg", href: "/now" },
  { label: "Latest project", value: "Portfolio Intelligence OS", href: "/projects" },
  { label: "Recent role", value: "Private Banking — ODDO BHF", href: "/experience" },
];

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnchorCell({
  anchor,
  index,
  reduce,
}: {
  anchor: Anchor;
  index: number;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Magnetic offset, smoothed by a spring so the cell glides back on leave.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.4 });
  const y = useSpring(my, { stiffness: 150, damping: 15, mass: 0.4 });

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // Pull is a fraction of the distance from cell centre, gently clamped.
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
    mx.set(Math.max(-10, Math.min(10, dx)));
    my.set(Math.max(-7, Math.min(7, dy)));
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div variants={fadeUp(12)} className="relative">
      <motion.div style={reduce ? undefined : { x, y }}>
        <Link
          ref={ref}
          href={anchor.href}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="group relative flex flex-col gap-1.5 overflow-hidden
                     bg-white/[0.018] p-6 transition-colors duration-300
                     hover:bg-white/[0.035]"
        >
          {/* Animated gradient hairline — wipes across the top edge on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px
                       origin-left scale-x-0 bg-gradient-to-r
                       from-transparent via-indigo-400/60 to-transparent
                       transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:scale-x-100"
          />

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] tabular-nums text-white/15
                             transition-colors duration-300 group-hover:text-indigo-300/50">
              0{index + 1}
            </span>
            <span className="text-[9.5px] font-medium uppercase tracking-[0.28em] text-white/25">
              {anchor.label}
            </span>
          </div>

          <span className="flex items-center gap-1.5 text-[13.5px] font-light
                           text-white/60 transition-colors duration-200
                           group-hover:text-white/90">
            {anchor.value}
            <ArrowRight
              className="-translate-x-1 opacity-0 transition-all duration-200
                         group-hover:translate-x-0 group-hover:opacity-100"
            />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function AnchorStrip() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer(0.1, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.once}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-xl
                 border border-white/[0.06] sm:grid-cols-3"
    >
      {ANCHORS.map((anchor, i) => (
        <AnchorCell key={anchor.label} anchor={anchor} index={i} reduce={reduce} />
      ))}
    </motion.div>
  );
}
