import { trustPoints } from '@/data/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/**
 * @description Four differentiators immediately below the hero.
 *
 * Every item states a practice or a capability, never a statistic. There are no
 * counters here on purpose: unit counts, years of operation and completed-trip
 * totals are all unverified (see `pendingVerification`), and a fabricated
 * number is the fastest way to lose a B2B prospect who checks.
 */
export function TrustStrip() {
  return (
    <section
      className="border-y border-romo-border bg-romo-charcoal py-10 lg:py-12"
      aria-labelledby="puntos-clave-title"
    >
      {/* Visually hidden heading: without it the outline jumps h1 -> h3, because
          the strip's items are h3 and the first visible h2 is in Servicios. */}
      <h2 id="puntos-clave-title" className="sr-only">
        Puntos clave del servicio
      </h2>
      <Reveal as="ul" stagger className="shell grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <li key={point.id} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center border border-romo-border bg-romo-black text-romo-red"
            >
              <Icon name={point.icon} className="h-[1.375rem] w-[1.375rem]" />
            </span>
            <div>
              <h3 className="text-[0.9375rem] font-bold uppercase tracking-[0.1em] text-romo-cream-light">
                {point.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-romo-muted">{point.description}</p>
            </div>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
