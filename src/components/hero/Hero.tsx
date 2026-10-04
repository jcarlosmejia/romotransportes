import { images, type ImageSlug } from '@/data/imageManifest';
import { EmailCta, PhoneLink, WhatsAppCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { heroCapabilities } from '@/data/content';

/**
 * Both framings come from the same photograph — a tractor unit hauling a loaded
 * three-axle platform at golden hour beside a highway. It carries the whole
 * freight story in one frame (unit, trailer, real cargo, scale, road context),
 * which an upright shot of a parked tractor did not.
 *
 * Desktop takes the 16:9 crop, mobile a 4:3 one. A true portrait crop would
 * have required upscaling a 1079x608 source, so 4:3 is the tallest framing the
 * pixels actually support.
 */
const DESKTOP_SLUG: ImageSlug = 'romo-black-flatbed-recycled-load-highway';
const MOBILE_SLUG: ImageSlug = 'romo-black-flatbed-recycled-load-highway-mobile';

const DESKTOP_SIZES = '560px';
const MOBILE_SIZES = 'calc(100vw - 2.5rem)';
const ART_DIRECTION_BREAKPOINT = '(min-width: 1024px)';

function srcSet(slug: ImageSlug, kind: 'avif' | 'webp' | 'jpg') {
  return images[slug]
    .renditions.map((r) => (r[kind] ? `${r[kind]} ${r.width}w` : null))
    .filter(Boolean)
    .join(', ');
}

/**
 * @description Above-the-fold hero.
 *
 * ART DIRECTION
 * -------------
 * The available source photography is 897–1080px wide, so a stretched
 * full-bleed hero would visibly soften on a large display. Instead the
 * photograph lives in a contained, angular-framed column and the brand surface
 * carries the full width. Two framings of the same frame are served from one
 * `<picture>` — 16:9 for the desktop column, 4:3 for the mobile band — and
 * `media` on the sources means the browser downloads exactly one of them,
 * never both.
 *
 * The aspect ratio is fixed in CSS per breakpoint rather than by the image's
 * own attributes, so swapping framings cannot shift the layout.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-romo-black pt-[7.5rem] pb-16 lg:pt-[9rem] lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Brand texture: diagonal hatch plus a warm floor glow. Purely decorative. */}
      <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #5a3a1c 0%, transparent 70%)' }}
      />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,35rem)] lg:gap-14">
        <div>
          <p className="overline">Base en Guadalajara, Jalisco · Desde 2010</p>

          {/* The H1 names the service AND the city: it is the strongest on-page
              signal for "transporte de carga Guadalajara" / "fletes desde
              Guadalajara", and it answers "what / where" in one read. */}
          <h1 id="hero-title" className="display-hero mt-4 uppercase">
            Transporte de carga y fletes desde Guadalajara
            <span className="text-romo-red"> a todo México</span>
          </h1>

          <p className="lede mt-6 !max-w-[52ch]">
            Movemos carga comercial e industrial en cajas secas de 48 y 53 pies y plataformas tipo
            plana, en rutas locales, semiforáneas y nacionales. Servicio spot o recurrente, con
            atención directa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppCta place="hero" />
            <EmailCta place="hero" />
          </div>
          <PhoneLink place="hero" label="o llama al" className="mt-3 text-sm text-romo-cream-light" />

          {/* Capability row: the five facts a logistics buyer checks first. */}
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2" aria-label="Capacidades principales">
            {heroCapabilities.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-romo-cream-light"
              >
                <Icon name="check" className="h-4 w-4 shrink-0 text-romo-red" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contained, angular photo frame. Cream keyline offset by a red block —
            both lifted from the badge's stepped outline. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -left-3 h-24 w-24 border-b-2 border-l-2 border-romo-red lg:-bottom-4 lg:-left-4"
          />
          <div className="cut-frame relative border border-romo-border bg-romo-surface p-1.5">
            <div className="cut-frame relative aspect-[4/3] overflow-hidden lg:aspect-video">
              <picture>
                <source
                  media={ART_DIRECTION_BREAKPOINT}
                  type="image/avif"
                  srcSet={srcSet(DESKTOP_SLUG, 'avif')}
                  sizes={DESKTOP_SIZES}
                />
                <source
                  media={ART_DIRECTION_BREAKPOINT}
                  type="image/webp"
                  srcSet={srcSet(DESKTOP_SLUG, 'webp')}
                  sizes={DESKTOP_SIZES}
                />
                <source
                  media={ART_DIRECTION_BREAKPOINT}
                  srcSet={srcSet(DESKTOP_SLUG, 'jpg')}
                  sizes={DESKTOP_SIZES}
                />
                <source type="image/avif" srcSet={srcSet(MOBILE_SLUG, 'avif')} sizes={MOBILE_SIZES} />
                <source type="image/webp" srcSet={srcSet(MOBILE_SLUG, 'webp')} sizes={MOBILE_SIZES} />
                {/* width/height are the intrinsic size of the fallback (mobile)
                    framing. The rendered box is actually reserved by the
                    wrapper's CSS aspect-ratio, which is what keeps CLS at zero
                    when the framing swaps over at 1024px. */}
                <img
                  src={images[MOBILE_SLUG].renditions.at(-1)!.jpg}
                  srcSet={srcSet(MOBILE_SLUG, 'jpg')}
                  sizes={MOBILE_SIZES}
                  width={images[MOBILE_SLUG].width}
                  height={images[MOBILE_SLUG].height}
                  alt={images[DESKTOP_SLUG].alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 pl-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-romo-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-romo-red" />
            Unidades propias · Operación real
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * @description Hero preload hints.
 *
 * Mirrors the `<picture>` above, including the `media` condition, so each
 * viewport preloads only the framing it will actually render.
 */
export function HeroPreload() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        media={ART_DIRECTION_BREAKPOINT}
        imageSrcSet={srcSet(DESKTOP_SLUG, 'avif')}
        imageSizes={DESKTOP_SIZES}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        type="image/avif"
        media="(max-width: 1023px)"
        imageSrcSet={srcSet(MOBILE_SLUG, 'avif')}
        imageSizes={MOBILE_SIZES}
        fetchPriority="high"
      />
    </>
  );
}
