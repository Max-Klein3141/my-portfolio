"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  viewport,
} from "@/lib/motion";
import { Reveal, RevealLine } from "@/components/ui/Reveal";
import AmbientBackground from "@/components/ui/AmbientBackground";
import StatusPill from "@/components/ui/StatusPill";
import Card from "@/components/ui/Card";

/* ── Types ────────────────────────────────────────────────────────── */

type Status   = "active" | "building" | "shipped" | "concept";
type Category = "All" | "AI" | "Finance" | "Research" | "Tools";

interface Project {
  id:          string;
  title:       string;
  tagline:     string;
  description: string;
  status:      Status;
  category:    Exclude<Category, "All">;
  year:        string;
  tags:        string[];
  href?:       string;
}

/* ── Data ─────────────────────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    id:          "ai-portfolio-os",
    title:       "Portfolio Intelligence OS",
    tagline:     "Conversational interface for private wealth.",
    description:
      "An AI-native layer for private banking clients — natural language queries over portfolio data, scenario analysis, and macro-linked insights. Built on Claude and structured financial data pipelines.",
    status:   "building",
    category: "AI",
    year:     "2025",
    tags:     ["Claude API", "Next.js", "Financial Data", "Streaming UI"],
  },
  {
    id:          "systems-research",
    title:       "Systems Thinking in Markets",
    tagline:     "Research on feedback loops in financial systems.",
    description:
      "An independent research project mapping second-order effects in financial contagion. Applies cybernetics and complex adaptive systems theory to modern market microstructure.",
    status:   "active",
    category: "Research",
    year:     "2025",
    tags:     ["Complexity Theory", "Market Microstructure", "Systems Dynamics"],
  },
  {
    id:          "scout-model",
    title:       "Founder Scout Model",
    tagline:     "Identifying outlier founders before traction.",
    description:
      "A structured framework for early-stage founder evaluation, synthesising pattern recognition from athletic high performance, academic rigour, and early decision-making under uncertainty.",
    status:   "concept",
    category: "Finance",
    year:     "2025",
    tags:     ["Venture Capital", "Decision Frameworks", "Pattern Recognition"],
  },
  {
    id:          "macro-lens",
    title:       "Macro Lens",
    tagline:     "Weekly synthesis of global macro signals.",
    description:
      "A disciplined practice of weekly macro synthesis — condensing central bank communications, geopolitical shifts, and cross-asset moves into a single clear-eyed perspective.",
    status:   "active",
    category: "Finance",
    year:     "2024",
    tags:     ["Global Macro", "Fixed Income", "FX", "Research"],
  },
  {
    id:          "this-site",
    title:       "maxklein.xyz",
    tagline:     "This portfolio — a living document.",
    description:
      "A founder portfolio built as a first-principles design exercise: cinematic dark aesthetic, fluid typography system, AI-powered conversational interface, and near-zero-latency page transitions.",
    status:   "shipped",
    category: "Tools",
    year:     "2025",
    tags:     ["Next.js 14", "Framer Motion", "Tailwind CSS", "Claude API"],
    href:     "/",
  },
  {
    id:          "cross-border-paper",
    title:       "Cross-Border Fintech Regulation",
    tagline:     "How fragmented rules stifle global fintech.",
    description:
      "Academic paper examining regulatory arbitrage in cross-border fintech, with case studies across the EU, Singapore, and UAE. Proposes a convergence framework for international financial regulators.",
    status:   "shipped",
    category: "Research",
    year:     "2024",
    tags:     ["Regulation", "Fintech", "International Finance", "Policy"],
  },
];

const CATEGORIES: Category[] = ["All", "AI", "Finance", "Research", "Tools"];

/* ── Sub-components ───────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLinked = !!project.href;

  return (
    <motion.div
      variants={fadeUp(16, index * 0.06)}
      layout
      initial="hidden"
      animate="visible"
    >
      <Card href={project.href}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-white/20 text-[9.5px] tracking-[0.24em] uppercase font-medium mb-2">
              {project.category} · {project.year}
            </p>
            <h3 className="text-white/80 text-[17px] font-[440] tracking-[-0.02em]
                           leading-snug group-hover:text-white/95 transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <StatusPill status={project.status} />
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

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-[3px] rounded-full
                         border border-white/[0.06] bg-white/[0.02]
                         text-white/20 text-[9px] tracking-[0.16em] uppercase font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow — only on linked cards */}
        {isLinked && (
          <div className="mt-5 flex items-center gap-1.5 text-white/20
                          group-hover:text-white/50 transition-colors duration-200">
            <span className="text-[11px] tracking-[0.18em] uppercase font-medium">View</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 5h6M5.5 2.5l2.5 2.5-2.5 2.5" stroke="currentColor"
                    strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

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
              <p className="section-label mb-5 relative z-10">Projects & Research</p>
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
                A mix of active explorations, shipped work, and concepts still in
                incubation — spanning AI systems, financial research, and developer tools.
              </p>
            </Reveal>
          </div>

          {/* Stats row */}
          <Reveal delay={0.26}>
            <div className="flex items-center gap-8 mt-10">
              {[
                { n: PROJECTS.filter(p => p.status === "active").length,   l: "Active"   },
                { n: PROJECTS.filter(p => p.status === "building").length,  l: "Building" },
                { n: PROJECTS.filter(p => p.status === "shipped").length,   l: "Shipped"  },
                { n: PROJECTS.filter(p => p.status === "concept").length,   l: "Concept"  },
              ].map(({ n, l }) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="text-white/65 text-[22px] font-[300] tracking-[-0.02em]
                                   tabular-nums">
                    {n}
                  </span>
                  <span className="text-white/20 text-[9.5px] tracking-[0.22em] uppercase font-medium">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <RevealLine delay={0.32} className="mt-10" />
        </header>

        {/* ── Category filter ──────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="flex items-center gap-2 flex-wrap mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-[7px] rounded-full text-[11px] font-medium
                               tracking-[0.14em] uppercase transition-all duration-200
                               ${isActive
                                 ? "bg-white/[0.09] text-white/80 border border-white/[0.15]"
                                 : "bg-transparent text-white/25 border border-white/[0.06] hover:text-white/50 hover:border-white/[0.12]"
                               }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer(0.07, 0)}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Closing statement ────────────────────────────────────── */}
        <motion.div
          variants={fadeIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.once}
          className="mt-28 pt-12 border-t border-white/[0.06]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-white/15 text-[11px] tracking-[0.28em] uppercase font-medium mb-3">
                What&apos;s next
              </p>
              <p className="text-white/35 text-[15px] leading-[1.7] font-light max-w-[360px]">
                More projects are underway. The best ones are usually the ones
                still too early to name.
              </p>
            </div>
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 shrink-0
                         text-white/25 text-[12px] tracking-[0.16em] uppercase font-medium
                         hover:text-white/55 transition-colors duration-200"
            >
              Ask me anything
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5h6M5.5 2.5l2.5 2.5-2.5 2.5" stroke="currentColor"
                      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
