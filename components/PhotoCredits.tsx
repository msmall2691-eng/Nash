import type { PhotoCredit } from "@/components/CityMarquee";

/**
 * The on-page attribution `CityMarquee` used, without the photo strip
 * itself — for when the licensed photos it credits are shown elsewhere (the
 * header carousel) but still need visible credit under their CC BY-SA terms.
 * See `CityMarquee` for why that has to be on the page, not just in a code
 * comment or the README.
 */
export function PhotoCredits({ credits }: { credits: PhotoCredit[] }) {
  return (
    <details className="group text-[11px] text-granite-400">
      <summary className="w-fit cursor-pointer select-none list-none underline decoration-dotted underline-offset-2 hover:text-granite-200">
        Photo credits
      </summary>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {credits.map((credit) => (
          <li key={credit.url}>
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-granite-700 underline-offset-2 hover:text-granite-200"
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
                  className="underline decoration-granite-700 underline-offset-2 hover:text-granite-200"
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
