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
  { slug: "girls-inc", title: "Girls Inc.", sector: "Nonprofit & Institutional" },
  { slug: "batteries-plus", title: "Batteries Plus", sector: "Retail" },
  { slug: "maza-mediterranean-grill", title: "Maza Mediterranean Grill", sector: "Restaurant" },
  { slug: "honey-baked-ham", title: "Honey Baked Ham", sector: "Retail" },
  { slug: "california-burrito", title: "California Burrito", sector: "Restaurant" },
];

export const projects: Project[] = seeds.map((seed) => ({
  ...seed,
  image: `/projects/${seed.slug}.jpg`,
  blurDataURL: blurFor(seed.slug),
}));

/** Only offer filters that actually have work behind them. */
export const activeSectors: ProjectSector[] = PROJECT_SECTORS.filter((sector) =>
  projects.some((project) => project.sector === sector),
);
