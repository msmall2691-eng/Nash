import blurPlaceholders from "@/lib/blur-placeholders.json";

export const PROJECT_REGIONS = [
  "Lakes Region",
  "Seacoast",
  "Merrimack Valley",
  "Dartmouth–Sunapee",
  "White Mountains",
] as const;

export const PROJECT_CATEGORIES = ["Custom Home", "Remodel", "Commercial"] as const;

export type ProjectRegion = (typeof PROJECT_REGIONS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  title: string;
  town: string;
  region: ProjectRegion;
  category: ProjectCategory;
  year: number;
  squareFeet: number;
  summary: string;
  image: string;
  blurDataURL: string;
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
    slug: "winnipesaukee-lakehouse",
    title: "Winnipesaukee Lakehouse",
    town: "Meredith",
    region: "Lakes Region",
    category: "Custom Home",
    year: 2025,
    squareFeet: 4850,
    summary:
      "A shingle-style waterfront home with a 40-foot glass wall framing Meredith Bay, built on engineered helical piers to clear the shoreline setback.",
  },
  {
    slug: "portsmouth-federal-revival",
    title: "Federal Revival on Middle Street",
    town: "Portsmouth",
    region: "Seacoast",
    category: "Remodel",
    year: 2024,
    squareFeet: 3200,
    summary:
      "Full interior restoration of an 1818 Federal, including hand-milled millwork replication and a discreet mechanical retrofit approved by the Historic District Commission.",
  },
  {
    slug: "bedford-hill-residence",
    title: "Bedford Hill Residence",
    town: "Bedford",
    region: "Merrimack Valley",
    category: "Custom Home",
    year: 2025,
    squareFeet: 5600,
    summary:
      "A quiet modern farmhouse on eleven acres — standing-seam roof, white oak throughout, and a passive-house-adjacent envelope tested at 0.9 ACH50.",
  },
  {
    slug: "wolfeboro-boathouse",
    title: "Wolfeboro Boathouse & Guest Loft",
    town: "Wolfeboro",
    region: "Lakes Region",
    category: "Custom Home",
    year: 2023,
    squareFeet: 1450,
    summary:
      "Two-slip timber boathouse with a guest loft above, permitted through NHDES Shoreland and built from a barge across two winter seasons.",
  },
  {
    slug: "concord-mill-lofts",
    title: "Hollis Mill Loft Conversion",
    town: "Concord",
    region: "Merrimack Valley",
    category: "Commercial",
    year: 2024,
    squareFeet: 22000,
    summary:
      "Adaptive reuse of a 19th-century brick mill into fourteen loft apartments and two ground-floor retail bays, with original heavy timber left exposed.",
  },
  {
    slug: "rye-coastal-remodel",
    title: "Rye Coastal Remodel",
    town: "Rye",
    region: "Seacoast",
    category: "Remodel",
    year: 2025,
    squareFeet: 2900,
    summary:
      "A 1970s ranch opened to the Atlantic — new structural ridge, corrosion-rated fasteners throughout, and a kitchen built for salt air.",
  },
  {
    slug: "hanover-timber-frame",
    title: "Hanover Timber Frame",
    town: "Hanover",
    region: "Dartmouth–Sunapee",
    category: "Custom Home",
    year: 2023,
    squareFeet: 4100,
    summary:
      "Douglas fir frame raised in a single day, wrapped in a SIPs envelope and finished with locally quarried granite for the hearth and sills.",
  },
  {
    slug: "north-conway-post-beam",
    title: "Saco Valley Post & Beam Lodge",
    town: "North Conway",
    region: "White Mountains",
    category: "Commercial",
    year: 2024,
    squareFeet: 8800,
    summary:
      "A twelve-room lodge engineered for a 110 psf ground snow load, with a great room that stays warm on a single wood-fired hydronic loop.",
  },
];

export const projects: Project[] = seeds.map((seed) => ({
  ...seed,
  image: `/projects/${seed.slug}.jpg`,
  blurDataURL: blurFor(seed.slug),
}));

/** Only offer filters that actually have work behind them. */
export const activeRegions: ProjectRegion[] = PROJECT_REGIONS.filter((region) =>
  projects.some((project) => project.region === region),
);

export const activeCategories: ProjectCategory[] = PROJECT_CATEGORIES.filter((category) =>
  projects.some((project) => project.category === category),
);
