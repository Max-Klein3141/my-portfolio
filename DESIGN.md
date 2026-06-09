# Design System — canonical primitives

Single source of truth for the visual language. New sections must build on
these; do not re-implement backgrounds, buttons, cards, or status chips
inline.

## Token layer (do not bypass)
- **Colors / spacing / type scale:** `src/app/globals.css` (`:root` tokens + clamp type classes)
- **Tailwind mirror:** `tailwind.config.ts` (named font-weights, radii, shadows, easings, keyframes)
- **Motion:** `src/lib/motion.ts` — one `ease = [0.22, 1, 0.36, 1]`, one duration scale, shared variant factories

## Shared components (`src/components/ui/`)
| Component | Use for | Notes |
|---|---|---|
| `AmbientBackground` | The fixed dark-cinematic backdrop on every page | `variant="hero"` (homepage, stronger centered glow) or `variant="page"` (interior, default). Replaced 5 hand-rolled backdrops. |
| `Button` | All CTAs | `variant="primary"` (white pill) / `"ghost"` (bordered); `size="sm"|"md"`; renders as Link / external `<a>` / `<button>`; optional `arrow`. |
| `Card` | Bordered translucent surfaces | `href` makes it a link; `lift` adds hover translate + shadow. Base hover = border + surface brighten. |
| `StatusPill` | Status chips | One config map covers both vocabularies (`active`/`building`/`shipped`/`concept` and `ongoing`/`completed`/`forming`). Live states animate a ping dot. |
| `Reveal` / `RevealLine` | Scroll-triggered reveals | In `src/components/ui/Reveal.tsx`. Never redefine locally. |

## Rules
1. One backdrop component — never inline orbs/dot-grid/vignette again.
2. One `ease`, durations from `lib/motion`. Reveals via shared `Reveal`.
3. Two button variants only. Two card states (rest / hover).
4. Accent ramp (violet→indigo→cyan) is for gradient text + ambient orbs only.
5. Respect `prefers-reduced-motion` (CSS is wired globally; JS scroll effects must check it too).

## Deferred (intentional, not oversight)
- **Type-scale consolidation** (merging the near-duplicate `text-*-hero` /
  `text-*-ghost` classes into a smaller semantic set) is deferred to the
  section rebuilds. The Essays removal (Phase 2) deletes `text-essays-*`, and
  the Experience/Projects rebuilds (Phase 3–4) replace most remaining per-page
  classes — renaming them now would be churn + regression risk. Canonical
  target set: `text-display`, `text-h1`, `text-h2`, `text-pull`, `text-ghost`.
