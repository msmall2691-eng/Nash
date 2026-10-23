import { getNashuaConditions } from "@/lib/weather";

/**
 * The live Nashua-conditions badge, now in the hero rather than the footer.
 *
 * Moved up from a single quiet line at the bottom of the page: "we actually
 * work outside, in this town, today" is a fact worth a visitor's eye landing
 * on it, not a line nobody scrolls far enough to read. No pill or background —
 * it sits directly on the photo like the rest of the hero's text, leaning on
 * `hero-text-shadow` for legibility the same way the headline does. Still
 * load-bearing on nothing: a slow or failed request just renders nothing,
 * same contract `getNashuaConditions` has always kept.
 */
export async function HeroConditions() {
  const conditions = await getNashuaConditions();
  if (!conditions) return null;

  return (
    <p className="hero-text-shadow flex items-center gap-2 text-sm font-medium text-granite-100">
      <span
        aria-hidden="true"
        // The pulse only fires on a day that would actually interrupt
        // exterior work — calm weather gets a steady dot, nothing to notice.
        className={`size-2 shrink-0 rounded-full ${
          conditions.disruptive ? "animate-pulse bg-brand-400" : "bg-granite-300"
        }`}
      />
      Nashua right now · {conditions.temperatureF}°F, {conditions.description}
      {conditions.disruptive && " — a day we plan around"}
    </p>
  );
}
