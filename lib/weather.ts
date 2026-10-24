import { site, siteUrl } from "@/lib/site";

/**
 * Current conditions in Nashua.
 *
 * Source is Open-Meteo: no API key, no account, and free for commercial use —
 * which matters because a key would have to live in the environment and be
 * rotated by someone. Fetched on the server and cached for half an hour, so a
 * busy day costs the same as a quiet one and no visitor waits on it.
 *
 * Every failure path returns null and the UI simply omits the line. A weather
 * outage must never be able to break a contractor's website.
 */

export type Conditions = {
  temperatureF: number;
  description: string;
  /** True when conditions would actually interrupt exterior work. */
  disruptive: boolean;
};

/** WMO weather interpretation codes, grouped the way a job site cares about. */
const WMO: Record<number, { text: string; disruptive?: boolean }> = {
  0: { text: "clear" },
  1: { text: "mostly clear" },
  2: { text: "partly cloudy" },
  3: { text: "overcast" },
  45: { text: "fog" },
  48: { text: "freezing fog", disruptive: true },
  51: { text: "light drizzle" },
  53: { text: "drizzle" },
  55: { text: "heavy drizzle", disruptive: true },
  56: { text: "freezing drizzle", disruptive: true },
  57: { text: "freezing drizzle", disruptive: true },
  61: { text: "light rain" },
  63: { text: "rain", disruptive: true },
  65: { text: "heavy rain", disruptive: true },
  66: { text: "freezing rain", disruptive: true },
  67: { text: "freezing rain", disruptive: true },
  71: { text: "light snow" },
  73: { text: "snow", disruptive: true },
  75: { text: "heavy snow", disruptive: true },
  77: { text: "snow grains" },
  80: { text: "rain showers" },
  81: { text: "rain showers", disruptive: true },
  82: { text: "heavy showers", disruptive: true },
  85: { text: "snow showers", disruptive: true },
  86: { text: "heavy snow showers", disruptive: true },
  95: { text: "thunderstorms", disruptive: true },
  96: { text: "thunderstorms", disruptive: true },
  99: { text: "thunderstorms", disruptive: true },
};

export async function getNashuaConditions(): Promise<Conditions | null> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${site.geo.latitude}&longitude=${site.geo.longitude}` +
    "&current=temperature_2m,weather_code" +
    "&temperature_unit=fahrenheit&timezone=America%2FNew_York";

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    const current = (data as { current?: { temperature_2m?: number; weather_code?: number } }).current;
    if (typeof current?.temperature_2m !== "number" || typeof current.weather_code !== "number") {
      return null;
    }

    const wmo = WMO[current.weather_code];
    return {
      temperatureF: Math.round(current.temperature_2m),
      description: wmo?.text ?? "—",
      // Below freezing stops concrete and most exterior finishes regardless of sky.
      disruptive: Boolean(wmo?.disruptive) || current.temperature_2m <= 32,
    };
  } catch {
    return null;
  }
}

export type WeatherAlert = {
  /** NWS's own short name for the alert, e.g. "Winter Storm Watch". */
  event: string;
  severity: "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
};

/** NWS severity scale, worst first — ranked so multiple active alerts pick the one that matters most. */
const SEVERITY_RANK: Record<WeatherAlert["severity"], number> = {
  Extreme: 4,
  Severe: 3,
  Moderate: 2,
  Minor: 1,
  Unknown: 0,
};

/**
 * Any National Weather Service alert active right now for Nashua — a Winter
 * Storm Watch, a Wind Advisory, whatever NWS has actually issued for this
 * exact point. Source is api.weather.gov: no key, free, and it's the
 * government's own alerting system, so there's nothing here to keep in sync
 * by hand the way a hand-written "bad weather" list would need to be.
 *
 * NWS's usage policy asks every caller to self-identify in the User-Agent —
 * not a technicality, this is how they reach someone if a request pattern
 * needs attention — so this one names the real site and a real inbox.
 *
 * Revalidates every 10 minutes rather than the 30 the temperature fetch
 * uses: an active alert is the one part of this badge where "right now"
 * should mean closer to it. Same failure contract either way — anything
 * that goes wrong returns null and the badge just shows plain conditions.
 */
export async function getActiveWeatherAlert(): Promise<WeatherAlert | null> {
  const url = `https://api.weather.gov/alerts/active?point=${site.geo.latitude},${site.geo.longitude}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": `(${siteUrl}, ${site.email})`,
        Accept: "application/geo+json",
      },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    const features = (data as { features?: Array<{ properties?: { event?: string; severity?: string } }> })
      .features;
    if (!Array.isArray(features) || features.length === 0) return null;

    let worst: WeatherAlert | null = null;
    for (const feature of features) {
      const event = feature.properties?.event;
      if (!event) continue;
      const severity = (feature.properties?.severity as WeatherAlert["severity"]) ?? "Unknown";
      if (!worst || SEVERITY_RANK[severity] > SEVERITY_RANK[worst.severity]) {
        worst = { event, severity };
      }
    }
    return worst;
  } catch {
    return null;
  }
}
