# Sistema de marca — Romo's Transportes

Todo lo que sigue se derivó del logotipo real. El punto de partida no fue una
plantilla a la que después se le pegó el logo: se midió el logo primero y el
sitio se construyó desde ahí.

Reproducible con `npm run brand` (muestreo de color + auditoría de contraste) y
`npm run images` (derivados del logotipo y fotografía).

## 1. Análisis del logotipo

El archivo entregado (`logo.jpg`, 1280 × 1275) es una **fotografía** de la
insignia, no un vector. De ella se leen:

- Placa angular tipo escudo hexagonal, con contorno **escalonado** y montada en
  diagonal.
- Contorno color crema envejecido, con **textura granulada**.
- Interior casi negro.
- Wordmark "ROMO'S" muy pesado: "RO" en crema, "MO'S" en rojo.
- "TRANSPORTES" en delgada, mayúsculas, **muy espaciada**.
- Tractocamión con caja dibujado en **line art** de trazo uniforme.
- Diagonales fuertes; sensación de movimiento y peso industrial.

Consecuencias prácticas de que sea una fotografía y no un vector:

1. Trae viñeteado y un borde iluminado a la izquierda, por lo que no recorta
   limpio contra un fondo plano.
2. El wordmark interior deja de ser legible por debajo de ~64 px.
3. PNG es un formato malo para ella (un PNG de 512 px pesó 455 KB).

Las tres se resolvieron en diseño, sin retocar el arte. Ver §6.

## 2. Color — medido, no estimado

`scripts/build-brand.mjs` muestrea el archivo y promedia los tres pigmentos de
la insignia:

| Pigmento | Media medida | Píxeles muestreados |
| :-- | :-- | :-- |
| Campo oscuro | `#080503` | 117 098 |
| Contorno crema | `#cbc195` | 38 166 |
| Rojo del wordmark | `#930f12` | 5 470 |

Clústeres dominantes: `#000000` (57.8 %), `#100000` (6.6 %), `#d0c090` (3.2 %),
`#c0b080` (2.8 %), `#e0d0a0` (1.2 %).

Los valores enviados redondean cada clúster hacia su extremo más limpio para que
la tipografía respire, conservando la identidad:

```css
--color-romo-black:        #080503;  /* = media medida, sin ajuste */
--color-romo-charcoal:     #11100e;
--color-romo-surface:      #181613;
--color-romo-surface-2:    #211e19;

--color-romo-cream:        #d5cb9d;  /* crema de marca */
--color-romo-cream-light:  #eee7ce;  /* banda clara y texto sobre oscuro */
--color-romo-paper:        #f4efdd;

--color-romo-red:          #940f12;  /* ≈ media medida #930f12 */
--color-romo-red-bright:   #b3151a;  /* hover / activo */
--color-romo-red-deep:     #6f0b0e;

--color-romo-white:        #f7f4eb;  /* blanco cálido, nunca #fff puro */
--color-romo-muted:        #aaa38e;
--color-romo-muted-dark:   #4a4636;  /* texto secundario en banda clara */
--color-romo-border:       #3d392f;
--color-romo-border-light: #d8d0b4;
```

### Tokens semánticos

Los componentes **nunca** usan la paleta cruda; usan la capa semántica, de modo
que una banda completa se re-tematiza en un solo lugar:

`--background`, `--background-secondary`, `--surface`, `--surface-elevated`,
`--foreground`, `--foreground-strong`, `--foreground-muted`, `--primary`,
`--primary-hover`, `--primary-foreground`, `--accent`, `--border`, `--focus`,
`--success`, `--error`.

La clase `.band-light` invierte esa capa para las secciones claras. No hay un
segundo sistema de color: **la crema sustituye al blanco**, así la calidez de la
marca sobrevive en fondo claro.

### Auditoría de contraste (WCAG)

Las 13 combinaciones que el sitio realmente usa, verificadas por script:

| Ratio | Combinación | Mínimo | Resultado |
| --: | :-- | --: | :-- |
| 16.41:1 | cream-light sobre black | 4.5 | PASS |
| 12.44:1 | cream sobre black | 4.5 | PASS |
| 8.07:1 | muted sobre black | 4.5 | PASS |
| 11.06:1 | cream sobre surface | 4.5 | PASS |
| 8.17:1 | white sobre red (botón primario) | 4.5 | PASS |
| 6.28:1 | white sobre red-bright (hover) | 4.5 | PASS |
| 15.36:1 | charcoal sobre cream-light | 4.5 | PASS |
| 7.64:1 | muted-dark sobre cream-light | 4.5 | PASS |
| 7.26:1 | red sobre cream-light | 4.5 | PASS |
| 16.51:1 | charcoal sobre paper | 4.5 | PASS |
| 4.84:1 | error sobre charcoal | 4.5 | PASS |
| 12.44:1 | anillo de foco crema sobre black | 3.0 | PASS |
| 7.26:1 | anillo de foco rojo sobre cream-light | 3.0 | PASS |

