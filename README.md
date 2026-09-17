# Romo's Transportes — landing page

Sitio comercial de una página para **Romo's Transportes**, empresa mexicana de
transporte terrestre de carga. Su objetivo es generar solicitudes de cotización y
conversaciones por WhatsApp.

Construido con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4,
como **exportación totalmente estática** para Cloudflare Pages.

---

## Estado actual

La implementación técnica está completa y validada. **El sitio no debe
publicarse todavía**: faltan datos de negocio que sólo el propietario puede
confirmar, empezando por el número de WhatsApp, el teléfono, el correo y el
dominio.

Lista completa: **[`docs/content-verification.md`](docs/content-verification.md)**
— 24 puntos, 8 de ellos bloqueantes.

Nada sin confirmar se publica. Los campos correspondientes están en `null` y la
interfaz **oculta** lo que no puede sostener, en lugar de mostrar un enlace roto
o un dato inventado.

---

## Requisitos

- Node.js **≥ 20.9** (desarrollado con 24.15)
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Comandos

| Comando | Qué hace |
| :-- | :-- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | **Build de producción → `out/`** (export estático) |
| `npm start` | Sirve `out/` en <http://localhost:4310> para revisar el build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run images` | Regenera las renditions responsivas y los derivados de marca |
| `npm run brand` | Muestrea el color del logotipo y audita el contraste WCAG |
| `npm run docs` | Regenera `docs/content-verification.md` desde el código |

> `build` usa **`next build --webpack`** a propósito. El builder Turbopack falla
> en este entorno al levantar su proceso trabajador de PostCSS
> (`binding to a port: Operation not permitted`). Si en su máquina Turbopack
> funciona, `npm run build:turbopack` produce el mismo `out/`.

---

## Despliegue en Cloudflare Pages

Configuración verificada contra la documentación de Cloudflare
(*Pages → Framework guides → Next.js → Static site*, act. 25/08/2026) y contra la
guía de export estático de Next.js 16.3.5:

| Opción | Valor |
| :-- | :-- |
| Preset de framework | **Next.js (Static HTML Export)** |
| Comando de build | **`npm run build`** |
| Directorio de salida | **`out`** |
| Versión de Node | **20 o superior** (variable `NODE_VERSION`) |
| Rama de producción | `main` |

Cloudflare propone `npx next build` en su preset; use **`npm run build`** para
que se aplique el `--webpack` explicado arriba.

`next.config.ts` ya fija lo necesario:

```ts
output: 'export',          // emite HTML/CSS/JS estático en out/
trailingSlash: true,       // /ruta/ → /ruta/index.html
images: { unoptimized: true },
```

No se usa ninguna función incompatible con el export estático: sin SSR, sin rutas
de API, sin middleware, sin Server Actions, sin ISR, sin rutas dinámicas. Las
rutas de metadatos (`sitemap.ts`, `robots.ts`, `manifest.ts`) declaran
`export const dynamic = 'force-static'`, requisito del export.

### Variables de entorno

Todas son opcionales para que el build funcione, y **necesarias para publicar**.
Configúrelas en *Cloudflare Pages → Settings → Environment variables*:

| Variable | Ejemplo de formato | Efecto al definirla |
| :-- | :-- | :-- |
| `NEXT_PUBLIC_ROMO_WHATSAPP` | `521234567890` | Activa los botones de WhatsApp en las 7 ubicaciones y el envío del formulario por WhatsApp |
| `NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY` | `+52 1 33 1234 5678` | Forma legible del número |
| `NEXT_PUBLIC_ROMO_PHONE` | `+523312345678` | Muestra el enlace `tel:` |
| `NEXT_PUBLIC_ROMO_PHONE_DISPLAY` | `+52 33 1234 5678` | Forma legible del teléfono |
| `NEXT_PUBLIC_ROMO_EMAIL` | `cotizaciones@ejemplo.com` | Muestra el enlace `mailto:` |
| `NEXT_PUBLIC_SITE_URL` | `https://romostransportes.com` | Publica la etiqueta canonical y usa el dominio real en sitemap, OpenGraph y JSON-LD |

**Los valores de la tabla son ejemplos de formato, no datos reales.** El número de
WhatsApp va en formato E.164, sólo dígitos, sin `+`.

