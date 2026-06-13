import type { MetadataRoute } from "next";

const BASE = "https://maxklein.xyz"; // Update when domain is live

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                  lastModified: now, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/projects`,    lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/experience`,  lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/now`,         lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE}/ask`,         lastModified: now, changeFrequency: "yearly",   priority: 0.5 },
    { url: `${BASE}/contact`,     lastModified: now, changeFrequency: "yearly",   priority: 0.6 },
  ];
}