`npm run brand` termina con código de salida distinto de cero si alguna baja del
umbral, así que un cambio de paleta no puede romper el contraste en silencio.

### Uso del rojo

El rojo se reserva para: botón primario, hover y estados activos, foco de
formulario, subrayado del enlace activo de navegación, reglas cortas bajo
encabezados, marcas de viñeta, numeración de la sección de seguridad y la
franja tipo señalización del pie. **Nunca** como fondo de página completa. La
fotografía es la que domina visualmente.

## 3. Tipografía — investigación y decisión

El logo contiene dos ideas tipográficas opuestas: un wordmark display muy pesado
y un "TRANSPORTES" delgado y espaciado.

### Candidatas evaluadas para display

Se compusieron los titulares reales del sitio ("ROMO'S TRANSPORTES", "TU CARGA,
EN BUENAS MANOS", "PLATAFORMAS Y CAJAS SECAS", "SOLICITA UNA COTIZACIÓN") con
cada candidata:

| Fuente | Resultado | Motivo |
| :-- | :-- | :-- |
| **Archivo Black** | **Seleccionada** | Grotesca muy pesada, terminaciones planas, contadores cuadrados. Es lo que el wordmark realmente es. |
| Bevan | Rechazada | Slab con carácter "western"; añade una época que la marca no tiene. |
| Alfa Slab One | Rechazada | Demasiado decorativa; compite con la insignia. |
| Roboto Slab Black | Rechazada | Los remates slab generan ruido a tamaño display. |
| Bitter Black / ExtraBold | Rechazada | Pensada para texto; pierde contundencia en titular. |
| Arvo Bold | Rechazada | Peso insuficiente frente al wordmark. |

**Hallazgo que corrigió la dirección inicial:** el material sugería explorar
slabs, pero al ampliar el logo el wordmark **no tiene remates**. La "R" tiene
pierna recta, las contraformas son casi cuadradas y las terminaciones son planas:
es una grotesca pesada. Una slab peleaba con la insignia en lugar de extenderla.

### Texto y etiquetas

**Archivo** (variable, 400–700) — la hermana de texto de la misma familia, así
que display, etiquetas y cuerpo comparten esqueleto y proporciones. Archivo
también nace del lenguaje de la señalización vial, lo que encaja con una marca de
transporte. Se evaluaron Inter, Manrope, Source Sans 3, Barlow Condensed y
Oswald; se descartaron por no aportar nada sobre Archivo y por costar un archivo
más.

### El "TRANSPORTES" delgado y espaciado

Se resuelve con **tracking**, no con una tercera fuente ni con el eje `wdth`:
`.overline` usa `letter-spacing: 0.22em` en mayúsculas; `.label-tech`, `0.16em`.

Se descartó explícitamente cargar el eje `wdth` de Archivo: el corte de dos ejes
de Google pesa **90 KB** frente a **35 KB** del corte sólo de peso, y 55 KB no
valían una condensación ligera en las antetítulos.

### Carga

Autoalojada con `next/font/local` desde `src/app/fonts/`. Dos archivos, subset
`latin` únicamente (su cobertura incluye á é í ó ú ñ ü ¿ ¡):

| Archivo | Peso |
| :-- | --: |
| `Archivo-Variable-latin.woff2` (400–700) | 35 KB |
| `ArchivoBlack-latin.woff2` (400) | 10 KB |

Autoalojar, en vez de `next/font/google`, quita una dependencia de red del build
—Cloudflare Pages no puede fallar porque Google Fonts esté inaccesible— y hace el
bundle determinista. El navegador nunca pide nada a un tercero.

### Escala

```
display-1  clamp(2.25rem, 6.2vw, 4.5rem)     titular del hero
display-2  clamp(1.875rem, 4.4vw, 3.125rem)  encabezado de sección
display-3  clamp(1.375rem, 2.6vw, 1.875rem)  subsección
lede       clamp(1.0625rem, 1.5vw, 1.25rem)  párrafo de entrada, máx 46ch
cuerpo     1rem / 1.65
overline   0.75rem, tracking 0.22em, mayúsculas
label-tech 0.6875rem, tracking 0.16em, mayúsculas
```

`line-height: 1.02` y `letter-spacing: -0.015em` en titulares, para que el peso
del display se lea como bloque compacto, igual que el wordmark.

## 4. Geometría derivada del logo

La insignia es angular, escalonada y diagonal. Eso se traduce en utilidades
reutilizables, **sin estampar el contorno del escudo alrededor de cada
componente**:

| Utilidad | Qué hace | Dónde |
| :-- | :-- | :-- |
| `.cut-corner` | Una esquina recortada (1.25rem) | Tarjetas, placa del logo |
| `.cut-corner-lg` | Esquina recortada mayor (2.25rem) | Tarjetas de flota, panel del formulario |
| `.cut-frame` | Esquinas opuestas recortadas | Marcos de fotografía |
| `.hatch` | Trama diagonal a 115° | Fondo del hero, cortes fotográficos, mapa |
| `.lane-rule` | Raya discontinua tipo señalización | Divisor de proceso y pie |
| `.rule-brand` | Regla roja corta bajo encabezado | Encabezados de sección |
| `.card-ticked` | Marca roja en el borde superior | Tarjetas de servicio |

Radio de botón: **8 px**. No se usan formas tipo pastilla.

## 5. Tratamiento fotográfico

Las fuentes miden 897–1080 px de ancho. La regla que gobierna todo el layout:
**no se hace upscale**. En lugar de estirar, se contiene.

- El hero vive en una **columna contenida** con marco angular, no a sangre
  completa; así el origen de ~900 px nunca se estira en pantalla grande.
- Los cortes fotográficos a ancho completo usan **la toma nocturna** y llevan
  velo oscuro: los píxeles oscuros disimulan el techo de resolución que una toma
  diurna brillante delataría.
- La fotografía se enmarca con la geometría de la marca (línea crema, bloque
  rojo desplazado, esquinas recortadas) en lugar de alterar la imagen.
- Nada de HDR, saturación extrema, cielos falsos, destellos ni iluminación
  generada. Las fotos se ven como lo que son: operación real.

## 6. Uso del logotipo

- Se respeta la **proporción natural** (~1.21:1). Nunca se estira, rota ni
  recolorea. La caja de la insignia se midió por histograma de densidad de tinta
  sobre el contorno crema y el rojo del wordmark, no a ojo.
- Los iconos cuadrados usan `fit: contain` sobre negro de marca, para que el
  wordmark **no se recorte** (una primera versión con `cover` cortaba la "S").
- **Placa de marca:** en encabezado y pie la insignia se asienta sobre una placa
  deliberada —negro plano de marca, filete de 1 px y esquina recortada—. Es la
  solución de diseño al viñeteado de la fotografía: convierte el rectángulo en
  una decisión en lugar de un artefacto. Se desactiva con `plated={false}` donde
  la insignia ya está sobre su propio panel oscuro.
- **Bloqueo tipográfico:** por debajo de ~64 px el wordmark interior deja de
  leerse, así que a tamaño de encabezado la insignia se acompaña del nombre
  compuesto en las tipografías de marca. Es la insignia real más tipografía real:
  no se inventa ningún monograma y no se redibuja la insignia.
- Formatos: AVIF/WebP para la insignia en página (fotográfica); PNG sólo donde la
  plataforma lo exige (favicon, apple-touch-icon, iconos del manifiesto).

> **Petición abierta al propietario:** un original vectorial o un PNG con
> transparencia permitiría retirar la placa y mejoraría notablemente el
> encabezado. Registrado en `docs/content-verification.md`.

## 7. Ritmo de secciones

La página alterna a propósito entre superficie oscura de marca y banda crema
cálida, con dos cortes fotográficos partiendo los tramos largos de texto:

```
hero (oscuro) → puntos clave (carbón) → servicios (claro) → flota (oscuro)
→ corte fotográfico → seguridad (carbón) → cobertura (claro)
→ tipos de carga (carbón) → proceso (claro) → galería (oscuro)
→ nosotros (claro) → CTA de cotización (fotográfico) → preguntas (claro)
→ contacto (oscuro) → pie
```

## 8. Movimiento

Sólo CSS; no se añadió ninguna librería de animación. Un único
`IntersectionObserver` alterna la clase `is-visible` sobre `[data-reveal]`.

Doble protección para que el contenido nunca quede atrapado detrás de una
animación que no puede ejecutarse:

1. El estado inicial oculto vive dentro de
   `@media (prefers-reduced-motion: no-preference)`.
2. Además depende del atributo `data-motion="on"`, que un script en línea escribe
   en `<html>`. Sin JavaScript el atributo nunca aparece y todo se ve.

Con `prefers-reduced-motion: reduce` se anulan las transiciones y el
desplazamiento suave, y la galería pasa a desplazamiento instantáneo.

## 9. Nota de cascada (fue un error real)

Las clases de componente vivían al **nivel superior** de la hoja de estilos.
El CSS sin capa gana sobre el CSS en capa, así que `.btn { display: inline-flex }`
vencía a la utilidad `lg:hidden` de Tailwind y **el botón de menú móvil seguía
visible en escritorio**. Todo el bloque se movió a `@layer components`, de modo
que la capa `utilities` de Tailwind queda después y las sobrescrituras puntuales
funcionan. Si se añaden clases de componente, deben ir dentro de esa capa.
