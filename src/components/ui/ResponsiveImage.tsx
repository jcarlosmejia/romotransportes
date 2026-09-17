import { images, type ImageSlug } from '@/data/imageManifest';

/**
 * @description Renders a Romo's photograph from the generated rendition set.
 *
 * WHY NOT `next/image`
 * --------------------
 * This site is a static export, so `next/image` has to run with
 * `images.unoptimized: true`, which makes it emit a single `src` with no
 * `srcset` at all — every device would download the same file. Native
 * `<picture>` over the pre-built renditions gives exact control instead: the
 * browser picks the smallest adequate file, AVIF and WebP are offered ahead of
 * the JPEG fallback, and `width`/`height` reserve the box so nothing shifts.
 *
 * @param slug Key into the generated image manifest.
 * @param sizes CSS `sizes` descriptor. MUST describe the real rendered width at
 *   each breakpoint, otherwise the browser over-fetches.
 * @param priority When true the image is eagerly fetched at high priority — use
 *   for the LCP candidate only. Everything else lazy-loads.
 * @param className Classes applied to the `<img>` element.
 * @param alt Overrides the manifest alt text. Pass `""` for decorative use.
 * @param wrapperClassName Classes applied to the `<picture>` element.
 */
export function ResponsiveImage({
  slug,
  sizes,
  priority = false,
  className = '',
  alt,
  wrapperClassName = '',
}: {
  slug: ImageSlug;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  wrapperClassName?: string;
}) {
  const asset = images[slug];
  const renditions = asset.renditions;
  // Largest rendition is the fallback `src`; it is never wider than the source
  // crop, so no upscaling can occur.
  const largest = renditions[renditions.length - 1]!;

  const srcSet = (kind: 'avif' | 'webp' | 'jpg') =>
    renditions
      .map((r) => (r[kind] ? `${r[kind]} ${r.width}w` : null))
      .filter(Boolean)
      .join(', ');

  const avif = srcSet('avif');
  const webp = srcSet('webp');

  return (
    <picture className={wrapperClassName}>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        src={largest.jpg}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? asset.alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}

/**
 * @description Preload hints for the hero photograph.
 *
 * Emitted inside the document `<head>` so the LCP image starts downloading
 * before the `<picture>` is parsed. One `<link>` per format, each with the same
 * `imageSrcSet`/`imageSizes` as the element, so the browser preloads exactly
 * the file it will use — not an extra one.
 * @param slug Manifest key of the hero image.
 * @param sizes The same `sizes` string passed to the rendered element.
 */
export function HeroImagePreload({ slug, sizes }: { slug: ImageSlug; sizes: string }) {
  const asset = images[slug];
  const set = (kind: 'avif' | 'webp') =>
    asset.renditions
      .map((r) => (r[kind] ? `${r[kind]} ${r.width}w` : null))
      .filter(Boolean)
      .join(', ');

  const avif = set('avif');
  const webp = set('webp');
  const chosen = avif || webp;
  if (!chosen) return null;

  return (
    <link
      rel="preload"
      as="image"
      type={avif ? 'image/avif' : 'image/webp'}
      imageSrcSet={chosen}
      imageSizes={sizes}
      fetchPriority="high"
    />
  );
}
