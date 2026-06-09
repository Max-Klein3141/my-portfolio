/** @type {import('next').NextConfig} */
const nextConfig = {

  /* ── Image optimisation ───────────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ── Compiler ─────────────────────────────────────────────────── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ── Headers — security + caching ────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"          },
          { key: "X-Frame-Options",           value: "DENY"             },
          { key: "X-XSS-Protection",          value: "1; mode=block"    },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Immutable static assets — fonts, images, icons
        source: "/(.*)\\.(woff|woff2|ico|png|jpg|jpeg|svg|webp|avif)$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  /* ── Experimental ─────────────────────────────────────────────── */
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
