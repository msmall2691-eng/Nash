import type { Metadata } from "next";

import { localKeywords, site, siteUrl } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. `/services`. Drives the canonical URL. */
  path: string;
  /** Page-specific terms, merged ahead of the shared local keyword set. */
  keywords?: string[];
};

/**
 * Builds a page's `Metadata` from one small input.
 *
 * Every route calls this instead of hand-rolling OpenGraph/Twitter/canonical
 * blocks, so those can never drift apart between pages.
 */
export function pageMetadata({ title, description, path, keywords = [] }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [...keywords, ...localKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
