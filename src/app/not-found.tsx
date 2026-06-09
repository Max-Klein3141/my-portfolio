"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const LINKS = [
  { label: "Home",       href: "/"           },
  { label: "Projects",   href: "/projects"   },
  { label: "Experience", href: "/experience" },
  { label: "Now",        href: "/now"         },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                        bg-violet-600/[0.08] blur-[140px] animate-drift-a" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                        bg-indigo-600/[0.07] blur-[120px] animate-drift-b" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="absolute inset-0
          bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_30%,#000_100%)]" />
      </div>

      <div className="relative z-10 page-x text-center max-w-[600px]">

        {/* Ghost 404 */}
        <motion.div
          variants={fadeIn(0)}
          initial="hidden"
          animate="visible"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%]
                     select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="text-[clamp(8rem,22vw,18rem)] font-[230] tracking-[-0.07em]
                       text-white/[0.03] leading-none"
          >
            404
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          <motion.p variants={scaleIn()} className="section-label">
            Page not found
          </motion.p>

          <motion.h1
            variants={fadeUp(20)}
            className="text-[clamp(2rem,5vw,4rem)] font-[700]
                       tracking-[-0.035em] leading-[1.1] text-white/85"
          >
            Lost in the{" "}
            <span className="text-gradient">noise.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp(16)}
            className="text-white/30 text-[15px] leading-[1.7] font-light max-w-[360px]"
          >
            This page doesn&apos;t exist — but the rest of the site does.
            Here&apos;s where you might want to go:
          </motion.p>

          {/* Nav links */}
          <motion.div
            variants={staggerContainer(0.07, 0.1)}
            className="flex flex-wrap items-center justify-center gap-2 mt-2"
          >
            {LINKS.map(({ label, href }) => (
              <motion.div key={label} variants={scaleIn()}>
                <Link
                  href={href}
                  className="px-4 py-[7px] rounded-full
                             border border-white/[0.08] bg-white/[0.02]
                             text-white/35 text-[12px] tracking-[0.14em] uppercase font-medium
                             hover:border-white/[0.18] hover:text-white/65
                             transition-all duration-200"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={fadeUp(12)}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 mt-2
                         px-6 py-[10px] rounded-full
                         bg-white text-black text-[13px] font-semibold
                         hover:bg-white/90 hover:scale-[1.025] active:scale-[0.975]
                         transition-all duration-200"
            >
              Go home
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"
                   className="transition-transform duration-200 group-hover:translate-x-[2px]">
                <path d="M2 5.5h7M6 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
