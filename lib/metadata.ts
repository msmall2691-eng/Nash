import type { Metadata } from "next";

import { isCanonicalDeployment, localKeywords, site, siteUrl } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. `/services`. Drives the canonical URL. */
  path: string;
  /** Page-specific terms, merged ahead of the shared local keyword set. */
  keywords?: string[];
  /** Social share image; defaults to the commercial hero. */
  image?: string;
};

/**
 * Builds a page's `Metadata` from one small input.
 *
 * Every route calls this instead of hand-rolling OpenGraph/Twitter/canonical
 * blocks, so those can never drift apart between pages.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  // 1200x630 — the aspect ratio Facebook, LinkedIn, Twitter and iMessage link
  // previews actually use. The old default (a 1000x748 project photo) got
  // center-cropped into a much tighter frame than intended on every platform
  // that renders link previews.
  image = "/og/default.jpg",
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [...keywords, ...localKeywords],
    alternates: { canonical: url },
    // A review deployment on a vercel.app host must not be indexed; a canonical
    // tag alone is only a hint, and Google is free to ignore it.
    ...(isCanonicalDeployment ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      // Declaring the real dimensions lets a crawler pick the image without
      // fetching it first to measure it — every page uses the one shared,
      // correctly-sized default, so a fixed pair is accurate here.
      images: [{ url: image, alt: title, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}
