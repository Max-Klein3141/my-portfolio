"use client";

import Image from "next/image";

/**
 * ProjectMedia — the cinematic image area that sits at the top of a project Card.
 *
 * Two modes, one visual language:
 *   • Real image   → next/image (fill + object-cover), gentle scale/brighten on
 *                    the parent Card's `group` hover.
 *   • No image yet → an on-brand, accent-tinted gradient placeholder with a
 *                    minimal monogram + category label, so image-less cards
 *                    still read as intentional and premium.
 *
 * Sizing is explicit (a fixed aspect-ratio box) so the framer-motion `layout`
 * animation on the parent card stays smooth and never reflows mid-transition.
 *
 * Edges: the media bleeds to the card edges via negative margins supplied by
 * the caller; corners are rounded only at the top to match the Card's rounding.
 */

type AccentCategory = "AI" | "Finance" | "Research" | "Tools";

/* Per-category accent tint for the placeholder — sampled from the global
   violet → indigo → cyan ramp so each category reads distinctly but stays
   firmly on-brand. */
const ACCENT: Record<AccentCategory, { from: string; via: string; glow: string }> = {
  AI:       { from: "#c4b5fd", via: "#818cf8", glow: "rgba(196,181,253,0.22)" }, // violet→indigo
  Finance:  { from: "#818cf8", via: "#67e8f9", glow: "rgba(129,140,248,0.20)" }, // indigo→cyan
  Research: { from: "#a5b4fc", via: "#818cf8", glow: "rgba(165,180,252,0.20)" }, // indigo family
  Tools:    { from: "#67e8f9", via: "#818cf8", glow: "rgba(103,232,249,0.18)" }, // cyan→indigo
};

/** First letters of the first two words of the title (e.g. "Macro Lens" → "ML"). */
function monogram(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "·";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProjectMedia({
  title,
  category,
  image,
  imageAlt,
}: {
  title:     string;
  category:  AccentCategory;
  image?:    string;
  imageAlt?: string;
}) {
  const accent = ACCENT[category];

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl
                 border-b border-white/[0.06] bg-white/[0.02]"
    >
      {image ? (
        /* ── Real project image ──────────────────────────────────── */
        <Image
          src={image}
          alt={imageAlt ?? `${title} — project preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-center
                     transition-[transform,filter] duration-500 ease-out
                     brightness-[0.92] saturate-[0.95]
                     group-hover:scale-[1.035] group-hover:brightness-100"
        />
      ) : (
        /* ── On-brand placeholder (no image yet) ─────────────────── */
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-500 ease-out
                     group-hover:scale-[1.03]"
          style={{
            backgroundImage: `radial-gradient(120% 120% at 18% 0%, ${accent.glow} 0%, transparent 55%), linear-gradient(140deg, ${accent.from}1f 0%, ${accent.via}14 45%, transparent 78%)`,
          }}
        >
          {/* faint dot texture to echo the ambient backdrop */}
          <div className="absolute inset-0 dot-grid opacity-[0.5]" />

          {/* monogram — the focal mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="select-none font-[300] tracking-[-0.04em]
                         text-[clamp(2.6rem,6vw,3.4rem)] leading-none
                         text-gradient opacity-90
                         transition-opacity duration-500 group-hover:opacity-100"
            >
              {monogram(title)}
            </span>
          </div>

          {/* category tag, lower-left */}
          <span
            className="absolute bottom-3 left-4 text-[9px] font-medium uppercase
                       tracking-[0.24em] text-white/30"
          >
            {category}
          </span>
        </div>
      )}

      {/* Cinematic legibility overlay — dark at the bottom so card text below
          (and any image caption) stays readable; applies in both modes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   bg-gradient-to-t from-black/65 via-black/10 to-transparent"
      />

      {/* Hairline inner stroke for that inset, framed look. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-t-xl
                   ring-1 ring-inset ring-white/[0.05]"
      />
    </div>
  );
}
