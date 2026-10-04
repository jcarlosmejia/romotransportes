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
   * Positioning. Owner brief 2026-10-04: a Guadalajara-based B2B carrier with
   * dry vans and flatbeds, direct attention and national coverage.
   */
  tagline: 'Transporte de carga y fletes desde Guadalajara',
  valueProposition:
    'Transporte de carga y fletes desde Guadalajara para empresas, con caja seca de 48 y 53 pies y plataforma tipo plana, atención directa y cobertura nacional.',

  /** Year the business started operating. CONFIRMED by the owner 2026-09-17. */
  foundedYear: 2010 as number | null,
  /**
   * Unit / trailer counts stay `null` by the owner's explicit instruction: the
   * fleet is to be described generically ("unidades propias"), never as a
   * figure. Do not populate this.
   */
  fleetSize: TODO_VERIFY as number | null,
  /** Operating base. CONFIRMED 2026-10-04 (city/metro area only, no street). */
  baseCity: 'Guadalajara' as string | null,
  baseState: 'Jalisco' as string | null,
  baseArea: 'Zona Metropolitana de Guadalajara',
  /** Street address — NOT provided. Never invent one. */
  address: TODO_VERIFY as string | null,
} as const;

/**
 * Contact channels. CONFIRMED by the owner 2026-10-04, in this order of
 * precedence: primary phone first wherever telephone contact is presented.
 * Each value can still be overridden with the matching `NEXT_PUBLIC_*`
 * variable; a `null` channel is hidden, never rendered as a broken link.
 */
export const contact = {
  /** WhatsApp, E.164 digits only, no `+`. Primary conversion channel. */
  whatsapp: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP ?? '523310131863') as string | null,
  whatsappDisplay: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY ??
    '+52 33 1013 1863') as string | null,

  /** Primary voice line (`tel:` form). */
  phone: (process.env.NEXT_PUBLIC_ROMO_PHONE ?? '+523343995054') as string | null,
  phoneDisplay: (process.env.NEXT_PUBLIC_ROMO_PHONE_DISPLAY ??
    '+52 33 4399 5054') as string | null,

  /** Secondary voice line. */
  phoneSecondary: (process.env.NEXT_PUBLIC_ROMO_PHONE_2 ?? '+523323838729') as string | null,
  phoneSecondaryDisplay: (process.env.NEXT_PUBLIC_ROMO_PHONE_2_DISPLAY ??
    '+52 33 2383 8729') as string | null,

  /** Commercial mailbox; destination of the quote form and e-mail CTAs. */
  email: (process.env.NEXT_PUBLIC_ROMO_EMAIL ??
    'contacto.romotransportes@gmail.com') as string | null,

  /** Business hours for the commercial desk — not provided. */
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
      '¿Qué configuración vehicular (p. ej. T3-S2, T3-S3, full) y qué peso bruto vehicular autorizado tiene cada unidad, conforme a la NOM-012-SCT-2?',
    reason:
      'El propietario autorizó publicar capacidades de 10, 15 y 35 t como rangos de referencia. El máximo legal depende de la configuración, del tipo de camino y de la NOM-012-SCT-2, por lo que no se publica un tope.',
    currentBehaviour:
      'Se publica "desde 10 toneladas hasta carga pesada" con 10 t / 15 t / 35 t como referencia y el aviso "Capacidad sujeta a configuración, dimensiones de la carga y unidad asignada". No se publica tipo de suspensión.',
    impact: 'limits-messaging',
  },
  {
    id: 'dry-van-capacity',
    question: '¿Qué capacidad en tarimas y en peso tienen las cajas secas de 48 y 53 pies?',
    reason: 'Se confirmaron las medidas (48 y 53 pies), no la capacidad por caja.',
    currentBehaviour: 'Se publican las medidas. La capacidad se confirma al cotizar.',
    impact: 'nice-to-have',
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
      'Se confirmaron Tepic, Mazatlán, Culiacán, Ciudad Obregón, Hermosillo, Tecate, Tijuana, el interior de Jalisco y León. Conviene validar que Tepic, Mazatlán y Ciudad Obregón son rutas frecuentes y no solo de paso.',
    currentBehaviour:
      'El mapa y la lista muestran el corredor Pacífico–Norte como "rutas frecuentes" y se indica cobertura nacional bajo cotización.',
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
