import { contact, whatsappLink } from '@/data/company';
import { QUOTE_ANCHOR } from '@/data/navigation';
import { quoteTemplateMailtoLink, whatsappQuoteMessage } from '@/lib/quote';
import { Icon } from './Icon';

/**
 * Contact CTAs, one hierarchy everywhere (owner brief 2026-10-04):
 *
 *   1. WhatsApp  — primary, filled green, carries a prefilled quote template.
 *   2. Correo    — secondary, outlined, carries a prefilled tariff template.
 *   3. Teléfono  — tertiary, a plain text link; primary number first.
 *
 * All three are plain anchors: one click reaches the channel, no modal, no
 * form. Every one carries `data-cta`/`data-cta-place`, which `CtaTracker`
 * turns into a `romo:cta` DOM event for whatever analytics is added later.
 */

type Size = 'md' | 'sm';
const sizeClass: Record<Size, string> = {
  md: '',
  sm: 'min-h-[2.75rem] px-4 text-[0.8125rem]',
};

/**
 * @description Jumps to the on-page quote form.
 * @param label Button text.
 * @param variant Visual treatment.
 * @param size Control height.
 * @param place Analytics placement id.
 * @param className Extra classes.
 */
export function QuoteButton({
  label = 'Solicitar cotización',
  variant = 'primary',
  size = 'md',
  place,
  className = '',
}: {
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: Size;
  place: string;
  className?: string;
}) {
  return (
    <a
      id={`cta-cotizar-${place}`}
      href={QUOTE_ANCHOR}
      data-cta="cotizar"
      data-cta-place={place}
      className={`btn btn-${variant} ${sizeClass[size]} ${className}`}
    >
      <Icon name="quote" className="h-[1.125rem] w-[1.125rem]" />
      {label}
    </a>
  );
}

/**
 * @description Primary CTA: opens WhatsApp with the quote template.
 * @param label Button text.
 * @param size Control height.
 * @param place Analytics placement id.
 * @param className Extra classes.
 */
export function WhatsAppCta({
  label = 'Solicitar tarifa por WhatsApp',
  size = 'md',
  place,
  message = whatsappQuoteMessage,
  className = '',
}: {
  label?: string;
  size?: Size;
  place: string;
  /** Prefilled text; defaults to the generic quote template. */
  message?: string;
  className?: string;
}) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a
      id={`cta-whatsapp-${place}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place={place}
      className={`btn btn-whatsapp ${sizeClass[size]} ${className}`}
    >
      <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
      {label}
      <span className="sr-only"> (se abre en una ventana nueva)</span>
    </a>
  );
}

/**
 * @description Secondary CTA: opens the mail client with the tariff template.
 * @param label Button text.
 * @param size Control height.
 * @param place Analytics placement id.
 * @param className Extra classes.
 */
export function EmailCta({
  label = 'Solicitar tarifa por correo',
  size = 'md',
  place,
  className = '',
}: {
  label?: string;
  size?: Size;
  place: string;
  className?: string;
}) {
  if (!contact.email) return null;
  return (
    <a
      id={`cta-correo-${place}`}
      href={quoteTemplateMailtoLink(contact.email)}
      data-cta="correo"
      data-cta-place={place}
      className={`btn btn-secondary ${sizeClass[size]} ${className}`}
    >
      <Icon name="mail" className="h-[1.125rem] w-[1.125rem]" />
      {label}
    </a>
  );
}

/**
 * @description Single telephone link (primary number). Tertiary CTA.
 * @param place Analytics placement id.
 * @param label Optional visible prefix, e.g. "Llamar al".
 * @param className Extra classes.
 */
export function PhoneLink({
  place,
  label,
  className = '',
}: {
  place: string;
  label?: string;
  className?: string;
}) {
  if (!contact.phone) return null;
  return (
    <a
      href={`tel:${contact.phone}`}
      data-cta="telefono"
      data-cta-place={place}
      className={`inline-flex min-h-[2.75rem] items-center gap-2 whitespace-nowrap font-semibold ${className}`}
    >
      <Icon name="phone" className="h-[1.125rem] w-[1.125rem] text-romo-red" />
      {label ? `${label} ` : ''}
      {contact.phoneDisplay ?? contact.phone}
    </a>
  );
}

/**
 * @description Full contact list in the owner's precedence order:
 * primary phone, secondary phone, WhatsApp, e-mail.
 * @param place Analytics placement id.
 * @param tone Colour scheme for dark or light surfaces.
 */
export function ContactList({ place, tone = 'dark' }: { place: string; tone?: 'dark' | 'light' }) {
  const label = tone === 'dark' ? 'text-romo-muted' : 'text-romo-muted-dark';
  const value = tone === 'dark' ? 'text-romo-cream-light' : 'text-romo-charcoal';
  const rows: { key: string; title: string; href: string; text: string; icon: 'phone' | 'whatsapp' | 'mail'; external?: boolean }[] = [];

  if (contact.phone)
    rows.push({ key: 'telefono', title: 'Teléfono', href: `tel:${contact.phone}`, text: contact.phoneDisplay ?? contact.phone, icon: 'phone' });
  if (contact.phoneSecondary)
    rows.push({ key: 'telefono-alterno', title: 'Teléfono alterno', href: `tel:${contact.phoneSecondary}`, text: contact.phoneSecondaryDisplay ?? contact.phoneSecondary, icon: 'phone' });
  const wa = whatsappLink(whatsappQuoteMessage);
  if (wa && contact.whatsappDisplay)
    rows.push({ key: 'whatsapp', title: 'WhatsApp', href: wa, text: contact.whatsappDisplay, icon: 'whatsapp', external: true });
  if (contact.email)
    rows.push({ key: 'correo', title: 'Correo', href: quoteTemplateMailtoLink(contact.email), text: contact.email, icon: 'mail' });

  return (
    <dl className="space-y-3">
      {rows.map((row) => (
        <div key={row.key}>
          <dt className={`text-[0.6875rem] font-semibold uppercase tracking-[0.16em] ${label}`}>{row.title}</dt>
          <dd>
            <a
              href={row.href}
              data-cta={row.key}
              data-cta-place={place}
              {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`inline-flex min-h-7 items-center gap-2 font-semibold break-all ${value}`}
            >
              <Icon name={row.icon} className="h-4 w-4 shrink-0 text-romo-red" />
              {row.text}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
