import { safetyPractices } from '@/data/content';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Safety section.
 *
 * Visually distinct from the card grids used elsewhere: a numbered list running
 * beside a tall photograph of a real load-securing manoeuvre, on the deepest
 * brand surface.
 *
 * WHAT IS NOT CLAIMED HERE, AND WHY
 * ---------------------------------
 * Competing carriers lead this section with satellite tracking, 24/7 control
 * centres, mirror accounts and cargo insurance. None of those were confirmed
 * for Romo's, so none of them appear. Every item below is either visible in
 * Romo's own photography (load securing with straps, personnel in hard hat and
 * high-visibility vest) or intrinsic to running the service at all.
 */
export function Safety() {
  return (
    <section id="seguridad" className="section bg-romo-charcoal" aria-labelledby="seguridad-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="seguridad-title"
              overline="Seguridad"
              title="La carga se prepara para el viaje"
              lede="La mercancía que nos entregan es responsabilidad nuestra desde la carga hasta la entrega. Esto es lo que hacemos en cada servicio."
            />

            <div className="cut-frame mt-9 overflow-hidden border border-romo-border bg-romo-surface p-1.5">
              <div className="cut-frame overflow-hidden">
                <ResponsiveImage
                  slug="romo-load-securing-rebar-warehouse"
                  sizes="(max-width: 1023px) calc(100vw - 2.5rem), 400px"
                  className="w-full"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-romo-muted">
              Maniobra de carga y sujeción en nave industrial.
            </p>
          </Reveal>

          <Reveal as="ol" stagger className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:mt-2">
            {safetyPractices.map((practice, index) => (
              <li key={practice.title} className="relative border-t border-romo-border pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-[2px] w-8 bg-romo-red"
                />
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-sm text-romo-red"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-romo-cream-light">
                    {practice.title}
                  </h3>
                </div>
                <p className="mt-2.5 flex gap-3 text-sm leading-relaxed text-romo-muted">
                  <Icon name={practice.icon} className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-romo-cream/60" />
                  <span>{practice.description}</span>
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
