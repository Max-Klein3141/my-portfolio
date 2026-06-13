"use client";

/**
 * PointerGlow — a pointer-reactive light that layers over AmbientBackground.
 *
 * A single soft radial bloom (accent-tinted) tracks the cursor with a gentle
 * spring, plus a hair of parallax on the hero's dot-grid so the composition
 * gains depth as you move. Pure transform/opacity, no layout work.
 *
 * Fully gated behind useReducedMotion — renders nothing when motion is
 * reduced. Non-interactive; sits beneath z-10 content, above the z-0 backdrop.
 */

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ease } from "@/lib/motion";

export default function PointerGlow() {
  const reduce = useReducedMotion();

  // Normalised pointer position (0..1), centred until the first move.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Soft spring so the bloom trails the cursor like heavy light, not a laser.
  const sx = useSpring(px, { stiffness: 60, damping: 22, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 60, damping: 22, mass: 0.7 });

  // Bloom centre, expressed as a percentage of the viewport.
  const bx = useTransform(sx, (n) => `${(n * 100).toFixed(2)}%`);
  const by = useTransform(sy, (n) => `${(n * 100).toFixed(2)}%`);
  const background = useMotionTemplate`radial-gradient(440px circle at ${bx} ${by}, rgba(129,140,248,0.085), rgba(103,232,249,0.038) 40%, transparent 72%)`;

  // Tiny dot-grid parallax — a few px of counter-drift for depth.
  const gx = useTransform(sx, (n) => (n - 0.5) * -14);
  const gy = useTransform(sy, (n) => (n - 0.5) * -10);

  useEffect(() => {
    if (reduce) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        px.set(e.clientX / window.innerWidth);
        py.set(e.clientY / window.innerHeight);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, px, py]);

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 select-none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease }}
    >
      {/* Cursor bloom */}
      <motion.div className="absolute inset-0" style={{ background }} />

      {/* Parallax dot-grid — counter-drifts a few px against the cursor */}
      <motion.div
        className="dot-grid absolute inset-[-2%] opacity-50"
        style={{ x: gx, y: gy }}
      />
    </motion.div>
  );
}
