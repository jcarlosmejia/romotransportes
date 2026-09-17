# Romo's Transportes — landing page

Sitio comercial de una página para **Romo's Transportes**, empresa mexicana de
transporte terrestre de carga. Su objetivo es generar solicitudes de cotización y
conversaciones por WhatsApp.

Construido con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4,
como **exportación totalmente estática** para Cloudflare Pages.

---

## Estado actual

**Listo para desplegar.** El propietario firmó el contenido, las fotografías, las
especificaciones de equipo y los datos de contacto el **17 de septiembre de
2026**, y esos datos ya están integrados:

| Dato | Valor publicado |
| :-- | :-- |
| WhatsApp y teléfono | `+52 33 2383 8729` |
| Correo | `jcarlosmejiaayala@gmail.com` |
| Dominio | `https://romostransportes.com.mx` |
| Inicio de operaciones | 2010 |
| Cobertura | Culiacán, Hermosillo, Tijuana, Tecate, León, interior de Jalisco, y otras rutas nacionales |
| Seguro, GPS y monitoreo | Publicados en la sección de Seguridad |
| Destino del formulario | WhatsApp (principal) y el correo anterior (secundario) |

Quedan **10 puntos de mejora**, **ninguno bloqueante**:
**[`docs/content-verification.md`](docs/content-verification.md)**.

Sigue vigente la regla del proyecto: nada sin confirmar se publica. Por eso el
sitio **no** afirma número de unidades (el propietario pidió manejarlo de forma
genérica), ni 36 t ni suspensión de aire en plataforma, ni medidas de caja seca,
ni ninguna certificación con nombre — se autorizó mencionarlas, pero no se
indicó cuál, y un "contamos con certificaciones" sin nombre no es verificable.

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

### Cabeceras HTTP

Un export estático no puede emitir cabeceras desde `next.config.ts`, así que van
en **`public/_headers`**, que Next copia a `out/_headers` y Cloudflare Pages lee
automáticamente. Incluye:

- Cabeceras de seguridad: `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security` (sin
  `preload`, porque inscribirse en la lista HSTS es difícil de revertir y es
  decisión del propietario) y `Cross-Origin-Opener-Policy`.
- Caché inmutable de un año para `/_next/static/*`, que llevan hash en el
  nombre. Sin esto, Cloudflare Pages los sirve con `max-age=0,
  must-revalidate` y cada visita repetida los revalida.
- Caché de una semana con `stale-while-revalidate` para `/images/*` y
  `/brand/*`.
- HTML siempre revalidado, para que un redespliegue se vea de inmediato.

No se declara `Content-Security-Policy`: el sitio no renderiza contenido de
usuario ni carga scripts de terceros, así que la superficie es mínima, y una CSP
mal calibrada rompería el script en línea que habilita las animaciones. Queda
como endurecimiento opcional.

### Variables de entorno

**No hace falta configurar ninguna para publicar.** Los datos confirmados están
en `src/data/company.ts` y el build ya los incluye. Las variables existen sólo
para sobrescribirlos sin tocar código:

| Variable | Valor por omisión (ya integrado) |
| :-- | :-- |
| `NEXT_PUBLIC_ROMO_WHATSAPP` | `523323838729` (E.164, sólo dígitos, sin `+`) |
| `NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY` | `+52 33 2383 8729` |
| `NEXT_PUBLIC_ROMO_PHONE` | `+523323838729` |
| `NEXT_PUBLIC_ROMO_PHONE_DISPLAY` | `+52 33 2383 8729` |
| `NEXT_PUBLIC_ROMO_EMAIL` | `jcarlosmejiaayala@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://romostransportes.com.mx` |

Caso de uso real de la sobrescritura: en un despliegue de vista previa
(`*.pages.dev`), defina `NEXT_PUBLIC_SITE_URL` con ese subdominio para que la
etiqueta canonical y el sitemap no apunten al dominio de producción.

El dominio se administra por separado (NEUBOX / Cloudflare DNS); ver
§ *Dominio y DNS* más abajo.

### Pasos en el panel de Cloudflare

1. *Workers & Pages* → **Create** → pestaña **Pages** → **Connect to Git**.
2. Autorice el repositorio y elija la rama `main`.
3. En *Build settings*:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: **`npm run build`**
   - Build output directory: **`out`**
4. En *Variables and Secrets*, añada **`NODE_VERSION` = `20`** (o superior). Es
   la única variable realmente necesaria.
5. **Save and Deploy.**

### Dominio y DNS

En *Pages → el proyecto → Custom domains*, agregue `romostransportes.com.mx` y
`www.romostransportes.com.mx`. Cloudflare indicará los registros a crear:

- Si el dominio ya usa los nameservers de Cloudflare, los registros se crean
  automáticamente.
