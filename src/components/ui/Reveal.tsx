"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, duration, viewport } from "@/lib/motion";

/**
 * Canonical scroll-triggered reveal component.
 * Replaces the local Reveal copies in every page.
 */
export function Reveal({
  children,
  delay  = 0,
  y      = 24,
  className = "",
  margin,
}: {
  children:   React.ReactNode;
  delay?:     number;
  y?:         number;
  className?: string;
  margin?:    string;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once:   true,
    margin: (margin ?? viewport.once.margin) as `${number}px`,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.reveal, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Canonical horizontal divider that draws in from the left on scroll.
 */
export function RevealLine({
  delay = 0,
  className = "",
}: {
  delay?:     number;
  className?: string;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" as `${number}px` });

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
