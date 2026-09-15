/**
 * Service groups.
 *
 * Replaces the old site's flat list of two dozen trades with five groups a
 * facilities manager can actually scan. Every trade from the old copy still
 * appears — as a `trades` entry inside the group it belongs to.
 */

export type ServiceGroup = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  /** The specific trades and scopes that fall under this group. */
  trades: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "general-contracting",
    title: "General Contracting",
    summary:
      "Ground-up commercial and industrial construction, managed from the first consultation through closeout.",
    detail:
      "We act as your single point of accountability: scope and budget up front, then permitting, subcontractor coordination, inspections and schedule management until the building is yours. On most projects we are also the ones holding the drawings on site.",
    trades: [
      "New commercial construction",
      "Industrial construction",
      "Project management & coordination",
      "Demolition",
      "Concrete",
      "Masonry",
      "Doors, windows & glazing",
      "Ceilings",
    ],
  },
  {
    slug: "renovations-fit-ups",
    title: "Renovations & Fit-Ups",
    summary:
      "Tenant fit-ups and interior renovations, sequenced so the rest of your building keeps operating.",
    detail:
      "Most of our work is inside buildings someone is already using. We phase the work, protect the occupied areas, and schedule the loud and disruptive scopes around your hours rather than ours — which is why a fit-up next to a working office or dining room does not cost you the week.",
    trades: [
      "Commercial & industrial fit-ups",
      "Tenant improvements",
      "Interior renovations",
      "Repairs & alterations",
      "Flooring",
      "Painting",
      "Ceilings & partitions",
    ],
  },
  {
    slug: "mechanical-electrical",
    title: "Mechanical & Electrical",
    summary:
      "HVAC, plumbing, electrical and fire protection — coordinated under one contract instead of five.",
    detail:
      "Mechanical and electrical scopes are where commercial projects usually come apart, because nobody owns the hand-offs between them. We carry them under the same contract as the build, so the ductwork, the sprinkler main and the panel schedule get resolved against each other before anyone opens a ceiling.",
    trades: [
      "HVAC",
      "Plumbing",
      "Electrical",
      "Fire protection & sprinkler systems",
      "Fire suppression",
      "Electronic security",
    ],
  },
  {
    slug: "exterior-site-work",
    title: "Exterior & Site Work",
    summary: "Everything outside the walls, from site preparation to the sign over the door.",
    detail:
      "Site work sets the schedule for everything that follows it, and in New Hampshire it sets the schedule around the weather. We plan the exterior scopes early so a frost date or a paving window never becomes the reason a tenant opens late.",
    trades: [
      "Site preparation & exterior work",
      "Concrete & paving",
      "Landscaping",
      "Sign installation",
      "Exterior repairs",
    ],
  },
  {
    slug: "maintenance-emergency",
    title: "Maintenance & Emergency Repair",
    summary:
      "Ongoing building maintenance, plus a number that gets answered when something fails after hours.",
    detail:
      "For a lot of our clients this is the relationship that started everything else — we fixed something once, and then we became the ones who maintain the building. Emergency work gets triaged the day it comes in.",
    trades: [
      "Ongoing building maintenance",
      "Emergency repairs",
      "Preventive & scheduled repairs",
      "Painting & finish upkeep",
      "Facility punch work",
    ],
  },
];

/** Flat trade list, used for JSON-LD and the capabilities strip. */
export const allTrades = serviceGroups.flatMap((group) => group.trades);

export const process = [
  {
    step: "01",
    title: "Consultation",
    body: "We walk the space, ask what the building has to keep doing while we work, and tell you honestly what the scope involves.",
  },
  {
    step: "02",
    title: "Scope & Budget",
    body: "A written scope and a budget you can take to ownership or a landlord — before anyone pulls a permit.",
  },
  {
    step: "03",
    title: "Project Management",
    body: "One project manager owning the schedule, the subs and the inspections, with updates you do not have to chase.",
  },
  {
    step: "04",
    title: "Completion",
    body: "Punch list closed, inspections signed off, and a contractor who still answers the phone after the final invoice.",
  },
] as const;
