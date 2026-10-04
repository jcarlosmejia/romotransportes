/**
 * @description Commercial services. Only equipment and service types that are
 * visible in Romo's own photography and consistent with the brief are listed.
 *
 * Deliberately ABSENT until the owner confirms them: transporte refrigerado,
 * materiales peligrosos, cruce fronterizo, agencia aduanal, almacenaje,
 * carga fraccionada (LTL), paquetería y última milla.
 */

import type { ImageSlug } from './imageManifest';

export type Service = {
  id: string;
  /** Short technical label used in the card eyebrow. */
  kicker: string;
  title: string;
  description: string;
  /** Concrete, non-promissory bullets. */
  points: readonly string[];
  image: ImageSlug | null;
};

export const services: readonly Service[] = [
  {
    id: 'transporte-nacional',
    kicker: 'Desde Guadalajara',
    title: 'Fletes nacionales desde Guadalajara',
    description:
      'Cargamos en la Zona Metropolitana de Guadalajara y el interior de Jalisco y movemos tu mercancía a cualquier destino del país, con experiencia especial en el Pacífico y el Norte.',
    points: [
      'Rutas locales, semiforáneas y foráneas',
      'Caja seca o plataforma según la carga',
      'GPS y seguimiento durante el traslado',
    ],
    image: 'romo-forage-load-highway',
  },
  {
    id: 'carga-completa',
    kicker: 'FTL',
    title: 'Carga completa',
    description:
      'Una unidad dedicada a tu embarque, sin transbordos ni carga compartida. Recolección y entrega directas.',
    points: ['Una unidad, un embarque', 'Sin transbordos intermedios'],
    image: null,
  },
  {
    id: 'recurrente',
    kicker: 'Operación programada',
    title: 'Servicio recurrente',
    description:
      'Para movimientos que se repiten: entre plantas, de proveedor a planta o a CEDIS. Planeamos frecuencia, ventanas de carga y equipo disponible.',
    points: ['Planeación por frecuencia y ruta', 'Un mismo contacto para la operación'],
    image: null,
  },
  {
    id: 'spot',
    kicker: 'Viaje único',
    title: 'Servicio spot',
    description:
      'Para embarques puntuales o urgentes. Envíanos origen, destino y tipo de carga y te confirmamos unidad y tarifa.',
    points: ['Cotización por embarque', 'Caja seca o plataforma'],
    image: null,
  },
  {
    id: 'carga-pesada',
    kicker: 'Carga industrial',
    title: 'Carga pesada e industrial',
    description:
      'Acero, estructura, maquinaria y material de construcción en plataforma, con maniobra y sujeción según la carga. Capacidad sujeta a configuración.',
    points: ['Maniobra con grúa o montacargas', 'Sujeción con bandas y cadenas'],
    image: null,
  },
];

/** Cargo categories Romo's equipment can physically handle. */
export const cargoTypes: readonly { title: string; description: string }[] = [
  {
    title: 'Mercancía general',
    description: 'Producto comercial y de consumo que viaja protegido en caja seca.',
  },
  {
    title: 'Carga paletizada',
    description: 'Tarima estándar para carga y descarga con montacargas.',
  },
  {
    title: 'Materiales e insumos industriales',
    description: 'Material para planta, obra y proceso productivo.',
  },
  {
    title: 'Estructuras y perfiles metálicos',
    description: 'Estructura fabricada, perfil y placa que requieren plataforma.',
  },
  {
    title: 'Tubería y varilla',
    description: 'Carga larga que se maniobra con grúa y se sujeta con bandas.',
  },
  {
    title: 'Empaque y material enfardado',
    description: 'Fardo y paca, incluyendo material para reciclaje y acopio.',
  },
  {
    title: 'Carga agrícola enfardada',
    description: 'Forraje y producto de campo enfardado, cubierto para su traslado.',
  },
  {
    title: 'Carga de gran dimensión',
    description: 'Piezas que exceden el ancho o la altura de un equipo cerrado.',
  },
];
