import { images, type ImageSlug } from '@/data/imageManifest';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryControls } from './GalleryControls';

const SCROLLER_ID = 'galeria-scroller';

/**
 * Ordered for visual variety rather than by source: a cab portrait, an indoor
 * loading manoeuvre, agricultural bales, palletised freight, a workshop, scrap
 * metal, a fleet line-up, oversize steel and a night run. No two adjacent
 * frames repeat the same subject or lighting.
 */
const GALLERY: readonly { slug: ImageSlug; span: string }[] = [
  { slug: 'romo-fleet-night-branding', span: 'md:col-span-4' },
  { slug: 'romo-purple-flatbed-steel-pipes-warehouse', span: 'md:col-span-2' },
  { slug: 'romo-forage-load-yard', span: 'md:col-span-2' },
  { slug: 'romo-black-flatbed-palletized-load', span: 'md:col-span-2' },
  { slug: 'romo-white-flatbed-workshop', span: 'md:col-span-2' },
  { slug: 'romo-scrap-load-flatbed', span: 'md:col-span-3' },
  { slug: 'romo-fleet-lineup-street', span: 'md:col-span-3' },
  { slug: 'romo-steel-structures-flatbed', span: 'md:col-span-2' },
  { slug: 'romo-purple-dry-van-night', span: 'md:col-span-4' },
];

/**
 * @description Fleet and operations gallery. Fully server-rendered.
 *
 * ONE set of markup serves both layouts: below `md` the container is a
 * scroll-snap row that can be swiped or driven by the arrow buttons; from `md`
 * up the same children become an editorial six-column grid with varied spans.
 * There is no autoplay, no rotation timer and no carousel dependency —
 * scrolling is the browser's own, so keyboard and screen-reader behaviour come
 * for free, and `GalleryControls` falls back to instant scrolling under
 * `prefers-reduced-motion`.
 *
 * A lightbox was deliberately left out: the source photographs are 897–1080px
 * wide, so enlarging them past their rendered size would only expose the
 * resolution ceiling. Captions carry the context instead.
 */
export function Gallery() {
  return (
    <section id="galeria" className="section" aria-labelledby="galeria-title">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="galeria-title"
            overline="Operación real"
            title="Nuestras unidades en ruta"
            lede="Fotografías de servicios realizados: plataforma, caja seca, maniobras de carga y operación nocturna."
          />
          <GalleryControls targetId={SCROLLER_ID} />
        </Reveal>
      </div>

      {/* Full-bleed on mobile so the row can run to the screen edge. */}
      <ul
        id={SCROLLER_ID}
        aria-label="Galería de unidades y operaciones"
        className="snap-x-scroller mt-10 px-[var(--shell-x)] md:mx-auto md:mt-14 md:grid md:max-w-[78rem] md:grid-cols-6 md:gap-5 md:overflow-visible md:px-[var(--shell-x)]"
      >
        {GALLERY.map(({ slug, span }) => (
          <li key={slug} className={`w-[78vw] max-w-[22rem] md:w-auto md:max-w-none ${span}`}>
            <figure className="group h-full">
              <div className="cut-corner overflow-hidden border border-romo-border bg-romo-surface">
                <ResponsiveImage
                  slug={slug}
                  sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 33vw"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.035]"
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-xs text-romo-muted">
                <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 bg-romo-red" />
                {images[slug].caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
