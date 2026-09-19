/**
 * Small text-formatting helpers shared across pages.
 *
 * Kept separate from `site.ts` because these are generic string utilities,
 * not brand or NAP data.
 */

const andList = new Intl.ListFormat("en-US", { style: "long", type: "conjunction" });

/**
 * Joins a list the way a sentence actually reads: "A, B and C" rather than
 * "A, B, C". `Array.join(", ")` reads as a broken sentence once it sits inside
 * prose — several pages list the service-area regions this way ("Working
 * across Greater Nashua, Manchester Area, ...") and needed the same fix.
 */
export function formatList(items: readonly string[]): string {
  return andList.format(items);
}
