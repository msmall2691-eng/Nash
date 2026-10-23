import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin is the content editor, not a page of the site. It carries its own
    // noindex meta too, since it is served straight from /public and never
    // passes through the app's metadata layer.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/image-sitemap.xml`],
    host: siteUrl,
  };
}
