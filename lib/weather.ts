import { site } from "@/lib/site";

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
