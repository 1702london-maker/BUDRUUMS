import type { MetadataRoute } from "next";
import { INSIGHT_SLUGS, PUBLIC_SEO, SITE_URL } from "@/app/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = PUBLIC_SEO.map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: entry.path === "/" ? 1 : entry.path.startsWith("/services") ? 0.85 : 0.7,
  }));

  const articles = INSIGHT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...pages, ...articles];
}
