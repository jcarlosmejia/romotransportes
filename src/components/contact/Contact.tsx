import { contact, hasEmail, hasPhone } from '@/data/company';
import { Icon } from '@/components/ui/Icon';
import { PhoneLink } from '@/components/ui/Cta';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { QuoteForm } from './QuoteForm';

const hasAnyChannel = hasPhone || hasEmail;

/**
 * @description Contact section: the quote form plus whatever direct channels
 * have been confirmed.
 *
 * Every channel renders only when its value exists in `src/data/company.ts`.
 * Nothing is invented, and no placeholder number or address is displayed — an
 * unconfirmed channel simply does not appear, and the form carries the
 * conversion on its own.
 */
export function Contact() {
  return (
    <section id="contacto" className="section bg-romo-black" aria-labelledby="contacto-title">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="contacto-title"
              overline="Contacto"
              title="Solicita tu cotización"
              lede="Comparte origen, destino, tipo de mercancía y la fecha que tienes prevista. Con esos datos definimos la unidad adecuada y te respondemos con la cotización."
            />

            {hasAnyChannel ? (
              <div className="mt-10 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-romo-cream">
                  Contacto directo
                </h3>
                {/* WhatsApp is intentionally absent: the floating button is the
                    single WhatsApp entry point site-wide. */}
                <div className="flex flex-col gap-3">
                  <PhoneLink place="contacto" className="text-romo-cream-light" />
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      data-cta="correo"
                      data-cta-place="contacto"
                      className="inline-flex min-h-[2.75rem] items-center gap-2 font-semibold text-romo-cream-light"
                    >
                      <Icon name="mail" className="h-[1.125rem] w-[1.125rem] text-romo-red" />
                      {contact.email}
                    </a>
                  ) : null}
                  {contact.hours ? (
                    <p className="flex items-center gap-2 text-sm text-romo-muted">
                      <Icon name="clock" className="h-[1.125rem] w-[1.125rem]" />
                      {contact.hours}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <ul className="mt-10 space-y-3 border-t border-romo-border pt-8 text-sm text-romo-muted">
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-romo-red" />
                Te indicamos si conviene plataforma o caja seca.
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-romo-red" />
                Atención directa: quien cotiza da seguimiento al viaje.
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-romo-red" />
                Si el equipo no es el adecuado para tu carga, te lo decimos.
              </li>
            </ul>
          </Reveal>

          <Reveal id="cotizar" className="scroll-mt-28">
            <div className="cut-corner-lg border border-romo-border bg-romo-charcoal p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase tracking-tight">
                Formulario de cotización
              </h3>
              <div aria-hidden="true" className="mt-3 h-[2px] w-9 bg-romo-red" />
              <div className="mt-7">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
