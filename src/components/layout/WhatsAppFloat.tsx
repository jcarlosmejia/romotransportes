import { contact, whatsappLink } from '@/data/company';
import { whatsappFloatMessage } from '@/lib/quote';

/**
 * @description The site's single WhatsApp entry point: a fixed, floating icon
 * button in the bottom-right corner.
 *
 * ONE CLICK, NO STEPS
 * -------------------
 * This is a plain `<a>` to a `wa.me` deep link with the message already
 * encoded, so activating it opens WhatsApp immediately. There is no modal, no
 * form, no clipboard step, no second CTA to choose from — and because it needs
 * no state, it stays a server component and ships zero JavaScript.
 *
 * It replaced the six inline WhatsApp buttons that used to sit in the header,
 * hero, mobile drawer, mid-page CTA, contact section and footer. Consolidating
 * them means a visitor never has to pick between WhatsApp entry points.
 *
 * COLOUR (measured, not assumed)
 * ------------------------------
 * The official lockup is a white glyph on `#25D366`, which is only 1.98:1 —
 * below the 3:1 that WCAG 1.4.11 requires of graphical objects. The fill is
 * therefore WhatsApp green darkened to `#1FA855`, which carries the white glyph
 * at 3.09:1 and is still unmistakably WhatsApp.
 *
 * That green is 6.57:1 against the dark brand surface but only 2.50:1 against
 * the cream bands, so the button's boundary is carried by a 2px brand-black
 * ring instead: 16.41:1 on cream, 6.57:1 on the fill itself. The button is
 * clearly visible on every band of the page.
 *
 * Hover and press go *darker* (`#178644`, 4.64:1) rather than lighter, so the
 * glyph's contrast improves under interaction instead of degrading.
 *
 * PLACEMENT
 * ---------
 * `position: fixed` with `env(safe-area-inset-*)` so it clears the iOS home
 * indicator and Android gesture bar. On mobile it is lifted above the sticky
 * "Cotizar" bar by a constant offset — constant rather than reactive, so the
 * button never jitters as that bar shows and hides. See `globals.css`
 * (`.whatsapp-float`).
 */
export function WhatsAppFloat() {
  const href = whatsappLink(whatsappFloatMessage);

  // Renders nothing if no number is configured, rather than a dead link.
  if (!href || !contact.whatsapp) return null;

  return (
    <a
      id="whatsapp-flotante"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-cta-place="flotante"
      aria-label="Abrir WhatsApp para solicitar cotización"
      title="Abrir WhatsApp para solicitar cotización"
      className="whatsapp-float"
    >
      <WhatsAppGlyph />
    </a>
  );
}

/**
 * @description The official WhatsApp mark.
 *
 * Kept separate from the site's own line-icon family (`ui/Icon.tsx`), whose
 * glyphs are stroked to echo the Romo's badge. This one is the brand's actual
 * filled mark, because recognisability is the whole point of the button.
 */
function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1.75rem] w-[1.75rem]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.173.232-.297.347-.495.116-.198.058-.371-.03-.52-.087-.148-.66-1.59-.905-2.177-.239-.57-.482-.492-.66-.501-.174-.008-.373-.01-.572-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}
