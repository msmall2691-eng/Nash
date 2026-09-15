import type { MetadataRoute } from "next";

import { fullNavigation, siteUrl } from "@/lib/site";

/** Priority by role: home, then the two market pages, then everything else. */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/commercial": 0.9,
  "/industrial": 0.9,
  "/contact": 0.9,
  "/services": 0.8,
  "/projects": 0.8,
  "/about": 0.7,
};

/** Derived from the nav, so a new route is never left out of the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return fullNavigation.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: PRIORITY[item.href] ?? 0.7,
  }));
}
