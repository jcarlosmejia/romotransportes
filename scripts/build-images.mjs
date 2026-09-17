#!/usr/bin/env node
/**
 * Romo's Transportes — responsive image pipeline.
 *
 * WHY THIS SCRIPT EXISTS
 * ----------------------
 * A prepared asset package (see docs/image-assets.md) established the crop
 * ratios, orientation fixes, section mapping, slugs and Spanish alt text for the
 * available Romo's photography. That package is treated here as the
 * *specification*. The renditions themselves are rendered once from the original
 * photographs rather than from the package's already-compressed JPEGs, because:
 *
 *   1. Five of the fifteen original photographs had no prepared rendition at all.
 *   2. The package capped output at 768px even for 1079/1080px-wide sources; the
 *      extra pixels are real and useful for desktop.
 *   3. Re-encoding a compressed JPEG into WebP/AVIF compounds artifacts.
 *      Encoding once from the original does not.
 *
 * NEVER UPSCALE. Every rendition width is clamped to the cropped source width,
 * so no synthetic pixels are introduced. The original sources are 897–1080px
 * wide; the layout is designed around that real ceiling (contained image
 * columns, not stretched full-bleed photography).
 *
 * Usage: npm run images
 */

import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = '/Users/juancarlosmejiaayala/Downloads/Romotransportes_imagenes';
const OUT_ROOT = path.resolve(import.meta.dirname, '..', 'public', 'images');
const BRAND_OUT = path.resolve(import.meta.dirname, '..', 'public', 'brand');
const MANIFEST = path.resolve(import.meta.dirname, '..', 'src', 'data', 'imageManifest.ts');

/** Rendition widths requested per slot. Clamped to the real source width. */
const WIDTHS = [480, 768, 1080];

/**
 * Crop geometry.
 *
 * `ratio`   — target aspect ratio (w/h). A centre-weighted crop is taken unless
 *             `gravity` or `region` narrows it.
 * `region`  — explicit fractional crop {left,top,width,height} of the source,
 *             used only where a photograph needs deliberate framing (excluding a
 *             camera watermark, de-emphasising third-party signage, or keeping the
 *             truck out of dead asphalt).
 */
