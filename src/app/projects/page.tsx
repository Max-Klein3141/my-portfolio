"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewport } from "@/lib/motion";
import { Reveal, RevealLine } from "@/components/ui/Reveal";
import AmbientBackground from "@/components/ui/AmbientBackground";
import Card from "@/components/ui/Card";

/* ── Types ────────────────────────────────────────────────────────── */

interface Project {
  id:          string;
  title:       string;
  tag:         string;
  status:      string;
  tagline:     string;
  description: string;
  tech:        string[];
}

/* ── Data ─────────────────────────────────────────────────────────────
   To fill this in: replace the [PLACEHOLDER] strings below with your own
   copy. Add a project by copying one entry; remove one by deleting it.   */

const PROJECTS: Project[] = [
  {
    id:          "portfolio-intelligence-os",
    title:       "Portfolio Intelligence OS",
    tag:         "AI",
    status:      "Building",
    tagline:     "An AI-native layer for private wealth management.",
    description:
      "A conversational interface for private banking clients — natural language queries over portfolio data, scenario analysis, and macro-linked insights. Built on Claude and structured financial data pipelines. The goal: make institutional-grade portfolio intelligence accessible through conversation.",
    tech:        ["Claude API", "Next.js", "Financial Data", "Streaming UI"],
  },
  {
    id:          "systems-thinking-in-markets",
    title:       "Systems Thinking in Markets",
    tag:         "Research",
    status:      "Active",
    tagline:     "Research on feedback loops and contagion in financial systems.",
    description:
      "An independent research project applying cybernetics and complex adaptive systems theory to modern market microstructure. Maps second-order effects in financial contagion — how shocks propagate through interconnected systems in ways that linear models consistently miss.",
    tech:        ["Complexity Theory", "Market Microstructure", "Systems Dynamics"],
  },
  {
    id:          "founder-scout-model",
    title:       "Founder Scout Model",
    tag:         "Finance",
    status:      "Concept",
    tagline:     "A framework for identifying outlier founders before traction.",
    description:
      "A structured approach to early-stage founder evaluation, synthesising pattern recognition from elite athletics, academic rigor, and decision-making under uncertainty. Built on the premise that the signals that predict exceptional performance in sport are measurable — and transferable to venture.",
    tech:        ["Venture Capital", "Decision Frameworks", "Pattern Recognition"],
  },
  {
    id:          "cross-border-fintech-regulation",
    title:       "Cross-Border Fintech Regulation",
    tag:         "Research",
    status:      "Shipped",
    tagline:     "How fragmented regulation stifles global fintech.",
    description:
      "Academic paper examining regulatory arbitrage in cross-border fintech, with case studies across the EU, Singapore, and UAE. Proposes a convergence framework for international financial regulators. Completed as part of coursework — written to the standard of a policy brief.",
    tech:        ["Regulation", "Fintech", "International Finance", "Policy"],
  },
];

/* ── Sub-components ───────────────────────────────────────────────── */

function StatusPill({ label }: { label: string }) {
  return (
    <span className="flex-shrink-0 inline-flex items-center gap-1.5
                     rounded-full border border-white/[0.07] bg-white/[0.02]
                     px-2.5 py-[5px]">
      <span className="w-[5px] h-[5px] rounded-full bg-white/20" />
      <span className="text-white/22 text-[9px] tracking-[0.2em] uppercase font-medium">
        {label}
      </span>
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={fadeUp(16, index * 0.06)} initial="hidden" animate="visible">
      <Card>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-white/20 text-[9.5px] tracking-[0.24em] uppercase font-medium mb-2">
              {project.tag}
            </p>
            <h3 className="text-white/80 text-[17px] font-[440] tracking-[-0.02em]
                           leading-snug group-hover:text-white/95 transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <StatusPill label={project.status} />
        </div>

        {/* Tagline */}
        <p className="text-white/45 text-[13.5px] font-light leading-[1.55] mb-4 italic">
          {project.tagline}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-4" />

        {/* Description */}
        <p className="text-white/30 text-[13px] leading-[1.72] font-light mb-6">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-[3px] rounded-full
                         border border-white/[0.06] bg-white/[0.02]
                         text-white/20 text-[9px] tracking-[0.16em] uppercase font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black">

      {/* ── Fixed background ──────────────────────────────────────── */}
      <AmbientBackground />

      <div className="relative z-10 page-x max-w-site mx-auto page-top pb-36">

        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="mb-20">

          {/* Ghost word */}
          <div className="relative">
            <motion.span
              variants={fadeIn(0)}
              initial="hidden"
              animate="visible"
              className="absolute -top-8 -left-4 select-none pointer-events-none
                         text-[clamp(5rem,14vw,12rem)] font-[230] tracking-[-0.06em]
                         text-white/[0.035] leading-none"
              aria-hidden="true"
            >
              Work
            </motion.span>

            <Reveal delay={0.05}>
              <p className="section-label mb-5 relative z-10">Projects &amp; Research</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-[clamp(3.2rem,7.5vw,7rem)] font-[700]
                             leading-[0.96] tracking-[-0.044em]
                             text-white relative z-10 mb-6">
                Things I&apos;m<br />
                <span className="text-gradient">building.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-white/35 text-[16px] leading-[1.72] font-light
                            max-w-[480px] relative z-10">
                [PLACEHOLDER — one-line description of the kind of work you do]
              </p>
            </Reveal>
          </div>

          <RevealLine delay={0.32} className="mt-10" />
        </header>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.07, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.once}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

      </div>
    </main>
  );
}
