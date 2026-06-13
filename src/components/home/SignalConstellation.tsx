"use client";

/**
 * SignalConstellation — the hero's quiet signature motif.
 *
 * A precise, sparse network of nodes and hairline edges: the visual idea of
 * "AI × finance × building" as a signal graph. A few slow pulses travel the
 * edges (SVG stroke-dash offset, GPU-cheap). Everything is accent-tinted and
 * lives at very low opacity so it reads as a structural detail, never a
 * dashboard. Symmetric and centred behind the headline.
 *
 * Reduced motion: the graph renders static (no traveling pulses).
 */

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

/* Hand-placed on a 1000×560 canvas. Kept deliberately sparse + balanced. */
type Node = { x: number; y: number; r?: number; key?: boolean };

const NODES: Node[] = [
  { x: 500, y: 280, r: 2.4, key: true }, // centre / intersection
  { x: 210, y: 150, r: 1.7 },
  { x: 180, y: 410, r: 1.7 },
  { x: 790, y: 150, r: 1.7 },
  { x: 820, y: 410, r: 1.7 },
  { x: 360, y: 300, r: 1.4 },
  { x: 640, y: 300, r: 1.4 },
  { x: 500, y: 90, r: 1.4 },
  { x: 500, y: 470, r: 1.4 },
];

/* Edges as [fromIndex, toIndex]. A clean radial weave through the centre. */
const EDGES: [number, number][] = [
  [1, 5],
  [5, 0],
  [0, 6],
  [6, 3],
  [2, 5],
  [4, 6],
  [7, 0],
  [0, 8],
  [1, 7],
  [3, 7],
  [2, 8],
  [4, 8],
];

/* Three edges carry a traveling pulse, each on its own slow cycle. */
const PULSES = [
  { edge: 0, dur: 5.5, delay: 0.0 },
  { edge: 3, dur: 6.5, delay: 1.4 },
  { edge: 9, dur: 7.2, delay: 0.7 },
];

function lineLength(a: Node, b: Node) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export default function SignalConstellation({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 1000 560"
      fill="none"
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease, delay: 0.5 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="sc-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <radialGradient id="sc-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#818cf8" />
        </radialGradient>
      </defs>

      {/* Static hairline edges */}
      <g stroke="url(#sc-edge)" strokeOpacity="0.16" strokeWidth="0.75">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      {/* Traveling pulses — a short bright dash that walks each edge */}
      {!reduce &&
        PULSES.map(({ edge, dur, delay }, i) => {
          const [a, b] = EDGES[edge];
          const len = lineLength(NODES[a], NODES[b]);
          const dash = 14;
          return (
            <motion.line
              key={`p-${i}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="url(#sc-edge)"
              strokeOpacity="0.55"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${len}`}
              initial={{ strokeDashoffset: dash }}
              animate={{ strokeDashoffset: -len }}
              transition={{
                duration: dur,
                delay,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1.1,
              }}
            />
          );
        })}

      {/* Nodes */}
      <g fill="url(#sc-node)">
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r ?? 1.6}
            fillOpacity={n.key ? 0.85 : 0.4}
          />
        ))}
      </g>

      {/* Soft halo on the central intersection node */}
      {!reduce && (
        <motion.circle
          cx={NODES[0].x}
          cy={NODES[0].y}
          r={5}
          fill="none"
          stroke="url(#sc-node)"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 2.6], opacity: [0.5, 0] }}
          transition={{
            duration: 4,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
          style={{ transformOrigin: `${NODES[0].x}px ${NODES[0].y}px` }}
        />
      )}
    </motion.svg>
  );
}
