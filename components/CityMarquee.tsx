import Image from "next/image";

export type PhotoCredit = {
  /** Photographer or Commons username. */
  name: string;
  /** Link to the photo's Wikimedia Commons file page. */
  url: string;
  /** Omit for CC0 (public domain) — nothing to name the license for. */
  license?: { label: string; url: string };
};

export type CityPhoto = {
  src: string;
  alt: string;
  blurDataURL?: string;
  credit: PhotoCredit;
};

/**
 * A quiet, continuously scrolling strip of Nashua photographs.
 *
 * Deliberately not `ProtectedImage`: these are sourced, licensed photographs
 * of the city itself, not Nash's own project photography, so the download
 * deterrents (and the reasoning behind them) do not apply here.
 *
 * The track renders the photo set twice, back to back, and CSS animates a
 * translate across exactly one set's width — see `.marquee-track` in
 * globals.css for why that makes the loop seamless and safe under
 * `prefers-reduced-motion`. Pausing on hover or keyboard focus (also in
 * globals.css) lets a visitor actually look at one without it sliding away.
 *
 * Every photo here is CC0 or CC BY-SA. CC0 asks for nothing, but CC BY-SA is
 * a real license condition, not a courtesy — it requires visible attribution
 * from whoever redistributes the image, and a code comment or a README only
 * the developer ever reads does not satisfy that. The `<details>` below is
 * the credit, on the page, in front of the visitors it is legally for.
 */
export function CityMarquee({ photos }: { photos: CityPhoto[] }) {
  const track = [...photos, ...photos];

  return (
    <section aria-label="Photographs of Nashua, New Hampshire" className="bg-granite-900 py-10">
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-4 px-4">
          {track.map((photo, index) => {
            // The second copy exists only to make the loop seamless — a
            // screen reader has no reason to announce every photo twice.
            const duplicate = index >= photos.length;
            return (
              <div
                key={`${photo.src}-${index}`}
                aria-hidden={duplicate || undefined}
                className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg sm:h-56 sm:w-80"
              >
                <Image
                  src={photo.src}
                  alt={duplicate ? "" : photo.alt}
                  fill
                  sizes="320px"
                  // Not `lazy`: these sit inside a continuously CSS-animated
                  // track, and a couple of browsers pick an oversized
                  // candidate from the srcset for an element whose layout box
                  // hasn't settled at the moment an IntersectionObserver
                  // fires mid-animation. The strip is only 12 small images
                  // and sits near the top of the page regardless, so eager
                  // loading costs little and sidesteps that entirely.
                  loading="eager"
                  placeholder={photo.blurDataURL ? "blur" : undefined}
                  blurDataURL={photo.blurDataURL}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-4">
        <details className="group text-xs text-granite-500">
          <summary className="w-fit cursor-pointer select-none list-none underline decoration-dotted underline-offset-2 hover:text-granite-300">
            Photo credits
          </summary>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {photos.map((photo) => (
              <li key={photo.src}>
                <a
                  href={photo.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-granite-700 underline-offset-2 hover:text-granite-300"
                >
                  {photo.credit.name}
                </a>
                {photo.credit.license ? (
                  <>
                    {" · "}
                    <a
                      href={photo.credit.license.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-granite-700 underline-offset-2 hover:text-granite-300"
                    >
                      {photo.credit.license.label}
                    </a>
                  </>
                ) : (
                  " · public domain"
                )}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