- Si el DNS sigue en NEUBOX, cree ahí el `CNAME` que Cloudflare le indique
  apuntando al subdominio `*.pages.dev` del proyecto. Para el dominio raíz,
  NEUBOX debe soportar `CNAME` plano o `ALIAS`; si no lo soporta, conviene mover
  los nameservers a Cloudflare.

### Después del primer despliegue

Falta una sola cosa que no se puede medir en local — **correr Lighthouse contra
la URL publicada** y registrar los resultados. Los objetivos son Performance
≥90, Accessibility ≥95, Best Practices ≥95 y SEO ≥95.

Conviene además:

- Verificar en un teléfono real que el botón de WhatsApp abre la app con el
  mensaje ya escrito.
- Enviar una solicitud de prueba por correo y confirmar que llega a
  `jcarlosmejiaayala@gmail.com`.
- Dar de alta el sitio en Google Search Console y enviar
  `https://romostransportes.com.mx/sitemap.xml`.

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

## Botón flotante de WhatsApp

WhatsApp tiene **un solo punto de entrada** en todo el sitio: un botón flotante
con el icono oficial, fijo en la esquina inferior derecha
(`src/components/layout/WhatsAppFloat.tsx`).

Es un `<a>` simple a un enlace `wa.me` con el mensaje ya codificado, así que
**un clic abre WhatsApp de inmediato**: sin modal, sin formulario, sin copiar
texto y sin elegir entre varios CTA. Como no necesita estado, es un componente
de servidor y no envía JavaScript al navegador.

Sustituyó a los seis botones de WhatsApp que estaban en encabezado, hero, menú
móvil, CTA de media página, contacto y pie.

### Color, medido

El lockup oficial es glifo blanco sobre `#25D366`, que da apenas **1.98:1** —
por debajo del 3:1 que WCAG 1.4.11 exige a objetos gráficos. El relleno enviado
es verde WhatsApp oscurecido a **`#1FA855`**, que sostiene el glifo blanco en
**3.09:1** y sigue siendo inconfundiblemente WhatsApp.

Ese verde da 6.57:1 contra la superficie oscura de la marca, pero sólo **2.50:1
contra las bandas crema**, así que el borde del botón lo define un **anillo de
2 px en negro de marca**: 16.41:1 sobre crema y 6.57:1 sobre el propio relleno.
El botón se distingue con claridad en todas las bandas de la página.

El hover y el press van **más oscuros** (`#178644`, 4.64:1), no más claros, de
modo que el contraste del glifo mejora al interactuar en lugar de degradarse.

### Colocación

`position: fixed` con `env(safe-area-inset-*)` para librar el indicador de
inicio de iOS y la barra de gestos de Android. En móvil queda elevado sobre la
barra fija de "Cotizar" con un desplazamiento **constante** —no reactivo—
porque un valor que reaccionara a la aparición de la barra hacía vibrar el
botón a media página. Medido en 390×844: separación de 8 px entre el botón y la
barra, sin solape, y el relleno derecho de la barra mantiene su contenido libre.

Tamaño: 56 px en móvil, 60 px en escritorio; por encima del mínimo de 44 px.

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
| Imágenes | 21/21 cargan, todas servidas en AVIF |
| **CLS** | **0** (sin un solo desplazamiento registrado) |
| LCP | La imagen del hero (AVIF precargada), elemento LCP correcto |
| Desbordamiento horizontal | Ninguno en 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1600 px |
| Jerarquía de encabezados | Un solo `h1`, sin saltos de nivel |
| Alt text | Presente en las 21 imágenes; `alt=""` en las 2 decorativas |
| Objetivos táctiles | Todos ≥24 px (WCAG 2.5.8) |
| Foco de teclado | Anillo crema visible, 2 px, contraste 12.4:1 |
| Menú móvil | `aria-expanded`, trampa de foco, Escape cierra y devuelve el foco, bloqueo de scroll |
| Formulario | Etiquetas, `aria-invalid`, `aria-describedby`, resumen con `role="alert"` y foco |
| Entrega del formulario | WhatsApp verificado con el número real; `mailto:` verificado (acentos, guión largo y saltos de línea íntegros) |
| Botón flotante de WhatsApp | Un solo enlace `wa.me` en la página; 1 clic, 0 modales, 0 formularios; `target="_blank"` con `rel="noopener noreferrer"`; sin solape con la barra fija en 390×844 |
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

Las cifras de arriba se tomaron con el build de producción servido en local, sin
latencia de red y sin compresión del servidor. **No se ha corrido Lighthouse
contra un despliegue real**, así que este documento no reporta puntuaciones.
Medirlas es el primer paso después del despliegue (ver
§ *Después del primer despliegue*).

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
