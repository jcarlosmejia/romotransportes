/**
 * @description Equipment presented on the site.
 *
 * FACTUAL RULE APPLIED HERE
 * -------------------------
 * `specs` may only contain attributes that are *directly countable in Romo's
 * own photographs* (for example: a three-axle platform — the three axles are
 * visible). Anything that requires a document or the owner's word — payload
 * capacity, trailer length, suspension type, unit counts, model years — stays
 * in `pendingSpecs` and is NEVER rendered. The source material mentioned
 * "tres ejes, suspensión de aire, 36 toneladas"; only the axle count survives
 * that test.
 */

import type { ImageSlug } from './imageManifest';

export type FleetItem = {
  id: string;
  title: string;
  /** What this equipment is used for, in operational terms. */
  description: string;
  /** Observable attributes only. */
  specs: readonly string[];
  /** Attributes withheld pending owner confirmation (never rendered). */
  pendingSpecs: readonly string[];
  image: ImageSlug;
};

export const fleet: readonly FleetItem[] = [
  {
    id: 'tractocamiones',
    title: 'Tractocamiones',
    description:
      'Las unidades motrices que jalan el equipo. Operan tanto con plataforma como con caja seca, según lo que requiera el embarque, y son la base de cada servicio en ruta.',
    specs: ['Unidades tipo tractocamión', 'Cabina dormitorio para viaje largo', 'Operan plataforma y caja seca'],
    pendingSpecs: ['Cantidad de unidades', 'Marcas y años de modelo', 'Potencia y configuración de ejes'],
    image: 'romo-purple-flatbed-facility-wide',
  },
  {
    id: 'plataformas',
    title: 'Plataformas',
    description:
      'Equipo abierto para material, estructura, tubería y carga de gran dimensión. Permite maniobrar con grúa o montacargas por los costados y por arriba, y asegurar la carga con bandas y cadenas.',
    specs: ['Plataforma de tres ejes', 'Carga lateral y superior', 'Sujeción con bandas y cadenas'],
    pendingSpecs: [
      'Capacidad máxima de carga (el material de origen menciona 36 t, sin confirmar)',
      'Tipo de suspensión (el material de origen menciona suspensión de aire, sin confirmar)',
      'Longitud de la plataforma',
    ],
    // Deliberately NOT another crop of the tractor portrait above: the two cards
    // sit side by side, and two framings of one photograph read as a mistake.
    // This frame also shows what a platform is actually for.
    image: 'romo-steel-structures-flatbed',
  },
  {
    id: 'cajas-secas',
    title: 'Cajas secas',
    description:
      'Equipo cerrado para mercancía que debe viajar protegida del clima y del polvo. Es la opción habitual para producto paletizado, empaque y mercancía comercial.',
    specs: ['Caja cerrada', 'Carga y descarga por la parte trasera', 'Mercancía protegida del exterior'],
    pendingSpecs: [
      'Medidas de caja (48 ft / 53 ft u otras)',
      'Capacidad de carga',
      'Cantidad de cajas en operación',
    ],
    image: 'romo-purple-dry-van-mountains',
  },
];
