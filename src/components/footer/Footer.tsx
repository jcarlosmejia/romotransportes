import Link from 'next/link';
import { company, contact } from '@/data/company';
import { navItems } from '@/data/navigation';
import { services } from '@/data/services';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { PhoneLink, WhatsAppButton } from '@/components/ui/Cta';

/**
 * @description Site footer.
 *
 * Address, phone, e-mail and business hours render only when confirmed in
 * `src/data/company.ts`. Nothing is invented — an unconfirmed field is simply
 * absent, and the "service area" line states only what the source material
 * supports: national routes within Mexico, no named states or corridors.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const hasAnyChannel = Boolean(contact.whatsapp || contact.phone || contact.email);

  return (
    <footer className="border-t border-romo-border bg-romo-black" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Información de Romo&rsquo;s Transportes
      </h2>

      <div className="shell grid gap-11 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Logo size="lg" withWordmark={false} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-romo-muted">
            {company.valueProposition}
          </p>
          <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-romo-cream">
            {company.tagline}
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-romo-cream-light">
            Navegación
          </h3>
          <ul className="mt-4 space-y-1.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  id={`footer-nav-${item.href.slice(1)}`}
                  href={`/${item.href}`}
                  className="inline-flex min-h-7 items-center text-sm text-romo-muted transition-colors hover:text-romo-cream-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-romo-cream-light">
            Servicios
          </h3>
          <ul className="mt-4 space-y-1.5">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href="/#servicios"
                  className="inline-flex min-h-7 items-center text-sm text-romo-muted transition-colors hover:text-romo-cream-light"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-romo-cream-light">
            Contacto
          </h3>

          <div className="mt-4 space-y-3">
            {hasAnyChannel ? (
              <>
                <WhatsAppButton place="footer" label="WhatsApp" variant="secondary" size="sm" />
                <PhoneLink place="footer" className="text-sm text-romo-cream-light" />
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    data-cta="correo"
                    data-cta-place="footer"
                    className="inline-flex min-h-7 items-center gap-2 text-sm text-romo-cream-light"
                  >
                    <Icon name="mail" className="h-4 w-4 text-romo-red" />
                    {contact.email}
                  </a>
                ) : null}
              </>
            ) : (
              <Link
                href="/#cotizar"
                data-cta="cotizar"
                data-cta-place="footer"
                className="inline-flex min-h-7 items-center gap-2 text-sm font-semibold text-romo-cream-light"
              >
                <Icon name="quote" className="h-4 w-4 text-romo-red" />
                Solicitar cotización
              </Link>
            )}

            {company.address ? (
              <p className="flex items-start gap-2 text-sm text-romo-muted">
                <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-romo-red" />
                <span>{company.address}</span>
              </p>
            ) : null}

            {contact.hours ? (
              <p className="flex items-center gap-2 text-sm text-romo-muted">
                <Icon name="clock" className="h-4 w-4 text-romo-red" />
                {contact.hours}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-romo-cream-light">
              Zona de servicio
            </h3>
            <p className="mt-3 text-sm text-romo-muted">
              Rutas nacionales dentro de la República Mexicana.
            </p>
          </div>
        </div>
      </div>

      <div className="lane-rule opacity-40" aria-hidden="true" />

      <div className="shell flex flex-col gap-3 py-6 text-xs text-romo-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {company.legalName}. Todos los derechos reservados.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link
              href="/aviso-de-privacidad/"
              className="inline-flex min-h-7 items-center transition-colors hover:text-romo-cream-light"
            >
              Aviso de privacidad
            </Link>
          </li>
          <li>
            <Link
              href="/#cotizar"
              className="inline-flex min-h-7 items-center transition-colors hover:text-romo-cream-light"
            >
              Cotizar
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
