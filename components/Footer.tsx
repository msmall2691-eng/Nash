import Link from "next/link";

import { serviceGroups } from "@/lib/services";
import { FOUNDED_YEAR, fullNavigation, serviceAreas, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-granite-950 text-granite-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-display text-xl font-semibold text-granite-50">{site.legalName}</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-granite-400">
            {site.tagline}. Serving southern New Hampshire since {FOUNDED_YEAR}.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-granite-500">
            {site.accreditation.body} Accredited since {site.accreditation.accreditedSince} ·{" "}
            {site.accreditation.rating} Rated
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-display text-sm font-semibold text-granite-50">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {fullNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-granite-400 transition-colors hover:text-brass-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-display text-sm font-semibold text-granite-50">Capabilities</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceGroups.map((group) => (
              <li key={group.slug}>
                <Link
                  href={`/services#${group.slug}`}
                  className="text-granite-400 transition-colors hover:text-brass-400"
                >
                  {group.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic md:col-span-3">
          <h2 className="font-display text-sm font-semibold text-granite-50">Office</h2>
          <p className="mt-4 text-sm leading-relaxed text-granite-400">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </p>
          <p className="mt-4 text-sm">
            <a href={`tel:${site.phone}`} className="text-granite-200 transition-colors hover:text-brass-400">
              {site.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-granite-200 transition-colors hover:text-brass-400">
              {site.email}
            </a>
          </p>
          <ul className="mt-5 space-y-1 text-xs text-granite-500">
            {site.hours.map((block) => (
              <li key={block.days[0]}>
                {block.days.length > 1
                  ? `${block.days[0]?.slice(0, 3)}–${block.days[block.days.length - 1]?.slice(0, 3)}`
                  : block.days[0]?.slice(0, 3)}{" "}
                {block.opens}–{block.closes}
              </li>
            ))}
          </ul>
        </address>
      </div>

      <div className="border-t border-granite-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-granite-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Serving {serviceAreas.map((a) => a.region).slice(0, 2).join(", ")} and southern New Hampshire
          </p>
        </div>
      </div>
    </footer>
  );
}