Mientras `NEXT_PUBLIC_SITE_URL` no esté definida no se publica etiqueta
canonical: un canonical apuntando a un dominio supuesto es peor que no tenerlo.

El dominio se administra por separado (NEUBOX / Cloudflare DNS).

---

## Dónde vive cada cosa

```
src/
  app/
    layout.tsx              metadatos, tipografías autoalojadas, JSON-LD
    page.tsx                orden de las secciones de la landing
    globals.css             tokens de marca y capa de componentes
    fonts/                  los dos .woff2 autoalojados
    aviso-de-privacidad/    página legal
    sitemap.ts robots.ts manifest.ts
  components/
    navigation/  hero/  trust/  services/  fleet/  coverage/
    safety/  industries/  process/  gallery/  about/
    faq/  contact/  footer/  layout/  ui/
  data/                     ← TODO el contenido de negocio
  lib/quote.ts              validación y armado del mensaje de cotización
scripts/
  build-images.mjs          pipeline de imágenes
  build-brand.mjs           muestreo de color + auditoría de contraste
  build-docs.mjs            genera docs/content-verification.md
public/
  images/{hero,fleet,operations,routes,gallery}/
  brand/
docs/
  brand-system.md  competitive-research.md
  content-verification.md  image-assets.md
```

### Contenido de negocio — un solo lugar

| Archivo | Contiene |
| :-- | :-- |
| `src/data/company.ts` | Nombre, contacto, dominio y la lista `pendingVerification` |
| `src/data/services.ts` | Servicios y categorías de mercancía |
| `src/data/fleet.ts` | Equipo, con `specs` publicadas y `pendingSpecs` retenidas |
| `src/data/content.ts` | Puntos clave, diferenciadores, seguridad, proceso, industrias, cobertura, Nosotros |
| `src/data/faqs.ts` | Preguntas frecuentes |
| `src/data/navigation.ts` | Navegación (encabezado, menú móvil y pie, de una sola fuente) |
| `src/data/imageManifest.ts` | **Generado.** No editar a mano |

No hay teléfonos, correos ni dominios repetidos en los componentes.

### Actualizar datos de contacto

Defina las variables de entorno de arriba, o edite el objeto `contact` en
`src/data/company.ts`. Un canal en `null` simplemente no aparece.

### Añadir un servicio o una pregunta frecuente

Añada un elemento a `services` en `src/data/services.ts` o a `faqs` en
`src/data/faqs.ts`. La sección, la navegación del pie y el JSON-LD se actualizan
solos.

### Añadir equipo a la flota

Añada un elemento a `fleet` en `src/data/fleet.ts`. Ponga en `specs` **sólo**
atributos observables en la fotografía; todo lo que necesite un documento o la
palabra del propietario va en `pendingSpecs`, que **nunca se renderiza**.

### Añadir fotografías

Ver [`docs/image-assets.md`](docs/image-assets.md) § *Cómo añadir o cambiar
fotografías*.

---

## Formulario de cotización

El sitio es estático y no hay backend ni credenciales de ningún proveedor de
formularios, así que la entrega es **100 % del lado del cliente**: se valida la
entrada, se arma un mensaje en español legible y se entrega.

- Con número de WhatsApp configurado → abre WhatsApp con el mensaje ya escrito.
- Sin número configurado → copia la solicitud al portapapeles para que nada de lo
  que escribió el visitante se pierda, y lo dice con claridad.

**Nunca se muestra un "mensaje enviado" falso.** El formulario es una vía de
conversión real, no un adorno.

Formato del mensaje generado:

```
Hola, me gustaría solicitar una cotización con Romo's Transportes.

Nombre: …
Empresa: …
Teléfono: …
Correo: …
Origen: …
Destino: …
Mercancía: …
Peso aproximado: …
Tipo de unidad: …
Fecha estimada: …
Comentarios: …
```

Los campos vacíos se omiten. Obligatorios: nombre, teléfono, origen, destino y
tipo de mercancía. Los otros seis son opcionales.

### Si más adelante quiere recibirlo en un buzón

Sustituya únicamente el paso de entrega en
`src/components/contact/QuoteForm.tsx` (la función `onSubmit`). Las opciones
compatibles con Cloudflare Pages son una Pages Function dedicada
(`functions/api/cotizacion.ts`) o un proveedor de formularios estáticos. El resto
del formulario —validación, accesibilidad, armado del mensaje— no cambia.

