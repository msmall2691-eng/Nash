import Link from "next/link";

import { BbbBadge } from "@/components/BbbBadge";
import { NashMark } from "@/components/NashMark";
import { SocialLinks } from "@/components/SocialLinks";
import { serviceGroups } from "@/lib/services";
import { FOUNDED_YEAR, fullNavigation, serviceAreas, site, studio } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-granite-950 text-granite-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3.5">
            <NashMark className="h-11 w-auto shrink-0 rounded-[2px]" />
            <span className="font-display text-xl font-semibold text-granite-50">{site.legalName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-granite-400">
            {site.tagline}. Serving southern New Hampshire and northern Massachusetts since{" "}
            {FOUNDED_YEAR}.
          </p>
          <div className="mt-6">
            <BbbBadge />
          </div>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-display text-sm font-semibold text-granite-50">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {fullNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-granite-400 transition-colors hover:text-granite-50">
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
                  className="text-granite-400 transition-colors hover:text-granite-50"
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
            <a href={`tel:${site.phone}`} className="text-granite-200 transition-colors hover:text-granite-50">
              {site.phoneDisplay}
            </a>
            <br />
            {/* Long address in a narrow grid column — allow it to wrap. */}
            <a
              href={`mailto:${site.email}`}
              className="break-words text-granite-200 transition-colors hover:text-granite-50"
            >
              {site.email}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-granite-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-granite-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Serving {serviceAreas.map((area) => area.region).join(" · ")}</span>
            <span aria-hidden="true" className="text-granite-700">·</span>
            <span>
              Site by{" "}
              <a
                href={studio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-granite-400 underline-offset-4 transition-colors hover:text-granite-200 hover:underline"
              >
                {studio.name}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
