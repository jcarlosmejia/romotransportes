import type { ImageSlug } from '@/data/imageManifest';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

/**
 * @description Full-width photographic break between sections.
 *
 * The source photography tops out around 1080px wide, so a full-bleed
 * photograph would soften on a large display. Two things keep this honest: the
 * band is short (a wide letterbox, not a tall hero), and a dark scrim sits over
 * the image so it reads as an atmospheric transition rather than a detail shot.
 * The night photograph is used here for exactly that reason — dark source
 * pixels hide resolution limits that a bright daylight frame would expose.
 *
 * @param slug Manifest key of the photograph.
 * @param eyebrow Small tracked label.
 * @param title Large statement over the image.
 * @param caption Optional credit-style line under the band.
 */
export function ImageBreak({
  slug,
  eyebrow,
  title,
  caption,
}: {
  slug: ImageSlug;
  eyebrow: string;
  title: string;
  caption?: string;
}) {
  return (
    <section className="relative" aria-label={title}>
      <div className="relative h-[22rem] overflow-hidden sm:h-[26rem] lg:h-[30rem]">
        <ResponsiveImage
          slug={slug}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover"
          wrapperClassName="absolute inset-0"
        />
        {/* Scrim: strong enough for AA text contrast, weak enough to keep the
            photograph readable. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-romo-black via-romo-black/80 to-romo-black/35"
        />
        <span aria-hidden="true" className="hatch absolute inset-0 opacity-50" />

        <div className="shell relative flex h-full flex-col justify-center">
          <p className="overline">{eyebrow}</p>
          <p className="display-2 mt-3 max-w-2xl font-[family-name:var(--font-display)] uppercase text-romo-white">
            {title}
          </p>
          <div aria-hidden="true" className="mt-6 h-[3px] w-20 bg-romo-red" />
        </div>
      </div>

      {caption ? (
        <p className="shell py-3 text-xs text-romo-muted">{caption}</p>
      ) : null}
    </section>
  );
}
