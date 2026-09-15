/**
 * Single source of truth for brand, contact and geography data.
 *
 * Everything SEO-facing (metadata, sitemap, JSON-LD) derives from this file so
 * that an NAP change never drifts between the rendered page and the structured
 * data Google reads.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.nashconstructionnh.com";

export const site = {
  name: "Nash Construction",
  legalName: "Nash Construction LLC",
  tagline: "Custom Homes & Fine Remodeling in New Hampshire",
  description:
    "Nash Construction builds custom homes, additions and high-end remodels across New Hampshire — from the Lakes Region and Seacoast to the Merrimack Valley. Licensed, insured, and building in the Granite State since 2004.",
  founded: "2004",
  email: "office@nashconstructionnh.com",
  phone: "+1-603-555-0142",
  phoneDisplay: "(603) 555-0142",
  address: {
    street: "84 Mill Street, Suite 3",
    city: "Meredith",
    region: "NH",
    regionName: "New Hampshire",
    postalCode: "03253",
    country: "US",
  },
  geo: { latitude: 43.6578, longitude: -71.5006 },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
    { days: ["Saturday"], opens: "08:00", closes: "13:00" },
  ],
  priceRange: "$$$",
  license: "NH HIC #0148823",
  social: [
    "https://www.facebook.com/nashconstructionnh",
    "https://www.instagram.com/nashconstructionnh",
  ],
} as const;

/** Towns and regions we actually serve — reused for metadata keywords and `areaServed`. */
export const serviceAreas = [
  { region: "Lakes Region", towns: ["Meredith", "Laconia", "Wolfeboro", "Gilford", "Moultonborough", "Alton"] },
  { region: "Seacoast", towns: ["Portsmouth", "Rye", "Exeter", "Hampton", "New Castle", "Stratham"] },
  { region: "Merrimack Valley", towns: ["Concord", "Manchester", "Bedford", "Hooksett", "Amherst"] },
  { region: "Dartmouth–Sunapee", towns: ["Hanover", "New London", "Sunapee", "Lebanon"] },
  { region: "White Mountains", towns: ["North Conway", "Jackson", "Lincoln", "Bartlett"] },
] as const;

export const allTowns = serviceAreas.flatMap((area) => area.towns);

/**
 * Localized keyword set. Generated rather than hand-listed so that adding a town
 * to `serviceAreas` automatically widens our local SEO surface.
 */
export const localKeywords: string[] = [
  "New Hampshire custom home builder",
  "NH general contractor",
  "Lakes Region home builder",
  "Seacoast NH remodeling contractor",
  "New Hampshire kitchen remodel",
  "lakefront home builder New Hampshire",
  "Winnipesaukee custom home",
  "NH design build contractor",
  "licensed home builder New Hampshire",
  ...allTowns.map((town) => `${town} NH contractor`),
  ...serviceAreas.map((area) => `${area.region} custom home builder`),
];

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/** Flat town list for the contact/estimate form selects. */
export const nhCities: string[] = [...allTowns].sort((a, b) => a.localeCompare(b));
