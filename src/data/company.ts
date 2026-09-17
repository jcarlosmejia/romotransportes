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

  /** Year the business started operating — NOT confirmed. */
  foundedYear: TODO_VERIFY as number | null,
  /** Years of operating experience — NOT confirmed. Never infer from photos. */
  yearsOperating: TODO_VERIFY as number | null,
  /** Unit / trailer counts — NOT confirmed. Photographs are not an inventory. */
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
  whatsapp: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP ?? TODO_VERIFY) as string | null,
  /** Display form of the WhatsApp number, e.g. `+52 1 33 1234 5678`. */
  whatsappDisplay: (process.env.NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY ?? TODO_VERIFY) as string | null,

  /** Voice line in `tel:` form, digits and `+` only. */
  phone: (process.env.NEXT_PUBLIC_ROMO_PHONE ?? TODO_VERIFY) as string | null,
  phoneDisplay: (process.env.NEXT_PUBLIC_ROMO_PHONE_DISPLAY ?? TODO_VERIFY) as string | null,

  /** Commercial mailbox that should receive quote requests. */
  email: (process.env.NEXT_PUBLIC_ROMO_EMAIL ?? TODO_VERIFY) as string | null,

  /** Business hours for the commercial desk. */
  hours: TODO_VERIFY as string | null,
} as const;

/**
 * Canonical site origin. Used for canonical URLs, OpenGraph and the sitemap.
 * Falls back to a placeholder that is *not* published as a canonical link until
 * the real domain is confirmed (see `siteUrlIsVerified`).
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://romostransportes.com';
export const siteUrlIsVerified = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/** True when WhatsApp conversion can be wired up at all. */
export const hasWhatsApp = Boolean(contact.whatsapp);
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
 * Facts the owner must confirm before publication. Ordered by impact.
 * `docs/content-verification.md` is generated from the same list.
 */
