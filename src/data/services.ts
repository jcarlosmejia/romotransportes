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
    kicker: 'Rutas nacionales',
    title: 'Transporte nacional',
    description:
      'Traslado de mercancía dentro de la República Mexicana. Revisamos origen, destino, tipo de carga y fechas para definir la unidad y la ruta que corresponden a cada servicio.',
    points: [
      'Servicio en rutas nacionales',
      'Unidad asignada según el tipo de carga',
      'Seguimiento directo durante el traslado',
    ],
    image: 'romo-forage-load-highway',
  },
  {
    id: 'carga-completa',
    kicker: 'Carga completa · FTL',
    title: 'Carga completa',
    description:
      'La unidad se destina a un solo embarque. Es la opción para volúmenes que ocupan el equipo completo o para mercancía que no debe compartir plataforma ni caja con otros embarques.',
    points: [
      'Una unidad, un embarque',
      'Sin transbordos intermedios',
      'Recolección y entrega directas',
    ],
    image: 'romo-black-flatbed-palletized-load',
  },
  {
    id: 'caja-seca',
    kicker: 'Equipo cerrado',
    title: 'Caja seca',
    description:
      'Para mercancía general que necesita viajar protegida del clima, el polvo y la exposición exterior. Es el equipo habitual para producto paletizado, empaque y mercancía comercial.',
    points: [
      'Mercancía protegida del exterior',
      'Carga y descarga por la parte trasera',
      'Apta para producto paletizado',
    ],
    image: 'romo-purple-dry-van-mountains',
  },
  {
    id: 'plataforma',
    kicker: 'Equipo abierto',
    title: 'Plataforma',
    description:
      'Para materiales, estructuras, tubería, maquinaria y carga de gran dimensión. La plataforma permite cargar y descargar por los costados o por arriba, con grúa o montacargas, y sujetar la carga con bandas y cadenas.',
    points: [
      'Carga lateral y superior',
      'Materiales, estructuras y maquinaria',
      'Sujeción con bandas y cadenas',
    ],
    image: 'romo-steel-structures-flatbed',
  },
  {
    id: 'dedicado',
    kicker: 'Operación recurrente',
    title: 'Servicio dedicado',
    description:
      'Cuando el movimiento se repite, la operación se planea en conjunto: frecuencia, rutas, ventanas de carga y el tipo de equipo que conviene mantener disponible para su operación.',
    points: [
      'Planeación por frecuencia y ruta',
      'Equipo definido con anticipación',
      'Un mismo contacto para toda la operación',
    ],
    image: 'romo-purple-flatbed-steel-pipes-warehouse',
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
