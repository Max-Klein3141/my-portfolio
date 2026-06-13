# Project images

This folder holds the preview pictures shown at the top of each card on the
**Projects** page (`src/app/projects/page.tsx`).

Right now there are **no images**, and that's fine — every card shows a polished,
on-brand placeholder automatically. Add a real picture whenever you have one.

## How to add a picture (2 steps)

1. **Drop the image in this folder**, named after the project's `id`:

   ```
   public/projects/<project-id>.jpg     ← .png and .webp also work
   ```

   Example: `public/projects/macro-lens.jpg`

2. **Point the project at it** in `src/app/projects/page.tsx` by setting the
   `image` field on that project:

   ```ts
   {
     id:    "macro-lens",
     // ...
     image: "/projects/macro-lens.jpg",   // ← add this line
   }
   ```

   (Note: the path starts with `/projects/…`, *not* `/public/...` — Next serves
   everything in `public/` from the site root.)

That's it. The placeholder disappears and your image takes its place, with the
same cinematic hover (gentle zoom + brighten) and dark gradient for legibility.

### Optional: custom alt text

For accessibility you can also set `imageAlt`. If you skip it, it defaults to
`"<title> — project preview"`.

```ts
image:    "/projects/macro-lens.jpg",
imageAlt: "Macro Lens weekly dashboard, dark UI",
```

## Image tips

- **Aspect ratio:** the frame is **16:10** and uses `object-cover`, so the image
  is cropped to fill — anything roughly landscape looks great. A good source size
  is ~**1200 × 750** (or 2× for retina: 2400 × 1500).
- **Format:** `.webp` is smallest; `.jpg` is fine for photos; `.png` for crisp UI
  screenshots. No config needed — `next/image` handles all three locally.
- **Keep important content away from the very bottom**, since a dark gradient
  fades up from the bottom edge for text legibility.

## Current project ids

Use these exact names for the image files:

| Project                          | id                    | image filename to drop here |
| -------------------------------- | --------------------- | --------------------------- |
| Portfolio Intelligence OS        | `ai-portfolio-os`     | `ai-portfolio-os.jpg`       |
| Systems Thinking in Markets      | `systems-research`    | `systems-research.jpg`      |
| Founder Scout Model              | `scout-model`         | `scout-model.jpg`           |
| Macro Lens                       | `macro-lens`          | `macro-lens.jpg`            |
| maxklein.xyz                     | `this-site`           | `this-site.jpg`             |
| Cross-Border Fintech Regulation  | `cross-border-paper`  | `cross-border-paper.jpg`    |

> The `id` is the single source of truth — if you ever rename a project's `id`,
> rename its image file (and update the `image` path) to match.
