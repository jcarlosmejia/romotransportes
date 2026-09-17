# Verificación de contenido — Romo's Transportes

> **Generado automáticamente** por `npm run docs` a partir de
> `src/data/company.ts` (`pendingVerification`). No editar a mano: resuelva o
> agregue el punto en ese archivo y vuelva a generar.

Este documento lista **todo dato de negocio que el sitio NO afirma** porque no
ha sido confirmado por el propietario. La regla aplicada en todo el proyecto es:
un dato sin confirmar no se publica, no se sustituye por una suposición y no se
toma de la competencia. Los campos correspondientes en `src/data/company.ts`
están en `null` y la interfaz oculta lo que no puede sostener.

**Total de puntos pendientes: 24**

## Bloquea la publicación (8)

_El sitio no debe publicarse sin esto._

### ¿Cuál es el número de WhatsApp comercial que debe recibir las cotizaciones?

- **Por qué no se publica:** No se proporcionó ningún número. Inventar o suponer un número enviaría a los clientes a un tercero.
- **Qué hace el sitio hoy:** Los botones de WhatsApp están ocultos. El formulario genera la solicitud y ofrece "Copiar solicitud" como alternativa.
- **Identificador interno:** `whatsapp`

### ¿Cuál es el teléfono de contacto que se debe publicar?

- **Por qué no se publica:** No se proporcionó ningún teléfono.
- **Qué hace el sitio hoy:** No se muestra ningún teléfono en el encabezado, contacto ni pie de página.
- **Identificador interno:** `phone`

### ¿A qué correo deben llegar las solicitudes de cotización?

- **Por qué no se publica:** No se proporcionó ningún correo.
- **Qué hace el sitio hoy:** No se muestra correo y el formulario no lo usa como destino; la conversión depende de WhatsApp o del copiado manual.
- **Identificador interno:** `email`

### ¿Cuál es el dominio definitivo del sitio?

- **Por qué no se publica:** El dominio se administra por separado (NEUBOX / Cloudflare DNS) y no fue confirmado en el material entregado.
- **Qué hace el sitio hoy:** No se publica etiqueta canonical ni sitemap absoluto hasta que se defina NEXT_PUBLIC_SITE_URL.
- **Identificador interno:** `domain`

### ¿Cómo quiere recibir las solicitudes: WhatsApp, un correo, o una función de Cloudflare conectada a un buzón?

- **Por qué no se publica:** No existen credenciales ni buzón configurado.
- **Qué hace el sitio hoy:** El formulario es funcional del lado del cliente: valida, arma el mensaje y lo entrega por WhatsApp o portapapeles.
- **Identificador interno:** `form-destination`

### ¿Autoriza publicar las 14 fotografías incluidas, con los encuadres aplicados, en el sitio público?

- **Por qué no se publica:** Las fotografías provienen de material interno compartido por WhatsApp y no de una sesión fotográfica aprobada.
- **Qué hace el sitio hoy:** Todas las fotografías están publicadas en el sitio pendiente de esta aprobación.
- **Identificador interno:** `photo-publication`

### ¿Autoriza que sean visibles las placas, los números económicos y los registros USDOT / ICC MC / VIN parcial que aparecen en algunas unidades?

- **Por qué no se publica:** En la fotografía nocturna de flota se leen ICCMC, USDOT, CA, VIN parcial y KYU. En otras se ven placas y el número económico 0917.
- **Qué hace el sitio hoy:** No se editó ninguna fotografía. Los identificadores siguen visibles tal como se capturaron.
- **Identificador interno:** `photo-identifiers`

### ¿Autoriza que aparezca personal identificable en dos fotografías?

- **Por qué no se publica:** En la fotografía de tubería se alcanza a ver al operador dentro de la cabina; en la de varilla aparece personal de maniobra de espalda.
- **Qué hace el sitio hoy:** Las fotografías se publican sin edición.
- **Identificador interno:** `photo-people`

## Limita el mensaje (13)

_El sitio funciona, pero no puede afirmarlo hasta que se confirme._

### ¿Desde qué año opera Romo's Transportes?

- **Por qué no se publica:** No hay dato verificado; afirmar antigüedad sin confirmarla sería falso.
- **Qué hace el sitio hoy:** El sitio habla de "experiencia en transporte terrestre de carga" sin citar años ni fecha de fundación.
- **Identificador interno:** `years-operating`

### ¿Cuántos tractocamiones, plataformas y cajas secas hay en operación?

- **Por qué no se publica:** Las fotografías muestran varias unidades, pero una fotografía no es un inventario verificable.
- **Qué hace el sitio hoy:** No se publica ningún conteo de unidades ni estadística de flota.
- **Identificador interno:** `fleet-size`

### ¿Las plataformas son de tres ejes con suspensión de aire y capacidad de 36 toneladas? ¿Aplica a todas las unidades?

- **Por qué no se publica:** El material de origen menciona tres ejes, suspensión de aire y 36 toneladas, pero se indicó tratarlo como provisional.
- **Qué hace el sitio hoy:** Se describe la plataforma como "de tres ejes" solo porque los tres ejes son visibles en las fotografías. No se publica capacidad, suspensión ni tonelaje.
- **Identificador interno:** `platform-specs`

### ¿Qué medidas tienen las cajas secas (48 ft, 53 ft, otras) y qué capacidad soportan?

