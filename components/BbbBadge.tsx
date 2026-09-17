import Image from "next/image";

import { site } from "@/lib/site";

/**
 * Official BBB Accredited Business seal.
 *
 * Served from BBB's own seal endpoint for this business profile
 * (seal-concord.bbb.org — BBB serving New Hampshire), saved locally so the page
 * does not depend on a third-party request to paint. BBB's own embed is a
 * render-blocking <script> that also drops a tracker on every page; the seal is
 * the same asset without that cost.
 *
 * If BBB ever revokes or changes the accreditation, replace this file — the seal
 * is theirs to grant, and a stale one should not sit on the site.
 */
export function BbbBadge({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { accreditation } = site;

  const shell =
    tone === "dark"
      ? "border-granite-800 bg-white/95 hover:border-granite-600"
      : "border-granite-200 bg-white hover:border-granite-400";

  return (
    <a
      href={accreditation.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`${site.legalName} is a BBB Accredited Business with an ${accreditation.rating} rating`}
      className={`inline-flex items-center rounded-lg border px-3 py-2.5 transition-colors duration-200 ${shell}`}
    >
      <Image
        src="/badges/bbb-accredited-seal.png"
        alt={`BBB Accredited Business — ${accreditation.rating} rating, accredited since ${accreditation.accreditedSince}`}
        width={250}
        height={52}
        className="h-[34px] w-auto"
        unoptimized
      />
    </a>
  );
}
