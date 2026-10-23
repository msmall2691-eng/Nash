import { getNashuaConditions } from "@/lib/weather";

/**
 * The live Nashua-conditions badge, now in the hero rather than the footer.
 *
 * Moved up from a single quiet line at the bottom of the page: "we actually
 * work outside, in this town, today" is a fact worth a visitor's eye landing
 * on it, not a line nobody scrolls far enough to read. Still deliberately
 * understated — one pill, no icon set, no forecast — and still load-bearing
 * on nothing: a slow or failed request just renders nothing, same contract
 * `getNashuaConditions` has always kept.
 */
export async function HeroConditions() {
  const conditions = await getNashuaConditions();
  if (!conditions) return null;

  return (
    <p className="hero-text-shadow flex items-center gap-2 rounded-full bg-granite-950/40 py-1.5 pl-3 pr-3.5 text-xs text-granite-200 ring-1 ring-inset ring-granite-50/15 backdrop-blur-sm">
      <span
        aria-hidden="true"
        // The pulse only fires on a day that would actually interrupt
        // exterior work — calm weather gets a steady dot, nothing to notice.
        className={`size-1.5 shrink-0 rounded-full ${
          conditions.disruptive ? "animate-pulse bg-brand-400" : "bg-granite-300"
        }`}
      />
      Nashua right now · {conditions.temperatureF}°F, {conditions.description}
      {conditions.disruptive && " — a day we plan around"}
    </p>
  );
}
