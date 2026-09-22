import type { PhotoCredit } from "@/components/CityMarquee";

/**
 * The on-page attribution `CityMarquee` used, without the photo strip
 * itself — for when the licensed photos it credits are shown elsewhere (the
 * header carousel) but still need visible credit under their CC BY-SA terms.
 * See `CityMarquee` for why that has to be on the page, not just in a code
 * comment or the README.
 *
 * Deliberately styled to disappear into whatever section it sits in rather
 * than announce itself as its own block — the requirement is that it's
 * present and reachable, not that it's prominent.
 */
export function PhotoCredits({ credits, tone = "dark" }: { credits: PhotoCredit[]; tone?: "dark" | "light" }) {
  const palette =
    tone === "light"
      ? { text: "text-granite-400", hover: "hover:text-granite-700", decoration: "decoration-granite-300" }
      : { text: "text-granite-400", hover: "hover:text-granite-200", decoration: "decoration-granite-700" };

  return (
    <details className={`group text-[11px] ${palette.text}`}>
      <summary
        className={`w-fit cursor-pointer select-none list-none underline decoration-dotted underline-offset-2 ${palette.hover}`}
      >
        Photo credits
      </summary>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {credits.map((credit) => (
          <li key={credit.url}>
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-2 ${palette.decoration} ${palette.hover}`}
            >
              {credit.name}
            </a>
            {credit.license ? (
              <>
                {" · "}
                <a
                  href={credit.license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline underline-offset-2 ${palette.decoration} ${palette.hover}`}
                >
                  {credit.license.label}
                </a>
              </>
            ) : (
              " · public domain"
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}
