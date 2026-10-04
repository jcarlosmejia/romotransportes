/**
 * @description Remaining editorial content: trust strip, differentiators,
 * safety, coverage, process and industries.
 *
 * Tone rules applied throughout: no superlatives, no rankings, no guarantees,
 * no numbers that have not been confirmed. Every claim describes an operating
 * practice rather than an outcome the company cannot control.
 */

export type TrustPoint = { id: string; title: string; description: string; icon: IconName };

export type IconName =
  | 'route'
  | 'truck'
  | 'flatbed'
  | 'dryvan'
  | 'shield'
  | 'helmet'
  | 'headset'
  | 'clipboard'
  | 'straps'
  | 'wrench'
  | 'radio'
  | 'map'
  | 'box'
  | 'clock'
  | 'check'
  | 'whatsapp'
  | 'phone'
  | 'mail'
  | 'quote'
  | 'arrow';

/**
 * Hero capability row. The five facts a logistics buyer checks before reading
 * anything else: where, what equipment, how it is tracked, how far.
 */
export const heroCapabilities: readonly string[] = [
  'Base Guadalajara',
  "Caja seca 48' y 53'",
  "Plataforma 40'+",
  'GPS y seguimiento',
  'Cobertura nacional',
];

/**
 * Credibility strip below the hero. Does not repeat the hero row: these are the
 * trust facts (tenure, own fleet, insurance, direct attention).
 */
export const trustPoints: readonly TrustPoint[] = [
  {
    id: 'experiencia',
    title: 'Desde 2010',
    description: 'Operando transporte de carga por carretera desde Guadalajara.',
    icon: 'clock',
  },
  {
    id: 'unidades',
    title: 'Unidades propias',
    description: 'Tractocamiones, cajas secas y plataformas en operación directa.',
    icon: 'truck',
  },
  {
    id: 'seguro',
    title: 'Seguro de carga',
    description: 'Cobertura confirmada por embarque según mercancía y valor declarado.',
    icon: 'shield',
  },
  {
    id: 'atencion',
    title: 'Atención directa',
    description: 'Un mismo contacto desde la tarifa hasta la confirmación de entrega.',
    icon: 'headset',
  },
];

/** "Por qué Romo's" — operating commitments, not adjectives. */
export const differentiators: readonly { title: string; description: string; icon: IconName }[] = [
  {
    title: 'Origen en Guadalajara',
    description:
      'Base operativa en la Zona Metropolitana de Guadalajara: cargamos en la ZMG y en el interior de Jalisco y salimos directo a ruta.',
    icon: 'map',
  },
  {
    title: 'Hablas con quien opera',
    description:
      'No hay intermediarios entre su solicitud y la operación. La persona que cotiza es la que da seguimiento al viaje.',
    icon: 'headset',
  },
  {
    title: 'Cada traslado se planea',
    description:
      'Antes de confirmar revisamos origen, destino, dimensiones, peso, maniobra de carga y fechas. Si el equipo no es el adecuado, lo decimos.',
    icon: 'clipboard',
  },
  {
    title: 'La carga se asegura para viajar',
    description:
      'La sujeción se hace de acuerdo con el tipo de mercancía: bandas, cadenas y cubierta cuando la carga lo requiere.',
    icon: 'straps',
  },
  {
    title: 'Comunicación durante la ruta',
    description:
      'Contacto directo con la operación mientras la unidad está en camino y aviso al confirmar la entrega.',
    icon: 'radio',
  },
  {
    title: 'Experiencia en carretera desde 2010',
    description:
      'Operamos transporte de carga por carretera desde 2010, con operadores con experiencia en viaje largo y en las maniobras que exige la carga en plataforma.',
    icon: 'route',
  },
];

/**
 * Safety.
 *
 * Cargo insurance, GPS and in-transit monitoring were authorised by the owner on
 * 2026-09-17 and are now stated — but only at the level that was actually
 * confirmed. Still deliberately absent: a named insurer, coverage amounts,
 * "monitoreo 24/7", a control centre, a customer-facing tracking portal, and any
 * named certification. Those remain open in `pendingVerification`
 * (`insurance-detail`, `monitoring-detail`, `certifications`) because
 * authorisation to mention a capability is not the same as knowing its terms.
 */
export const safetyPractices: readonly { title: string; description: string; icon: IconName }[] = [
  {
    title: 'Revisión antes de salir',
    description:
      'La unidad y el equipo se revisan antes de iniciar el viaje: llantas, luces, conexiones y estado del piso de la plataforma.',
    icon: 'wrench',
  },
  {
    title: 'Sujeción según la carga',
    description:
      'La maniobra de amarre se ajusta al tipo de mercancía. Estructura y tubería se aseguran con bandas y cadenas; la carga que lo requiere viaja cubierta.',
    icon: 'straps',
  },
  {
    title: 'Maniobra con personal equipado',
    description:
      'El personal que participa en la carga y descarga trabaja con el equipo de protección que corresponde a la maniobra.',
    icon: 'helmet',
  },
  {
    title: 'Ruta definida antes de confirmar',
    description:
      'La ruta se define considerando distancia, tipo de carga y las ventanas de carga y entrega acordadas.',
    icon: 'map',
  },
  {
    title: 'Mercancía con seguro de carga',
    description:
      'La carga viaja asegurada. La cobertura que aplica a cada embarque se confirma al cotizar, según la mercancía y su valor declarado.',
    icon: 'shield',
  },
  {
    title: 'Unidades con GPS y monitoreo',
    description:
      'Las unidades cuentan con GPS y damos seguimiento a la unidad mientras está en ruta, para poder informar la situación del viaje.',
    icon: 'radio',
  },
  {
    title: 'Contacto durante el traslado',
    description:
      'Comunicación directa con la operación mientras la mercancía está en camino, para resolver cualquier cambio.',
    icon: 'headset',
  },
  {
    title: 'Confirmación de entrega',
    description: 'Al concluir el servicio confirmamos la entrega con quien solicitó el traslado.',
    icon: 'check',
  },
];

