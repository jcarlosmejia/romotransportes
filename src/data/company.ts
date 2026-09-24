/**
 * @description Single source of truth for Romo's Transportes business facts.
 *
 * FACTUAL INTEGRITY CONTRACT
 * --------------------------
 * A field typed `| null` and set to `null` is a fact that has NOT been
 * confirmed by the business owner. The UI must never render a `null` fact and
 * must never substitute a guess for one. Because the project compiles with
 * `strict` + `noUncheckedIndexedAccess`, TypeScript forces every consumer to
 * handle the `null` branch explicitly.
 *
 * Nothing in this file may be filled in from competitor research, from what is
 * visible in a photograph, or from what is "probably" true. Everything awaiting
 * confirmation is listed in `pendingVerification` below and mirrored into
 * `docs/content-verification.md`.
 */

/** Marks a business fact that still requires owner confirmation. */
export const TODO_VERIFY = null;

export type VerificationItem = {
  /** Stable id, used to cross-reference docs/content-verification.md. */
  id: string;
  /** What has to be confirmed, in the owner's language. */
  question: string;
  /** Why the site cannot state it today. */
  reason: string;
  /** What the site shows in the meantime. */
  currentBehaviour: string;
  impact: 'blocks-launch' | 'limits-messaging' | 'nice-to-have';
};

export const company = {
  /** Confirmed: the wordmark on the supplied logo and on the units themselves. */
  legalName: "Romo's Transportes",
  shortName: "Romo's",

  /**
   * Positioning statement. Deliberately describes *what the company does*
   * rather than asserting scale, tenure or rankings.
   */
  tagline: 'Transporte de carga nacional',
  valueProposition:
    'Servicio de transporte terrestre de carga para empresas, con unidades propias, plataformas y cajas secas para distintos tipos de mercancía.',

  /** Year the business started operating. CONFIRMED by the owner 2026-09-17. */
  foundedYear: 2010 as number | null,
  /**
   * Unit / trailer counts stay `null` by the owner's explicit instruction: the
   * fleet is to be described generically ("unidades propias", "equipo
   * disponible"), never as a figure. Do not populate this.
   */
  fleetSize: TODO_VERIFY as number | null,
  /** Registered office or operations base — NOT confirmed. */
  baseCity: TODO_VERIFY as string | null,
  baseState: TODO_VERIFY as string | null,
  address: TODO_VERIFY as string | null,
} as const;

/**
 * Contact channels.
 *
 * Every value here is `null` until the owner confirms it. The site is built so
 * that a `null` channel is *hidden*, never rendered as a broken link, and the
 * on-page quote form remains a complete conversion path on its own.
 *
 * To go live, set these (or the matching `NEXT_PUBLIC_*` environment variables
 * on Cloudflare Pages — see README) and rebuild. Nothing else has to change.
 */
export const contact = {
  /**
   * WhatsApp number in full international E.164 form, digits only, no `+`.
   * Example shape (NOT a real Romo's number): `521234567890`.
   */
  whatsapp: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP ?? '523323838729') as string | null,
  /** Display form of the WhatsApp number, e.g. `+52 1 33 1234 5678`. */
  whatsappDisplay: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY ??
    '+52 33 2383 8729') as string | null,

  /** Voice line in `tel:` form, digits and `+` only. */
  phone: (process.env.NEXT_PUBLIC_ROMO_PHONE ?? '+523323838729') as string | null,
  phoneDisplay: (process.env.NEXT_PUBLIC_ROMO_PHONE_DISPLAY ??
    '+52 33 2383 8729') as string | null,

  /**
   * Commercial mailbox that receives quote requests. CONFIRMED by the owner as
   * the destination for the contact form's e-mail path.
   */
  email: (process.env.NEXT_PUBLIC_ROMO_EMAIL ??
    'contacto.romotransportes@gmail.com') as string | null,

  /** Business hours for the commercial desk. */
  hours: TODO_VERIFY as string | null,
} as const;

/**
 * Canonical site origin. Used for canonical URLs, OpenGraph and the sitemap.
 * Falls back to a placeholder that is *not* published as a canonical link until
 * the real domain is confirmed (see `siteUrlIsVerified`).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://romostransportes.com.mx'
).replace(/\/$/, '');

/**
 * The domain is confirmed, so the canonical tag, the absolute sitemap and the
 * JSON-LD identifiers are all published. Setting `NEXT_PUBLIC_SITE_URL` still
 * overrides it (useful for a preview deployment on a *.pages.dev subdomain).
 */
export const siteUrlIsVerified = true;

/**
 * Operating since 2010, confirmed by the owner. Exposed as the year rather than
 * a rounded count of years so the copy cannot silently go stale between builds;
 * `yearsOperating()` is available where a count genuinely reads better.
 */
export const foundedYear = 2010;

/**
 * @description Completed years of operation as of the build date.
 * @returns Whole years since `foundedYear`.
 */
export function yearsOperating(): number {
  return new Date().getFullYear() - foundedYear;
}

/**
 * `hasWhatsApp` used to gate several inline CTAs. Those are gone — WhatsApp has
 * a single entry point now, and `WhatsAppFloat` checks `whatsappLink()` itself —
 * so the flag was removed rather than left as an unused export.
 */
export const hasPhone = Boolean(contact.phone);
export const hasEmail = Boolean(contact.email);

/**
 * @description Builds a `wa.me` deep link for a pre-filled WhatsApp message.
 * @param message Plain-text message body; encoded by this function.
 * @returns The deep link, or `null` when no verified WhatsApp number exists.
 */
