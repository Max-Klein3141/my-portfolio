"use client";

import Link from "next/link";

/**
 * Card — the canonical surface primitive.
 *
 * Unifies the bordered, translucent panels used across the site
 * (project cards, the homepage anchor strip, etc). Renders as a Next
 * <Link> when href is provided, otherwise a plain <div>. The hover
 * treatment (border + surface brighten, optional lift) is consistent
 * with the global design tokens.
 */

interface CardProps {
  children:   React.ReactNode;
  href?:      string;
  /** Adds a subtle upward lift + shadow on hover (use for clickable cards). */
  lift?:      boolean;
  /** Tailwind padding utility — defaults to p-7. */
  padding?:   string;
  className?: string;
}

export default function Card({
  children,
  href,
  lift = false,
  padding = "p-7",
  className = "",
}: CardProps) {
  const classes =
    `group block rounded-xl border border-white/[0.07] bg-white/[0.018] ` +
    `transition-all duration-300 ` +
    `hover:border-white/[0.14] hover:bg-white/[0.032] ` +
    `${lift ? "hover:-translate-y-[2px] hover:shadow-card-hover" : ""} ` +
    `${padding} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${classes} cursor-pointer`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
