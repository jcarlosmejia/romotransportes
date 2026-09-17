import { QuoteButton, WhatsAppButton } from '@/components/ui/Cta';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';

/**
 * @description High-impact quote call to action, placed just before the FAQ and
 * contact sections.
 *
 * Uses the night photograph as a background because dark source pixels carry a
 * full-bleed treatment far better than a bright daylight frame at this source
 * resolution.
 */
export function QuoteCta() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="cta-cotizacion-title">
      <ResponsiveImage
        slug="romo-purple-dry-van-night"
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        wrapperClassName="absolute inset-0"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-romo-black via-romo-black/88 to-romo-red-deep/55"
      />
      <span aria-hidden="true" className="hatch absolute inset-0 opacity-40" />

      <Reveal className="shell relative py-[clamp(3.5rem,7vw,6rem)]">
        <div className="max-w-3xl">
          <p className="overline">Cotización</p>
          <h2 id="cta-cotizacion-title" className="display-2 mt-4 uppercase">
            ¿Tienes una carga por mover?
          </h2>
          <div aria-hidden="true" className="mt-6 h-[3px] w-20 bg-romo-red" />
          <p className="lede mt-6 max-w-xl">
            Cuéntanos origen, destino, tipo de mercancía y la fecha estimada. Te ayudamos a definir la
            unidad adecuada y te enviamos la cotización.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <QuoteButton place="cta-media-pagina" />
            <WhatsAppButton place="cta-media-pagina" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
