import { contact, hasWhatsApp, whatsappLink } from '@/data/company';
import { QUOTE_ANCHOR } from '@/data/navigation';
import { quickWhatsAppMessage } from '@/lib/quote';
import { Icon } from './Icon';

type Size = 'md' | 'sm';

const sizeClass: Record<Size, string> = {
  md: '',
  sm: 'min-h-[2.75rem] px-4 text-[0.8125rem]',
};

/**
 * @description Primary call to action: jumps to the on-page quote form.
 *
 * Always an anchor to `#cotizar`, never a dead button — the quote form is a
 * complete conversion path on its own, independent of whether a WhatsApp number
 * has been confirmed.
 * @param label Button text.
 * @param variant Visual treatment.
 * @param size Control height.
 * @param place Where this CTA sits, recorded on `data-cta-place` for analytics.
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
 * @description WhatsApp call to action.
 *
 * Renders **nothing** when no WhatsApp number has been confirmed. Showing a
 * broken or guessed number would send prospects to a stranger, so the component
 * removes itself and the quote form carries the conversion instead. Setting
 * `NEXT_PUBLIC_ROMO_WHATSAPP` (or `contact.whatsapp`) turns every instance on.
 * @param label Button text.
 * @param variant Visual treatment.
 * @param size Control height.
 * @param place Where this CTA sits, recorded on `data-cta-place` for analytics.
 * @param className Extra classes.
 */
export function WhatsAppButton({
  label = 'Cotizar por WhatsApp',
  variant = 'secondary',
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
  const href = whatsappLink(quickWhatsAppMessage);
  if (!href) return null;

  return (
    <a
      id={`cta-whatsapp-${place}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place={place}
      className={`btn btn-${variant} ${sizeClass[size]} ${className}`}
    >
      <Icon name="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
      {label}
      <span className="sr-only"> (se abre en una ventana nueva)</span>
    </a>
  );
}

/**
 * @description Telephone link. Renders nothing until a number is confirmed.
 * @param place Where this CTA sits, recorded on `data-cta-place` for analytics.
 * @param className Extra classes.
 */
export function PhoneLink({ place, className = '' }: { place: string; className?: string }) {
  if (!contact.phone) return null;

  return (
    <a
      href={`tel:${contact.phone}`}
      data-cta="telefono"
      data-cta-place={place}
      className={`inline-flex min-h-[2.75rem] items-center gap-2 font-semibold ${className}`}
    >
      <Icon name="phone" className="h-[1.125rem] w-[1.125rem] text-romo-red" />
      {contact.phoneDisplay ?? contact.phone}
    </a>
  );
}

/** True when at least one direct channel exists, for layout decisions. */
export const hasDirectChannel = hasWhatsApp || Boolean(contact.phone) || Boolean(contact.email);
