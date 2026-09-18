import { serviceAreas } from "@/lib/site";

/**
 * Town lookup for the service-area checker.
 *
 * Kept separate from the UI so the answer is derived from `serviceAreas` and
 * nothing else — add a town there and the checker knows about it immediately,
 * with no second list to keep in sync.
 */

export type AreaMatch = {
  town: string;
  region: string;
  state: string;
  stateName: string;
};

/** Fold away case, punctuation and spacing so "Mont Vernon" === "montvernon". */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

/**
 * Strip a trailing state, because people type "Nashua NH" far more often than
 * "Nashua". Done before normalizing so the state letters cannot fuse onto the
 * town name.
 */
function stripState(value: string): string {
  return value
    .trim()
    .replace(/[,\s]+(n\.?h\.?|new hampshire|m\.?a\.?|mass\.?|massachusetts)\.?$/i, "")
    .trim();
}

const INDEX: Map<string, AreaMatch> = new Map(
  serviceAreas.flatMap((area) =>
    area.towns.map((town): [string, AreaMatch] => [
      normalize(town),
      { town, region: area.region, state: area.state, stateName: area.stateName },
    ]),
  ),
);

/** Spellings locals actually use that do not match the official town name. */
const ALIASES: Record<string, string> = {
  tyngsboro: "tyngsborough",
  tyngsborogh: "tyngsborough",
  mtvernon: "montvernon",
  mountvernon: "montvernon",
  southnashua: "nashua",
  northnashua: "nashua",
  goffstownvillage: "goffstown",
  eastderry: "derry",
  northsalem: "salem",
  westford: "westford",
};

/** Exact (or aliased) town match, or null. */
export function lookupTown(query: string): AreaMatch | null {
  if (!query.trim()) return null;
  const key = normalize(stripState(query));
  if (!key) return null;
  const alias = ALIASES[key];
  return INDEX.get(alias ?? key) ?? null;
}

/**
 * Towns worth offering for a partial entry. Prefix matches come first, since
 * "man" almost always means Manchester rather than Amherst.
 */
export function suggestTowns(query: string, limit = 5): AreaMatch[] {
  const key = normalize(stripState(query));
  if (key.length < 2) return [];

  const entries = [...INDEX.entries()];
  const prefix = entries.filter(([name]) => name.startsWith(key));
  const inner = entries.filter(([name]) => !name.startsWith(key) && name.includes(key));

  return [...prefix, ...inner].slice(0, limit).map(([, match]) => match);
}
