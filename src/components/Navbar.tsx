"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href: string;
}

/* ─── Constants ──────────────────────────────────────────────────── */

const NAV_LINKS: NavLink[] = [
  { label: "Home",       href: "/" },
  { label: "Projects",   href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Now",        href: "/now" },
  { label: "About",      href: "/about" },
  { label: "Ask AI",     href: "/ask" },
  { label: "Contact",    href: "/contact" },
];

const easing = [0.22, 1, 0.36, 1] as const;

/* ─── SVG Icons ──────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]" aria-hidden="true">
      <path d="M14.25 2.25H6.75A1.5 1.5 0 0 0 5.25 3.75v16.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V9l-4.5-6.75z" />
      <path d="M14.25 2.25V9h4.5" />
      <path d="M8.25 13.5h7.5M8.25 16.5h4.5" />
    </svg>
  );
}

/* ─── Social Link ────────────────────────────────────────────────── */

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
      className="text-white/30 hover:text-white/70 transition-colors duration-300 p-1"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: easing }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Desktop Nav Link ───────────────────────────────────────────── */

function DesktopNavLink({ label, href }: NavLink) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative text-[13px] font-[380] tracking-[0.02em] text-white/45 hover:text-white/90 transition-colors duration-300 py-1 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white/40 block"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: hovered ? "100%" : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: easing }}
      />
    </Link>
  );
}

/* ─── Mobile Menu ────────────────────────────────────────────────── */

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Prevent body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: easing, staggerChildren: 0.07, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3, ease: easing } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
    exit:   { opacity: 0, y: -10, transition: { duration: 0.25, ease: easing } },
  };

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: easing, delay: 0.35 } },
    exit:    { scaleX: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-[#080808]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Top row mirrors the navbar */}
          <div className="flex items-center justify-between px-6 pt-7 pb-6">
            <motion.span
              className="text-[15px] font-[460] tracking-[-0.01em] text-white/90"
              variants={itemVariants}
            >
              Max Klein
            </motion.span>
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 transition-colors duration-200 p-1 -mr-1"
              aria-label="Close menu"
              variants={itemVariants}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-5 h-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Primary nav */}
          <nav className="flex flex-col px-6 pt-4 flex-1">
            {NAV_LINKS.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-[18px] text-[38px] font-[300] tracking-[-0.03em] text-white/80 hover:text-white transition-colors duration-300 leading-none"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Divider */}
          <motion.div
            className="mx-6 h-px bg-white/[0.07] origin-left"
            variants={dividerVariants}
          />

          {/* Bottom section */}
          <div className="px-6 pt-7 pb-10">
            <motion.div
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              {/* Social */}
              <div className="flex items-center gap-5">
                <SocialLink href="https://linkedin.com/in/maxklein" label="LinkedIn">
                  <LinkedInIcon />
                </SocialLink>
                <SocialLink href="https://github.com/maxklein" label="GitHub">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href="https://x.com/maxklein" label="X / Twitter">
                  <XIcon />
                </SocialLink>
              </div>

              {/* CTA */}
              <motion.a
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-[450] tracking-[0.04em] uppercase text-white/80 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: easing }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hamburger ──────────────────────────────────────────────────── */

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <motion.span
        className="block h-px w-5 bg-white/60 origin-center"
        animate={open ? { rotate: 45, y: 3, scaleX: 0.85 } : { rotate: 0, y: 0, scaleX: 1 }}
        transition={{ duration: 0.3, ease: easing }}
      />
      <motion.span
        className="block h-px w-4 bg-white/60 origin-center"
        animate={open ? { rotate: -45, y: -3, scaleX: 1.05 } : { rotate: 0, y: 0, scaleX: 1 }}
        transition={{ duration: 0.3, ease: easing }}
      />
    </motion.button>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Floating bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
      >
        <motion.nav
          className="pointer-events-auto mt-4 mx-4 md:mx-8 w-full max-w-[880px] rounded-2xl flex items-center justify-between px-5 md:px-6 h-[52px]"
          animate={{
            backgroundColor: scrolled
              ? "rgba(10, 10, 10, 0.82)"
              : "rgba(10, 10, 10, 0.52)",
            borderColor: scrolled
              ? "rgba(255, 255, 255, 0.075)"
              : "rgba(255, 255, 255, 0.055)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset"
              : "0 4px 24px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.03) inset",
          }}
          transition={{ duration: 0.4, ease: easing }}
          style={{
            border: "1px solid",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
          }}
        >
          {/* ── Left: Wordmark ── */}
          <Link
            href="/"
            className="flex-shrink-0 text-[14px] font-[520] tracking-[-0.02em] text-white/88 hover:text-white transition-colors duration-300"
          >
            Max Klein
          </Link>

          {/* ── Center: Nav links (desktop) ── */}
          {/* In-flow flex-1 group: reserves horizontal space and stays centered,
              so it can never overlap the wordmark or the right cluster. */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-5 px-3">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink key={link.label} {...link} />
            ))}
          </div>

          {/* ── Right: Social + Resume + CTA (desktop) / Hamburger (mobile) ── */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Socials — revealed at xl to leave room for the full 7-link nav */}
            <div className="hidden xl:flex items-center gap-1">
              <SocialLink href="https://linkedin.com/in/maxklein" label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="https://github.com/maxklein" label="GitHub">
                <GitHubIcon />
              </SocialLink>
              <SocialLink href="https://x.com/maxklein" label="X / Twitter">
                <XIcon />
              </SocialLink>
            </div>

            {/* Resume — desktop only */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[12px] font-[400] tracking-[0.025em] text-white/35 hover:text-white/65 transition-colors duration-300"
              aria-label="Resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: easing }}
            >
              <ResumeIcon />
              <span>Resume</span>
            </motion.a>

            {/* Hamburger — mobile only */}
            <div className="md:hidden">
              <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Fullscreen mobile overlay */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
