/**
 * Schema.org JSON-LD builders.
 *
 * Kept server-side and stringified into a `<script type="application/ld+json">`
 * so crawlers get the structured data in the initial HTML payload.
 */

import { allTrades, serviceGroups } from "@/lib/services";
import { FOUNDED_YEAR, markets, serviceAreas, site, siteUrl } from "@/lib/site";

/** `@id` for the business node, so other graph nodes can reference it. */
export const businessId = `${siteUrl}/#localbusiness`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(FOUNDED_YEAR),
    priceRange: site.priceRange,
    image: `${siteUrl}/projects/hero-commercial.jpg`,
    logo: `${siteUrl}/icon.svg`,
    ...(site.social.length > 0 ? { sameAs: [...site.social] } : {}),
    founder: {
      "@type": "Person",
      name: site.leadership[0].name,
      jobTitle: site.leadership[0].role,
    },
    employee: site.leadership.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
    memberOf: {
      "@type": "Organization",
      name: site.accreditation.body,
      description: `Accredited since ${site.accreditation.accreditedSince} with an ${site.accreditation.rating} rating.`,
    },
    knowsAbout: allTrades,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.hours.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...block.days],
      opens: block.opens,
      closes: block.closes,
    })),
    areaServed: [
      { "@type": "State", name: site.address.regionName },
      ...serviceAreas.flatMap((area) =>
        area.towns.map((town) => ({
          "@type": "City" as const,
          name: town,
          containedInPlace: { "@type": "State" as const, name: site.address.regionName },
        })),
      ),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial & Industrial Construction Services",
      itemListElement: serviceGroups.map((group) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: group.title,
          serviceType: group.title,
          description: group.summary,
        },
      })),
    },
    slogan: site.tagline,
    // Procore's market categorization for the business.
    additionalProperty: markets.map((market) => ({
      "@type": "PropertyValue",
      name: "Market served",
      value: market,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": businessId },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

/** A `Service` node for one capability, scoped to the areas we serve. */
export function serviceSchema(opts: {
  id: string;
  name: string;
  description: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${opts.id}`,
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    provider: { "@id": businessId },
    areaServed: serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: `${area.region}, NH`,
    })),
  };
}
