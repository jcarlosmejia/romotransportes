import { contact } from '@/data/company';
import { QUOTE_ANCHOR } from '@/data/navigation';
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
