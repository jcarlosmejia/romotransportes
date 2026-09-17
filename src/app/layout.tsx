import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { company, siteUrl, siteUrlIsVerified } from '@/data/company';
import { CtaTracker } from '@/components/ui/CtaTracker';
import { RevealObserver } from '@/components/ui/RevealObserver';
import './globals.css';

/**
 * Typeface pairing.
 *
 * `Archivo Black` is the display face. It was chosen over the slab candidates
 * (Bevan, Alfa Slab One, Roboto Slab Black, Bitter, Arvo) after setting the
 * real headlines: the "ROMO'S" wordmark in the badge is a very heavy grotesque
 * with flat terminals and squared counters, not a slab, so a slab display face
 * fought the mark instead of extending it. See docs/brand-system.md.
 *
 * `Archivo` is the text face — the same family's variable sibling, so display,
 * UI labels and body copy share one skeleton and one set of proportions.
 *
 * SELF-HOSTED ON PURPOSE
 * ----------------------
 * The two `.woff2` files live in `src/app/fonts/`, so `next build` never has to
 * reach fonts.googleapis.com. That keeps the Cloudflare Pages build independent
 * of a third-party service being reachable, and makes the bundle deterministic.
 *
 * PAYLOAD
 * -------
 * Only the `latin` subset ships. Its coverage (U+0000-00FF plus punctuation)
 * includes every character Spanish needs — á é í ó ú ñ ü ¿ ¡ — so the
 * `latin-ext` cut was dropped. No `unicode-range` is declared: with a single
 * file per family there is no second subset to switch between, and browsers
 * already fall back per-glyph for anything the file does not carry.
 *
 * The variable Archivo is the weight-only cut at 35 KB; Google's dual-axis
 * build including `wdth` is 90 KB, and 55 KB was not worth a slight
 * condensation on the overlines, which get their character from letter-spacing
 * instead. Total font payload: ~45 KB across two files.
 */
const archivo = localFont({
  src: [{ path: './fonts/Archivo-Variable-latin.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  variable: '--font-archivo',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const archivoBlack = localFont({
  src: [{ path: './fonts/ArchivoBlack-latin.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-archivo-black',
  fallback: ['Arial Black', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const title = "Romo's Transportes | Transporte de carga nacional en México";
const description =
  'Transporte terrestre de carga para empresas en rutas nacionales. Plataformas, cajas secas y carga completa. Solicita tu cotización.';

export const metadata: Metadata = {
  // `metadataBase` is always set: without it Next resolves OpenGraph image URLs
  // against http://localhost:3000, which would ship broken social previews.
  // `siteUrl` falls back to a placeholder domain, so the *canonical* tag stays
  // gated on `siteUrlIsVerified` below — a canonical pointing at a guessed
  // hostname is actively harmful, whereas a recoverable OG image URL is not.
  // Set NEXT_PUBLIC_SITE_URL on Cloudflare Pages to make both correct.
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Romo's Transportes",
  },
  description,
  applicationName: company.legalName,
  keywords: [
    'transporte de carga',
    'transporte de carga en México',
    'transporte nacional',
    'transporte terrestre de carga',
    'fletes nacionales',
    'carga completa',
    'cajas secas',
    'plataformas',
    'transporte de mercancías',
    'transporte para empresas',
  ],
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  ...(siteUrlIsVerified ? { alternates: { canonical: '/' } } : {}),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: company.legalName,
    title,
    description,
    ...(siteUrlIsVerified ? { url: siteUrl } : {}),
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Romo's Transportes — transporte de carga nacional",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/brand/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#080503',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Never block pinch-zoom: capping it fails WCAG 1.4.4.
  maximumScale: 5,
  userScalable: true,
};

/**
 * @description Root layout.
 * @param children Page content.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${archivoBlack.variable}`}>
      <head>
        {/*
          Marks that scripting is available, which is what gates the scroll
          reveal's hidden start state in globals.css. Without this, a visitor
          with JavaScript disabled would see empty sections. Inline and
          synchronous so it runs before first paint.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-motion','on')`,
          }}
        />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <CtaTracker />
        <RevealObserver />
      </body>
    </html>
  );
}
