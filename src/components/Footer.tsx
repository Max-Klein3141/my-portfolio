"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─── Constants ──────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Icons ──────────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="w-[10px] h-[10px]" aria-hidden="true">
      <path d="M2.5 9.5l7-7M9.5 9V2.5H3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 5l7 4.5L15 5" />
    </svg>
  );
}

/* ─── Social link ────────────────────────────────────────────────── */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white/20 hover:text-white/55 transition-colors duration-300 p-1.5"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.18, ease }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Reveal primitive ───────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.84, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────── */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        fontFamily: "var(--font-geist-sans), sans-serif",
        background: "#000",
      }}
      aria-label="Site footer"
    >

      {/* ── Atmospheric depth ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Top transition: fade from page content above */}
        <div className="absolute top-0 left-0 right-0 h-40
                        bg-gradient-to-b from-black to-transparent" />

        {/* Central bloom — warmth at the horizon */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[900px] h-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(139,92,246,0.09) 0%, rgba(99,102,241,0.05) 45%, transparent 75%)",
            filter: "blur(60px)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.0, ease }}
        />

        {/* Dot grid — sparser than pages */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Bottom vignette — grounds the footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32
                        bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 pt-24 md:pt-32 pb-10">
        <div className="max-w-[1080px] mx-auto w-full">

          {/* ── Status signal ────────────────────────────────────── */}
          <Reveal delay={0} className="mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-[6px] w-[6px]
                                 rounded-full bg-emerald-400/70" />
              </span>
              <span className="text-[10px] font-[500] tracking-[0.28em] uppercase
                               text-white/22">
                Open to new conversations — 2026
              </span>
            </div>
          </Reveal>

          {/* ── Cinematic closing statement ───────────────────────── */}
          <div className="mb-14 md:mb-16">
            <Reveal delay={0.06} y={36}>
              <p className="text-footer-closing font-[240] text-white/82 max-w-[860px]">
                Thoughtfully building{" "}
                <br className="hidden sm:block" />
                <span className="text-gradient">what's next.</span>
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-7 md:mt-8">
              <p className="text-[16.5px] font-[340] leading-[1.88] text-white/28
                            max-w-[440px]">
                [PLACEHOLDER — one-line positioning statement]
              </p>
            </Reveal>
          </div>

          {/* ── CTA cluster ──────────────────────────────────────── */}
          <Reveal delay={0.24} className="mb-20 md:mb-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">

              {/* Primary CTA */}
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                           bg-white text-black text-[13px] font-[520] tracking-[0.02em]
                           shadow-[0_0_36px_rgba(255,255,255,0.06)]"
                whileHover={{
                  scale: 1.025,
                  backgroundColor: "rgba(238,238,238,1)",
                  boxShadow: "0 0 48px rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease }}
              >
                Get in Touch
                <svg viewBox="0 0 13 13" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>

              {/* Email — monospace, quiet */}
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 text-white/25
                           hover:text-white/55 transition-colors duration-300"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease }}
              >
                <MailIcon />
                <span className="font-[family-name:var(--font-geist-mono)] text-[12px]
                                 font-[400] tracking-[0.04em]">
                  [PLACEHOLDER — your email]
                </span>
              </motion.a>

              {/* Resume */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-[400]
                           tracking-[0.04em] text-white/20 hover:text-white/48
                           transition-colors duration-300 border border-white/[0.08]
                           hover:border-white/[0.16] rounded-lg px-3.5 py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease }}
              >
                Resume
                <ArrowUpRight />
              </motion.a>

            </div>
          </Reveal>

          {/* ── Top divider ───────────────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="relative h-px mb-8">
              <div className="absolute inset-0 bg-white/[0.06]" />
              <motion.div
                className="absolute inset-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(139,92,246,0.3), rgba(99,102,241,0.2), transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
              />
            </div>
          </Reveal>

          {/* ── Bottom colophon bar ───────────────────────────────── */}
          <Reveal delay={0.32}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-6 sm:gap-4">

              {/* Left — identity + nav */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center
                              gap-4 sm:gap-7">
                <Link
                  href="/"
                  className="text-[12px] font-[500] tracking-[0.06em] text-white/28
                             hover:text-white/55 transition-colors duration-250"
                >
                  Max Klein
                </Link>
                <div className="hidden sm:block w-px h-3 bg-white/[0.1]" />
                <nav className="flex items-center gap-5" aria-label="Footer navigation">
                  {[
                    { label: "About",      href: "/about" },
                    { label: "Experience", href: "/experience" },
                    { label: "Now",        href: "/now" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[11px] font-[400] tracking-[0.06em] text-white/18
                                 hover:text-white/42 transition-colors duration-250"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Center — social icons */}
              <div className="flex items-center gap-0 -mx-1.5">
                <SocialLink href="https://linkedin.com/in/maxklein" label="LinkedIn">
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink href="https://github.com/maxklein" label="GitHub">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href="https://x.com/maxklein" label="X / Twitter">
                  <XIcon />
                </SocialLink>
                <SocialLink href="https://substack.com/@maxklein" label="Substack">
                  <SubstackIcon />
                </SocialLink>
                <SocialLink href="https://medium.com/@maxklein" label="Medium">
                  <MediumIcon />
                </SocialLink>
              </div>

              {/* Right — copyright + tagline */}
              <div className="flex flex-col items-start sm:items-end gap-1">
                <p className="text-[11px] font-[400] tracking-[0.1em] text-white/14">
                  © 2026 Max Klein
                </p>
                <p className="text-[10px] font-[440] tracking-[0.16em] uppercase
                               text-white/10 italic">
                  The future belongs to builders.
                </p>
              </div>

            </div>
          </Reveal>

          {/* ── Final breath ─────────────────────────────────────── */}
          <motion.div
            className="mt-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.6, ease, delay: 0.6 }}
          >
            <p className="text-[9px] font-[400] tracking-[0.42em] uppercase
                           text-white/[0.07]">
              This is only the beginning.
            </p>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
