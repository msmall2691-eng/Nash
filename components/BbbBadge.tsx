import { site } from "@/lib/site";

/**
 * Accreditation badge.
 *
 * Drawn in-house rather than embedding BBB's official seal script: their seal is
 * a third-party <script> that adds a render-blocking request and a tracker to
 * every page. If Nash wants the official dynamic seal, swap this component's
 * body for the snippet from their BBB business login — the placement stays.
 */
export function BbbBadge({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { accreditation } = site;

  const shell =
    tone === "dark"
      ? "border-granite-800 bg-granite-900/60 text-granite-300 hover:border-brass-500/60"
      : "border-granite-200 bg-white text-granite-700 hover:border-brass-500/60";

  return (
    <a
      href={accreditation.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3.5 rounded-xl border px-4 py-3 transition-colors duration-200 ${shell}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brass-500 font-display text-lg font-bold leading-none text-granite-950">
        {accreditation.rating}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold">{accreditation.body}</span>
        <span className="text-[11px] uppercase tracking-[0.12em] opacity-70">
          Accredited since {accreditation.accreditedSince}
        </span>
      </span>
    </a>
  );
}
