import { industries } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description "Sectores que atendemos": eight sectors in a ruled grid, each
 * tagged with the equipment that usually fits it.
 *
 * Framed strictly as capability. No client logo wall and no "nuestros clientes
 * incluyen": no customer relationship has been confirmed, and third-party
 * signage in the background of two photographs is not evidence of one.
 */
export function Industries() {
  return (
    <section id="industrias" className="section bg-romo-charcoal" aria-labelledby="industrias-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="industrias-title"
            overline="Sectores que atendemos"
            title="Carga industrial, comercial y pesada"
            lede="Movemos materia prima, insumos y producto terminado para plantas, constructoras, proveedores y centros de distribución."
          />
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-11 grid grid-cols-2 gap-px border border-romo-border bg-romo-border lg:grid-cols-4"
        >
          {industries.map((item, i) => (
            <li key={item.title} className="flex flex-col bg-romo-charcoal p-4 sm:p-6">
              <span aria-hidden="true" className="font-[family-name:var(--font-display)] text-sm text-romo-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[0.9375rem] font-bold uppercase leading-tight tracking-tight text-romo-cream-light sm:text-[1.0625rem]">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-romo-muted sm:text-sm">{item.description}</p>
              <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-romo-cream">
                {item.equipment}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
