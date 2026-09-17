# Fotografía e imágenes — Romo's Transportes

Pipeline: `scripts/build-images.mjs` (`npm run images`). Genera todas las
renditions más los derivados de marca y reescribe `src/data/imageManifest.ts`.

## Procedencia

| Origen | Ruta | Contenido |
| :-- | :-- | :-- |
| **Fotografías originales** | `~/Downloads/Romotransportes_imagenes/` | **15** fotografías + `logo.jpg` + un video |
| Paquete preparado previamente | `~/Documents/Codex/2026-09-16/referenced-chatgpt-conversation-this-is-an-3/outputs/romos-transportes-image-assets/` | 10 de esas 15, en 46 renditions JPEG, con `README.md` y `manifest.tsv` |

### Las "5 fotografías faltantes" **sí estaban**

El paquete preparado declaraba que sólo 10 de las 15 fotografías referidas
resultaron accesibles, y pedía que se compartieran las otras cinco. **Las cinco
se localizaron** en la carpeta original y **ya están integradas en el sitio**:

| Archivo | Contenido | Dónde se usa |
| :-- | :-- | :-- |
| `Screenshot_20260916_200126` | Tractocamión negro con plataforma cargada de material enfardado, atardecer, junto a carretera | **Hero** (escritorio y móvil) |
| `Screenshot_20260916_200204` | Dos plataformas cargadas circulando por carretera nacional | Servicios — Transporte nacional |
| `Screenshot_20260916_200146` | Tractocamión morado con plataforma cargada de tubería de acero, nave industrial | Corte fotográfico a ancho completo |
| `Screenshot_20260916_200135` | Personal con casco y chaleco sobre plataforma con varilla, maniobra de sujeción | **Seguridad** |
| `Screenshot_20260916_200156` | Tractocamiones morado y blanco estacionados | Galería |

No queda material pendiente por incorporar. La fotografía más fuerte del lote
—la del hero— provenía justamente de ese grupo.

## Por qué las renditions se generan desde los originales

El paquete preparado se trata como **especificación** (fijó slugs, relaciones de
aspecto, corrección de orientación, sección sugerida y alt text en español). Las
renditions, en cambio, se renderizan una sola vez desde las fotografías
originales, por tres razones:

1. Cinco de las quince no tenían ninguna rendition preparada.
2. El paquete topaba la salida en 768 px incluso para fuentes de 1079/1080 px;
   esos píxeles extra son reales y sirven en escritorio.
3. Recomprimir un JPEG ya comprimido a WebP/AVIF acumula artefactos; codificar
   una sola vez desde el original, no.

El propio `README.md` del paquete anticipaba esto: *"Al integrarlos al proyecto se
pueden convertir de forma determinista con el pipeline de imágenes del
repositorio"* y *"Con originales de mayor resolución se pueden generar renditions
de 1280 y 1920 px"*.

## Sin upscale, nunca

Las fuentes miden **897–1080 px** de ancho. Cada ancho de rendition se topa al
ancho real del recorte, así que no se introduce ni un píxel sintético. Por eso el
layout se diseñó alrededor de ese techo: columnas de imagen contenidas en lugar
de fotografía a sangre estirada. Ver `docs/brand-system.md` §5.

## Formato: medido, no supuesto

El pipeline codifica cada rendition en JPEG, WebP y AVIF, y **sólo publica el
formato moderno cuando de verdad pesa menos** (umbral del 5 %).

| Si todo fuera… | Peso total |
| :-- | --: |
| JPEG | 2 408 KB |
| WebP | 1 578 KB (−34 %) |
| **AVIF** | **879 KB (−64 %)** |

AVIF gana en 44 de las renditions; el navegador elige vía `<picture>` y el JPEG
queda como respaldo universal. En la carga real medida en el navegador, **todas**
las imágenes se sirvieron en AVIF.

## Mapa de uso

| Slug | Origen | Recorte | Anchos | Formatos | Usado en |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `romo-black-flatbed-recycled-load-highway` | `200126` | 887x499 | 480/768/887 | avif+webp+jpg | Hero (escritorio, 16:9) |
| `romo-black-flatbed-recycled-load-highway-mobile` | `200126` | 729x547 | 480/729 | avif+webp+jpg | Hero (móvil, 4:3) |
| `romo-purple-flatbed-facility-wide` | `200253` | 753x502 | 480/753 | avif+webp+jpg | Flota — Tractocamiones |
| `romo-steel-structures-flatbed` | `200220` | 897x598 | 480/768/897 | avif+webp+jpg | Flota — Plataformas; galería |
| `romo-purple-dry-van-mountains` | `200455` | 843x562 | 480/768/843 | avif+webp+jpg | Flota — Cajas secas |
| `romo-purple-flatbed-steel-pipes-warehouse` | `200146` | 821x547 | 480/768/821 | avif+webp+jpg | Corte fotográfico; galería |
| `romo-load-securing-rebar-warehouse` | `200135` | 786x983 | 480/768/786 | avif+webp+jpg | Seguridad |
| `romo-forage-load-highway` | `200204` | 800x450 | 480/768/800 | avif+webp+jpg | Servicios — Transporte nacional |
| `romo-fleet-night-branding` | `200422` | 852x568 | 480/768/852 | avif+webp+jpg | Nosotros; galería |
| `romo-purple-dry-van-night` | `200508` | 1079x607 | 480/768/1079 | avif+webp+jpg | CTA de cotización; galería |
| `romo-white-flatbed-workshop` | `200228` | 1620x1080 | 480/768/1080 | avif+webp+jpg | Galería |
| `romo-fleet-lineup-street` | `200156` | 803x535 | 480/768/803 | avif+webp+jpg | Galería |
| `romo-forage-load-yard` | `200345` | 657x438 | 480/657 | avif+webp+jpg | Galería |
| `romo-black-flatbed-palletized-load` | `200408` | 608x405 | 480/608 | avif+webp+jpg | Galería |
| `romo-scrap-load-flatbed` | `200308` | 785x523 | 480/768/785 | avif+webp+jpg | Galería |

