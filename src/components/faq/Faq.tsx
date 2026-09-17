import { faqs } from '@/data/faqs';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * @description Frequently asked questions.
 *
 * Built on native `<details>` / `<summary>`: keyboard operable, exposed
 * correctly to assistive technology and fully functional without JavaScript —
 * no accordion component or ARIA reimplementation needed. The disclosure
 * triangle is replaced with a brand chevron via CSS.
 */
export function Faq() {
  return (
    <section id="preguntas" className="band-light section" aria-labelledby="preguntas-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="preguntas-title"
            overline="Preguntas frecuentes"
            title="Antes de cotizar"
            lede="Lo que normalmente preguntan las empresas antes de contratar un traslado."
            align="center"
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ul className="border-t border-romo-border-light">
            {faqs.map((faq, index) => (
              <li key={faq.question} className="border-b border-romo-border-light">
                <details id={`faq-${index + 1}`} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[1.0625rem] font-bold uppercase leading-snug tracking-tight text-romo-charcoal">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-romo-border-light text-romo-red transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-open:rotate-45"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 pr-12">
                    <p className="text-[0.9375rem] leading-relaxed text-romo-muted-dark">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
