import blurPlaceholders from "@/lib/blur-placeholders.json";

/**
 * Project portfolio.
 *
 * The five entries below are the clients carried over from the previous site.
 * Their scope details (summary, year, square footage, town) are deliberately
 * left undefined rather than guessed: these are real businesses, and inventing
 * specifics about work done for them would put unverifiable claims on a real
 * contractor's website.
 *
 * ── Adding newer work ────────────────────────────────────────────────────────
 * Karen or Steve can fill in the optional fields below as details are confirmed,
 * and append new entries. Every optional field renders only when present, so a
 * name-and-sector entry looks finished today and gets richer later. A new
 * `sector` value automatically appears as a filter pill once a project uses it.
 *
 * To add a project:
 *   1. Drop a photo at `public/projects/<slug>.jpg`
 *   2. Add a blur placeholder for that slug to `lib/blur-placeholders.json`
 *   3. Append an entry here
 */

export const PROJECT_SECTORS = [
  "Retail",
  "Restaurant",
  "Nonprofit & Institutional",
  "Industrial",
  "Residential",
  "Municipal & Public",
] as const;

export type ProjectSector = (typeof PROJECT_SECTORS)[number];

export type Project = {
  slug: string;
  /** Client or project name. */
  title: string;
  sector: ProjectSector;
  image: string;
  blurDataURL: string;
  /** Everything below is optional — supply it once the detail is confirmed. */
  summary?: string;
  town?: string;
  year?: number;
  squareFeet?: number;
  scope?: string[];
  /**
   * True once a real photograph has replaced the generated placeholder.
   * Only photographed projects are published to the image sitemap and given
   * ImageObject structured data — we do not ask Google to index filler.
   */
  hasPhoto?: boolean;
};

const blurs = blurPlaceholders as Record<string, string>;

/** Falls back to a flat neutral so a missing placeholder never breaks a build. */
function blurFor(slug: string): string {
  return (
    blurs[slug] ??
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4="
  );
}

type ProjectSeed = Omit<Project, "image" | "blurDataURL">;

const seeds: ProjectSeed[] = [
  {
    slug: "maza-mediterranean-grill",
    title: "Maza Mediterranean Grill",
    sector: "Restaurant",
    summary:
      "Restaurant fit-up: commercial kitchen line with stainless hood and exhaust, tiled cook wall, glass-front service counter and sneeze guard, pendant and track lighting, and the branded soffit above the pass.",
    scope: ["Restaurant fit-up", "Commercial kitchen", "Service counter", "Lighting"],
    hasPhoto: true,
  },
  { slug: "girls-inc", title: "Girls Inc.", sector: "Nonprofit & Institutional" },
  { slug: "batteries-plus", title: "Batteries Plus", sector: "Retail" },
  { slug: "honey-baked-ham", title: "Honey Baked Ham", sector: "Retail" },
  { slug: "california-burrito", title: "California Burrito", sector: "Restaurant" },
  {
    slug: "interior-slab-pour",
    title: "Interior Slab & Formed Pit",
    sector: "Industrial",
    summary:
      "Forming and placing an interior concrete slab around a braced timber-formed pit inside an existing masonry building — finished by hand, in place, without taking the rest of the floor out of service.",
    scope: ["Concrete", "Forming", "Interior slab"],
    hasPhoto: true,
  },
  {
    slug: "timber-frame-screened-porch",
    title: "Timber-Frame Screened Porch",
    sector: "Residential",
    summary:
      "A screened porch addition framed in exposed timber with a cathedral gable glazed to the ridge, tongue-and-groove ceiling, stained wood apron, and a fieldstone foundation with granite steps.",
    scope: ["Addition", "Timber frame", "Foundation & stonework"],
    hasPhoto: true,
  },
  {
    slug: "three-bay-garage",
    title: "Three-Bay Garage & Shop",
    sector: "Residential",
    summary:
      "A detached three-bay garage under a hipped roof with skylights, fieldstone veneer wrapping the gable end, a curved stone knee wall at the apron, and a windowed bump-out.",
    scope: ["Detached garage", "Stone veneer", "Roofing"],
    hasPhoto: true,
  },
  {
    slug: "detached-two-car-garage",
    title: "Detached Two-Car Garage",
    sector: "Residential",
    summary:
      "A two-car detached garage built from footing to finish — framing, architectural shingle roof, vinyl siding, overhead door and a nine-lite service entry.",
    scope: ["Detached garage", "Siding", "Roofing"],
    hasPhoto: true,
  },
];

export const projects: Project[] = seeds.map((seed) => ({
  ...seed,
  image: `/projects/${seed.slug}.jpg`,
  blurDataURL: blurFor(seed.slug),
}));
