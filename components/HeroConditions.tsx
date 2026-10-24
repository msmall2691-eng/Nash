import { getActiveWeatherAlert, getNashuaConditions } from "@/lib/weather";

/**
 * The live Nashua-conditions badge, now in the hero rather than the footer.
 *
 * Moved up from a single quiet line at the bottom of the page: "we actually
 * work outside, in this town, today" is a fact worth a visitor's eye landing
 * on it, not a line nobody scrolls far enough to read. No pill or background —
 * it sits directly on the photo like the rest of the hero's text, leaning on
 * `hero-text-shadow` for legibility the same way the headline does. Still
 * load-bearing on nothing: either fetch failing just means that part of the
 * line doesn't render, same contract `getNashuaConditions` has always kept.
 *
 * When NWS has an active alert for this point, it replaces the plain
 * description — "Winter Storm Watch in effect" says more to a client
 * deciding whether to book a crew than "snow" does, and it's the one case
 * this badge is actually useful rather than just charming.
 */
export async function HeroConditions() {
  const [conditions, alert] = await Promise.all([getNashuaConditions(), getActiveWeatherAlert()]);
  if (!conditions) return null;

  const disruptive = conditions.disruptive || Boolean(alert);

  return (
    <p className="hero-text-shadow flex items-center gap-2 text-sm font-medium text-granite-100">
      <span
        aria-hidden="true"
        // The pulse only fires on a day that would actually interrupt
        // exterior work — calm weather gets a steady dot, nothing to notice.
        className={`size-2 shrink-0 rounded-full ${disruptive ? "animate-pulse bg-brand-400" : "bg-granite-300"}`}
      />
      {alert ? (
        `Nashua right now · ${alert.event} in effect`
      ) : (
        <>
          Nashua right now · {conditions.temperatureF}°F, {conditions.description}
          {conditions.disruptive && " — a day we plan around"}
        </>
      )}
    </p>
  );
}
