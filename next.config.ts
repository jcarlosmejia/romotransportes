import type { NextConfig } from 'next';

/**
 * Romo's Transportes — fully static export for Cloudflare Pages.
 *
 * `output: 'export'` emits plain HTML/CSS/JS into `out/`, which is exactly what
 * Cloudflare Pages' "Next.js (Static HTML Export)" preset expects
 * (build command `npx next build`, build output directory `out`).
 *
 * `images.unoptimized` is required because the default next/image loader needs a
 * running Node server. We do not rely on it at all: every photograph is served
 * through pre-built responsive renditions with native `srcset`/`sizes`
 * (see `src/components/ui/ResponsiveImage.tsx` and `scripts/build-images.mjs`),
 * which keeps full control over which file each viewport downloads.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
