"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { lookupTown, suggestTowns, type AreaMatch } from "@/lib/service-area";
import { site } from "@/lib/site";

type Answer = AreaMatch | "unlisted" | null;

/**
 * "Do you work in my town?" — answered instantly.
 *
 * It is the first question almost every visitor has, and the map of towns
 * beside it only answers it if they read all forty. Everything it says is
 * derived from the published service area, so it can never promise coverage
 * the business has not claimed, and a town we have not listed gets an honest
 * "call us" rather than a no.
 */
export function ServiceAreaCheck() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<Answer>(null);
  const inputId = useId();
  const answerId = useId();

  // Only offer suggestions while the entry is still ambiguous.
  const suggestions = useMemo(
    () => (answer === null ? suggestTowns(query) : []),
    [query, answer],
  );

  function onChange(value: string) {
    setQuery(value);
    // Typing a whole town name answers the question without pressing anything.
    setAnswer(lookupTown(value));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    const exact = lookupTown(query);
    if (exact) return setAnswer(exact);
    // One obvious candidate is the answer they meant; anything else is a miss.
    const [only, second] = suggestTowns(query, 2);
    setAnswer(only && !second ? only : "unlisted");
  }

  function choose(match: AreaMatch) {
    setQuery(match.town);
    setAnswer(match);
  }

  return (
    <div className="rounded-xl border border-granite-200 bg-white p-6 shadow-sm">
      <form onSubmit={onSubmit}>
        <label htmlFor={inputId} className="font-display text-base font-semibold text-granite-900">
          Do we work in your town?
        </label>
        <div className="mt-3 flex gap-2">
          <input
            id={inputId}
            type="text"
            value={query}
            onChange={(event) => onChange(event.target.value)}
            autoComplete="address-level2"
            placeholder="Nashua, Bedford, Lowell…"
            aria-describedby={answerId}
            className="w-full rounded-lg border border-granite-200 bg-white px-4 py-3 text-[15px] text-granite-900 shadow-sm outline-none transition-all duration-200 placeholder:text-granite-400 hover:border-granite-300 focus:border-brand-700 focus:ring-4 focus:ring-brand-700/10"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-granite-900 px-5 text-sm font-medium text-granite-50 transition-colors duration-300 hover:bg-brand-700"
          >
            Check
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((match) => (
            <li key={match.town}>
              <button
                type="button"
                onClick={() => choose(match)}
                className="rounded-full border border-granite-200 px-3 py-1.5 text-xs font-medium text-granite-600 transition-colors hover:border-brand-700 hover:text-brand-700"
              >
                {match.town}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Announced to screen readers the moment it resolves, without stealing focus. */}
      <div id={answerId} aria-live="polite" className="empty:hidden">
        {answer && answer !== "unlisted" && (
          <div className="animate-fade-in mt-4 border-t border-granite-200 pt-4">
            <p className="text-[15px] leading-relaxed text-granite-800">
              <span className="font-semibold text-brand-700">Yes</span> — {answer.town}, {answer.state}{" "}
              is in our {answer.region} service area.
            </p>
            <Link
              href={`/contact?town=${encodeURIComponent(answer.town)}`}
              className="mt-3 inline-block text-sm font-medium text-granite-900 underline decoration-brand-700 decoration-2 underline-offset-4 transition-colors hover:text-brand-700"
            >
              Request a consultation in {answer.town}
            </Link>
          </div>
        )}

        {answer === "unlisted" && (
          <div className="animate-fade-in mt-4 border-t border-granite-200 pt-4">
            <p className="text-[15px] leading-relaxed text-granite-800">
              {query.trim()} isn&rsquo;t on our published list — but the list is where we work most,
              not a boundary. Call us and we&rsquo;ll tell you straight away.
            </p>
            <a
              href={`tel:${site.phone}`}
              className="mt-3 inline-block text-sm font-medium text-granite-900 underline decoration-brand-700 decoration-2 underline-offset-4 transition-colors hover:text-brand-700"
            >
              {site.phoneDisplay}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
