# Verificación de contenido — Romo's Transportes

> **Generado automáticamente** por `npm run docs` a partir de
> `src/data/company.ts` (`pendingVerification`). No editar a mano: resuelva o
> agregue el punto en ese archivo y vuelva a generar.

Este documento lista **todo dato de negocio que el sitio NO afirma** porque no
ha sido confirmado por el propietario. La regla aplicada en todo el proyecto es:
un dato sin confirmar no se publica, no se sustituye por una suposición y no se
toma de la competencia. Los campos correspondientes en `src/data/company.ts`
están en `null` y la interfaz oculta lo que no puede sostener.

**Total de puntos pendientes: 10**

## Limita el mensaje (6)

_El sitio funciona, pero no puede afirmarlo hasta que se confirme._

### ¿Qué certificaciones o registros concretos tiene Romo's Transportes (ISO, OEA, CTPAT, SCT u otro), y con qué número o vigencia?

- **Por qué no se publica:** Se autorizó mencionar certificaciones, pero no se indicó cuál. Publicar "contamos con certificaciones" sin nombrar ninguna no es verificable por el cliente y no aporta confianza real. Además, el letrero "EMPRESA CERTIFICADA ISO 9001:2015" que aparece al fondo de una fotografía pertenece a la instalación del cliente, y el propietario indicó expresamente no atribuir certificaciones ajenas.
- **Qué hace el sitio hoy:** No se menciona ninguna certificación. Sí se publican seguro de carga, GPS y monitoreo durante el traslado, que quedaron autorizados.
- **Identificador interno:** `certifications`

### ¿Confirmación documental de la capacidad de la plataforma (36 t) y del tipo de suspensión (de aire)?

- **Por qué no se publica:** El propietario indicó mantener únicamente "plataforma de tres ejes" hasta contar con confirmación documental.
- **Qué hace el sitio hoy:** Se publica "plataforma de tres ejes" (los tres ejes son visibles en la fotografía). No se publica tonelaje ni tipo de suspensión.
- **Identificador interno:** `platform-specs`

### ¿Qué medidas tienen las cajas secas (48 ft, 53 ft u otras) y qué capacidad soportan?

- **Por qué no se publica:** El propietario indicó describir la caja seca por uso hasta confirmar medidas.
- **Qué hace el sitio hoy:** La caja seca se describe por uso, sin medidas ni capacidad.
- **Identificador interno:** `dry-van-specs`

### ¿Qué cobertura y qué aseguradora respaldan la carga, y hay un monto o tope que convenga publicar?

- **Por qué no se publica:** Se autorizó mencionar el seguro de carga, sin detalles de cobertura. Publicar un monto sin confirmarlo sería una afirmación contractual.
- **Qué hace el sitio hoy:** Se menciona que la mercancía viaja con seguro de carga y que la cobertura se confirma por servicio, sin montos ni aseguradora.
- **Identificador interno:** `insurance-detail`

### ¿El cliente puede consultar la ubicación de su unidad por algún medio (enlace, acceso, reporte) o el seguimiento se da solo por teléfono y WhatsApp?

- **Por qué no se publica:** Se autorizó mencionar GPS y monitoreo. No se confirmó si existe un acceso para el cliente ni un centro de monitoreo con horario definido.
- **Qué hace el sitio hoy:** Se menciona GPS en las unidades y monitoreo durante el traslado. No se afirma monitoreo 24/7, centro de control ni acceso de consulta para el cliente.
- **Identificador interno:** `monitoring-detail`

### ¿Qué capacitación, licencia federal o programa tienen los operadores?

- **Por qué no se publica:** No se confirmó ningún programa ni tipo de licencia.
- **Qué hace el sitio hoy:** Se habla de "operadores con experiencia en viaje largo" sin afirmar certificaciones ni programas.
- **Identificador interno:** `operator-qualifications`

## Mejora opcional (4)

_No bloquea nada; mejora el resultado si se resuelve._

### ¿Desea publicar un domicilio de operaciones y un horario de atención comercial?

- **Por qué no se publica:** No se proporcionaron. Un domicilio verificado permitiría además usar datos estructurados LocalBusiness, que hoy se omiten.
- **Qué hace el sitio hoy:** No se publica domicilio ni horario. El JSON-LD usa Organization en lugar de LocalBusiness, que exige dirección física.
- **Identificador interno:** `address-hours`

### ¿Hay más ciudades o corredores de operación frecuente que convenga listar además de los confirmados?

- **Por qué no se publica:** Se confirmaron Culiacán, Hermosillo, Tecate, Tijuana, el interior de Jalisco y León. La lista se cierra con "y otras rutas nacionales".
- **Qué hace el sitio hoy:** Se publican las ciudades confirmadas y se indica cobertura en rutas nacionales para el resto del país.
- **Identificador interno:** `coverage-additional`

### ¿Desea medir conversiones (Cloudflare Web Analytics, GA4 u otra herramienta)?

- **Por qué no se publica:** No se configuró ninguna herramienta de analítica.
- **Qué hace el sitio hoy:** No se carga ningún script de terceros. Los botones ya emiten un evento `romo:cta` en el DOM, listo para conectar.
- **Identificador interno:** `analytics`

### ¿Puede conseguir el logotipo en vectorial o PNG con transparencia?

- **Por qué no se publica:** El archivo entregado es una fotografía de la insignia, con viñeteado y grano. El propietario aprobó el tratamiento actual y sustituirlo más adelante.
- **Qué hace el sitio hoy:** La insignia se monta sobre una placa de marca que convierte su borde fotográfico en una decisión de diseño.
- **Identificador interno:** `logo-vector`

## Fotografías disponibles

Se localizaron y se integraron las **15 fotografías originales** del material de
origen, más el logotipo. El paquete de imágenes preparado previamente sólo
contenía 10 de ellas; las 5 restantes se recuperaron del material original y ya
están en el sitio, por lo que **no queda material pendiente por incorporar**.

De las 15, se publican 14. La restante se documenta en `docs/image-assets.md`
junto con el motivo por el que se dejó fuera.

## Cómo resolver los puntos que bloquean la publicación

Los cuatro datos de contacto y el dominio se configuran sin tocar código, con
variables de entorno en Cloudflare Pages (ver `README.md`):

```
NEXT_PUBLIC_ROMO_WHATSAPP=521234567890
NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY=+52 1 33 1234 5678
NEXT_PUBLIC_ROMO_PHONE=+523312345678
NEXT_PUBLIC_ROMO_PHONE_DISPLAY=+52 33 1234 5678
NEXT_PUBLIC_ROMO_EMAIL=cotizaciones@romostransportes.com
NEXT_PUBLIC_SITE_URL=https://romostransportes.com
```

Los valores anteriores son **ejemplos de formato, no datos reales**. Al
definirlos y reconstruir, el sitio activa por sí solo los botones de WhatsApp
en las 7 ubicaciones, el teléfono, el correo, la etiqueta canonical y el
sitemap absoluto.
