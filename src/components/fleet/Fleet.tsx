import { fleet } from '@/data/fleet';
import { QuoteButton } from '@/components/ui/Cta';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Equipment showcase on the dark brand surface.
 *
 * Photography leads each card because the fleet is the strongest proof the
 * business has. Note that only observable attributes appear in `specs` — payload
 * capacity, trailer length and suspension type are held in `pendingSpecs` and
 * are never rendered until the owner confirms them.
 */
export function Fleet() {
  return (
    <section id="flota" className="section" aria-labelledby="flota-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="flota-title"
            overline="Flota y equipo"
            title="Plataformas y cajas secas"
            lede="Unidades propias y equipo para carga abierta y cerrada. Estas son fotografías de nuestra operación, no imágenes de catálogo."
          />
        </Reveal>

        <Reveal as="ul" stagger className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {fleet.map((item) => (
            <li
              key={item.id}
              id={`flota-${item.id}`}
              className="card card-interactive cut-corner-lg flex flex-col !p-0"
            >
              <div className="relative overflow-hidden border-b border-romo-border">
                <ResponsiveImage
                  slug={item.image}
                  sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 3rem), 380px"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-romo-surface to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                <div aria-hidden="true" className="mt-3 h-[2px] w-9 bg-romo-red" />
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-romo-muted">
                  {item.description}
                </p>

                <dl className="mt-5 space-y-2 border-t border-romo-border pt-4">
                  {item.specs.map((spec) => (
                    <div key={spec} className="flex items-start gap-2.5">
                      <dt className="sr-only">Característica</dt>
                      <dd className="flex items-start gap-2.5 text-sm text-romo-cream">
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] h-1 w-1 shrink-0 bg-romo-red"
                        />
                        {spec}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-start gap-5 border border-romo-border bg-romo-charcoal p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight">
              ¿No sabes qué unidad necesitas?
            </h3>
            <p className="mt-2 max-w-xl text-[0.9375rem] text-romo-muted">
              Dinos qué vas a mover, cuánto pesa aproximadamente y cómo se va a cargar. Con eso
              definimos el equipo y te lo indicamos en la cotización.
            </p>
          </div>
          <QuoteButton place="flota" label="Cotizar mi carga" className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
