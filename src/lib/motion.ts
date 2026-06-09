/**
 * GLOBAL MOTION SYSTEM
 * Single source of truth for every animation value on the site.
 * Import from here — never redefine in individual pages.
 *
 * Usage:
 *   import { ease, duration, fadeUp, staggerContainer } from "@/lib/motion";
 */

import type { Variants, Transition } from "framer-motion";

// ── Easing curves ──────────────────────────────────────────────────
// Primary: the "expensive spring" — fast-in, gentle settle.
export const ease       = [0.22, 1, 0.36, 1]  as const;
// Sharp: used for short UI interactions (hover, tap).
export const easeSharp  = [0.4,  0, 0,    1]  as const;
// Slow: long cinematic transitions, atmospheric fades.
export const easeSlow   = [0.16, 1, 0.3,  1]  as const;
// Out: gentle deceleration for exit moves.
export const easeOut    = [0,    0, 0.2,  1]  as const;

// ── Duration scale (seconds) ───────────────────────────────────────
export const duration = {
  instant:   0.12,
  fast:      0.22,
  base:      0.36,
  slow:      0.56,
  reveal:    0.82,
  cinematic: 1.20,
  ambient:   2.00,
} as const;

// ── Transition presets ─────────────────────────────────────────────
export const t = {
  fast:      { duration: duration.fast,     ease } as Transition,
  base:      { duration: duration.base,     ease } as Transition,
  slow:      { duration: duration.slow,     ease } as Transition,
  reveal:    { duration: duration.reveal,   ease } as Transition,
  cinematic: { duration: duration.cinematic, ease } as Transition,
} as const;

// ── Variant factories ──────────────────────────────────────────────

/** Fade up — the site's primary scroll-reveal. */
export const fadeUp = (y = 24, delay = 0): Variants => ({
  hidden:  { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease, delay },
  },
});

/** Pure opacity fade. */
export const fadeIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease, delay } },
});

/** Fade in from the left. */
export const fadeLeft = (x = 10, delay = 0): Variants => ({
  hidden:  { opacity: 0, x: -x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.reveal, ease, delay },
  },
});

/** Stagger container — wrap around a list of `fadeUp` children. */
export const staggerContainer = (
  staggerChildren = 0.07,
  delayChildren  = 0
): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Horizontal line that draws itself from left. */
export const drawLine: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: duration.cinematic, ease },
  },
};

/** Scale in — for dots, badges, small UI elements. */
export const scaleIn = (delay = 0): Variants => ({
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease, delay },
  },
});

// ── Page transition variants ───────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.22, ease: easeOut },
  },
};

// ── Hover/tap interaction presets ──────────────────────────────────
// Use with `whileHover` and `whileTap` on motion elements.
export const hover = {
  lift:   { y: -2,   transition: t.fast },
  scale:  { scale: 1.025, transition: t.fast },
  bright: { opacity: 0.8, transition: t.fast },
  subtle: { scale: 1.01,  transition: t.fast },
} as const;

export const tap = {
  press:  { scale: 0.97, transition: t.fast },
  slight: { scale: 0.98, transition: t.fast },
} as const;

// ── Viewport config presets ────────────────────────────────────────
export const viewport = {
  once:     { once: true, margin: "-60px"  } as const,
  onceLate: { once: true, margin: "-100px" } as const,
  onceEarly:{ once: true, margin: "-20px"  } as const,
} as const;
