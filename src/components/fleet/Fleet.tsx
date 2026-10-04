import { capacity, equipment } from '@/data/fleet';
import { EmailCta, WhatsAppCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description "Equipo para cada tipo de carga" — directly after the hero.
 *
 * Two cards of identical weight: caja seca and plataforma share one layout, so
 * flatbed never reads as the secondary service. Each card carries a real
 * photograph, what it is for, how the load is handled, and its own WhatsApp
 * CTA so a buyer who has just recognised their equipment can ask for a rate
 * without scrolling. Below them, the capacity band publishes weight RANGES with
 * the configuration disclaimer always beside the numbers.
 */
export function Fleet() {
  return (
    <section id="flota" className="section" aria-labelledby="flota-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="flota-title"
            overline="Equipo · Unidades propias"
            title="Equipo para cada tipo de carga"
            lede="Caja seca para mercancía protegida, plataforma para carga larga, pesada o de gran dimensión. Si no sabes cuál necesitas, te lo indicamos al cotizar."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2">
          {equipment.map((item) => (
            <Reveal
              as="article"
              key={item.id}
              id={`equipo-${item.id}`}
              className="card cut-corner-lg flex flex-col !p-0"
              aria-labelledby={`equipo-${item.id}-title`}
            >
              <div className="relative overflow-hidden border-b border-romo-border">
                <ResponsiveImage
                  slug={item.image}
                  sizes="(max-width: 1023px) calc(100vw - 2.5rem), 600px"
                  className="aspect-[16/9] w-full object-cover"
                />
                <span className="absolute left-0 top-0 bg-romo-red px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-romo-white">
                  {item.kicker}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3
                  id={`equipo-${item.id}-title`}
                  className="display-3 uppercase"
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-romo-muted">
                  {item.description}
                </p>

                <h4 className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-romo-cream">
                  Ideal para
                </h4>
                <ul className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                  {item.uses.map((use) => (
                    <li key={use} className="flex items-start gap-2 text-sm text-romo-cream-light">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-romo-red" />
                      {use}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-romo-border pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-romo-muted">
                  {item.handling.map((h) => (
                    <span key={h}>· {h}</span>
                  ))}
                </p>

                <div className="mt-6 flex-1" />
                <WhatsAppCta place={`equipo-${item.id}`} label="Cotizar por WhatsApp" className="w-full sm:w-auto sm:self-start" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Capacity band. Ranges with the disclaimer always attached. */}
        <Reveal className="mt-8 grid overflow-hidden border border-romo-border bg-romo-charcoal lg:grid-cols-[minmax(0,22rem)_1fr]">
          <ResponsiveImage
            slug={capacity.image}
            sizes="(max-width: 1023px) 100vw, 352px"
            className="h-full max-h-64 w-full object-cover lg:max-h-none"
            wrapperClassName="h-full"
          />
          <div className="p-6 sm:p-8">
            <p className="overline">Capacidad</p>
            <h3 className="display-3 mt-2 uppercase">{capacity.title}</h3>
            <ul className="mt-6 grid grid-cols-3 gap-3">
              {capacity.points.map((p) => (
                <li key={p.value} className="border-l-2 border-romo-red pl-3">
                  <span className="block font-[family-name:var(--font-display)] text-2xl text-romo-white sm:text-3xl">
                    {p.value}
                  </span>
                  <span className="mt-1 block text-xs text-romo-muted">{p.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-romo-muted">{capacity.disclaimer}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCta place="capacidad" size="sm" />
              <EmailCta place="capacidad" size="sm" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
