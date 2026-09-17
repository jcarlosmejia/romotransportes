# Investigación competitiva — transporte de carga en México

Fecha del levantamiento: **16 de septiembre de 2026**.

Objetivo: entender cómo comunican las transportistas mexicanas su oferta, su
flota, su cobertura y su seguridad, para adaptar los patrones útiles a Romo's
Transportes **sin copiar textos, estructura ni activos propios de nadie**.

## Alcance real del levantamiento (y sus límites)

Se inspeccionaron los sitios en vivo, extrayendo jerarquía de encabezados,
navegación, llamados a la acción, taxonomía de servicios y copy de cuerpo.

| Empresa | Estado | Qué se pudo analizar |
| :-- | :-- | :-- |
| Grupo Castores | Accesible | Home completo: cotizador, navegación, servicios, trust signals |
| Solistica (TRAXION) | Accesible | Home: taxonomía 3PL, industrias, cobertura, CTA |
| TRAXIÓN | Accesible | Home corporativo: servicios, industrias, empresas, CTA de WhatsApp |
| Transportes Monroy Schiavon (TMS) | Accesible | Home + **Flota** + **Transporte dedicado** — el par más cercano a Romo's |
| TUM / Transportistas Unidos Mexicanos | **Sitio en construcción** | Sólo el aviso "SITIO EN CONSTRUCCIÓN / EN CAMINO HACIA DARTE UN MEJOR SERVICIO" |

**Limitación que conviene declarar:** la política de navegación del entorno de
trabajo bloquea los motores de búsqueda, así que no fue posible descubrir
libremente transportistas adicionales de plataforma/FTL. Se probaron dominios de
forma directa; de ese sondeo salieron dos hallazgos que valen como advertencia
más que como referencia:

- **pitic.com** — el dominio de una conocida transportista de plataforma está
  hoy **en venta**.
- **fletesmexico.com.mx** — el dominio quedó **ocupado por un sitio de apuestas**
  sin relación con transporte.

Para compensar la falta de amplitud, la investigación se profundizó en las
páginas internas de la empresa más comparable (TMS: flota y servicio dedicado),
que es donde vive el vocabulario operativo realmente útil.

## Patrones observados

### Jerarquía del home

Las cinco empresas coinciden en un orden muy estable:

1. Propuesta de valor + CTA de cotización arriba de todo.
2. Quiénes somos, en una o dos frases.
3. Servicios como taxonomía de tarjetas.
4. Por qué elegirnos.
5. Cobertura.
6. Industrias atendidas.
7. CTA de cierre + contacto.

### El cotizador manda

Castores lleva el patrón al extremo: su home **abre con un cotizador**
("Cotizador de envíos", con selectores de sucursal de origen y destino) y una
barra superior permanente con *Rastrear · Cotizar · Facturación*. TMS repite
*Solicitar cotización* y *Cotizar mi envío*; Solistica usa *¡Cotiza tu servicio!*;
TRAXIÓN, *Cotiza aquí tu servicio de movilidad*.

**Adoptado:** la cotización es la acción dominante y se repite a lo largo de la
página. **Rechazado:** un cotizador instantáneo con tarifa automática. Romo's
cotiza por carga y ruta; un simulador de precios prometería algo que no se puede
sostener.

### WhatsApp como canal serio

TRAXIÓN —una empresa pública— enlaza `api.whatsapp.com` desde su home. TMS
también expone WhatsApp. Es decir: en este sector WhatsApp no es informal, es el
canal comercial normal.

**Adoptado:** WhatsApp como vía de conversión de primera clase, en 7
ubicaciones. **Nota:** hoy está oculto porque no hay número confirmado
(`docs/content-verification.md`).

### Taxonomía de servicios

Solistica: *Carga completa · Carga fraccionada · Logística internacional ·
Multimodal · Almacenaje · Valor agregado*. TMS: *Transporte Spot ·
Internacional cruce de andén · Flotas dedicadas · Arrastre de contenedores*.
Castores: *Paquetería · Completos · Inhouse*.

**Adoptado:** separar por **tipo de equipo y modalidad**, con *carga completa* y
*servicio dedicado* como conceptos propios. **Rechazado:** carga fraccionada,
internacional, aduanas, multimodal y almacenaje — Romo's no confirmó ninguno.

### Vocabulario operativo (la aportación más valiosa)

De TMS se extrajo el léxico que un comprador de fletes espera leer:
*tractocamión, remolque, caja seca, cajas de 48 y 53 pies, fulles, rabón, carga
general, carga completa, transporte dedicado, arrastre, ventanas de carga,
cobertura nacional, patios*.

**Adoptado:** el vocabulario. **Rechazado como afirmación:** las medidas. TMS
puede decir "cajas de 53 pies" porque las tiene; en Romo's las medidas de caja
siguen sin confirmar, así que la caja seca se describe **por uso**, no por pies.

### Cómo se presenta la flota

TMS dedica una página entera a la flota y la cuantifica: *"1,420 tractocamiones"*,
*"Más de 6,000 remolques de caja seca"*. Es su mayor activo de credibilidad.

**Adoptado:** que la flota tenga sección propia y peso visual.
**Deliberadamente rechazado:** los números. Romo's no confirmó conteos y una
estadística inventada es la forma más rápida de perder a un cliente que verifica.
En su lugar, la sección de flota se apoya en **fotografía real de la operación**,
que TMS no muestra y que aquí sí existe.

