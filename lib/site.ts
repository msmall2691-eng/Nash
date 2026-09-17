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

/** Founded 1976; the LLC was incorporated in 1999. */
export const FOUNDED_YEAR = 1976;

/** Computed so the headline stays true without an annual copy edit. */
export const yearsInBusiness = new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  name: "Nash Construction",
  legalName: "Nash Construction, LLC",
  tagline: "Commercial & Industrial General Contracting in Southern New Hampshire",
  description:
    "Nashua NH general contractor for commercial and industrial construction, fit-ups, renovations and site work. Serving southern NH and northern MA since 1976.",
  founded: String(FOUNDED_YEAR),
  incorporated: "1999",

  // Taken from the live nashconstructionnh.com site. This is the correct number:
  // (603) 882-2702, which appears on the Google and Yelp listings, belongs to
  // Nash Group — a different entity at the same address.
  phone: "+1-603-943-7593",
  phoneDisplay: "(603) 943-7593",
  email: "steve@nashconstructionnh.com",
  emailAdmin: "admin@nashconstructionnh.com",

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
  priceRange: "$$",

  accreditation: {
    body: "Better Business Bureau",
    rating: "A+",
    accreditedSince: "2009",
    /** Exact accreditation date from the BBB profile. */
    accreditedOn: "2009-08-31",
    profileUrl:
      "https://www.bbb.org/us/nh/nashua/profile/building-contractors/nash-construction-llc-0051-92009862",
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

} as const;

/**
 * External profiles.
 *
 * Every entry with a `url` renders in the footer and contact page and is added
 * to the JSON-LD `sameAs` array — which is how Google ties these listings to
 * the business for the local pack. Leave `url` as null for a profile that does
 * not exist yet; it is simply skipped rather than rendered as a dead link.
 */
export type SocialProfile = {
  key: string;
  label: string;
  url: string | null;
  /** Whether to include in JSON-LD `sameAs`. */
  sameAs: boolean;
};

export const socialProfiles: SocialProfile[] = [
  {
    key: "bbb",
    label: "Better Business Bureau",
    url: "https://www.bbb.org/us/nh/nashua/profile/building-contractors/nash-construction-llc-0051-92009862",
    sameAs: true,
  },
  // NOTE: the Google Business Profile that search surfaces for "Nash Construction
  // Nashua" resolves to *Nash Group*, a separate entity, and carries that entity's
  // phone number — (603) 882-2702. It is deliberately NOT linked here. If Nash
  // Construction creates its own verified profile, add the URL here.
  { key: "google", label: "Google Business Profile", url: null, sameAs: true },
  {
    key: "houzz",
    label: "Houzz",
    url: "https://www.houzz.com/professionals/general-contractors/nash-construction-llc-pfvwus-pf~1041634924",
    sameAs: true,
  },
  {
    // Name and address match, but this listing is unclaimed and shows the Nash
    // Group phone number. Worth claiming and correcting before promoting it.
    key: "yelp",
    label: "Yelp",
    url: "https://www.yelp.com/biz/nash-construction-nashua-2",
    sameAs: true,
  },
  {
    key: "procore",
    label: "Procore Network",
    url: "https://www.procore.com/network/p/nash-construction-nashua",
    sameAs: true,
  },
  // No Facebook page exists for this business. Note that searches surface
  // "Nash Construction & Remodeling" (a separate Nashua contractor doing decks)
  // — do NOT link that page here; it is a different company.
  { key: "facebook", label: "Facebook", url: null, sameAs: true },
  { key: "instagram", label: "Instagram", url: null, sameAs: true },
  { key: "linkedin", label: "LinkedIn", url: null, sameAs: true },
];

/** Only the profiles that actually exist. */
export const activeProfiles = socialProfiles.filter(
  (profile): profile is SocialProfile & { url: string } => profile.url !== null,
);

export const sameAsUrls = activeProfiles.filter((p) => p.sameAs).map((p) => p.url);

/**
 * Markets served, in Procore's categorization. Used for copy and JSON-LD.
 */
export const markets = ["Commercial", "Industrial & Energy", "Institutional"] as const;

/**
 * Nashua plus the southern New Hampshire communities the business actually
 * works in. Grouped for the footer; flattened for keywords and `areaServed`.
 */
export const serviceAreas = [
  { region: "Greater Nashua", state: "NH", stateName: "New Hampshire", towns: ["Nashua", "Hudson", "Merrimack", "Litchfield", "Hollis", "Amherst", "Brookline"] },
  { region: "Manchester Area", state: "NH", stateName: "New Hampshire", towns: ["Manchester", "Bedford", "Goffstown", "Hooksett", "Auburn"] },
  { region: "Souhegan Valley", state: "NH", stateName: "New Hampshire", towns: ["Milford", "Mont Vernon", "Wilton", "New Boston"] },
  { region: "I-93 Corridor", state: "NH", stateName: "New Hampshire", towns: ["Londonderry", "Derry", "Salem", "Windham", "Pelham", "Atkinson"] },
  { region: "Northern Massachusetts", state: "MA", stateName: "Massachusetts", towns: ["Lowell", "Dracut", "Tyngsborough", "Chelmsford", "Westford", "Methuen", "Andover", "Haverhill"] },
] as const;

export const allTowns = serviceAreas.flatMap((area) => area.towns);

/**
 * Localized keyword set. Generated rather than hand-listed so that adding a town
 * to `serviceAreas` automatically widens our local SEO surface.
 */
export const localKeywords: string[] = [
  "Nashua NH commercial general contractor",
  "northern Massachusetts commercial contractor",
  "Lowell MA commercial construction",
  "southern New Hampshire commercial construction",
  "NH industrial construction company",
  "commercial fit-up contractor New Hampshire",
  "tenant improvement contractor Nashua NH",
  "industrial general contractor southern NH",
  "commercial renovation contractor New Hampshire",
  "NH building maintenance contractor",
  "emergency building repair New Hampshire",
  "Nashua construction company",
  ...serviceAreas.flatMap((area) =>
    area.towns.map((town) => `${town} ${area.state} commercial contractor`),
  ),
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