export function whatsappLink(message: string): string | null {
  if (!contact.whatsapp) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Facts still awaiting owner confirmation, ordered by impact.
 * `docs/content-verification.md` is generated from this list.
 *
 * RESOLVED on 2026-09-17 (owner sign-off) and therefore removed from here:
 * WhatsApp, telephone, e-mail, domain, form destination, year of first
 * operation (2010), fleet sizing policy (describe generically, never a figure),
 * cargo insurance, GPS and in-transit monitoring, named coverage cities, the
 * publication of all selected photographs including visible personnel and
 * third-party signage, the crop-based removal of sensitive information, the
 * exclusion of the low-quality frame, the logo treatment, and the final copy.
 */
export const pendingVerification: readonly VerificationItem[] = [
  {
    id: 'certifications',
    question:
      '¿Qué certificaciones o registros concretos tiene Romo\'s Transportes (ISO, OEA, CTPAT, SCT u otro), y con qué número o vigencia?',
    reason:
      'Se autorizó mencionar certificaciones, pero no se indicó cuál. Publicar "contamos con certificaciones" sin nombrar ninguna no es verificable por el cliente y no aporta confianza real. Además, el letrero "EMPRESA CERTIFICADA ISO 9001:2015" que aparece al fondo de una fotografía pertenece a la instalación del cliente, y el propietario indicó expresamente no atribuir certificaciones ajenas.',
    currentBehaviour:
      'No se menciona ninguna certificación. Sí se publican seguro de carga, GPS y monitoreo durante el traslado, que quedaron autorizados.',
    impact: 'limits-messaging',
  },
  {
    id: 'platform-specs',
    question:
      '¿Confirmación documental de la capacidad de la plataforma (36 t) y del tipo de suspensión (de aire)?',
    reason:
      'El propietario indicó mantener únicamente "plataforma de tres ejes" hasta contar con confirmación documental.',
    currentBehaviour:
      'Se publica "plataforma de tres ejes" (los tres ejes son visibles en la fotografía). No se publica tonelaje ni tipo de suspensión.',
    impact: 'limits-messaging',
  },
  {
    id: 'dry-van-specs',
    question: '¿Qué medidas tienen las cajas secas (48 ft, 53 ft u otras) y qué capacidad soportan?',
    reason: 'El propietario indicó describir la caja seca por uso hasta confirmar medidas.',
    currentBehaviour: 'La caja seca se describe por uso, sin medidas ni capacidad.',
    impact: 'limits-messaging',
  },
  {
    id: 'insurance-detail',
    question:
      '¿Qué cobertura y qué aseguradora respaldan la carga, y hay un monto o tope que convenga publicar?',
    reason:
      'Se autorizó mencionar el seguro de carga, sin detalles de cobertura. Publicar un monto sin confirmarlo sería una afirmación contractual.',
    currentBehaviour:
      'Se menciona que la mercancía viaja con seguro de carga y que la cobertura se confirma por servicio, sin montos ni aseguradora.',
    impact: 'limits-messaging',
  },
  {
    id: 'monitoring-detail',
    question:
      '¿El cliente puede consultar la ubicación de su unidad por algún medio (enlace, acceso, reporte) o el seguimiento se da solo por teléfono y WhatsApp?',
    reason:
      'Se autorizó mencionar GPS y monitoreo. No se confirmó si existe un acceso para el cliente ni un centro de monitoreo con horario definido.',
    currentBehaviour:
      'Se menciona GPS en las unidades y monitoreo durante el traslado. No se afirma monitoreo 24/7, centro de control ni acceso de consulta para el cliente.',
    impact: 'limits-messaging',
  },
  {
    id: 'operator-qualifications',
    question: '¿Qué capacitación, licencia federal o programa tienen los operadores?',
    reason: 'No se confirmó ningún programa ni tipo de licencia.',
    currentBehaviour:
      'Se habla de "operadores con experiencia en viaje largo" sin afirmar certificaciones ni programas.',
    impact: 'limits-messaging',
  },
  {
    id: 'address-hours',
    question:
      '¿Desea publicar un domicilio de operaciones y un horario de atención comercial?',
    reason:
      'No se proporcionaron. Un domicilio verificado permitiría además usar datos estructurados LocalBusiness, que hoy se omiten.',
    currentBehaviour:
      'No se publica domicilio ni horario. El JSON-LD usa Organization en lugar de LocalBusiness, que exige dirección física.',
    impact: 'nice-to-have',
  },
  {
    id: 'coverage-additional',
    question:
      '¿Hay más ciudades o corredores de operación frecuente que convenga listar además de los confirmados?',
    reason:
      'Se confirmaron Culiacán, Hermosillo, Tecate, Tijuana, el interior de Jalisco y León. La lista se cierra con "y otras rutas nacionales".',
    currentBehaviour:
      'Se publican las ciudades confirmadas y se indica cobertura en rutas nacionales para el resto del país.',
    impact: 'nice-to-have',
  },
  {
    id: 'analytics',
    question: '¿Desea medir conversiones (Cloudflare Web Analytics, GA4 u otra herramienta)?',
    reason: 'No se configuró ninguna herramienta de analítica.',
    currentBehaviour:
      'No se carga ningún script de terceros. Los botones ya emiten un evento `romo:cta` en el DOM, listo para conectar.',
    impact: 'nice-to-have',
  },
  {
    id: 'logo-vector',
    question: '¿Puede conseguir el logotipo en vectorial o PNG con transparencia?',
    reason:
      'El archivo entregado es una fotografía de la insignia, con viñeteado y grano. El propietario aprobó el tratamiento actual y sustituirlo más adelante.',
    currentBehaviour:
      'La insignia se monta sobre una placa de marca que convierte su borde fotográfico en una decisión de diseño.',
    impact: 'nice-to-have',
  },
];
