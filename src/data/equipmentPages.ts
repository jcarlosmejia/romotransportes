/**
 * @description Content for the two equipment landing pages.
 *
 * Each page answers what a freight buyer searching "caja seca Guadalajara" or
 * "transporte en plataforma" needs before asking for a rate: what the unit
 * carries, how it is loaded, where it goes, and what to send for a quote.
 * Everything here is owner-confirmed (2026-10-04) or a direct restatement of
 * the home page. No pallet counts, legal weight limits, permits or
 * certifications — those are pending (see `pendingVerification`).
 */

import type { ImageSlug } from './imageManifest';

export type EquipmentPage = {
  slug: string;
  /** `<title>` — unique per page. */
  metaTitle: string;
  metaDescription: string;
  breadcrumb: string;
  overline: string;
  h1: string;
  lede: string;
  heroImage: ImageSlug;
  heroCaption: string;
  whatsappMessage: string;
  cargo: { title: string; items: readonly string[] };
  details: readonly { title: string; body: string }[];
  faqs: readonly { question: string; answer: string }[];
  /** Cross-link to the other equipment page. */
  related: { href: string; text: string };
};

export const equipmentPages: readonly EquipmentPage[] = [
  {
    slug: 'caja-seca-48-53-pies',
    metaTitle: 'Caja Seca 48 y 53 Pies en Guadalajara',
    metaDescription:
      "Fletes en caja seca de 48 y 53 pies desde Guadalajara: carga completa (FTL) para mercancía general, paletizada y producto terminado, en servicio spot o recurrente.",
    breadcrumb: 'Caja seca',
    overline: 'Equipo cerrado · Unidades propias',
    h1: 'Fletes en caja seca de 48 y 53 pies desde Guadalajara',
    lede:
      'Carga completa en equipo cerrado: tu mercancía viaja protegida del clima y del polvo, sin transbordos, desde la Zona Metropolitana de Guadalajara hacia el Pacífico, el Norte y el resto del país.',
    heroImage: 'romo-purple-dry-van-mountains',
    heroCaption: 'Tractocamión con caja seca en carretera de montaña.',
    whatsappMessage:
      'Hola, quiero cotizar un flete en caja seca.\nOrigen: \nDestino: \nTipo de carga: \nPeso aproximado: ',
    cargo: {
      title: 'Qué movemos en caja seca',
      items: [
        'Mercancía general',
        'Mercancía paletizada',
        'Producto terminado',
        'Insumos y materia prima empacada',
        'Refacciones y material para planta',
        'Distribución de planta a CEDIS',
        'Material de empaque',
        'Carga que no debe mojarse ni ensuciarse',
      ],
    },
    details: [
      {
        title: '48 o 53 pies',
        body: 'La medida se define por el volumen y el acomodo de tu embarque. Con las dimensiones y el número de tarimas te recomendamos la caja adecuada; no necesitas decidirlo antes de cotizar.',
      },
      {
        title: 'Carga completa (FTL)',
        body: 'Una unidad dedicada a tu embarque: recolección y entrega directas, sin compartir espacio ni hacer transbordos intermedios.',
      },
      {
        title: 'Spot o recurrente',
        body: 'Atendemos el viaje único o urgente y también la operación programada entre plantas, proveedores y centros de distribución, con un mismo contacto para la operación.',
      },
      {
        title: 'Carga y seguimiento',
        body: 'La caja se carga por la parte trasera, en andén o con montacargas. Las unidades cuentan con GPS y la mercancía viaja con seguro de carga; las condiciones se confirman al cotizar.',
      },
    ],
    faqs: [
      {
        question: '¿Cuántas tarimas caben en la caja?',
        answer:
          'Depende de la medida de la caja, del tamaño de la tarima y de si se puede estibar. Indícanos dimensiones y cantidad y te confirmamos la unidad.',
      },
      {
        question: '¿Pueden hacer viajes recurrentes en caja seca?',
        answer:
          'Sí. Planeamos frecuencia, ventanas de carga y el equipo disponible para movimientos que se repiten.',
      },
      {
        question: '¿Desde dónde cargan?',
        answer:
          'Desde la Zona Metropolitana de Guadalajara y el interior de Jalisco, hacia cualquier destino nacional.',
      },
    ],
    related: {
      href: '/plataforma-carga-pesada/',
      text: '¿Tu carga es larga, pesada o se maniobra con grúa? Conoce el transporte en plataforma',
    },
  },
  {
    slug: 'plataforma-carga-pesada',
    metaTitle: 'Transporte en Plataforma y Carga Pesada',
    metaDescription:
      'Fletes en plataforma tipo plana de 40 pies en adelante desde Guadalajara para acero, tubería, estructura, maquinaria y material de construcción. Cotiza tu carga pesada.',
    breadcrumb: 'Plataforma',
    overline: 'Equipo abierto · Unidades propias',
    h1: 'Transporte en plataforma tipo plana y carga pesada desde Guadalajara',
    lede:
      'Plataformas de 40 pies en adelante para carga larga, pesada o de gran dimensión, con maniobra por los costados o por arriba y sujeción según el tipo de carga.',
    heroImage: 'romo-steel-structures-flatbed',
    heroCaption: 'Estructura metálica asegurada sobre plataforma.',
    whatsappMessage:
      'Hola, quiero cotizar un flete en plataforma.\nOrigen: \nDestino: \nTipo de carga: \nPeso y dimensiones: ',
    cargo: {
      title: 'Qué movemos en plataforma',
      items: [
        'Acero: perfiles, placa y lámina',
        'Tubería y varilla',
        'Estructura metálica fabricada',
        'Maquinaria y equipo industrial',
        'Material de construcción',
        'Materiales industriales',
        'Carga enfardada y de acopio',
        'Piezas de gran dimensión',
      ],
    },
    details: [
      {
        title: 'Capacidad de referencia',
        body: 'Movemos desde 10 hasta 35 toneladas como referencia. La capacidad está sujeta a la configuración del equipo, a las dimensiones de la carga y a la unidad asignada, por eso la confirmamos con peso y medidas reales.',
      },
      {
        title: 'Maniobra lateral o superior',
        body: 'La plataforma permite cargar y descargar por los costados o por arriba, con grúa o montacargas según la operación en origen y destino.',
      },
      {
        title: 'Sujeción según la carga',
        body: 'Bandas, cadenas y cubierta de acuerdo con el tipo de mercancía. Estructura y tubería se aseguran de forma distinta que la carga enfardada.',
      },
      {
        title: 'Carga de gran dimensión',
        body: 'Las piezas que exceden el ancho o la altura de un equipo cerrado se evalúan caso por caso según dimensiones, peso y ruta antes de confirmar el servicio.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto peso puede llevar la plataforma?',
        answer:
          'Como referencia, de 10 a 35 toneladas. El dato final depende de la configuración, las dimensiones de la carga y la unidad asignada.',
      },
      {
        question: '¿Quién hace la maniobra de carga?',
        answer:
          'La maniobra con grúa o montacargas se coordina con el origen y el destino. Indícanos cómo se cargará para asignar el equipo correcto.',
      },
      {
        question: '¿Transportan maquinaria?',
        answer:
          'Sí, en plataforma, sujeto a evaluación de peso y dimensiones de cada equipo.',
      },
    ],
    related: {
      href: '/caja-seca-48-53-pies/',
      text: '¿Tu mercancía debe viajar cerrada? Conoce los fletes en caja seca de 48 y 53 pies',
    },
  },
];