### Cómo se presenta la seguridad

Aquí está la diferencia más grande. TMS construye su sección de seguridad sobre
*rastreo satelital, Centro de Seguimiento Especializado (CSE), monitoreo 24/7,
"cuenta espejo" para que el cliente vea la unidad en tiempo real, cobertura de
seguros, mantenimiento preventivo*. Castores y Solistica siguen la misma línea.

**Deliberadamente rechazado, punto por punto:** GPS, rastreo satelital, centro
de control, monitoreo 24/7, cuenta espejo y seguro de carga. **Ninguno** fue
confirmado para Romo's y copiar ese bloque sería inventar capacidades.

**Adoptado en su lugar:** una sección de seguridad construida sólo con lo que la
propia operación de Romo's demuestra —revisión previa al viaje, sujeción con
bandas y cadenas, personal con equipo de protección, planeación de ruta,
comunicación durante el traslado, confirmación de entrega— y respaldada por una
fotografía real de una maniobra de sujeción. Es una sección más corta que la de
la competencia, pero cada línea es sostenible.

### Cobertura

Castores presume sucursales; TMS, patios estratégicos y conexión a Estados
Unidos; Solistica, un mapa de cobertura.

**Adoptado:** sección de cobertura con visualización ligera de México.
**Rechazado:** nombrar estados, ciudades, corredores o sucursales. El material de
origen sólo sostiene "rutas nacionales", así que el mapa **no dibuja ninguna ruta
ni marcador**. Se usó un SVG local generado a partir de datos públicos en lugar
de un mapa embebido, que habría costado cientos de kilobytes y una petición a un
tercero para un gráfico estático.

### Industrias y clientes

Las cuatro empresas grandes muestran industrias atendidas; TMS añade
*"Industrias que confían en nosotros"* y Solistica un bloque de marcas.

**Adoptado:** industrias como **capacidad**, no como cartera.
**Rechazado:** muro de logotipos y cualquier frase tipo "nuestros clientes
incluyen". Romo's no confirmó ninguna relación comercial, y la señalización de
terceros que aparece al fondo de dos fotografías **no es evidencia de que sean
clientes**.

### Antigüedad

TMS: *"Más de 60 años"*, *"Desde 1959"*. Castores: *"Transportando el patrimonio
de México"*.

**Rechazado:** cualquier cifra de antigüedad. Sin verificar, no se publica. El
sitio habla de experiencia operativa sin ponerle número ni fecha.

### Tono

El sector evita la estridencia: frases operativas, no superlativos. La excepción
son promesas de tiempo ("puntualidad garantizada").

**Adoptado:** tono B2B directo y concreto. **Rechazado:** garantías de tiempo de
entrega. El sitio nunca promete una fecha; describe cómo se planea y se confirma.

## Resumen de decisiones

| Patrón del sector | Decisión para Romo's | Motivo |
| :-- | :-- | :-- |
| Cotización como acción dominante | **Adoptado** | Es el objetivo comercial del sitio |
| WhatsApp como canal formal | **Adoptado** (7 ubicaciones, hoy oculto) | Normal en el sector; falta número |
| Taxonomía de servicios por equipo | **Adoptado**, reducido a lo verificable | Sólo lo que Romo's ofrece |
| Flota con sección propia | **Adoptado**, con fotografía real | Ventaja competitiva disponible |
| Conteos de unidades | **Rechazado** | Sin verificar |
| GPS / monitoreo / CSE / cuenta espejo | **Rechazado** | Sin verificar |
| Seguro de carga | **Rechazado** | Sin verificar |
| Años de experiencia | **Rechazado** | Sin verificar |
| Medidas de caja (48/53 ft) | **Vocabulario sí, afirmación no** | Sin verificar |
| Mapa de cobertura | **Adoptado**, sin rutas ni ciudades | Sólo consta "rutas nacionales" |
| Industrias atendidas | **Adoptado** como capacidad | No hay cartera confirmada |
| Muro de logotipos de clientes | **Rechazado** | No hay relación confirmada |
| Cotizador con tarifa automática | **Rechazado** | Prometería un precio insostenible |
| Garantías de tiempo de entrega | **Rechazado** | No es controlable |

## Dónde Romo's puede ganar

1. **Fotografía auténtica.** Ninguna de las cinco muestra su operación real con
   este nivel de crudeza: plataforma cargada con estructura metálica, maniobra de
   sujeción con personal equipado, operación nocturna. Es el activo diferencial.
2. **Atención directa.** Las grandes ofrecen "ejecutivo asignado"; Romo's puede
   ofrecer que quien cotiza es quien opera, sin intermediarios.
3. **Asesoría de equipo.** Ninguna resuelve la duda real del cliente pequeño
   —"¿plataforma o caja seca?"—. El sitio lo convierte en CTA explícito
   ("¿No sabes qué unidad necesitas?").
4. **Un sitio que existe y carga rápido.** Un competidor directo está en
   construcción y dos dominios del sector se perdieron. La barra está más baja de
   lo que parece.

## Fuentes

Homes y páginas internas consultadas el 16/09/2026: castores.com.mx,
solistica.com, traxion.global, tms.com.mx (`/flota/`, `/transporte-dedicado/`),
tum.com.mx. No se reprodujo texto, estructura ni activos de ninguna de ellas.
