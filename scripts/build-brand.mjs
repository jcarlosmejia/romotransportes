#!/usr/bin/env node
/**
 * Romo's Transportes — brand colour extraction + contrast audit.
 *
 * Samples the supplied logo photograph and reports (a) the dominant colour
 * clusters, (b) the channel means of the three brand inks (dark field, cream
 * outline, red "MO'S"), and (c) a WCAG contrast table for every pairing the UI
 * actually uses. Run this whenever the logo file is replaced, then reconcile
 * `src/app/globals.css` and `docs/brand-system.md` with the output.
 *
 * Usage: npm run brand
 */

import path from 'node:path';
import sharp from 'sharp';

const LOGO = '/Users/juancarlosmejiaayala/Downloads/Romotransportes_imagenes/logo.jpg';

const hex = (r, g, b) =>
  `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

/* --- WCAG 2.1 relative luminance + contrast ratio ------------------------ */
const channel = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (h) => {
  const v = h.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
const contrast = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** Pairings that exist in the built UI. Each must clear its stated threshold. */
const PAIRS = [
  ['cream-light on black', '#eee7ce', '#080503', 4.5],
  ['cream on black', '#d5cb9d', '#080503', 4.5],
  ['muted on black', '#aaa38e', '#080503', 4.5],
  ['cream on surface', '#d5cb9d', '#181613', 4.5],
  ['white on red (primary btn)', '#f7f4eb', '#940f12', 4.5],
  ['white on red-bright (btn hover)', '#f7f4eb', '#b3151a', 4.5],
  ['charcoal on cream-light (light band)', '#11100e', '#eee7ce', 4.5],
  ['muted-dark on cream-light', '#4a4636', '#eee7ce', 4.5],
  ['red on cream-light (light accent)', '#940f12', '#eee7ce', 4.5],
  ['charcoal on paper', '#11100e', '#f4efdd', 4.5],
  ['error on charcoal', '#d4585c', '#11100e', 4.5],
  ['cream focus ring on black', '#d5cb9d', '#080503', 3],
  ['red focus ring on cream-light', '#940f12', '#eee7ce', 3],
];

async function main() {
  const { data, info } = await sharp(LOGO).resize(420).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const clusters = new Map();
  const sums = {
    red: [0, 0, 0, 0],
    cream: [0, 0, 0, 0],
    dark: [0, 0, 0, 0],
  };

  for (let i = 0; i < w * h; i += 1) {
    const o = i * c;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];

    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    clusters.set(key, (clusters.get(key) ?? 0) + 1);

    // Red "MO'S": strongly red-dominant.
    if (r > 90 && r - g > 45 && r - b > 40) {
      sums.red[0] += r;
      sums.red[1] += g;
      sums.red[2] += b;
      sums.red[3] += 1;
    }
    // Cream badge outline: bright, warm, low blue, near-neutral r/g.
    else if (r > 150 && g > 140 && b > 90 && Math.abs(r - g) < 40 && r - b > 25) {
      sums.cream[0] += r;
      sums.cream[1] += g;
      sums.cream[2] += b;
      sums.cream[3] += 1;
    }
    // Dark field.
    else if (r < 40 && g < 40 && b < 40) {
      sums.dark[0] += r;
      sums.dark[1] += g;
      sums.dark[2] += b;
      sums.dark[3] += 1;
    }
  }

  const total = w * h;
  console.log(`\nLogo source: ${path.basename(LOGO)}  (sampled at ${w}x${h})\n`);

  console.log('Dominant colour clusters');
  console.log('------------------------');
  for (const [key, n] of [...clusters].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    const [r, g, b] = key.split(',').map((v) => Number(v) << 4);
    console.log(`  ${hex(r, g, b)}  ${((100 * n) / total).toFixed(2).padStart(5)}%`);
  }

  console.log('\nBrand ink means (the values globals.css is derived from)');
  console.log('-------------------------------------------------------');
  for (const [name, [r, g, b, n]] of Object.entries(sums)) {
    if (!n) {
      console.log(`  ${name.padEnd(6)} — not detected`);
      continue;
    }
    console.log(`  ${name.padEnd(6)} ${hex(r / n, g / n, b / n)}   (${n} px sampled)`);
  }

  console.log('\nWCAG contrast audit of shipped pairings');
  console.log('---------------------------------------');
  let failures = 0;
  for (const [label, fg, bg, min] of PAIRS) {
    const ratio = contrast(fg, bg);
    const ok = ratio >= min;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`,
    );
  }

  console.log(
    failures === 0
      ? '\nAll shipped colour pairings meet their WCAG threshold.\n'
      : `\n${failures} pairing(s) below threshold — fix globals.css before shipping.\n`,
  );
  if (failures > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
