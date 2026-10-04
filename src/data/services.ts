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
