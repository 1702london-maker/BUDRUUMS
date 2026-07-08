import type { MetadataRoute } from "next";
import { SITE_URL, PUBLIC_SEO, INSIGHT_SLUGS } from "@/app/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = PUBLIC_SEO.map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.path === "/" ? "weekly" : "monthly",
    priority: entry.path === "/" ? 1 : entry.path.startsWith("/services") ? 0.8 : 0.6,
  }));

  const insightPages: MetadataRoute.Sitemap = INSIGHT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...insightPages];
}
