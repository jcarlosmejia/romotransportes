/**
 * @description Remaining editorial content: trust strip, differentiators,
 * safety, coverage, process and industries.
 *
 * Tone rules applied throughout: no superlatives, no rankings, no guarantees,
 * no numbers that have not been confirmed. Every claim describes an operating
 * practice rather than an outcome the company cannot control.
 */


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
  'Rutas Pacífico y Norte',
];

/**
 * Operational highlights under the hero. Every figure is owner-confirmed
 * (2026-10-04 brief): year, trailer lengths, platform length, the reference
 * capacity range (always shown with its disclaimer nearby) and the corridors
 * drawn on the map. No fleet counts, trip totals or on-time percentages.
 */
export const highlights: readonly { value: string; label: string; detail: string }[] = [
  { value: '2010', label: 'Operando desde', detail: 'Transporte de carga por carretera' },
  { value: "48' · 53'", label: 'Caja seca', detail: 'Carga completa, sin transbordos' },
  { value: "40'+", label: 'Plataforma tipo plana', detail: 'Acero, estructura y maquinaria' },
  { value: '10–35 t', label: 'Capacidad de referencia', detail: 'Sujeta a configuración y unidad' },
  { value: '3', label: 'Corredores frecuentes', detail: 'Pacífico · Norte · Noreste' },
];

/** "Por qué Romo's" — operating commitments, not adjectives. */
export const differentiators: readonly { title: string; description: string; icon: IconName }[] = [
  {
    title: 'Base operativa en Guadalajara',
    description:
      'Cargamos en la Zona Metropolitana de Guadalajara y el interior de Jalisco y salimos directo a ruta, sin escalas por patios de terceros.',
    icon: 'map',
  },
  {
    title: 'Hablas con quien opera',
    description:
      'Sin intermediarios: la persona que te cotiza es la que asigna la unidad y da seguimiento al viaje.',
    icon: 'headset',
  },
  {
    title: 'La unidad adecuada para tu carga',
    description:
      'Caja seca o plataforma según peso, dimensiones y maniobra. Si nuestro equipo no es el indicado, te lo decimos antes de confirmar.',
    icon: 'clipboard',
  },
  {
    title: 'GPS y seguimiento en ruta',
    description:
      'Unidades con GPS y comunicación con la operación durante el traslado; te avisamos al confirmar la entrega.',
    icon: 'radio',
  },
  {
    title: 'Experiencia en el Pacífico y el Norte',
    description:
      'Corredores frecuentes hacia Sinaloa, Sonora, Baja California, Chihuahua, Coahuila y Nuevo León desde Guadalajara.',
    icon: 'route',
  },
  {
    title: 'Spot o recurrente',
    description:
      'Atendemos el viaje urgente y también la operación programada entre plantas, proveedores y CEDIS.',
    icon: 'truck',
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
/** Sectors served, with the equipment that usually fits each. Capability, not client claims. */
export const industries: readonly {
  title: string;
  description: string;
  equipment: 'Caja seca' | 'Plataforma' | 'Caja seca o plataforma';
}[] = [
  { title: 'Acero y metalmecánica', description: 'Perfil, placa, tubería, varilla y estructura fabricada.', equipment: 'Plataforma' },
  { title: 'Construcción', description: 'Material de obra y estructura hacia sitio o almacén.', equipment: 'Plataforma' },
  { title: 'Maquinaria y equipo', description: 'Equipo industrial, evaluado por peso y dimensiones.', equipment: 'Plataforma' },
  { title: 'Manufactura', description: 'Materia prima de entrada y producto terminado entre plantas.', equipment: 'Caja seca o plataforma' },
  { title: 'Distribución y CEDIS', description: 'Mercancía paletizada de planta a centro de distribución.', equipment: 'Caja seca' },
  { title: 'Insumos industriales', description: 'Refacciones e insumos para planta, en servicio recurrente.', equipment: 'Caja seca' },
  { title: 'Empaque y embalaje', description: 'Material de empaque, fardo y paca en volumen.', equipment: 'Caja seca o plataforma' },
  { title: 'Agroindustria y reciclaje', description: 'Producto enfardado y material de acopio, cubierto en ruta.', equipment: 'Plataforma' },
];

/**
 * Coverage. Guadalajara is the hub; the Pacific / Northern corridor is where the
 * operation has the most road experience (owner brief 2026-10-04). Copy says
 * "rutas frecuentes y cobertura nacional", never "únicamente operamos".
 */
export const coverage = {
  title: 'Corredores del Pacífico y Norte desde Guadalajara',
  body: 'Operamos fletes desde Guadalajara hacia el Pacífico y el Norte de México: Tepic, Mazatlán, Culiacán, Sonora y Baja California por la costa, y Chihuahua, Coahuila y Nuevo León por el centro-norte. Fuera de estos corredores también movemos carga a otros estados según el requerimiento de cada operación.',
  note: '¿Tu ruta no aparece en el mapa? También la cotizamos. Indícanos origen, destino y ventana de carga.',
  /** Corridors as drawn on the map. Also the semantic HTML that describes it. */
  corridors: [
    {
      id: 'pacifico',
      name: 'Corredor Pacífico',
      states: 'Nayarit, Sinaloa, Sonora y Baja California',
      stops: ['Tepic', 'Mazatlán', 'Culiacán', 'Ciudad Obregón', 'Hermosillo', 'Tijuana', 'Tecate'],
    },
    {
      id: 'norte',
      name: 'Corredor Norte',
      states: 'Coahuila y Chihuahua',
      stops: ['Torreón', 'Chihuahua', 'Ciudad Juárez'],
    },
    {
      id: 'noreste',
      name: 'Corredor Noreste',
      states: 'Coahuila y Nuevo León',
      stops: ['Saltillo', 'Monterrey'],
    },
    {
      id: 'occidente',
      name: 'Jalisco y Bajío',
      states: 'Jalisco y Guanajuato',
      stops: ['Interior de Jalisco', 'León'],
    },
  ],
  /** Frequent destinations (used for `areaServed` in structured data). */
  cities: [
    { name: 'Tepic', state: 'Nayarit' },
    { name: 'Mazatlán', state: 'Sinaloa' },
    { name: 'Culiacán', state: 'Sinaloa' },
    { name: 'Ciudad Obregón', state: 'Sonora' },
    { name: 'Hermosillo', state: 'Sonora' },
    { name: 'Tijuana', state: 'Baja California' },
    { name: 'Tecate', state: 'Baja California' },
    { name: 'Torreón', state: 'Coahuila' },
    { name: 'Saltillo', state: 'Coahuila' },
    { name: 'Chihuahua', state: 'Chihuahua' },
    { name: 'Ciudad Juárez', state: 'Chihuahua' },
    { name: 'Monterrey', state: 'Nuevo León' },
    { name: 'León', state: 'Guanajuato' },
  ],
} as const;

/** About / mission — rewritten from the owner's original wording, not copied. */
export const about = {
  overline: "Nosotros · Desde 2010",
  title: "Por qué elegir Romo's Transportes",
  paragraphs: [
    "Romo's Transportes es una empresa transportista mexicana con base en Guadalajara, Jalisco. Desde 2010 movemos carga comercial e industrial con unidades propias: cajas secas de 48 y 53 pies y plataformas tipo plana.",
    'Para las empresas que buscan un proveedor de transporte confiable, eso significa una cosa: la carga es responsabilidad nuestra desde que se sube a la unidad hasta que se confirma la entrega, y quien cotiza es quien da seguimiento.',
  ],
} as const;