### Analítica

No se carga ningún script de terceros. Cada CTA emite un evento `romo:cta` en el
DOM con `detail.cta` y `detail.place`, listo para conectar la herramienta que se
elija sin tocar los botones.

---

## Validación realizada

| Comprobación | Resultado |
| :-- | :-- |
| `npm run typecheck` | Sin errores |
| `npm run lint` | Sin errores ni advertencias |
| `npm run build` | 6 rutas, todas estáticas, `out/` generado |
| Export estático | `index.html`, `404.html`, `aviso-de-privacidad/`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` |
| Errores de consola | Ninguno |
| Peticiones fallidas | Ninguna |
| Peticiones a terceros | **Ninguna** |
| Imágenes | 22/22 cargan, todas servidas en AVIF |
| **CLS** | **0** (sin un solo desplazamiento registrado) |
| LCP | La imagen del hero (AVIF precargada), elemento LCP correcto |
| Desbordamiento horizontal | Ninguno en 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1600 px |
| Jerarquía de encabezados | Un solo `h1`, sin saltos de nivel |
| Alt text | Presente en las 22 imágenes; `alt=""` en las 2 decorativas |
| Objetivos táctiles | Todos ≥24 px (WCAG 2.5.8) |
| Foco de teclado | Anillo crema visible, 2 px, contraste 12.4:1 |
| Menú móvil | `aria-expanded`, trampa de foco, Escape cierra y devuelve el foco, bloqueo de scroll |
| Formulario | Etiquetas, `aria-invalid`, `aria-describedby`, resumen con `role="alert"` y foco |
| Preguntas frecuentes | `<details>`/`<summary>` nativos, funcionan sin JavaScript |
| Contraste | 13/13 combinaciones cumplen AA (`npm run brand`) |
| `prefers-reduced-motion` | Respetado; el contenido nunca queda oculto sin JavaScript |

### Peso de la primera visita (escritorio, arriba del pliegue)

| Recurso | gzip |
| :-- | --: |
| JS + CSS (navegador moderno; el polyfill es `nomodule`) | 148.3 KB |
| `index.html` | 43.2 KB |
| Tipografías (2 × woff2) | 43.7 KB |
| Imagen del hero (AVIF) | 27.0 KB |
| Logotipo (AVIF) | 3.1 KB |
| **Total** | **≈265 KB** |

Cloudflare sirve Brotli, así que el número real será menor (≈235 KB estimado).
Los 148 KB de JS son el piso de React 19 + App Router; el código propio de la
página son 7.6 KB.

### Lo que todavía **no** está medido

Las cifras de arriba se tomaron con el build de producción servido en local.
**No se ha corrido Lighthouse contra un despliegue real** y por eso no se
reportan puntuaciones. Los objetivos (Performance ≥90, Accessibility ≥95, Best
Practices ≥95, SEO ≥95) deben medirse después del primer despliegue en
Cloudflare Pages, con el dominio y los datos de contacto ya configurados.

---

## SEO

- Título y descripción orientados a transporte de carga nacional, sin saturar
  palabras clave.
- OpenGraph y Twitter Card con imagen 1200×630 generada del logotipo.
- `sitemap.xml`, `robots.txt`, manifiesto web y favicons.
- JSON-LD: `Organization`, un nodo `Service` por servicio y `FAQPage`.
- **Sin** `aggregateRating`, reseñas, premios ni certificaciones: nada de eso
  está verificado, y el marcado de reseñas falso además viola las políticas de
  los buscadores.
- `LocalBusiness` se omite a propósito porque exige una dirección física que no
  ha sido confirmada.
- La etiqueta canonical aparece sólo cuando `NEXT_PUBLIC_SITE_URL` está definida.

## Documentación

| Documento | Contenido |
| :-- | :-- |
| [`docs/content-verification.md`](docs/content-verification.md) | **Generado.** Los 24 datos que el propietario debe confirmar |
| [`docs/brand-system.md`](docs/brand-system.md) | Color medido, tipografías evaluadas y elegidas, geometría, uso del logotipo |
| [`docs/competitive-research.md`](docs/competitive-research.md) | Cinco transportistas analizadas, patrones adoptados y rechazados |
| [`docs/image-assets.md`](docs/image-assets.md) | Procedencia, pipeline, mapa de uso, recortes deliberados |
