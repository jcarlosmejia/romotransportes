import { coverage } from '@/data/content';
import { WhatsAppCta } from '@/components/ui/Cta';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MexicoMap } from './MexicoMap';

/**
 * @description Coverage on a light band: map first, corridors as real HTML.
 *
 * The map gets the wide column so the corridors read at a glance. Beside it,
 * each corridor is an `h3` with its states and stops, which is the crawlable,
 * screen-reader equivalent of the map and also what carries the city names on
 * phones, where the map hides its labels. Always framed as frequent routes
 * plus coverage elsewhere — never as the only places Romo's goes.
 */
export function Coverage() {
  return (
    <section id="cobertura" className="band-light section" aria-labelledby="cobertura-title">
      <div className="shell">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-end lg:gap-16">
          <SectionHeading
            id="cobertura-title"
            overline="Rutas frecuentes y cobertura nacional"
            title={coverage.title}
          />
          <p className="text-[1.0625rem] leading-relaxed text-romo-muted-dark">{coverage.body}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <MexicoMap className="w-full text-romo-charcoal" />
            <ul
              aria-label="Leyenda del mapa"
              className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.8125rem] font-semibold text-romo-charcoal"
            >
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-2 border-white bg-romo-red outline outline-2 outline-romo-red/40" />
                Base operativa · Guadalajara
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="w-7 border-t-[3px] border-dashed border-romo-red" />
                Rutas frecuentes
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3.5 w-5 border border-romo-charcoal/40 bg-romo-charcoal/15" />
                Cobertura nacional disponible
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <ul className="divide-y divide-romo-border-light border-y border-romo-border-light">
              {coverage.corridors.map((corridor) => (
                <li key={corridor.id} className="py-5">
                  <h3 className="text-[0.9375rem] font-bold uppercase tracking-[0.06em] text-romo-charcoal">
                    {corridor.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-romo-red">{corridor.states}</p>
                  <p className="mt-2 text-[0.9375rem] text-romo-muted-dark">
                    Guadalajara → {corridor.stops.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-l-2 border-romo-red bg-white/70 py-3 pl-4 pr-3 text-sm text-romo-muted-dark">
              {coverage.note}
            </p>
            <WhatsAppCta place="cobertura" label="Cotizar mi ruta por WhatsApp" size="sm" className="mt-6" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
