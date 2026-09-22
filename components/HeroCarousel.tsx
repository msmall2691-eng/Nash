import { ProtectedImage } from "@/components/ProtectedImage";

export type HeroPhoto = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

/** Must match the per-slide span the `hero-crossfade` keyframe in globals.css is tuned for. */
const SECONDS_PER_PHOTO = 6;

/**
 * A crossfading rotation of Nashua photographs filling the header banner —
 * the alternate reading of "movement and images of Nash[ua]" in the header
 * itself, rather than a separate scrolling strip lower on the page.
 *
 * Every slide is stacked (`absolute inset-0`) and only opacity ever changes,
 * so the layout never shifts and each slide can be a plain, fixed-size
 * `fill` image. `.hero-carousel-slide` in globals.css times the fade; see
 * the comment there for why it's hand-tuned to this exact photo count.
 *
 * Only the first slide carries real alt text — the rest are the same
 * subject (downtown Nashua) cycling behind it, so a screen reader has no
 * reason to announce all seven.
 *
 * Unlike `CityMarquee`'s thumbnails, these slides never change position —
 * only opacity — so the srcset-selection bug that made eager loading
 * necessary there doesn't apply: ordinary lazy loading works fine, and
 * matters more here, since six extra full-size hero images loading eagerly
 * at once was starving the bandwidth other below-the-fold images on the
 * page needed, which is what tripped that same bug for them instead.
 */
export function HeroCarousel({ photos }: { photos: HeroPhoto[] }) {
  return (
    <>
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className="hero-carousel-slide absolute inset-0"
          style={{ animationDelay: `${index * -SECONDS_PER_PHOTO}s` }}
        >
          <ProtectedImage
            src={photo.src}
            alt={index === 0 ? photo.alt : ""}
            fill
            sizes="100vw"
            priority={index === 0}
            placeholder={photo.blurDataURL ? "blur" : undefined}
            blurDataURL={photo.blurDataURL}
            className="hero-parallax object-cover"
          />
        </div>
      ))}
    </>
  );
}
