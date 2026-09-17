import type { MetadataRoute } from 'next';

/**
 * `output: 'export'` requires metadata routes to opt in to static rendering
 * explicitly; without this the build fails when collecting page data.
 */
export const dynamic = 'force-static';
import { company } from '@/data/company';

/**
 * @description Web app manifest, prerendered to `out/manifest.webmanifest`.
 * @returns The manifest definition.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.legalName} — ${company.tagline}`,
    short_name: "Romo's",
    description: company.valueProposition,
    start_url: '/',
    display: 'browser',
    background_color: '#080503',
    theme_color: '#080503',
    lang: 'es-MX',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
