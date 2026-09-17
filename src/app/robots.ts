import type { MetadataRoute } from 'next';

/**
 * `output: 'export'` requires metadata routes to opt in to static rendering
 * explicitly; without this the build fails when collecting page data.
 */
export const dynamic = 'force-static';
import { siteUrl } from '@/data/company';

/**
 * @description robots.txt, prerendered to `out/robots.txt` by the static export.
 * @returns The robots directives.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
