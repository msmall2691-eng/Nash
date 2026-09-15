import type { MetadataRoute } from "next";

import { navigation, siteUrl } from "@/lib/site";

/** Derived from the nav, so a new route is never left out of the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return navigation.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : item.href === "/contact" ? 0.9 : 0.8,
  }));
}
