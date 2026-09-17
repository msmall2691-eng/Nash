import { activeProfiles, site } from "@/lib/site";

/** Inline brand marks — no icon dependency, and they inherit currentColor. */
const ICONS: Record<string, React.ReactNode> = {
  google: (
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10c0-.7-.1-1.3-.2-2H12v4h5.6c-.8 2.3-3 4-5.6 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.9.6 4 1.5l2.8-2.8C16.9 3 14.6 2 12 2z" />
  ),
  yelp: (
    <path d="M11 3.2v8.3c0 .6-.7.9-1.2.6L5.3 9.5c-.4-.3-.5-.9-.2-1.3 1.3-1.8 3.2-3.1 5.4-3.7.3-.1.5.1.5.4v-1.7zM11 14.3c.5-.3 1.2 0 1.2.6v5.9c0 .3-.3.6-.6.5-2-.3-3.8-1.2-5.1-2.6-.3-.3-.2-.8.1-1l4.4-3.4zm3.1-1.6 5.3 1.7c.3.1.5.5.3.8-.8 1.9-2.2 3.4-4 4.3-.3.2-.7 0-.8-.3l-1.7-5.3c-.2-.6.3-1.2.9-1.2zm.1-2.6c-.6-.2-.8-.9-.4-1.3l3.4-4.4c.2-.3.7-.3 1-.1 1.5 1.3 2.5 3 2.9 5 .1.3-.2.6-.5.6l-6.4.2z" />
  ),
  bbb: <path d="M12 2 3 6v6c0 5 3.8 9.2 9 10 5.2-.8 9-5 9-10V6l-9-4zm-1.2 13.3-3.1-3.1 1.4-1.4 1.7 1.7 4.6-4.6 1.4 1.4-6 6z" />,
  houzz: <path d="M6 2h3v6.5L18 11v11h-6v-5H12v5H6V2z" />,
  procore: (
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 3.2 5.5 3.1v6.4L12 17.8l-5.5-3.1V8.3L12 5.2zm0 3.3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
  ),
  facebook: <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />,
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9C2.3 4 3.8 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.2-8.3a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0z" />
  ),
  linkedin: (
    <path d="M6.9 8H3.6v12h3.3V8zM5.2 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 20h-3.3v-5.8c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.6-.1.9V20H10V8h3.3v1.7c.4-.7 1.2-1.7 3-1.7 2.2 0 3.9 1.4 3.9 4.5V20z" />
  ),
};

/**
 * External profile links.
 *
 * These double as SEO: the same URLs feed the JSON-LD `sameAs` array, which is
 * how Google connects the BBB, Google, Yelp and Houzz listings to this business
 * for the local pack. Linking them from the site reinforces that association.
 */
export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  if (activeProfiles.length === 0) return null;

  const base =
    tone === "dark"
      ? "border-granite-800 text-granite-400 hover:border-brand-400 hover:text-brand-400"
      : "border-granite-200 text-granite-500 hover:border-brand-500 hover:text-brand-600";

  return (
    <ul className="flex flex-wrap gap-2.5">
      {activeProfiles.map((profile) => (
        <li key={profile.key}>
          <a
            href={profile.url}
            target="_blank"
            // `me` marks these as the same entity; `noopener` is a security baseline.
            rel="me noopener noreferrer"
            title={`${site.name} on ${profile.label}`}
            className={`grid size-10 place-items-center rounded-full border transition-colors duration-200 ${base}`}
          >
            <span className="sr-only">{`${site.name} on ${profile.label}`}</span>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4.5">
              {ICONS[profile.key] ?? <circle cx="12" cy="12" r="9" />}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
