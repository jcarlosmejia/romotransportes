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

/** Immediately below the hero. Four claims, all verifiable as practices. */
export const trustPoints: readonly TrustPoint[] = [
  {
    id: 'cobertura',
    title: 'Rutas nacionales',
    description: 'Traslados dentro de la República Mexicana según origen, destino y tipo de carga.',
    icon: 'route',
  },
  {
    id: 'equipo',
    title: 'Plataforma y caja seca',
    description: 'Equipo abierto y cerrado para resolver distintos tipos de mercancía.',
    icon: 'flatbed',
  },
  {
    id: 'atencion',
    title: 'Atención directa',
    description: 'Un mismo contacto desde la cotización hasta la confirmación de entrega.',
    icon: 'headset',
  },
  {
    // Tenure is confirmed (2010), so it earns a slot here. It replaced a
    // "carga completa" tile that duplicated the Servicios section.
    id: 'experiencia',
    title: 'Desde 2010',
    description: 'Operando transporte de carga por carretera en rutas nacionales.',
    icon: 'clock',
  },
];

/** "Por qué Romo's" — operating commitments, not adjectives. */
export const differentiators: readonly { title: string; description: string; icon: IconName }[] = [
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
    title: 'Equipo para distintas cargas',
    description:
      'Plataforma para material y estructura, caja seca para mercancía general. La unidad se asigna según lo que se va a mover.',
    icon: 'truck',
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
  {
    title: 'Manufactura',
    description: 'Insumo de entrada y producto terminado entre planta y centro de distribución.',
  },
  {
    title: 'Materiales y construcción',
    description: 'Estructura, perfil, tubería y varilla que requieren plataforma.',
  },
  {
    title: 'Metalmecánica',
    description: 'Pieza fabricada y estructura que se maniobra con grúa.',
  },
  {
    title: 'Empaque y embalaje',
    description: 'Material de empaque, fardo y paca en volumen.',
  },
  {
    title: 'Comercio y distribución',
    description: 'Mercancía comercial paletizada en caja seca.',
  },
  {
    title: 'Agroindustria',
    description: 'Forraje y producto de campo enfardado y cubierto.',
  },
  {
    title: 'Reciclaje y acopio',
    description: 'Material enfardado y chatarra para centros de acopio y proceso.',
  },
  {
    title: 'Proyectos y obra',
    description: 'Equipo y material de gran dimensión hacia sitio de obra.',
  },
];

/**
 * Coverage.
 *
 * The cities below were confirmed by the owner on 2026-09-17, so they are now
 * named. The list is closed with "y otras rutas nacionales" rather than padded
 * with plausible-sounding corridors: only these were confirmed. The map in
 * `MexicoMap` still draws no route lines or markers — the confirmation was of
 * cities served, not of specific highway corridors or transit times.
 */
export const coverage = {
  title: 'Movemos tu carga por México',
  body: 'Operamos traslados de carga dentro de la República Mexicana, con servicio a las principales ciudades del país. Cada servicio se organiza a partir del punto de origen, el destino y el tipo de mercancía, para definir la unidad y la ruta que corresponden.',
  note: 'Si su ruta requiere una ventana de carga específica o una maniobra particular en origen o destino, indíquelo al solicitar la cotización.',
  bullets: [
    'Servicio a las principales ciudades del país',
    'Rutas definidas por origen, destino y tipo de carga',
    'Viaje largo con operador asignado a la unidad',
    'Coordinación de ventanas de carga y entrega',
  ],
  /** Confirmed destinations. Used by the coverage section and the JSON-LD. */
  cities: [
    { name: 'Culiacán', state: 'Sinaloa' },
    { name: 'Hermosillo', state: 'Sonora' },
    { name: 'Tijuana', state: 'Baja California' },
    { name: 'Tecate', state: 'Baja California' },
    { name: 'León', state: 'Guanajuato' },
    { name: 'Interior de Jalisco', state: 'Jalisco' },
  ],
  /** Shown after the city list so it never reads as an exhaustive map. */
  citiesFootnote: 'y otras rutas nacionales.',
} as const;

/** About / mission — rewritten from the owner's original wording, not copied. */
export const about = {
  overline: "Nosotros",
  title: "Romo's Transportes",
  paragraphs: [
    'Romo\'s Transportes es una empresa mexicana de transporte terrestre de carga. Desde 2010 movemos mercancía de empresas dentro de la República Mexicana con unidades propias, plataformas y cajas secas, de acuerdo con lo que cada embarque necesita.',
    'Trabajamos con una idea simple: la mercancía que nos entregan es responsabilidad nuestra desde que se carga hasta que se confirma la entrega. Eso significa revisar el equipo antes de salir, asegurar la carga como corresponde, mantener las unidades con GPS y seguimiento en ruta, y comunicarnos con el cliente durante el traslado.',
    'Nos interesa la relación de largo plazo más que el viaje aislado. Por eso la atención es directa: quien cotiza es quien da seguimiento, y cuando el equipo o la ruta no son los adecuados para una carga, lo decimos antes de confirmar el servicio.',
  ],
} as const;
