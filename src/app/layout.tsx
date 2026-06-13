import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

/* ── Fonts ─────────────────────────────────────────────────────── */

const geistSans = localFont({
  src:      "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight:   "100 900",
  display:  "swap",
  preload:  true,
});

const geistMono = localFont({
  src:      "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight:   "100 900",
  display:  "swap",
  preload:  false,
});

/* ── Site constants ─────────────────────────────────────────────── */

const SITE_URL    = "https://maxklein.xyz";
const SITE_NAME   = "Max Klein";
const OG_IMAGE    = `${SITE_URL}/opengraph-image`;
const DESCRIPTION =
  "Max Klein — building at the intersection of AI, finance, and global entrepreneurship. Economics & Finance at Butler University and Division I soccer.";

/* ── Viewport ───────────────────────────────────────────────────── */

export const viewport: Viewport = {
  width:               "device-width",
  initialScale:        1,
  themeColor:          "#000000",
  colorScheme:         "dark",
};

/* ── Root metadata ──────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  `${SITE_NAME}`,
    template: `%s — ${SITE_NAME}`,
  },

  description: DESCRIPTION,

  keywords: [
    "Max Klein",
  ],

  authors:  [{ name: "Max Klein", url: SITE_URL }],
  creator:  "Max Klein",
  publisher:"Max Klein",

  /* ── Open Graph ─────────────────────────────────────────────── */
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:          SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME}`,
    description: DESCRIPTION,
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME}`,
      },
    ],
  },

  /* ── Twitter / X ────────────────────────────────────────────── */
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE_NAME}`,
    description: DESCRIPTION,
    creator:     "@maxklein",
    images:      [OG_IMAGE],
  },

  /* ── Icons — generated via app/icon.tsx ─────────────────────── */
  icons: {
    icon:     [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    shortcut: ["/icon"],
  },

  /* ── Manifest ────────────────────────────────────────────────── */
  manifest: "/manifest.json",

  /* ── Robots ──────────────────────────────────────────────────── */
  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  /* ── Alternate ───────────────────────────────────────────────── */
  alternates: {
    canonical: SITE_URL,
  },

  /* ── Verification ─────────────────────────────────────────────── */
  // verification: { google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN" },

  /* ── Category ────────────────────────────────────────────────── */
  category: "technology",
};

/* ── Root layout ────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}
                    antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
