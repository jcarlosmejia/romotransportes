import type { MetadataRoute } from 'next';

/**
 * `output: 'export'` requires metadata routes to opt in to static rendering
 * explicitly; without this the build fails when collecting page data.
 */
export const dynamic = 'force-static';
import { siteUrl } from '@/data/company';

/**
 * @description Static sitemap.
 *
 * `output: 'export'` prerenders this to `out/sitemap.xml` at build time. The
 * site is a single page, so the sitemap lists the home page and the privacy
 * notice only. Absolute URLs need a real origin; set `NEXT_PUBLIC_SITE_URL`
 * on Cloudflare Pages once the domain is confirmed.
 * @returns The sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteUrl}/aviso-de-privacidad/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