/**
 * Commercial process. Six steps, each phrased as something the company
 * actually does rather than a promise about timing.
 */
export const processSteps: readonly { title: string; description: string }[] = [
  {
    title: 'Nos cuenta qué necesita mover',
    description: 'Tipo de mercancía, volumen aproximado y en qué fechas necesita el servicio.',
  },
  {
    title: 'Revisamos origen y destino',
    description: 'Ubicaciones, accesos, horarios de carga y si hay maniobra especial en alguno de los puntos.',
  },
  {
    title: 'Definimos la unidad adecuada',
    description: 'Plataforma o caja seca, según dimensiones, peso y la forma en que se va a cargar.',
  },
  {
    title: 'Le enviamos la cotización',
    description: 'Con el servicio y el equipo que corresponden a lo que se va a mover.',
  },
  {
    title: 'Programamos y ejecutamos el traslado',
    description: 'Se asigna la unidad, se realiza la carga y la mercancía sale a ruta.',
  },
  {
    title: 'Confirmamos la entrega',
    description: 'Le avisamos al concluir el servicio en el punto de destino.',
  },
];

/** Sectors the equipment can serve. Framed as capability, never as a client list. */
export const industries: readonly { title: string; description: string }[] = [
  { title: 'Acero y metalmecánica', description: 'Perfil, placa, tubería, varilla y estructura fabricada.' },
  { title: 'Construcción y materiales', description: 'Material de obra y estructura hacia sitio o almacén.' },
  { title: 'Manufactura', description: 'Materia prima de entrada y producto terminado entre plantas.' },
  { title: 'Maquinaria y equipo', description: 'Maquinaria en plataforma, sujeta a evaluación de dimensiones.' },
  { title: 'Distribución y CEDIS', description: 'Mercancía paletizada en caja seca, planta–CEDIS.' },
  { title: 'Empaque y embalaje', description: 'Material de empaque, fardo y paca en volumen.' },
  { title: 'Proveedores industriales', description: 'Insumos y refacciones para planta, servicio recurrente.' },
  { title: 'Agroindustria y reciclaje', description: 'Producto enfardado y material para acopio, cubierto.' },
];

/**
 * Coverage. Guadalajara is the hub; the Pacific / Northern corridor is where the
 * operation has the most road experience (owner brief 2026-10-04). Copy says
 * "rutas frecuentes y cobertura nacional", never "únicamente operamos".
 */
export const coverage = {
  title: 'Rutas del Pacífico y Norte desde Guadalajara',
  body: 'Salimos desde la Zona Metropolitana de Guadalajara. Tenemos experiencia especialmente en el corredor del Pacífico y el Norte del país, y damos servicio a cualquier destino nacional según la carga y la fecha.',
  note: '¿Tu ruta no aparece en el mapa? También la cotizamos. Indícanos origen, destino y ventana de carga.',
  bullets: [
    'Origen en Guadalajara, Jalisco y su zona metropolitana',
    'Rutas locales, semiforáneas y foráneas',
    'Corredor del Pacífico y Norte de México',
    'Cobertura nacional bajo cotización',
  ],
  /** Frequent destinations, in corridor order from Guadalajara. */
  cities: [
    { name: 'Tepic', state: 'Nayarit' },
    { name: 'Mazatlán', state: 'Sinaloa' },
    { name: 'Culiacán', state: 'Sinaloa' },
    { name: 'Ciudad Obregón', state: 'Sonora' },
    { name: 'Hermosillo', state: 'Sonora' },
    { name: 'Tijuana', state: 'Baja California' },
    { name: 'Tecate', state: 'Baja California' },
    { name: 'León', state: 'Guanajuato' },
    { name: 'Interior de Jalisco', state: 'Jalisco' },
  ],
  citiesFootnote: 'y cobertura nacional.',
} as const;

/** About / mission — rewritten from the owner's original wording, not copied. */
export const about = {
  overline: "Nosotros · Desde 2010",
  title: "Por qué elegir Romo's Transportes",
  paragraphs: [
    'Romo\'s Transportes es una empresa mexicana de transporte terrestre de carga. Desde 2010 operamos desde Guadalajara, Jalisco, moviendo mercancía comercial e industrial a todo México con unidades propias, cajas secas de 48 y 53 pies y plataformas tipo plana.',
    'Trabajamos con una idea simple: la mercancía que nos entregan es responsabilidad nuestra desde que se carga hasta que se confirma la entrega. Eso significa revisar el equipo antes de salir, asegurar la carga como corresponde, mantener las unidades con GPS y seguimiento en ruta, y comunicarnos con el cliente durante el traslado.',
    'Nos interesa la relación de largo plazo más que el viaje aislado. Por eso la atención es directa: quien cotiza es quien da seguimiento, y cuando el equipo o la ruta no son los adecuados para una carga, lo decimos antes de confirmar el servicio.',
  ],
} as const;
