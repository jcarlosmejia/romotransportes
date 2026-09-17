import { processSteps } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Six-step commercial process, drawn as a road.
 *
 * The connecting line is a dashed lane marking rather than a generic timeline,
 * and each step is phrased as an action the company takes — no promises about
 * transit times, which are not something the site can guarantee.
 */
export function Process() {
  return (
    <section id="proceso" className="band-light section" aria-labelledby="proceso-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="proceso-title"
            overline="Cómo trabajamos"
            title="De la solicitud a la entrega"
            lede="Un proceso corto y sin intermediarios. Así se organiza cada servicio."
            align="center"
          />
        </Reveal>

        <Reveal as="ol" stagger className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lane marking behind the first row on wide screens. Decorative. */}
          <span
            aria-hidden="true"
            className="lane-rule absolute inset-x-8 top-6 hidden opacity-30 lg:block"
          />

          {processSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center bg-romo-red font-[family-name:var(--font-display)] text-lg text-romo-white"
                  style={{ clipPath: 'polygon(0 0, 78% 0, 100% 22%, 100% 100%, 0 100%)' }}
                >
                  {index + 1}
                </span>
                <h3 className="text-[1.0625rem] font-bold uppercase leading-tight tracking-tight text-romo-charcoal">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 pl-16 text-[0.9375rem] leading-relaxed text-romo-muted-dark">
                {step.description}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
