import type { CityPhoto } from "@/components/CityMarquee";
import blurPlaceholders from "@/lib/blur-placeholders.json";

const blurs = blurPlaceholders as Record<string, string>;

const CC_BY_SA = { label: "CC BY-SA", url: "https://creativecommons.org/licenses/by-sa/2.0" };
const CC_BY_SA_4 = { label: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0" };

/**
 * Licensed photographs of Nashua itself, not Nash's own project work.
 * Sourced from Wikimedia Commons, provenance and license recorded here —
 * shared between the home page (which displays them) and the footer (which
 * credits them), so there's one place to update either.
 */
export const cityPhotos: CityPhoto[] = [
  {
    src: "/city/deschenes-oval.jpg",
    alt: "Deschenes Oval and the World War II Memorial at Railroad Square, Nashua, New Hampshire",
    blurDataURL: blurs["deschenes-oval"],
    credit: {
      name: "Sluglife6826",
      url: "https://commons.wikimedia.org/wiki/File:Deschenes_Oval,_World_War_II_Memorial_-_Railroad_Square_-_Nashua,_New_Hampshire.jpg",
    },
  },
  {
    src: "/city/mill-canal-falls.jpg",
    alt: "The mill canal and falls behind the former train repair facility in downtown Nashua, New Hampshire",
    blurDataURL: blurs["mill-canal-falls"],
    credit: {
      name: "Jane023",
      url: "https://commons.wikimedia.org/wiki/File:Former_train_repair_facility,_downtown_Nashua,_NH_01.jpg",
      license: CC_BY_SA_4,
    },
  },
  {
    src: "/city/main-street-deco-building.jpg",
    alt: "A commercial building on Main Street, Nashua, New Hampshire",
    blurDataURL: blurs["main-street-deco-building"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225898859.jpg",
      license: CC_BY_SA,
    },
  },
  {
    src: "/city/canal-reflection.jpg",
    alt: "The Nashua River canal running behind downtown Nashua, New Hampshire",
    blurDataURL: blurs["canal-reflection"],
    credit: {
      name: "Jane023",
      url: "https://commons.wikimedia.org/wiki/File:Former_train_repair_facility,_downtown_Nashua,_NH_02.jpg",
      license: CC_BY_SA_4,
    },
  },
  {
    src: "/city/main-street-storefronts.jpg",
    alt: "Storefronts along Main Street, Nashua, New Hampshire",
    blurDataURL: blurs["main-street-storefronts"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225899003.jpg",
      license: CC_BY_SA,
    },
  },
  {
    src: "/city/main-street-bank-building.jpg",
    alt: "A former bank building on Main Street, Nashua, New Hampshire",
    blurDataURL: blurs["main-street-bank-building"],
    credit: {
      name: "Dougtone",
      url: "https://commons.wikimedia.org/wiki/File:Nashua,_New_Hampshire_-_8225899181.jpg",
      license: CC_BY_SA,
    },
  },
];
