export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "custom-homes",
    title: "Custom Homes",
    summary: "Ground-up houses designed around the site, the light, and how you actually live.",
    detail:
      "We take a project from raw land through occupancy: site evaluation, septic and well coordination, design-build or architect-led, and a build schedule that survives a New Hampshire winter.",
    bullets: ["Design-build or architect-led", "Site, septic & well coordination", "Envelope testing on every home"],
  },
  {
    slug: "whole-home-remodeling",
    title: "Whole-Home Remodeling",
    summary: "Structural reworks that make an older New England house feel inevitable.",
    detail:
      "Load-bearing changes, new mechanicals, insulation retrofits and finish work — sequenced so you can stay in the house where that's realistic, and phased where it isn't.",
    bullets: ["Structural openings & ridge beams", "Mechanical & insulation retrofit", "Historic district experience"],
  },
  {
    slug: "kitchens-and-baths",
    title: "Kitchens & Baths",
    summary: "The two rooms that carry a house, built by the crew that framed it.",
    detail:
      "Cabinetry from New England shops, stone templated and set by our own installers, and waterproofing detailed to the letter — because these are the rooms that punish shortcuts.",
    bullets: ["Locally milled cabinetry", "Schluter & Wedi wet-area systems", "In-house tile and stone crew"],
  },
  {
    slug: "additions",
    title: "Additions & Dormers",
    summary: "More house, without the seam showing.",
    detail:
      "Matching an existing roofline, siding exposure and window rhythm is the whole job. We detail the tie-in first, then build backward from it.",
    bullets: ["Roofline & siding matching", "Foundation and frost-wall work", "Zoning and setback navigation"],
  },
  {
    slug: "lakefront",
    title: "Lakefront & Waterfront",
    summary: "Shoreland building, permitted properly and built to last on the water.",
    detail:
      "NHDES Shoreland Water Quality Protection Act permitting, helical pier foundations, boathouses and docks — plus the winter logistics of building where the driveway ends at the ice.",
    bullets: ["NHDES Shoreland permitting", "Helical pier & barge logistics", "Boathouses, docks & seawalls"],
  },
  {
    slug: "light-commercial",
    title: "Light Commercial",
    summary: "Mill conversions, inns and storefronts on a schedule your tenants can bank on.",
    detail:
      "Adaptive reuse and ground-up commercial under 30,000 square feet, delivered with the same superintendent-on-site model we use on residential work.",
    bullets: ["Adaptive reuse & mill conversions", "Code and accessibility compliance", "Phased occupancy planning"],
  },
];

export const process = [
  {
    step: "01",
    title: "Conversation",
    body: "We walk the site, listen to what you're picturing, and tell you honestly what it costs in New Hampshire this year.",
  },
  {
    step: "02",
    title: "Preconstruction",
    body: "Drawings, allowances and a line-item budget you can actually read — before a single permit is pulled.",
  },
  {
    step: "03",
    title: "Build",
    body: "One superintendent, on your site, every day. Weekly written updates and a schedule that accounts for mud season.",
  },
  {
    step: "04",
    title: "Handover",
    body: "Blower-door results, a punch list closed before we leave, and a two-year workmanship warranty in writing.",
  },
] as const;
