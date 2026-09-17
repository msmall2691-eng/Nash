"use client";

import Image, { type ImageProps } from "next/image";

/**
 * A `next/image` wrapper with casual-download deterrents.
 *
 * ── What this actually does ──────────────────────────────────────────────────
 * Blocks the three one-gesture saves an ordinary visitor would use:
 *   • right-click → "Save image as…"  (context menu suppressed)
 *   • drag the image to the desktop   (drag start cancelled)
 *   • iOS/Android long-press → "Save" (touch callout disabled)
 * A transparent shield sits above the bitmap, so even where a context menu does
 * appear the target is a plain <div> rather than the <img>.
 *
 * ── What it does NOT do ──────────────────────────────────────────────────────
 * It is deterrence, not protection. Screenshots, DevTools, "View Source", the
 * network panel, or simply disabling JavaScript all still get the file. Any
 * image a browser can render, a determined person can keep. The only measure
 * that survives a screenshot is a visible watermark — see `scripts/import-photos.mjs`,
 * which can burn one in at import time.
 *
 * ── Why this is safe for SEO ─────────────────────────────────────────────────
 * Crawlers read `src` and `alt` straight out of the HTML and never invoke these
 * handlers, so Google Images still indexes normally. Nothing here hides the
 * image from search — that would trade away traffic for an illusion.
 */
export function ProtectedImage({
  className = "",
  wrapperClassName = "",
  // Destructured rather than spread so the contract is explicit: every image
  // here carries alt text, which is also the main image-SEO signal.
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const block = (event: React.SyntheticEvent) => event.preventDefault();

  /**
   * The wrapper's positioning depends on the layout mode, and the two cases are
   * mutually exclusive — emitting both `relative` and `absolute` lets the
   * cascade pick, which silently collapses the box to 0x0 and hides the image.
   *
   * `fill` images expect their nearest positioned ancestor to define the box, so
   * the wrapper stretches to the parent. Fixed-size images size themselves.
   */
  const positioning = props.fill ? "absolute inset-0" : "relative inline-block";

  return (
    <span className={`${positioning} ${wrapperClassName}`.trim()}>
      <Image
        {...props}
        alt={alt}
        draggable={false}
        onDragStart={block}
        onContextMenu={block}
        className={`pointer-events-none select-none [-webkit-touch-callout:none] ${className}`}
      />
      {/* Shield: absorbs the context menu and long-press so the <img> is never the target. */}
      <span
        aria-hidden="true"
        onContextMenu={block}
        onDragStart={block}
        className="absolute inset-0 z-10 block select-none [-webkit-touch-callout:none]"
      />
    </span>
  );
}
