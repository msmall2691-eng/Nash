/**
 * Single source of truth for brand, contact and geography data.
 *
 * Everything SEO-facing (metadata, sitemap, JSON-LD) derives from this file so
 * that an NAP change never drifts between the rendered page and the structured
 * data Google reads.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.nashconstructionllc.com";

/** Founded 1976; the LLC was incorporated in 1999. */
export const FOUNDED_YEAR = 1976;

/** Computed so the headline stays true without an annual copy edit. */
export const yearsInBusiness = new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  name: "Nash Construction",
  legalName: "Nash Construction, LLC",
  tagline: "Commercial & Industrial General Contracting in Southern New Hampshire",
  description:
    "Nash Construction, LLC is a Nashua, New Hampshire general contractor specializing in commercial and industrial construction, fit-ups, renovations, site work and building maintenance. Serving southern New Hampshire since 1976.",
  founded: String(FOUNDED_YEAR),
  incorporated: "1999",

  // TODO — REPLACE BEFORE LAUNCH. These are placeholders, not Nash Construction's
  // real contact details. A published site with a wrong phone number sends work
  // to the wrong place; confirm both with Mark or Karen before the domain goes live.
  phone: "+1-603-555-0100",
  phoneDisplay: "(603) 555-0100",
  email: "info@nashconstructionllc.com",

  address: {
    street: "40 Temple Street",
    city: "Nashua",
    region: "NH",
    regionName: "New Hampshire",
    postalCode: "03060",
    country: "US",
  },
  // Approximate downtown Nashua coordinates — verify against the Google Business
  // Profile pin before launch so the map marker lands on the right building.
  geo: { latitude: 42.7573, longitude: -71.4657 },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "16:00" },
  ],
  priceRange: "$$",

  accreditation: {
    body: "Better Business Bureau",
    rating: "A+",
    accreditedSince: "2009",
  },

  leadership: [
    {
      name: "Mark Nash",
      role: "President",
      bio: `Founded the business in ${FOUNDED_YEAR} and has worked in construction ever since. Mark still walks the jobs he sells.`,
    },
    {
      name: "Stephen Boilard",
      role: "Project Manager",
      bio: "Runs schedules, subs and inspections day to day — the number clients call when something needs a decision.",
    },
  ],

  // No social profiles confirmed for the business yet; add them here and they
  // flow into the JSON-LD `sameAs` array automatically.
  social: [] as string[],
} as const;

/**
 * Markets served, in Procore's categorization. Used for copy and JSON-LD.
 */
export const markets = ["Commercial", "Industrial & Energy", "Institutional"] as const;

/**
 * Nashua plus the southern New Hampshire communities the business actually
 * works in. Grouped for the footer; flattened for keywords and `areaServed`.
 */
export const serviceAreas = [
  { region: "Greater Nashua", towns: ["Nashua", "Hudson", "Merrimack", "Litchfield", "Hollis", "Amherst", "Brookline"] },
  { region: "Manchester Area", towns: ["Manchester", "Bedford", "Goffstown", "Hooksett", "Auburn"] },
  { region: "Souhegan Valley", towns: ["Milford", "Mont Vernon", "Wilton", "New Boston"] },
  { region: "I-93 Corridor", towns: ["Londonderry", "Derry", "Salem", "Windham", "Pelham", "Atkinson"] },
] as const;

export const allTowns = serviceAreas.flatMap((area) => area.towns);

/**
 * Localized keyword set. Generated rather than hand-listed so that adding a town
 * to `serviceAreas` automatically widens our local SEO surface.
 */
export const localKeywords: string[] = [
  "Nashua NH commercial general contractor",
  "southern New Hampshire commercial construction",
  "NH industrial construction company",
  "commercial fit-up contractor New Hampshire",
  "tenant improvement contractor Nashua NH",
  "industrial general contractor southern NH",
  "commercial renovation contractor New Hampshire",
  "NH building maintenance contractor",
  "emergency building repair New Hampshire",
  "Nashua construction company",
  ...allTowns.map((town) => `${town} NH commercial contractor`),
  ...serviceAreas.map((area) => `${area.region} commercial construction`),
];

export const navigation = [
  { href: "/commercial", label: "Commercial" },
  { href: "/industrial", label: "Industrial" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Includes Home, for the mobile sheet and the footer sitemap column. */
export const fullNavigation = [{ href: "/", label: "Home" }, ...navigation] as const;

/**
 * Town options for the consultation form. The trailing catch-all keeps the form
 * from rejecting a legitimate project in a town we have not enumerated.
 */
export const OTHER_TOWN = "Other — Southern NH";

export const nhCities: string[] = [
  ...[...allTowns].sort((a, b) => a.localeCompare(b)),
  OTHER_TOWN,
];