export const pendingVerification: readonly VerificationItem[] = [
  {
    id: 'whatsapp',
    question: '¿Cuál es el número de WhatsApp comercial que debe recibir las cotizaciones?',
    reason:
      'No se proporcionó ningún número. Inventar o suponer un número enviaría a los clientes a un tercero.',
    currentBehaviour:
      'Los botones de WhatsApp están ocultos. El formulario genera la solicitud y ofrece "Copiar solicitud" como alternativa.',
    impact: 'blocks-launch',
  },
  {
    id: 'phone',
    question: '¿Cuál es el teléfono de contacto que se debe publicar?',
    reason: 'No se proporcionó ningún teléfono.',
    currentBehaviour: 'No se muestra ningún teléfono en el encabezado, contacto ni pie de página.',
    impact: 'blocks-launch',
  },
  {
    id: 'email',
    question: '¿A qué correo deben llegar las solicitudes de cotización?',
    reason: 'No se proporcionó ningún correo.',
    currentBehaviour:
      'No se muestra correo y el formulario no lo usa como destino; la conversión depende de WhatsApp o del copiado manual.',
    impact: 'blocks-launch',
  },
  {
    id: 'domain',
    question: '¿Cuál es el dominio definitivo del sitio?',
    reason:
      'El dominio se administra por separado (NEUBOX / Cloudflare DNS) y no fue confirmado en el material entregado.',
    currentBehaviour:
      'No se publica etiqueta canonical ni sitemap absoluto hasta que se defina NEXT_PUBLIC_SITE_URL.',
    impact: 'blocks-launch',
  },
  {
    id: 'form-destination',
    question:
      '¿Cómo quiere recibir las solicitudes: WhatsApp, un correo, o una función de Cloudflare conectada a un buzón?',
    reason: 'No existen credenciales ni buzón configurado.',
    currentBehaviour:
      'El formulario es funcional del lado del cliente: valida, arma el mensaje y lo entrega por WhatsApp o portapapeles.',
    impact: 'blocks-launch',
  },
  {
    id: 'years-operating',
    question: '¿Desde qué año opera Romo\'s Transportes?',
    reason: 'No hay dato verificado; afirmar antigüedad sin confirmarla sería falso.',
    currentBehaviour:
      'El sitio habla de "experiencia en transporte terrestre de carga" sin citar años ni fecha de fundación.',
    impact: 'limits-messaging',
  },
  {
    id: 'fleet-size',
    question: '¿Cuántos tractocamiones, plataformas y cajas secas hay en operación?',
    reason:
      'Las fotografías muestran varias unidades, pero una fotografía no es un inventario verificable.',
    currentBehaviour: 'No se publica ningún conteo de unidades ni estadística de flota.',
    impact: 'limits-messaging',
  },
  {
    id: 'platform-specs',
    question:
      '¿Las plataformas son de tres ejes con suspensión de aire y capacidad de 36 toneladas? ¿Aplica a todas las unidades?',
    reason:
      'El material de origen menciona tres ejes, suspensión de aire y 36 toneladas, pero se indicó tratarlo como provisional.',
    currentBehaviour:
      'Se describe la plataforma como "de tres ejes" solo porque los tres ejes son visibles en las fotografías. No se publica capacidad, suspensión ni tonelaje.',
    impact: 'limits-messaging',
  },
  {
    id: 'dry-van-specs',
    question: '¿Qué medidas tienen las cajas secas (48 ft, 53 ft, otras) y qué capacidad soportan?',
    reason: 'No se confirmaron medidas ni capacidades.',
    currentBehaviour: 'La caja seca se describe por uso, no por medidas ni capacidad.',
    impact: 'limits-messaging',
  },
  {
    id: 'coverage',
    question:
      '¿En qué estados o corredores opera realmente? ¿Hay rutas de alta frecuencia que quiera destacar?',
    reason:
      'El material menciona "rutas nacionales", pero no se confirmó ninguna ruta, estado ni corredor específico.',
    currentBehaviour:
      'La sección de cobertura habla de servicio en rutas nacionales dentro de la República Mexicana, sin nombrar estados, ciudades ni corredores.',
    impact: 'limits-messaging',
  },
  {
    id: 'insurance',
    question: '¿La mercancía viaja con seguro de carga? ¿Con qué cobertura y aseguradora?',
    reason: 'No se confirmó ninguna póliza.',
    currentBehaviour: 'No se menciona seguro en ninguna parte del sitio.',
    impact: 'limits-messaging',
  },
  {
    id: 'gps-monitoring',
    question: '¿Las unidades cuentan con GPS o monitoreo? ¿El cliente puede consultar la ubicación?',
    reason: 'No se confirmó ningún sistema de rastreo ni monitoreo.',
    currentBehaviour:
      'La sección de seguridad habla de comunicación directa durante el traslado, sin mencionar GPS, rastreo satelital ni monitoreo 24/7.',
    impact: 'limits-messaging',
  },
  {
    id: 'certifications',
    question: '¿Romo\'s cuenta con alguna certificación o registro (ISO, OEA, CTPAT, SCT)?',
    reason:
      'Una fotografía muestra un letrero "EMPRESA CERTIFICADA ISO 9001:2015", pero pertenece a la instalación del cliente, no a Romo\'s.',
    currentBehaviour: 'No se menciona ninguna certificación.',
    impact: 'limits-messaging',
  },
  {
    id: 'safety-procedures',
    question:
      '¿Qué procedimientos de seguridad se realizan de forma sistemática: revisión previa al viaje, sujeción de carga, mantenimiento preventivo, planeación de ruta?',
    reason:
      'Las fotografías muestran sujeción con bandas y personal con casco y chaleco, pero eso no confirma un procedimiento formal.',
    currentBehaviour:
      'La sección de seguridad describe únicamente prácticas visibles en el material propio y en términos operativos, sin afirmar protocolos ni certificaciones.',
    impact: 'limits-messaging',
  },
  {
    id: 'operator-qualifications',
    question: '¿Qué capacitación o licencias tienen los operadores?',
    reason: 'No se confirmó ningún programa de capacitación.',
    currentBehaviour:
      'Se habla de "operadores con experiencia en carretera" sin afirmar certificaciones ni programas.',
    impact: 'limits-messaging',
  },
  {
    id: 'services-offered',
    question:
      '¿Romo\'s ofrece efectivamente carga completa, caja seca, plataforma y servicio dedicado? ¿Hay algún servicio que NO deba aparecer?',
    reason:
      'Los tipos de equipo son visibles en las fotografías, pero la oferta comercial la define el propietario.',
    currentBehaviour:
      'Se publican solo transporte nacional, carga completa, caja seca, plataforma y servicio dedicado. No se menciona refrigerado, materiales peligrosos, cruce fronterizo, aduanas, almacenaje, paquetería ni última milla.',
    impact: 'limits-messaging',
  },
  {
    id: 'photo-publication',
    question:
      '¿Autoriza publicar las 14 fotografías incluidas, con los encuadres aplicados, en el sitio público?',
    reason:
      'Las fotografías provienen de material interno compartido por WhatsApp y no de una sesión fotográfica aprobada.',
    currentBehaviour: 'Todas las fotografías están publicadas en el sitio pendiente de esta aprobación.',
    impact: 'blocks-launch',
  },
  {
    id: 'photo-identifiers',
    question:
      '¿Autoriza que sean visibles las placas, los números económicos y los registros USDOT / ICC MC / VIN parcial que aparecen en algunas unidades?',
    reason:
      'En la fotografía nocturna de flota se leen ICCMC, USDOT, CA, VIN parcial y KYU. En otras se ven placas y el número económico 0917.',
    currentBehaviour:
      'No se editó ninguna fotografía. Los identificadores siguen visibles tal como se capturaron.',
    impact: 'blocks-launch',
  },
  {
    id: 'photo-third-parties',
    question:
      '¿Autoriza que aparezcan instalaciones y señalización de terceros al fondo de algunas fotografías?',
    reason:
      'Dos fotografías muestran señalización de una instalación ajena. El sitio no afirma en ningún momento que sean clientes.',
    currentBehaviour:
      'Se aplicaron encuadres que centran la unidad de Romo\'s y reducen la señalización de terceros, sin edición generativa.',
    impact: 'limits-messaging',
  },
  {
    id: 'photo-people',
    question: '¿Autoriza que aparezca personal identificable en dos fotografías?',
    reason:
      'En la fotografía de tubería se alcanza a ver al operador dentro de la cabina; en la de varilla aparece personal de maniobra de espalda.',
    currentBehaviour: 'Las fotografías se publican sin edición.',
    impact: 'blocks-launch',
  },
  {
    id: 'photo-watermark',
    question:
      '¿Existe el original sin la marca de agua de cámara en la fotografía de estructuras metálicas?',
    reason:
      'El original accesible trae la marca "capturada en motorola one" en la esquina inferior izquierda.',
    currentBehaviour:
      'Se recortó el encuadre para excluir la marca. No se aplicó borrado, clonado ni relleno generativo.',
    impact: 'nice-to-have',
  },
  {
    id: 'photo-excluded',
    question:
      '¿Desea publicar la fotografía del patio de operaciones que se dejó fuera por calidad de encuadre?',
    reason:
      'El encuadre está saturado (agua estancada, tarimas sueltas) y la señalización de un tercero es el elemento más legible.',
    currentBehaviour: 'La fotografía no se publica. El archivo original permanece disponible.',
    impact: 'nice-to-have',
  },
  {
    id: 'mission-copy',
    question: '¿Aprueba la redacción final de la sección "Nosotros" y el resto de los textos?',
    reason:
      'La misión original se reescribió en español profesional, sin reproducirla literalmente y sin agregar afirmaciones nuevas.',
    currentBehaviour: 'Se publica la versión reescrita.',
    impact: 'limits-messaging',
  },
  {
    id: 'analytics',
    question: '¿Desea medir conversiones (Cloudflare Web Analytics, GA4 u otra herramienta)?',
    reason: 'No se configuró ninguna herramienta de analítica.',
    currentBehaviour:
      'No se carga ningún script de terceros. Los botones ya emiten un evento `romo:cta` en el DOM, listo para conectar.',
    impact: 'nice-to-have',
  },
];
