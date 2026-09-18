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
  image = "/projects/marzen-group.jpg",
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
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}
