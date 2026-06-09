"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Button — the canonical CTA primitive.
 *
 * Two variants:
 *   primary → white pill, black text (the site's main call-to-action)
 *   ghost   → bordered, translucent surface (secondary actions)
 *
 * Renders as a Next <Link> (internal href), an <a> (external href), or a
 * <button> (onClick). Optional trailing arrow that nudges on hover.
 */

type Variant = "primary" | "ghost";
type Size    = "sm" | "md";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-white text-black shadow-cta-idle hover:shadow-cta-hover hover:bg-white/90",
  ghost:
    "border border-white/12 bg-white/[0.02] text-white/60 backdrop-blur-sm " +
    "hover:border-white/25 hover:text-white/85",
};

const SIZE: Record<Size, string> = {
  sm: "px-[14px] py-[7px] text-[12px] tracking-[0.045em]",
  md: "px-7 py-[11px] text-[13px] tracking-[0.02em]",
};

function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-[2px]"
    >
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface BaseProps {
  children:  React.ReactNode;
  variant?:  Variant;
  size?:     Size;
  arrow?:    boolean;
  className?: string;
}

type ButtonProps =
  | (BaseProps & { href: string; external?: boolean; onClick?: never })
  | (BaseProps & { onClick: () => void; href?: never; external?: never });

export default function Button({
  children,
  variant = "primary",
  size    = "md",
  arrow   = false,
  className = "",
  ...rest
}: ButtonProps) {
  const classes =
    `group inline-flex items-center justify-center gap-2 rounded-full ` +
    `font-semibold transition-all duration-200 ` +
    `hover:scale-[1.025] active:scale-[0.975] ` +
    `${VARIANT[variant]} ${SIZE[size]} ${className}`;

  const inner = (
    <>
      {children}
      {arrow && <ArrowRight />}
    </>
  );

  // External link
  if ("href" in rest && rest.href && rest.external) {
    return (
      <a href={rest.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  // Internal link
  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {inner}
      </Link>
    );
  }

  // Action button
  return (
    <motion.button
      onClick={rest.onClick}
      className={classes}
      transition={{ duration: 0.18, ease }}
    >
      {inner}
    </motion.button>
  );
}