Auditoría: los 15 slugs declarados están referenciados; no se publica ninguna
rendition huérfana.

## Art direction del hero

Las dos tomas del hero salen de **la misma fotografía**, en dos encuadres:

- **Escritorio (≥1024 px):** 16:9, 887 px, servido a una columna de ~560 px.
- **Móvil (<1024 px):** 4:3, 729 px, a ancho de pantalla menos margen.

Un recorte vertical real era imposible sin upscale (la fuente es 1079×608), así
que 4:3 es el encuadre más alto que los píxeles sostienen.

Ambos viven en **un solo `<picture>`** con `media` en los `<source>`, así que el
navegador descarga **exactamente uno**. Verificado en el panel de red: en
escritorio sólo se pidió `…-highway-887.avif`; en móvil sólo
`…-highway-mobile-729.avif`. La relación de aspecto se fija en CSS por
breakpoint, no en los atributos de la imagen, de modo que el cambio de encuadre
no puede desplazar el layout (**CLS medido: 0**).

## Recortes deliberados

| Fotografía | Decisión | Motivo |
| :-- | :-- | :-- |
| `200220` (estructuras metálicas) | Recorte desde la izquierda | El original trae la marca de agua **"capturada en motorola one"** en la esquina inferior izquierda. Se **excluyó por encuadre**; no se aplicó borrado, clonado ni relleno generativo. |
| `200422` (flota nocturna) | Recorte desde la izquierda | Deja fuera el bloque de identificadores regulatorios rotulado en la cabina (ICC MC, USDOT, CA, VIN parcial, KYU) conservando el emblema Romo's en la puerta. |
| `200253` (tractocamión y plataforma) | Recorte bajo y ancho | Saca de cuadro el letrero **"EMPRESA CERTIFICADA ISO 9001:2015"** de la nave, que pertenece a la instalación del cliente y **no** a Romo's. |
| `200408` (carga paletizada) | Recorte hacia la unidad | Reduce la señalización de una instalación ajena para que no sea el sujeto de la toma. |
| `200228` (taller) | Rotación 270° antes del recorte | Capturada en vertical y almacenada girada. |

## Fotografía excluida

`Screenshot_20260916_200332` (patio de operaciones) **no se publica**: el
encuadre está saturado —agua estancada, tarimas sueltas— y la señalización de un
tercero es el elemento más legible del cuadro. El archivo original sigue
disponible; la decisión está registrada como punto de consulta al propietario en
`docs/content-verification.md` (`photo-excluded`).

## Derivados de marca

Generados desde `logo.jpg` con la caja de la insignia medida por histograma de
densidad de tinta (no a ojo): `left 0.048, top 0.132, width 0.945, height 0.785`,
proporción natural ≈1.21:1.

| Archivo | Uso |
| :-- | :-- |
| `logo-romos-transportes-{128,256,512}.{avif,webp,png}` | Bloqueo en encabezado, pie y Nosotros |
| `favicon-32.png`, `favicon-48.png` | Favicon |
| `apple-touch-icon.png` (180) | iOS |
| `icon-192.png`, `icon-512.png` | Manifiesto web |
| `og-image.jpg` (1200×630) | Vista previa en redes: insignia sobre negro de marca + regla roja. Sin texto inventado. |
| `logo-original.jpg` | Copia fiel de lo entregado, como referencia |

Los iconos cuadrados usan `fit: contain` sobre negro de marca para que el
wordmark no se recorte (una primera versión con `cover` cortaba la "S").

## Cómo añadir o cambiar fotografías

1. Copie el archivo a `~/Downloads/Romotransportes_imagenes/` (o ajuste
   `SOURCE_DIR` en `scripts/build-images.mjs`).
2. Añada una entrada al arreglo `PHOTOS` con `slug`, `file`, `dir`, `ratio`,
   `region` opcional, `rotate` opcional, `alt` **en español** y `caption`.
3. `npm run images` — regenera las renditions y el manifiesto.
4. Referencie el `slug` desde el componente o desde `src/data/*`.
5. `npm run build`.

El `alt` es obligatorio y debe describir lo que **realmente** se ve. Para imagen
decorativa, pase `alt=""` en el punto de uso (así están los dos fondos con velo).
