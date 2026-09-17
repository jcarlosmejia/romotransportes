/**
 * @description Quote-request shape, validation and message formatting.
 *
 * The site is a static export with no backend, so the quote form's delivery
 * path is fully client-side: it validates the input, formats a readable Spanish
 * message and hands it to WhatsApp (or the clipboard when no verified WhatsApp
 * number exists yet). This is a real conversion path, not a decorative form.
 */

export type QuoteFields = {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  origen: string;
  destino: string;
  mercancia: string;
  unidad: string;
  fecha: string;
  peso: string;
  mensaje: string;
};

export const emptyQuote: QuoteFields = {
  nombre: '',
  empresa: '',
  telefono: '',
  email: '',
  origen: '',
  destino: '',
  mercancia: '',
  unidad: '',
  fecha: '',
  peso: '',
  mensaje: '',
};

/** Only what is genuinely needed to answer a quote is required. */
export const requiredFields = ['nombre', 'telefono', 'origen', 'destino', 'mercancia'] as const;
export type RequiredField = (typeof requiredFields)[number];

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

export const unidadOptions = [
  { value: '', label: 'No estoy seguro / me ayudan a definirlo' },
  { value: 'Caja seca', label: 'Caja seca' },
  { value: 'Plataforma', label: 'Plataforma' },
  { value: 'Carga completa', label: 'Carga completa' },
  { value: 'Servicio dedicado o recurrente', label: 'Servicio dedicado o recurrente' },
] as const;

/**
 * A pragmatic email check: exactly one `@`, a dot-bearing domain, no spaces.
 * Intentionally not an RFC 5322 parser — the goal is to catch typos without
 * rejecting valid addresses.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Mexican phone numbers are 10 digits; international forms may carry a country
 * code. Accept 10–15 digits after stripping separators.
 */
function digitCount(value: string): number {
  return value.replace(/\D/g, '').length;
}

/**
 * @description Validates a quote request.
 * @param fields The current form values.
 * @returns A map of field name to Spanish error message; empty when valid.
 */
export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!fields.nombre.trim()) {
    errors.nombre = 'Indique su nombre para poder dirigirnos a usted.';
  }

  const phoneDigits = digitCount(fields.telefono);
  if (!fields.telefono.trim()) {
    errors.telefono = 'Necesitamos un teléfono para darle seguimiento.';
  } else if (phoneDigits < 10 || phoneDigits > 15) {
    errors.telefono = 'Escriba un teléfono a 10 dígitos (o con clave del país).';
  }

  if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim())) {
    errors.email = 'Revise el correo: parece incompleto.';
  }

  if (!fields.origen.trim()) errors.origen = 'Indique la ciudad o el punto de origen.';
  if (!fields.destino.trim()) errors.destino = 'Indique la ciudad o el punto de destino.';

  if (!fields.mercancia.trim()) {
    errors.mercancia = 'Describa brevemente qué mercancía va a mover.';
  }

  return errors;
}

/** Field order and labels used in the generated message. */
const MESSAGE_ROWS: readonly [keyof QuoteFields, string][] = [
  ['nombre', 'Nombre'],
  ['empresa', 'Empresa'],
  ['telefono', 'Teléfono'],
  ['email', 'Correo'],
  ['origen', 'Origen'],
  ['destino', 'Destino'],
  ['mercancia', 'Mercancía'],
  ['peso', 'Peso aproximado'],
  ['unidad', 'Tipo de unidad'],
  ['fecha', 'Fecha estimada'],
  ['mensaje', 'Comentarios'],
];

/**
 * @description Formats a quote request as a readable WhatsApp message.
 * @param fields The validated form values.
 * @returns A plain-text message; empty optional fields are omitted entirely.
 */
export function buildQuoteMessage(fields: QuoteFields): string {
  const lines = MESSAGE_ROWS.map(([key, label]) => {
    const value = fields[key].trim();
    return value ? `${label}: ${value}` : null;
  }).filter((line): line is string => line !== null);

  return [
    "Hola, me gustaría solicitar una cotización con Romo's Transportes.",
    '',
    ...lines,
  ].join('\n');
}

/** Short message for the header / hero "cotizar por WhatsApp" shortcuts. */
export const quickWhatsAppMessage =
  "Hola, me gustaría solicitar una cotización de transporte con Romo's Transportes.";
