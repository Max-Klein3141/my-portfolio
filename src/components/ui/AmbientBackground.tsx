/**
 * AmbientBackground — the canonical dark-cinematic backdrop.
 *
 * Replaces the five hand-rolled orb + dot-grid + vignette blocks that
 * previously lived inline in every page (home, about, now, experience,
 * projects). One component, two tuned presets:
 *
 *   variant="hero"  → homepage: stronger, centered glow
 *   variant="page"  → interior pages: calmer, top-anchored glow (default)
 *
 * Always fixed, non-interactive, and sits beneath z-10 content.
 */

type Variant = "hero" | "page";

const PRESETS: Record<
  Variant,
  {
    orbA:    string;
    orbB:    string;
    center:  string;
    grid:    string;
    vignette: string;
    topFade: string;
  }
> = {
  hero: {
    orbA:
      "absolute -top-56 -right-28 w-[780px] h-[780px] rounded-full " +
      "bg-violet-600/[0.13] blur-[150px] animate-drift-a",
    orbB:
      "absolute -bottom-56 -left-28 w-[680px] h-[680px] rounded-full " +
      "bg-blue-600/[0.10] blur-[140px] animate-drift-b",
    center:
      "w-[480px] h-[480px] rounded-full bg-indigo-500/[0.05] " +
      "blur-[120px] animate-breathe",
    grid:     "absolute inset-0 dot-grid",
    vignette:
      "absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent_25%,#000_100%)]",
    topFade:  "absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent",
  },
  page: {
    orbA:
      "absolute -top-56 -right-28 w-[800px] h-[800px] rounded-full " +
      "bg-violet-600/[0.08] blur-[170px] animate-drift-a",
    orbB:
      "absolute -bottom-56 -left-28 w-[680px] h-[680px] rounded-full " +
      "bg-blue-600/[0.06] blur-[160px] animate-drift-b",
    center:
      "w-[520px] h-[520px] rounded-full bg-indigo-500/[0.04] " +
      "blur-[140px] animate-breathe",
    grid:     "absolute inset-0 dot-grid",
    vignette:
      "absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_30%,transparent_14%,#000_100%)]",
    topFade:  "absolute top-0 left-0 right-0 h-52 bg-gradient-to-b from-black/60 to-transparent",
  },
};

export default function AmbientBackground({
  variant = "page",
}: {
  variant?: Variant;
}) {
  const p = PRESETS[variant];

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className={p.orbA} />
      <div className={p.orbB} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={p.center} />
      </div>
      <div className={p.grid} />
      <div className={p.vignette} />
      <div className={p.topFade} />
    </div>
  );
}
