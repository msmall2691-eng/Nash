/**
 * Single source of truth for brand, contact and geography data.
 *
 * Everything SEO-facing (metadata, sitemap, JSON-LD) derives from this file so
 * that an NAP change never drifts between the rendered page and the structured
 * data Google reads.
 */

const DEFAULT_SITE_URL = "https://www.nashconstructionnh.com";

/**
 * Canonical origin for metadata, sitemaps and JSON-LD.
 *
 * Hosts routinely hand over an env var that exists but is empty — Vercel creates
 * blank variables, CI passes through unset values as "" — and `??` only catches
 * null and undefined, so an empty string used to reach `new URL("")` and fail
 * the production build at page-data collection. Anything unusable now falls back
 * rather than throwing, and a bare hostname gets a scheme instead of being
 * rejected.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl();

/**
 * Whether this deployment is actually being served from the canonical domain.
 *
 * Until nashconstructionnh.com is pointed here, the site is public on a
 * vercel.app address with the full content on it. Left alone that address can
 * be indexed and end up competing with the real domain for the business's own
 * name — the exact outcome the SEO work exists to prevent.
 *
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the project's production domain,
 * which is the generated *.vercel.app host while no custom domain is attached
 * and the custom domain once one is. So this flips itself the moment the domain
 * is connected, with nothing to remember and no variable to unset.
 */
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
export const isCanonicalDeployment =
  !productionHost || !productionHost.toLowerCase().endsWith(".vercel.app");

/** Founded 1976; the LLC was incorporated in 1999. */
export const FOUNDED_YEAR = 1976;

/** Computed so the headline stays true without an annual copy edit. */
export const yearsInBusiness = new Date().getFullYear() - FOUNDED_YEAR;

export const site = {
  name: "Nash Construction",
  legalName: "Nash Construction, LLC",
  tagline: "Commercial & Industrial General Contracting in Southern New Hampshire",
  description:
    "Nashua NH general contractor — commercial, industrial and residential construction, fit-ups, renovations and additions. Southern NH and northern MA since 1976.",
  founded: String(FOUNDED_YEAR),
  incorporated: "1999",

  // Taken from the live nashconstructionnh.com site. This is the correct number:
  // (603) 882-2702, which appears on the Google and Yelp listings, belongs to
  // Nash Group — a different entity at the same address.
  phone: "+1-603-943-7593",
  phoneDisplay: "(603) 943-7593",
  email: "steve@nashconstructionnh.com",

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


  /**
   * Current officers.
   *
   * The founder is retired and, at the client's request (Sept 2026), is not
   * named anywhere on the site — not here, not as a `founder` field, and not in
   * the structured data. The founding *year* stays everywhere it appeared; only
   * the person is gone. Do not reintroduce a name here without being asked.
   */
  leadership: [
    {
      name: "Stephen Boilard",
      role: "President",
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
    label: "Procore",
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
/** Who built the site. Rendered in the footer colophon. */
export const studio = {
  name: "MLinx Studio",
  url: "https://www.mlinx.studio",
} as const;

/**
 * Client testimonials carried over from nashconstructionnh.com.
 *
 * Quoted verbatim from the existing site — these are real clients' words, so
 * they are not edited for length or tone.
 */
export const testimonials = [
  {
    quote:
      "We really have been singing your praises to friends and family that have visited and stayed in the basement — we've been very happy with the way the basement came out and the manner in which you and your team went about the work. Thanks again.",
    attribution: "Greg B.",
  },
  {
    quote:
      "Thank you for listening and making the vision I had for the space come to life. I'm not easy to please, but your company and crew accomplished that task! Thank you for the great work!",
    attribution: "Sandra L.",
  },
] as const;

/**
 * The markets the site actually organises itself around — one landing page and
 * one project filter each.
 *
 * Previously this listed "Industrial & Energy" and "Institutional" as separate
 * markets, which contradicted the home page's "three markets" and claimed an
 * energy practice nobody confirmed. Institutional work still appears as a
 * *sector* under Commercial on /commercial, which is where it belongs.
 */
export const markets = ["Commercial", "Industrial", "Residential"] as const;

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
  "Nashua NH residential contractor",
  "home addition contractor southern New Hampshire",
  "garage builder Nashua NH",
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
  { href: "/residential", label: "Residential" },
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
// Not "Southern NH": the service area reaches into northern Massachusetts, and
// a Lowell project that is not on the list still has to be selectable.
export const OTHER_TOWN = "Other — not listed";

export const nhCities: string[] = [
  ...[...allTowns].sort((a, b) => a.localeCompare(b)),
  OTHER_TOWN,
];
