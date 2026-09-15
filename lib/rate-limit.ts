/**
 * Minimal in-memory sliding-window limiter.
 *
 * Scoped to a single server instance, which is enough to blunt a form-spam
 * script. Swap the map for Upstash/Redis before running multi-region.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function allowSubmission(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [existing, stamps] of hits) {
      if (stamps.every((at) => now - at >= WINDOW_MS)) hits.delete(existing);
    }
  }

  return true;
}
