import { ProtectedImage } from "@/components/ProtectedImage";
import type { Project } from "@/lib/projects";

/**
 * A quiet, continuously scrolling strip of real client storefronts — the
 * businesses the home page's "Businesses that trusted us with their space"
 * line is actually about, shown in more depth than the three-up grid above
 * it can fit.
 *
 * Replaces the old scrolling strip of licensed Nashua city photos: the
 * client found those confusing (unclear whose photos they were or why they
 * were there) and asked for real project photos instead. These are Nash's
 * own work, so `ProtectedImage`'s download deterrents apply, same as every
 * other project photo on the site — and there's no license to credit.
 *
 * Reuses the same seamless-loop technique as that old strip (see
 * `.marquee-track` in globals.css): the photo set runs twice back to back so
 * the translate loop lands on identical content, the animation is opt-in
 * under `prefers-reduced-motion: no-preference`, and hover/focus pauses it.
 */
export function BusinessesMarquee({ projects }: { projects: Project[] }) {
  const track = [...projects, ...projects];

  return (
    <section aria-label="Businesses Nash Construction has built for" className="bg-granite-900 py-10">
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-4 px-4">
          {track.map((project, index) => {
            // The second copy exists to make the loop seamless, but the
            // animation runs continuously — a viewer sees it for roughly
            // half of every cycle, not just for an instant at the seam — so
            // it still needs its caption. Only a screen reader, which has no
            // reason to announce every project twice, skips it (aria-hidden
            // plus empty alt below).
            const duplicate = index >= projects.length;
            return (
              <div
                key={`${project.slug}-${index}`}
                aria-hidden={duplicate || undefined}
                className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg sm:h-56 sm:w-80"
              >
                <ProtectedImage
                  src={project.image}
                  alt={
                    duplicate
                      ? ""
                      : `${project.title} — ${project.sector.toLowerCase()} project by Nash Construction`
                  }
                  fill
                  sizes="320px"
                  // Not `lazy`: these sit inside a continuously CSS-animated
                  // track, and a couple of browsers pick an oversized
                  // candidate from the srcset for an element whose layout box
                  // hasn't settled at the moment an IntersectionObserver
                  // fires mid-animation. The strip is only 14 small images
                  // and sits near the top of the page regardless, so eager
                  // loading costs little and sidesteps that entirely.
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={project.blurDataURL}
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-granite-950/90 via-granite-950/5 to-transparent"
                />
                <p className="absolute inset-x-3 bottom-2.5 text-sm font-medium text-granite-50">
                  {project.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