- **Por qué no se publica:** No se confirmaron medidas ni capacidades.
- **Qué hace el sitio hoy:** La caja seca se describe por uso, no por medidas ni capacidad.
- **Identificador interno:** `dry-van-specs`

### ¿En qué estados o corredores opera realmente? ¿Hay rutas de alta frecuencia que quiera destacar?

- **Por qué no se publica:** El material menciona "rutas nacionales", pero no se confirmó ninguna ruta, estado ni corredor específico.
- **Qué hace el sitio hoy:** La sección de cobertura habla de servicio en rutas nacionales dentro de la República Mexicana, sin nombrar estados, ciudades ni corredores.
- **Identificador interno:** `coverage`

### ¿La mercancía viaja con seguro de carga? ¿Con qué cobertura y aseguradora?

- **Por qué no se publica:** No se confirmó ninguna póliza.
- **Qué hace el sitio hoy:** No se menciona seguro en ninguna parte del sitio.
- **Identificador interno:** `insurance`

### ¿Las unidades cuentan con GPS o monitoreo? ¿El cliente puede consultar la ubicación?

- **Por qué no se publica:** No se confirmó ningún sistema de rastreo ni monitoreo.
- **Qué hace el sitio hoy:** La sección de seguridad habla de comunicación directa durante el traslado, sin mencionar GPS, rastreo satelital ni monitoreo 24/7.
- **Identificador interno:** `gps-monitoring`

### ¿Romo's cuenta con alguna certificación o registro (ISO, OEA, CTPAT, SCT)?

- **Por qué no se publica:** Una fotografía muestra un letrero "EMPRESA CERTIFICADA ISO 9001:2015", pero pertenece a la instalación del cliente, no a Romo's.
- **Qué hace el sitio hoy:** No se menciona ninguna certificación.
- **Identificador interno:** `certifications`

### ¿Qué procedimientos de seguridad se realizan de forma sistemática: revisión previa al viaje, sujeción de carga, mantenimiento preventivo, planeación de ruta?

- **Por qué no se publica:** Las fotografías muestran sujeción con bandas y personal con casco y chaleco, pero eso no confirma un procedimiento formal.
- **Qué hace el sitio hoy:** La sección de seguridad describe únicamente prácticas visibles en el material propio y en términos operativos, sin afirmar protocolos ni certificaciones.
- **Identificador interno:** `safety-procedures`

### ¿Qué capacitación o licencias tienen los operadores?

- **Por qué no se publica:** No se confirmó ningún programa de capacitación.
- **Qué hace el sitio hoy:** Se habla de "operadores con experiencia en carretera" sin afirmar certificaciones ni programas.
- **Identificador interno:** `operator-qualifications`

### ¿Romo's ofrece efectivamente carga completa, caja seca, plataforma y servicio dedicado? ¿Hay algún servicio que NO deba aparecer?

- **Por qué no se publica:** Los tipos de equipo son visibles en las fotografías, pero la oferta comercial la define el propietario.
- **Qué hace el sitio hoy:** Se publican solo transporte nacional, carga completa, caja seca, plataforma y servicio dedicado. No se menciona refrigerado, materiales peligrosos, cruce fronterizo, aduanas, almacenaje, paquetería ni última milla.
- **Identificador interno:** `services-offered`

### ¿Autoriza que aparezcan instalaciones y señalización de terceros al fondo de algunas fotografías?

- **Por qué no se publica:** Dos fotografías muestran señalización de una instalación ajena. El sitio no afirma en ningún momento que sean clientes.
- **Qué hace el sitio hoy:** Se aplicaron encuadres que centran la unidad de Romo's y reducen la señalización de terceros, sin edición generativa.
- **Identificador interno:** `photo-third-parties`

### ¿Aprueba la redacción final de la sección "Nosotros" y el resto de los textos?

- **Por qué no se publica:** La misión original se reescribió en español profesional, sin reproducirla literalmente y sin agregar afirmaciones nuevas.
- **Qué hace el sitio hoy:** Se publica la versión reescrita.
- **Identificador interno:** `mission-copy`

## Mejora opcional (3)

_No bloquea nada; mejora el resultado si se resuelve._

### ¿Existe el original sin la marca de agua de cámara en la fotografía de estructuras metálicas?

- **Por qué no se publica:** El original accesible trae la marca "capturada en motorola one" en la esquina inferior izquierda.
- **Qué hace el sitio hoy:** Se recortó el encuadre para excluir la marca. No se aplicó borrado, clonado ni relleno generativo.
- **Identificador interno:** `photo-watermark`

### ¿Desea publicar la fotografía del patio de operaciones que se dejó fuera por calidad de encuadre?

- **Por qué no se publica:** El encuadre está saturado (agua estancada, tarimas sueltas) y la señalización de un tercero es el elemento más legible.
- **Qué hace el sitio hoy:** La fotografía no se publica. El archivo original permanece disponible.
- **Identificador interno:** `photo-excluded`

### ¿Desea medir conversiones (Cloudflare Web Analytics, GA4 u otra herramienta)?

- **Por qué no se publica:** No se configuró ninguna herramienta de analítica.
- **Qué hace el sitio hoy:** No se carga ningún script de terceros. Los botones ya emiten un evento `romo:cta` en el DOM, listo para conectar.
- **Identificador interno:** `analytics`

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
