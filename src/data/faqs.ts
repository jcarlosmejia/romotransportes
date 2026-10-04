/**
 * @description Frequently asked questions.
 *
 * Every answer is bounded by what the site can truthfully claim. Questions a
 * freight customer really asks — tracking, insurance, transit time — are
 * answered honestly ("indíquelo y lo confirmamos") rather than with an invented
 * capability. See docs/content-verification.md.
 */

export type Faq = { question: string; answer: string };

export const faqs: readonly Faq[] = [
  {
    question: '¿Dónde están ubicados?',
    answer:
      'Nuestra base de operación está en Guadalajara, Jalisco. Cargamos en la Zona Metropolitana de Guadalajara y el interior de Jalisco, y movemos carga a cualquier destino del país.',
  },
  {
    question: '¿Qué información necesitan para cotizar?',
    answer:
      'Origen y destino, tipo de mercancía, peso y dimensiones aproximados, y la fecha en que necesita el servicio. Si la carga requiere maniobra especial en origen o destino, conviene indicarlo desde el principio para asignar el equipo correcto.',
  },
  {
    question: '¿Qué diferencia hay entre caja seca y plataforma?',
    answer:
      'La caja seca (48 o 53 pies) es un equipo cerrado: protege la mercancía del clima y del polvo, y se carga por la parte trasera. Es lo habitual para producto paletizado y mercancía comercial. La plataforma tipo plana (40 pies o más) es un equipo abierto: permite cargar por los costados o por arriba con grúa o montacargas, y es la opción para material, estructura, tubería y carga que no entra en un equipo cerrado.',
  },
  {
    question: '¿Cuánto peso pueden transportar?',
    answer:
      'Movemos cargas desde 10 toneladas hasta carga pesada, con referencias de 10, 15 y 35 toneladas según el equipo. La capacidad está sujeta a la configuración, a las dimensiones de la carga y a la unidad asignada; indíquenos peso y medidas y le confirmamos la unidad adecuada.',
  },
  {
    question: '¿Cómo sé qué unidad necesito?',
    answer:
      'No hace falta que lo decida antes de contactarnos. Cuéntenos qué va a mover, cuánto pesa aproximadamente, qué dimensiones tiene y cómo se va a cargar. Con eso definimos si conviene plataforma o caja seca y se lo indicamos en la cotización.',
  },
  {
    question: '¿Qué tipo de mercancía pueden transportar?',
    answer:
      'Mercancía general y paletizada en caja seca; material, estructura metálica, tubería, varilla, carga enfardada y piezas de gran dimensión en plataforma. Si su carga tiene un requerimiento especial, coménteselo al solicitar la cotización para confirmar si podemos atenderla.',
  },
  {
    question: '¿Trabajan rutas nacionales?',
    answer:
      'Sí. Desde Guadalajara hacemos rutas locales, semiforáneas y foráneas a todo el país, en servicio spot (viaje único) o recurrente.',
  },
  {
    question: '¿Puedo solicitar un servicio dedicado o recurrente?',
    answer:
      'Sí. Cuando el movimiento se repite conviene planearlo: frecuencia, rutas, ventanas de carga y el tipo de equipo que debe quedar disponible. Indíquenos cómo es su operación y lo revisamos en conjunto.',
  },
  {
    question: '¿Con cuánta anticipación debo solicitar el servicio?',
    answer:
      'Entre más anticipación, más fácil es asignar la unidad adecuada, sobre todo cuando la carga necesita plataforma o una maniobra particular. Indique la fecha que tiene prevista al solicitar la cotización y le confirmamos la disponibilidad para ese periodo.',
  },
  {
    question: '¿Cómo se confirma la entrega?',
    answer:
      'Mantenemos comunicación con la unidad durante el traslado y le avisamos al concluir el servicio en el punto de destino.',
  },
  {
    question: '¿La carga viaja asegurada?',
    answer:
      'Sí. La mercancía viaja con seguro de carga. Las condiciones que aplican a cada embarque se confirman al cotizar, en función del tipo de mercancía y de su valor declarado, así que conviene indicarnos qué va a mover desde la solicitud.',
  },
  {
    question: '¿Puedo dar seguimiento a mi embarque durante el viaje?',
    answer:
      'Sí. Las unidades cuentan con GPS y damos seguimiento al viaje mientras la unidad está en ruta. Puede solicitarnos el estatus por teléfono o WhatsApp y le informamos la situación de su embarque.',
  },
  {
    question: '¿A qué ciudades llegan?',
    answer:
      'Nuestras rutas frecuentes salen de Guadalajara hacia el Pacífico y el Norte: Tepic, Mazatlán, Culiacán, Ciudad Obregón, Hermosillo, Tijuana y Tecate, además de León y el interior de Jalisco. También cotizamos cualquier otra ruta nacional; indíquenos origen y destino y le confirmamos disponibilidad.',
  },
  {
    question: '¿Desde cuándo opera Romo\'s Transportes?',
    answer:
      'Operamos transporte de carga por carretera desde 2010.',
  },
];