const PHOTOS = [
  {
    slug: 'romo-black-flatbed-recycled-load-highway',
    file: 'Screenshot_20260916_200126_WhatsApp.jpg',
    dir: 'hero',
    ratio: 16 / 9,
    // Trim dead foreground asphalt; keep the overpass + golden-hour sky.
    region: { left: 0.0, top: 0.03, width: 1.0, height: 0.82 },
    alt: "Tractocamión de Romo's Transportes con plataforma cargada de material enfardado, en operación al atardecer junto a una carretera.",
    caption: 'Plataforma cargada — operación al atardecer',
  },
  {
    // Mobile hero. A true portrait crop is impossible without upscaling (the
    // source is 1079x608), so 4:3 is the tallest framing the pixels support —
    // 810px wide, which covers a 390px phone at better than 2x.
    slug: 'romo-black-flatbed-recycled-load-highway-mobile',
    file: 'Screenshot_20260916_200126_WhatsApp.jpg',
    dir: 'hero',
    ratio: 4 / 3,
    region: { left: 0.0, top: 0.03, width: 1.0, height: 0.9 },
    alt: "Tractocamión de Romo's Transportes con plataforma cargada de material enfardado, en operación al atardecer junto a una carretera.",
    caption: 'Plataforma cargada — operación al atardecer',
  },
  {
    // Fleet / "Tractocamiones". Cropped low and wide so the client's ISO-9001
    // signage on the warehouse behind the unit stays out of the frame.
    slug: 'romo-purple-flatbed-facility-wide',
    file: 'Screenshot_20260916_200253_WhatsApp.jpg',
    dir: 'fleet',
    ratio: 3 / 2,
    region: { left: 0.0, top: 0.24, width: 0.92, height: 0.62 },
    alt: "Tractocamión morado de Romo's Transportes con plataforma de tres ejes vacía, listo para cargar.",
    caption: 'Plataforma de tres ejes lista para carga',
  },
  {
    slug: 'romo-purple-dry-van-mountains',
    file: 'Screenshot_20260916_200455_WhatsApp.jpg',
    dir: 'fleet',
    ratio: 3 / 2,
    region: { left: 0.0, top: 0.02, width: 1.0, height: 0.86 },
    alt: "Tractocamión morado de Romo's Transportes conectado a una caja seca, en un entorno de carretera y montaña.",
    caption: 'Caja seca — mercancía protegida del clima',
  },
  {
    slug: 'romo-purple-dry-van-night',
    file: 'Screenshot_20260916_200508_WhatsApp.jpg',
    dir: 'operations',
    ratio: 16 / 9,
    region: { left: 0.0, top: 0.06, width: 1.0, height: 0.8 },
    alt: "Tractocamión morado de Romo's Transportes con caja seca durante una operación nocturna, con las luces encendidas.",
    caption: 'Operación nocturna',
  },
  {
    slug: 'romo-fleet-night-branding',
    file: 'Screenshot_20260916_200422_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    // Cropped in from the left so the regulatory identifier block stencilled on
    // the cab (ICC MC / USDOT / CA / partial VIN / KYU) falls outside the frame,
    // while the Romo's badge on the door and both units stay in it. This is
    // framing, not retouching — the plate itself is untouched, and the owner is
    // still asked to confirm identifier visibility in docs/content-verification.md.
    region: { left: 0.21, top: 0.04, width: 0.79, height: 0.92 },
    alt: "Unidades de Romo's Transportes estacionadas durante una operación nocturna, con el emblema de la empresa visible en la puerta del tractocamión.",
    caption: "Emblema Romo's en unidad propia",
  },
  {
    slug: 'romo-purple-flatbed-steel-pipes-warehouse',
    file: 'Screenshot_20260916_200146_WhatsApp.jpg',
    dir: 'operations',
    ratio: 3 / 2,
    region: { left: 0.0, top: 0.02, width: 1.0, height: 0.9 },
    alt: "Tractocamión morado de Romo's Transportes con plataforma cargada de tubería de acero dentro de una nave industrial.",
    caption: 'Carga de tubería de acero en nave industrial',
  },
  {
    slug: 'romo-steel-structures-flatbed',
    file: 'Screenshot_20260916_200220_WhatsApp.jpg',
    dir: 'operations',
    ratio: 3 / 2,
    // The lower-left corner of this source carries a phone-camera watermark.
    // Cropping it out is non-destructive framing: no pixel is synthesised or
    // painted over. See docs/content-verification.md.
    region: { left: 0.06, top: 0.0, width: 0.94, height: 0.8 },
    alt: 'Plataforma con estructuras metálicas de gran dimensión aseguradas con bandas para su traslado.',
    caption: 'Estructura metálica asegurada sobre plataforma',
  },
  {
    slug: 'romo-load-securing-rebar-warehouse',
    file: 'Screenshot_20260916_200135_WhatsApp.jpg',
    dir: 'operations',
    ratio: 4 / 5,
    region: { left: 0.0, top: 0.0, width: 1.0, height: 0.42 },
    alt: 'Personal con casco y chaleco de seguridad sobre una plataforma cargada con varilla de acero, durante la maniobra de sujeción.',
    caption: 'Maniobra de carga y sujeción',
  },
  {
    slug: 'romo-forage-load-highway',
    file: 'Screenshot_20260916_200204_WhatsApp.jpg',
    dir: 'routes',
    ratio: 16 / 9,
    region: { left: 0.0, top: 0.0, width: 1.0, height: 0.74 },
    alt: 'Dos plataformas cargadas y cubiertas circulando por una carretera nacional.',
    caption: 'Traslado por carretera nacional',
  },
  {
    slug: 'romo-forage-load-yard',
    file: 'Screenshot_20260916_200345_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    region: { left: 0.02, top: 0.08, width: 0.96, height: 0.72 },
    alt: 'Plataformas con carga agrícola enfardada durante una operación de transporte.',
    caption: 'Carga agrícola enfardada',
  },
  {
    slug: 'romo-black-flatbed-palletized-load',
    file: 'Screenshot_20260916_200408_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    // Crop toward the unit so third-party facility signage is not the subject.
    region: { left: 0.1, top: 0.2, width: 0.78, height: 0.5 },
    alt: 'Tractocamión con plataforma cargada de mercancía paletizada en una instalación industrial.',
    caption: 'Mercancía paletizada sobre plataforma',
  },
  {
    // Captured in portrait on a phone and stored rotated, so the source needs a
    // 270-degree correction before any crop is taken.
    slug: 'romo-white-flatbed-workshop',
    file: 'Screenshot_20260916_200228_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    rotate: 270,
    region: { left: 0.0, top: 0.0, width: 1.0, height: 1.0 },
    alt: 'Tractocamión blanco conectado a una plataforma de tres ejes dentro de una nave de mantenimiento.',
    caption: 'Unidad y plataforma en nave de mantenimiento',
  },
  {
    slug: 'romo-scrap-load-flatbed',
    file: 'Screenshot_20260916_200308_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    region: { left: 0.0, top: 0.0, width: 1.0, height: 0.86 },
    alt: 'Plataforma con carga de material metálico cubierta y asegurada para su traslado.',
    caption: 'Material metálico cubierto y asegurado',
  },
  {
    slug: 'romo-fleet-lineup-street',
    file: 'Screenshot_20260916_200156_WhatsApp.jpg',
    dir: 'gallery',
    ratio: 3 / 2,
    region: { left: 0.0, top: 0.0, width: 0.94, height: 0.88 },
    alt: "Tractocamiones de Romo's Transportes estacionados, listos para iniciar operación.",
    caption: 'Unidades listas para salir a ruta',
  },
];

