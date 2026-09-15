/**
 * Schema.org JSON-LD builders.
 *
 * Kept server-side and stringified into a `<script type="application/ld+json">`
 * so crawlers get the structured data in the initial HTML payload.
 */

import { serviceAreas, site, siteUrl } from "@/lib/site";

/** `@id` for the business node, so other graph nodes can reference it. */
const businessId = `${siteUrl}/#localbusiness`;

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
    foundingDate: site.founded,
    priceRange: site.priceRange,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [...site.social],
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
      name: "Construction Services",
      itemListElement: [
        "Custom Home Building",
        "Whole-Home Remodeling",
        "Kitchen & Bath Renovation",
        "Additions & Dormers",
        "Lakefront & Waterfront Construction",
        "Light Commercial Construction",
      ].map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service, serviceType: service },
      })),
    },
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
