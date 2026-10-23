import generatedProjects from "@/content/projects.generated.json";
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
  "Office & Professional",
  "Industrial",
  "Residential",
  "Nonprofit & Institutional",
  "Municipal & Public",
] as const;

export type ProjectSector = (typeof PROJECT_SECTORS)[number];

/**
 * The three markets the site is organised around.
 *
 * A sector is what the building is; a market is which page sells it. Keeping
 * the mapping here means a market page can deep-link into the gallery without
 * either side hard-coding a list of sectors.
 */
export const PROJECT_MARKETS = ["commercial", "industrial", "residential"] as const;
export type ProjectMarket = (typeof PROJECT_MARKETS)[number];

export const MARKET_LABELS: Record<ProjectMarket, string> = {
  commercial: "Commercial",
  industrial: "Industrial",
  residential: "Residential",
};

const SECTOR_MARKET: Record<ProjectSector, ProjectMarket> = {
  Retail: "commercial",
  Restaurant: "commercial",
  "Office & Professional": "commercial",
  "Nonprofit & Institutional": "commercial",
  "Municipal & Public": "commercial",
  Industrial: "industrial",
  Residential: "residential",
};

export function marketForSector(sector: ProjectSector): ProjectMarket {
  return SECTOR_MARKET[sector];
}

/** Narrows an arbitrary query-string value to a market, or nothing. */
export function parseMarket(value: string | null | undefined): ProjectMarket | null {
  return PROJECT_MARKETS.find((market) => market === value?.toLowerCase()) ?? null;
}

/** Narrows an arbitrary query-string value to a sector, or nothing. */
export function parseSector(value: string | null | undefined): ProjectSector | null {
  if (!value) return null;
  const needle = value.toLowerCase();
  return PROJECT_SECTORS.find((sector) => sector.toLowerCase() === needle) ?? null;
}

export type Project = {
  slug: string;
  /** Client or project name. */
  title: string;
  sector: ProjectSector;
  /** Derived from `sector` — never set by hand. */
  market: ProjectMarket;
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

type ProjectSeed = Omit<Project, "image" | "blurDataURL" | "market">;

/**
 * The portfolio lives in `content/projects/`, one JSON file per project, so
 * it can be edited from /admin without touching code. What is imported here
 * is the bundled form of that folder, rebuilt by scripts/build-content.mjs
 * before every dev run, build and typecheck.
 *
 * It stays a static import rather than a directory read because this module
 * is pulled into components/GalleryGrid.tsx, a client component, so the list
 * has to survive bundling for the browser.
 */
const seeds = generatedProjects as ProjectSeed[];

export const projects: Project[] = seeds.map((seed) => ({
  ...seed,
  market: marketForSector(seed.sector),
  image: `/projects/${seed.slug}.jpg`,
  blurDataURL: blurFor(seed.slug),
}));

/** Sectors that actually have work behind them, in declaration order. */
export const populatedSectors: ProjectSector[] = PROJECT_SECTORS.filter((sector) =>
  projects.some((project) => project.sector === sector),
);

/**
 * One photographed project per market, for the home page's featured strip.
 *
 * Picked by hand rather than `projects.slice(0, 3)` — the home page pitches
 * "Three markets, one contractor" directly above this section, and the first
 * three entries in declaration order happened to be two industrial jobs and
 * an office building. Slicing the array would show visitors zero residential
 * work on the page that most prominently claims residential as a market.
 */
export const featuredSlugs = ["marzen-group", "manufacturing-facility", "colonial-addition"] as const;

export const featuredProjects: Project[] = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));
