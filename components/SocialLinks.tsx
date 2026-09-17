import { activeProfiles, site } from "@/lib/site";

/**
 * External profile links.
 *
 * Named rather than iconified. Hand-drawn approximations of Yelp, Houzz and
 * Google marks were neither recognisable at this size nor ours to redraw, and a
 * word is unambiguous. These URLs also feed the JSON-LD `sameAs` array, which is
 * how Google ties the listings to the business for the local pack.
 */
export function SocialLinks({
  tone = "dark",
  /** Keys to leave out — used where a profile is already represented, e.g. the BBB seal. */
  exclude = [],
}: {
  tone?: "dark" | "light";
  exclude?: string[];
}) {
  const profiles = activeProfiles.filter((profile) => !exclude.includes(profile.key));
  if (profiles.length === 0) return null;

  const base =
    tone === "dark"
      ? "border-granite-800 text-granite-400 hover:border-granite-500 hover:text-granite-100"
      : "border-granite-200 text-granite-600 hover:border-granite-400 hover:text-granite-900";

  return (
    <ul className="flex flex-wrap gap-2">
      {profiles.map((profile) => (
        <li key={profile.key}>
          <a
            href={profile.url}
            target="_blank"
            // `me` marks these as the same entity; `noopener` is a security baseline.
            rel="me noopener noreferrer"
            title={`${site.name} on ${profile.label}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${base}`}
          >
            {profile.label}
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path d="M6 3h7v7M13 3 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
