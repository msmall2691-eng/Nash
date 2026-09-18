import { getNashuaConditions } from "@/lib/weather";

/**
 * A quiet line of live weather in the footer.
 *
 * It is here because weather is the single biggest variable in a New Hampshire
 * build schedule, and the site says so in several places — showing the actual
 * conditions in Nashua makes that claim concrete rather than decorative.
 *
 * Deliberately understated: one line, no icon set, no forecast panel. If the
 * request fails or is slow, nothing renders at all.
 */
export async function NashuaConditions() {
  const conditions = await getNashuaConditions();
  if (!conditions) return null;

  return (
    <p className="flex items-center gap-2.5 text-xs text-granite-500">
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${conditions.disruptive ? "bg-brand-500" : "bg-granite-500"}`}
      />
      <span>
        Nashua right now · {conditions.temperatureF}°F, {conditions.description}
        {conditions.disruptive && " — a day we plan around"}
      </span>
    </p>
  );
}
