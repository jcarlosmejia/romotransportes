/**
 * @description Frequently asked questions.
 *
 * Every answer is bounded by what the site can truthfully claim. Questions a
 * freight customer really asks — tracking, insurance, transit time — are
 * answered honestly ("indícalo y lo confirmamos") rather than with an invented
 * capability. See docs/content-verification.md.
 */

export type Faq = { question: string; answer: string };

export const faqs: readonly Faq[] = [
  {
    question: '¿Qué tipo de unidades manejan?',
    answer:
      'Cajas secas de 48 y 53 pies para mercancía que debe viajar cerrada, y plataformas tipo plana de 40 pies en adelante para acero, estructura, maquinaria y carga que se maniobra por los costados o por arriba. Todas son unidades propias.',
  },
  {
    question: '¿Desde dónde operan?',
    answer:
      'Nuestra base está en Guadalajara, Jalisco. Cargamos en la Zona Metropolitana de Guadalajara y el interior de Jalisco, y salimos directo a ruta.',
  },
  {
    question: '¿Son empresa transportista o intermediario?',
    answer:
      'Somos empresa transportista con unidades propias, no un intermediario. Si buscas un carrier o proveedor de transporte con base en Guadalajara, tratas directamente con quien opera la unidad.',
  },
  {
    question: '¿Realizan fletes a otros estados?',
    answer:
      'Sí. Tenemos rutas frecuentes hacia el Pacífico (Tepic, Mazatlán, Culiacán, Sonora y Baja California) y el Norte (Torreón, Chihuahua, Ciudad Juárez, Saltillo y Monterrey), y cotizamos cualquier otro destino nacional.',
  },
  {
    question: '¿Manejan servicios recurrentes?',
    answer:
      'Sí. Para movimientos que se repiten entre plantas, proveedores o CEDIS planeamos frecuencia, ventanas de carga y el equipo que debe quedar disponible.',
  },
  {
    question: '¿También realizan servicios spot?',
    answer:
      'Sí. Para un viaje único o urgente, envíanos origen, destino, tipo de carga y fecha, y te confirmamos unidad y tarifa.',
  },
  {
    question: '¿Transportan carga pesada?',
    answer:
      'Sí, en plataforma. Cada carga se evalúa por peso, dimensiones, equipo y configuración; como referencia movemos desde 10 hasta 35 toneladas, sujeto a la unidad asignada. Indícanos peso y medidas para confirmarlo.',
  },
  {
    question: '¿Cómo sé si necesito caja seca o plataforma?',
    answer:
      'No hace falta que lo decidas antes. La caja seca protege la mercancía del clima y se carga por atrás; la plataforma permite cargar por los costados o por arriba con grúa o montacargas. Cuéntanos qué vas a mover y te recomendamos la unidad.',
  },
  {
    question: '¿La carga viaja asegurada y con seguimiento?',
    answer:
      'Sí. La mercancía viaja con seguro de carga, cuyas condiciones se confirman al cotizar según el tipo y valor de la mercancía. Las unidades cuentan con GPS y puedes pedirnos el estatus por teléfono o WhatsApp durante el viaje.',
  },
  {
    question: '¿Cómo solicito una tarifa?',
    answer:
      'Por WhatsApp al +52 33 1013 1863, por correo a contacto.romotransportes@gmail.com, por teléfono al +52 33 4399 5054 o con el formulario de esta página.',
  },
  {
    question: '¿Qué información necesitan para cotizar?',
    answer:
      'Origen, destino, tipo de mercancía, peso aproximado, dimensiones y fecha de carga. Si hay maniobra especial en origen o destino, indícalo desde el inicio.',
  },
];
