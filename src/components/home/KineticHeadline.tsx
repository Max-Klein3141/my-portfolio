"use client";

/**
 * KineticHeadline — the hero's layered, kinetic headline treatment.
 *
 * Each word rises out of a clipping mask on its own beat, so the line
 * assembles itself rather than simply fading in. The accented span keeps
 * the site's violet→indigo→cyan `text-gradient`. Reduced-motion users get
 * a single calm fade with no per-word movement.
 *
 * Pure transform/opacity. The mask is an overflow-hidden wrapper per word,
 * so nothing reflows mid-animation.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/lib/motion";

type Segment = { text: string; accent?: boolean };

const WORDS: { word: string; accent?: boolean }[] = (
  [
    { text: "Building at the intersection of " },
    { text: "AI, finance,", accent: true },
    { text: " and global entrepreneurship." },
  ] satisfies Segment[]
).flatMap(({ text, accent }) =>
  // Split into words while keeping leading/trailing spaces attached so the
  // line wraps and spaces exactly like normal prose.
  text
    .split(/(\s+)/)
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => ({ word: chunk, accent })),
);

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.052, delayChildren: 0.12 },
  },
};

const rise: Variants = {
  hidden: { y: "108%" },
  visible: {
    y: "0%",
    transition: { duration: 0.82, ease },
  },
};

export default function KineticHeadline({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  // Reduced motion: one calm fade, no per-word kinetics.
  if (reduce) {
    return (
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className={className}
      >
        Building at the intersection of{" "}
        <span className="text-gradient">AI, finance,</span> and global
        entrepreneurship.
      </motion.h1>
    );
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label="Building at the intersection of AI, finance, and global entrepreneurship."
    >
      {WORDS.map(({ word, accent }, i) => {
        // Whitespace chunks need no mask — render them inline so wrapping works.
        if (word.trim().length === 0) {
          return (
            <span key={i} aria-hidden="true">
              {word}
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-flex overflow-hidden align-bottom pb-[0.06em]"
          >
            <motion.span
              variants={rise}
              className={`inline-block will-change-transform ${
                accent ? "text-gradient" : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h1>
  );
}
