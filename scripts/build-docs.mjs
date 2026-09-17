#!/usr/bin/env node
/**
 * Generates `docs/content-verification.md` from `src/data/company.ts`.
 *
 * The verification checklist is generated rather than hand-written so that it
 * can never drift from the `pendingVerification` list the application actually
 * reads. Add or resolve an item in `src/data/company.ts` and re-run this.
 *
 * Usage: npm run docs
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const ROOT = path.resolve(import.meta.dirname, '..');

/**
 * Pull `pendingVerification` out of the TypeScript source by evaluating just
 * that array literal. Avoids adding a TS build step for a docs script.
 */
function readPendingVerification() {
  const src = readFileSync(path.join(ROOT, 'src/data/company.ts'), 'utf8');
  const start = src.indexOf('export const pendingVerification');
  if (start === -1) throw new Error('pendingVerification not found in company.ts');
  // Anchor on the assignment, not the first `[` — the type annotation
  // `readonly VerificationItem[]` also contains brackets and would otherwise
  // be parsed as an empty array.
  const assign = src.indexOf('= [', start);
  if (assign === -1) throw new Error('pendingVerification assignment not found');
  const open = assign + 2;
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === '[') depth += 1;
    else if (src[i] === ']') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const literal = src.slice(open, end + 1);
  // The literal is plain data (strings and object literals) with no identifiers.
  return Function(`"use strict"; return (${literal});`)();
}

const IMPACT = {
  'blocks-launch': {
    label: 'Bloquea la publicación',
    note: 'El sitio no debe publicarse sin esto.',
  },
  'limits-messaging': {
    label: 'Limita el mensaje',
    note: 'El sitio funciona, pero no puede afirmarlo hasta que se confirme.',
  },
  'nice-to-have': {
    label: 'Mejora opcional',
    note: 'No bloquea nada; mejora el resultado si se resuelve.',
  },
};

const items = readPendingVerification();
const groups = ['blocks-launch', 'limits-messaging', 'nice-to-have'];

const lines = [
  '# Verificación de contenido — Romo\'s Transportes',
  '',
  '> **Generado automáticamente** por `npm run docs` a partir de',
  '> `src/data/company.ts` (`pendingVerification`). No editar a mano: resuelva o',
  '> agregue el punto en ese archivo y vuelva a generar.',
  '',
  'Este documento lista **todo dato de negocio que el sitio NO afirma** porque no',
  'ha sido confirmado por el propietario. La regla aplicada en todo el proyecto es:',
  'un dato sin confirmar no se publica, no se sustituye por una suposición y no se',
  'toma de la competencia. Los campos correspondientes en `src/data/company.ts`',
  'están en `null` y la interfaz oculta lo que no puede sostener.',
  '',
  `**Total de puntos pendientes: ${items.length}**`,
  '',
];

for (const g of groups) {
  const bucket = items.filter((i) => i.impact === g);
  if (bucket.length === 0) continue;
  lines.push(`## ${IMPACT[g].label} (${bucket.length})`, '', `_${IMPACT[g].note}_`, '');
  for (const item of bucket) {
    lines.push(
      `### ${item.question}`,
      '',
      `- **Por qué no se publica:** ${item.reason}`,
      `- **Qué hace el sitio hoy:** ${item.currentBehaviour}`,
      `- **Identificador interno:** \`${item.id}\``,
      '',
    );
  }
}

lines.push(
  '## Fotografías disponibles',
  '',
  'Se localizaron y se integraron las **15 fotografías originales** del material de',
  'origen, más el logotipo. El paquete de imágenes preparado previamente sólo',
  'contenía 10 de ellas; las 5 restantes se recuperaron del material original y ya',
  'están en el sitio, por lo que **no queda material pendiente por incorporar**.',
  '',
  'De las 15, se publican 14. La restante se documenta en `docs/image-assets.md`',
  'junto con el motivo por el que se dejó fuera.',
  '',
  '## Cómo resolver los puntos que bloquean la publicación',
  '',
  'Los cuatro datos de contacto y el dominio se configuran sin tocar código, con',
  'variables de entorno en Cloudflare Pages (ver `README.md`):',
  '',
  '```',
  'NEXT_PUBLIC_ROMO_WHATSAPP=521234567890',
  'NEXT_PUBLIC_ROMO_WHATSAPP_DISPLAY=+52 1 33 1234 5678',
  'NEXT_PUBLIC_ROMO_PHONE=+523312345678',
  'NEXT_PUBLIC_ROMO_PHONE_DISPLAY=+52 33 1234 5678',
  'NEXT_PUBLIC_ROMO_EMAIL=cotizaciones@romostransportes.com',
  'NEXT_PUBLIC_SITE_URL=https://romostransportes.com',
  '```',
  '',
  'Los valores anteriores son **ejemplos de formato, no datos reales**. Al',
  'definirlos y reconstruir, el sitio activa por sí solo los botones de WhatsApp',
  'en las 7 ubicaciones, el teléfono, el correo, la etiqueta canonical y el',
  'sitemap absoluto.',
  '',
);

await writeFile(path.join(ROOT, 'docs/content-verification.md'), lines.join('\n'));
console.log(
  `docs/content-verification.md written — ${items.length} pending items ` +
    `(${items.filter((i) => i.impact === 'blocks-launch').length} blocking).`,
);
