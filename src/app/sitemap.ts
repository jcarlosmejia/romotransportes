import type { MetadataRoute } from 'next';

/**
 * `output: 'export'` requires metadata routes to opt in to static rendering
 * explicitly; without this the build fails when collecting page data.
 */
export const dynamic = 'force-static';
import { siteUrl } from '@/data/company';
import { equipmentPages } from '@/data/equipmentPages';

/**
 * @description Static sitemap.
 *
 * `output: 'export'` prerenders this to `out/sitemap.xml` at build time. The
 * Home, the two equipment pages and the privacy notice — every indexable
 * page, canonical HTTPS URL with trailing slash, nothing else.
 * @returns The sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...equipmentPages.map((page) => ({
      url: `${siteUrl}/${page.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/aviso-de-privacidad/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
