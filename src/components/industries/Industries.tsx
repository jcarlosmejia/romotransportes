import { industries } from '@/data/content';
import { cargoTypes } from '@/data/services';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Sectors served and cargo categories handled.
 *
 * Framed strictly as capability. There is no client logo wall and no "nuestros
 * clientes incluyen" line: no customer relationship has been confirmed, and
 * third-party signage visible in the background of two photographs is not
 * evidence of one.
 */
export function Industries() {
  return (
    <section id="industrias" className="section bg-romo-charcoal" aria-labelledby="industrias-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="industrias-title"
            overline="Tipos de carga"
            title="Qué transportamos"
            lede="Nuestro equipo cubre carga cerrada y abierta. Estas son las categorías de mercancía y los sectores que podemos atender."
          />
        </Reveal>

        <Reveal as="ul" className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cargoTypes.map((cargo) => (
            <li key={cargo.title} className="card cut-corner !p-5">
              <div className="flex items-start gap-3">
                <Icon name="box" className="mt-0.5 h-5 w-5 shrink-0 text-romo-red" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.06em] text-romo-cream-light">
                    {cargo.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-romo-muted">
                    {cargo.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-romo-cream">
            Sectores que podemos atender
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {industries.map((industry) => (
              <li
                key={industry.title}
                className="border border-romo-border bg-romo-black px-3.5 py-2"
              >
                <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-romo-cream-light">
                  {industry.title}
                </span>
                <span className="ml-2 text-[0.8125rem] text-romo-muted">{industry.description}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
