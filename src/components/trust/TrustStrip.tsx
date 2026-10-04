import { highlights } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

/**
 * @description Operational highlights directly under the hero.
 *
 * Big display figures in a ruled strip, like a spec plate: the five numbers a
 * freight buyer checks first. Every figure is owner-confirmed (see
 * `highlights`); there are no fleet counts or on-time percentages.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-romo-border bg-romo-charcoal" aria-labelledby="puntos-clave-title">
      <h2 id="puntos-clave-title" className="sr-only">
        Datos de operación
      </h2>
      <Reveal
        as="ul"
        stagger
        className="shell grid grid-cols-2 divide-romo-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-x"
      >
        {highlights.map((item) => (
          <li key={item.label} className="py-7 lg:px-6 lg:first:pl-0 last:col-span-2 sm:last:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-[1.75rem] leading-none text-romo-white sm:text-[2rem]">
              {item.value}
            </p>
            <p className="mt-2.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-romo-cream">
              {item.label}
            </p>
            <p className="mt-1 text-[0.8125rem] text-romo-muted">{item.detail}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
