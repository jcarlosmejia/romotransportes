import { services } from '@/data/services';
import { QuoteButton } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Services section on a light band.
 *
 * Layout deliberately breaks the uniform card grid: the first service runs as a
 * wide editorial row with its photograph, the remaining four sit in a 2×2 grid.
 * That gives the page a change of rhythm instead of a fifth identical row of
 * rounded cards.
 */
export function Services() {
  const [lead, ...rest] = services;

  return (
    <section id="servicios" className="band-light section" aria-labelledby="servicios-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="servicios-title"
            overline="Servicios"
            title="Soluciones para distintos tipos de carga"
            lede="El equipo y el servicio se definen a partir de lo que se va a mover, no al contrario. Estas son las opciones con las que trabajamos."
          />
        </Reveal>

        {lead ? (
          <Reveal className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-14">
            <div className="cut-frame overflow-hidden border border-romo-border-light bg-white p-1.5">
              <div className="cut-frame overflow-hidden">
                <ResponsiveImage
                  slug={lead.image ?? 'romo-forage-load-highway'}
                  sizes="(max-width: 1023px) calc(100vw - 2.5rem), 560px"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <p className="label-tech text-romo-red">{lead.kicker}</p>
              <h3 className="display-3 mt-2.5 uppercase">{lead.title}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-romo-muted-dark">
                {lead.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {lead.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[0.9375rem]">
                    <Icon name="check" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-romo-red" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        <Reveal as="ul" stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14">
          {rest.map((service) => (
            <li
              key={service.id}
              id={`servicio-${service.id}`}
              className="card card-interactive card-ticked cut-corner flex flex-col"
            >
              <p className="label-tech text-romo-red">{service.kicker}</p>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-romo-charcoal">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-romo-muted-dark">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-romo-border-light pt-4">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm">
                    <Icon name="check" className="mt-px h-4 w-4 shrink-0 text-romo-red" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-start gap-5 border-t border-romo-border-light pt-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.9375rem] text-romo-muted-dark">
            <strong className="font-bold text-romo-charcoal">¿No sabes qué unidad necesitas?</strong>{' '}
            Descríbenos la carga y nosotros te decimos si conviene plataforma o caja seca.
          </p>
          <QuoteButton place="servicios" className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
