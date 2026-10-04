/**
 * @description Equipment, presented as two equal-weight offers.
 *
 * Owner brief 2026-10-04 confirmed: caja seca 48' and 53', plataforma tipo
 * plana from 40'. Flatbed is deliberately NOT secondary to dry van — the two
 * cards share one component and one layout.
 *
 * Capacity is published only as ranges "según configuración", never as a hard
 * legal maximum: payload depends on tractor/trailer configuration, axle count
 * and the road class under NOM-012-SCT-2. See `capacity` and
 * docs/content-verification.md (`platform-specs`).
 */

import type { ImageSlug } from './imageManifest';

export type EquipmentCard = {
  id: 'caja-seca' | 'plataforma';
  kicker: string;
  title: string;
  description: string;
  /** What this equipment is for. */
  uses: readonly string[];
  /** How the load is handled. */
  handling: readonly string[];
  image: ImageSlug;
  /** Equipment landing page and its descriptive anchor text. */
  href: string;
  linkText: string;
};

export const equipment: readonly EquipmentCard[] = [
  {
    id: 'caja-seca',
    href: '/caja-seca-48-53-pies/',
    linkText: "Ver fletes en caja seca 48' y 53'",
    kicker: 'Equipo cerrado',
    title: "Caja seca 48' y 53'",
    description:
      'Para mercancía que debe viajar protegida del clima y el polvo. Carga completa (FTL) de planta a CEDIS, de proveedor a planta o a distribución.',
    uses: [
      'Mercancía general y comercial',
      'Carga paletizada',
      'Materia prima e insumos industriales',
      'Producto terminado',
      'Empaque y embalaje',
      'Distribución planta–CEDIS',
    ],
    handling: ['Carga y descarga trasera', 'Servicio spot o recurrente'],
    image: 'romo-purple-dry-van-mountains',
  },
  {
    id: 'plataforma',
    href: '/plataforma-carga-pesada/',
    linkText: 'Ver transporte en plataforma y carga pesada',
    kicker: 'Equipo abierto',
    title: "Plataforma tipo plana 40'+",
    description:
      'Para carga larga, pesada o de gran dimensión que se maniobra por los costados o por arriba, con grúa o montacargas, y se asegura según el tipo de carga.',
    uses: [
      'Acero, perfiles y placa',
      'Tubería y varilla',
      'Estructuras metálicas',
      'Maquinaria y equipo',
      'Material para construcción',
      'Sobredimensionada, sujeta a evaluación',
    ],
    handling: ['Carga lateral y superior', 'Sujeción con bandas y cadenas'],
    image: 'romo-steel-structures-flatbed',
  },
];

/**
 * Weight positioning. Ranges, not a legal maximum. The disclaimer is rendered
 * next to the numbers, every time, by design.
 */
export const capacity = {
  title: 'Desde 10 toneladas hasta carga pesada',
  points: [
    { value: '10 t', label: 'Movimientos industriales' },
    { value: '15 t', label: 'Carga comercial e industrial' },
    { value: '35 t', label: 'Carga pesada en plataforma' },
  ],
  disclaimer:
    'Capacidad sujeta a configuración del equipo, dimensiones de la carga, unidad asignada y regulación de pesos y dimensiones aplicable a la ruta.',
  image: 'romo-purple-flatbed-facility-wide' as ImageSlug,
} as const;
