import { services } from '@/data/services';
import { EmailCta, WhatsAppCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Services section on a light band.
 *
 * The first service runs as a wide editorial row with its photograph; the
 * other four sit as ruled spec columns (heavy top rule, no card chrome) so the
 * section does not repeat the equipment cards' look.
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
            title="Fletes spot y recurrentes desde Guadalajara"
            lede="Carga completa en rutas locales, semiforáneas y nacionales. Trabajamos viajes únicos y operación programada para plantas, proveedores y CEDIS."
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

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {rest.map((service) => (
            <li
              key={service.id}
              id={`servicio-${service.id}`}
              className="flex flex-col border-t-[3px] border-romo-charcoal pt-5"
            >
              <p className="label-tech text-romo-red">{service.kicker}</p>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-tight text-romo-charcoal">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-romo-muted-dark">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
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
            <strong className="font-bold text-romo-charcoal">¿Tienes origen y destino?</strong>{' '}
            Envíanos la ruta y el tipo de carga y te respondemos con unidad y tarifa.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <WhatsAppCta place="servicios" size="sm" />
            <EmailCta place="servicios" size="sm" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
