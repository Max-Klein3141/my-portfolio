"use client";

/**
 * PAGE TRANSITION TEMPLATE
 *
 * Next.js App Router re-mounts template.tsx on every navigation,
 * unlike layout.tsx which persists. This gives us a clean mount
 * animation on every route change — cinematic, not jarring.
 *
 * Timing: 520ms enter with [0.22,1,0.36,1] — the site's primary easing.
 * The y:8 offset gives a subtle upward drift that communicates arrival.
 */

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease }}
    >
      {children}
    </motion.div>
  );
}
