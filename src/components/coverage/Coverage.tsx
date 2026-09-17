import { coverage } from '@/data/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MexicoMap } from './MexicoMap';

/**
 * @description National coverage on a light band.
 *
 * Pairs the country outline with a real highway photograph. Deliberately names
 * no state, city or corridor — see `MexicoMap` and
 * docs/content-verification.md for why.
 */
export function Coverage() {
  return (
    <section id="cobertura" className="band-light section" aria-labelledby="cobertura-title">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              id="cobertura-title"
              overline="Cobertura nacional"
              title={coverage.title}
              lede={coverage.body}
            />

            <ul className="mt-8 space-y-3">
              {coverage.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[0.9375rem]">
                  <Icon name="check" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-romo-red" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Confirmed destinations. Closed with a footnote so the list never
                reads as an exhaustive map of where Romo's can go. */}
            <div className="mt-9">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-romo-red">
                Ciudades con servicio
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coverage.cities.map((city) => (
                  <li
                    key={city.name}
                    className="cut-corner border border-romo-border-light bg-white px-3 py-1.5"
                    style={{ ['--cut' as string]: '0.5rem' }}
                  >
                    <span className="text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-romo-charcoal">
                      {city.name}
                    </span>
                    <span className="ml-1.5 text-[0.75rem] text-romo-muted-dark">{city.state}</span>
                  </li>
                ))}
                <li className="flex items-center px-1 py-1.5 text-[0.8125rem] italic text-romo-muted-dark">
                  {coverage.citiesFootnote}
                </li>
              </ul>
            </div>

            <p className="mt-7 border-l-2 border-romo-red bg-white/70 py-3 pl-4 pr-3 text-sm text-romo-muted-dark">
              {coverage.note}
            </p>
          </Reveal>

          {/* Map alone in this column. A photograph stacked beneath it made the
              column far taller than the text beside it, and `items-center` then
              pushed the map up out of view on first scroll. The section's
              photographic weight is carried by its neighbours instead. */}
          <Reveal className="order-first lg:order-last">
            <MexicoMap className="w-full text-romo-charcoal" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