/**
 * `Screenshot_20260916_200332` (patio de operaciones) is intentionally NOT
 * shipped: the frame is visually cluttered, dominated by standing water and
 * loose pallets, and third-party facility signage is the most legible element in
 * it. Recorded for the owner in docs/content-verification.md rather than
 * silently dropped.
 */
const EXCLUDED = [
  {
    file: 'Screenshot_20260916_200332_WhatsApp.jpg',
    reason:
      'Encuadre saturado (agua estancada, tarimas suetas) y señalización de un tercero como elemento más legible. Pendiente de decisión del propietario.',
  },
];

const JPEG = { quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' };
const WEBP = { quality: 80, effort: 5 };
const AVIF = { quality: 52, effort: 5, chromaSubsampling: '4:2:0' };

/** Crop to `ratio` inside the (optionally pre-cropped) region, then resize. */
async function renderPhoto(photo, savings) {
  const srcPath = path.join(SOURCE_DIR, photo.file);
  if (!existsSync(srcPath)) throw new Error(`Missing source photograph: ${srcPath}`);

  let pipeline = sharp(srcPath).rotate(photo.rotate ?? 0);
  const meta = await pipeline.metadata();
  const srcW = photo.rotate === 90 || photo.rotate === 270 ? meta.height : meta.width;
  const srcH = photo.rotate === 90 || photo.rotate === 270 ? meta.width : meta.height;

  const r = photo.region ?? { left: 0, top: 0, width: 1, height: 1 };
  const regionW = Math.round(srcW * r.width);
  const regionH = Math.round(srcH * r.height);
  const regionL = Math.round(srcW * r.left);
  const regionT = Math.round(srcH * r.top);

  // Largest box of the requested aspect ratio that fits inside the region.
  let cropW = regionW;
  let cropH = Math.round(cropW / photo.ratio);
  if (cropH > regionH) {
    cropH = regionH;
    cropW = Math.round(cropH * photo.ratio);
  }
  const cropL = regionL + Math.round((regionW - cropW) / 2);
  const cropT = regionT + Math.round((regionH - cropH) / 2);

  const base = sharp(srcPath)
    .rotate(photo.rotate ?? 0)
    .extract({ left: cropL, top: cropT, width: cropW, height: cropH });

  const dir = path.join(OUT_ROOT, photo.dir);
  await mkdir(dir, { recursive: true });

  // Never request more pixels than the crop actually has.
  const widths = [...new Set(WIDTHS.filter((w) => w <= cropW).concat(Math.min(cropW, WIDTHS.at(-1))))]
    .sort((a, b) => a - b);

  const renditions = [];
  for (const w of widths) {
    const h = Math.round(w / photo.ratio);
    const resized = () => base.clone().resize({ width: w, height: h, fit: 'cover' });
    const stem = `${photo.slug}-${w}`;

    const jpg = await resized().jpeg(JPEG).toBuffer();
    const webp = await resized().webp(WEBP).toBuffer();
    const avif = await resized().avif(AVIF).toBuffer();

    // Ship a modern format only when it is genuinely smaller than the JPEG.
    const useWebp = webp.length < jpg.length * 0.95;
    const useAvif = avif.length < Math.min(jpg.length, webp.length) * 0.95;

    await writeFile(path.join(dir, `${stem}.jpg`), jpg);
    if (useWebp) await writeFile(path.join(dir, `${stem}.webp`), webp);
    if (useAvif) await writeFile(path.join(dir, `${stem}.avif`), avif);

    savings.push({
      file: `${photo.dir}/${stem}`,
      jpg: jpg.length,
      webp: webp.length,
      avif: avif.length,
      shipped: [useAvif && 'avif', useWebp && 'webp', 'jpg'].filter(Boolean),
    });

    renditions.push({
      width: w,
      height: h,
      jpg: `/images/${photo.dir}/${stem}.jpg`,
      webp: useWebp ? `/images/${photo.dir}/${stem}.webp` : null,
      avif: useAvif ? `/images/${photo.dir}/${stem}.avif` : null,
    });
  }

  return {
    slug: photo.slug,
    alt: photo.alt,
    caption: photo.caption,
    width: cropW,
    height: Math.round(cropW / photo.ratio),
    ratio: Number(photo.ratio.toFixed(6)),
    source: photo.file,
    renditions,
  };
}

/**
 * Logo derivatives.
 *
 * The supplied logo is a *photograph* of the Romo's badge on a dark surface:
 * it carries grain, a vignette and a lit frame edge along the left. The badge
 * bounding box below was measured from the file (ink-density histogram over the
 * cream outline and the red "MO'S"), not eyeballed — see docs/brand-system.md.
 *
 * Rules honoured here: preserve the natural aspect ratio (never stretch),
 * never rotate, never recolour, never redraw. Square icons letterbox onto brand
 * black with `fit: contain` so no part of the wordmark is clipped.
 *
 * Format choice is measured, not assumed: because the artwork is photographic,
 * PNG is a poor fit (a 512px PNG came out at 455 KB). WebP/AVIF are used for
 * the on-page lockup; PNG is kept only where the platform requires it
 * (favicon, apple-touch-icon, web-app manifest icons).
 */
const LOGO_BADGE = { left: 0.048, top: 0.132, width: 0.945, height: 0.785 };

async function renderBrand(savings) {
  const srcPath = path.join(SOURCE_DIR, 'logo.jpg');
  if (!existsSync(srcPath)) throw new Error(`Missing logo: ${srcPath}`);
  await mkdir(BRAND_OUT, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const box = {
    left: Math.round(meta.width * LOGO_BADGE.left),
    top: Math.round(meta.height * LOGO_BADGE.top),
    width: Math.round(meta.width * LOGO_BADGE.width),
    height: Math.round(meta.height * LOGO_BADGE.height),
  };
  const badge = () => sharp(srcPath).extract(box);
  const aspect = box.width / box.height;

  const track = (name, buf) =>
    savings.push({ file: `brand/${name}`, jpg: buf.length, webp: 0, avif: 0, shipped: [path.extname(name).slice(1)] });

  // On-page lockup, natural aspect ratio, modern formats.
  for (const w of [128, 256, 512]) {
    const h = Math.round(w / aspect);
    for (const [ext, encode] of [
      ['webp', (p) => p.webp({ quality: 86, effort: 6 })],
      ['avif', (p) => p.avif({ quality: 62, effort: 6 })],
    ]) {
      const name = `logo-romos-transportes-${w}.${ext}`;
      const buf = await encode(badge().clone().resize({ width: w, height: h, fit: 'cover' })).toBuffer();
      await writeFile(path.join(BRAND_OUT, name), buf);
      track(name, buf);
    }
    // Small PNG fallback for the lockup, palette-quantised to keep it honest.
    const name = `logo-romos-transportes-${w}.png`;
    const buf = await badge()
      .clone()
      .resize({ width: w, height: h, fit: 'cover' })
      .png({ compressionLevel: 9, palette: true, colours: 128, dither: 0.6 })
      .toBuffer();
    await writeFile(path.join(BRAND_OUT, name), buf);
    track(name, buf);
  }

  // Square platform icons: contain onto brand black so nothing is clipped.
  const squares = [
    ['favicon-32.png', 32, 2],
    ['favicon-48.png', 48, 3],
    ['apple-touch-icon.png', 180, 14],
    ['icon-192.png', 192, 14],
    ['icon-512.png', 512, 38],
  ];
  for (const [name, size, pad] of squares) {
    const inner = size - pad * 2;
    const art = await badge()
      .clone()
      .resize({ width: inner, height: Math.round(inner / aspect), fit: 'cover' })
      .toBuffer();
    const buf = await sharp({
      create: { width: size, height: size, channels: 3, background: '#080503' },
    })
      .composite([{ input: art, gravity: 'centre' }])
      .png({ compressionLevel: 9, palette: true, colours: size <= 48 ? 64 : 160, dither: 0.6 })
      .toBuffer();
    await writeFile(path.join(BRAND_OUT, name), buf);
    track(name, buf);
  }

  // Keep a faithful full-frame copy of what was supplied, for reference only.
  const orig = await sharp(srcPath).jpeg({ quality: 88 }).toBuffer();
  await writeFile(path.join(BRAND_OUT, 'logo-original.jpg'), orig);

  // Open Graph / social card: badge over brand black. No invented claims, no
  // fabricated text — the card carries the mark and the brand surface only.
  const ogArt = await badge()
    .clone()
    .resize({ width: 560, height: Math.round(560 / aspect), fit: 'cover' })
    .toBuffer();
  const rule = await sharp({
    create: { width: 560, height: 6, channels: 3, background: '#940f12' },
  })
    .png()
    .toBuffer();
  const og = await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#080503' },
  })
    .composite([
      { input: ogArt, left: 320, top: 92 },
      { input: rule, left: 320, top: 92 + Math.round(560 / aspect) + 40 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(BRAND_OUT, 'og-image.jpg'), og);
  track('og-image.jpg', og);

  return { aspect, box };
}

async function main() {
  for (const d of ['hero', 'fleet', 'operations', 'routes', 'gallery']) {
    await rm(path.join(OUT_ROOT, d), { recursive: true, force: true });
  }

  const savings = [];
  const entries = [];
  for (const photo of PHOTOS) {
    entries.push(await renderPhoto(photo, savings));
    process.stdout.write(`  ✓ ${photo.slug}\n`);
  }
  await renderBrand(savings);
  process.stdout.write('  ✓ brand derivatives\n');

  const byslug = Object.fromEntries(entries.map((e) => [e.slug, e]));
  await writeFile(
    MANIFEST,
    `// GENERATED by scripts/build-images.mjs — do not edit by hand.\n` +
      `// Run \`npm run images\` to regenerate after changing the photo set.\n\n` +
      `export type Rendition = {\n  width: number;\n  height: number;\n  jpg: string;\n  webp: string | null;\n  avif: string | null;\n};\n\n` +
      `export type ImageAsset = {\n  slug: string;\n  alt: string;\n  caption: string;\n  width: number;\n  height: number;\n  ratio: number;\n  source: string;\n  renditions: Rendition[];\n};\n\n` +
      `export const images = ${JSON.stringify(byslug, null, 2)} as const satisfies Record<string, ImageAsset>;\n\n` +
      `export type ImageSlug = keyof typeof images;\n\n` +
      `export const excludedSources = ${JSON.stringify(EXCLUDED, null, 2)} as const;\n`,
  );

  // Report so format choices are measured, not assumed.
  const tot = savings.reduce(
    (a, s) => ({ jpg: a.jpg + s.jpg, webp: a.webp + s.webp, avif: a.avif + s.avif }),
    { jpg: 0, webp: 0, avif: 0 },
  );
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(`\n${PHOTOS.length} photographs → ${savings.length} files written`);
  console.log(`Totals if all-JPEG: ${kb(tot.jpg)} | all-WebP: ${kb(tot.webp)} | all-AVIF: ${kb(tot.avif)}`);
  const avifWins = savings.filter((s) => s.shipped.includes('avif')).length;
  const webpWins = savings.filter((s) => s.shipped.includes('webp')).length;
  console.log(`AVIF shipped for ${avifWins} renditions, WebP for ${webpWins}.`);
  const files = await readdir(OUT_ROOT, { recursive: true });
  console.log(`public/images now holds ${files.filter((f) => /\.(jpg|webp|avif)$/.test(f)).length} image files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
