import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { company, siteUrl } from '@/data/company';
import { coverage } from '@/data/content';
import { equipmentPages } from '@/data/equipmentPages';
import { images } from '@/data/imageManifest';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/footer/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { EmailCta, PhoneLink, WhatsAppCta } from '@/components/ui/Cta';
import { Icon } from '@/components/ui/Icon';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

type Params = { servicio: string };

/** Only the two equipment pages exist; anything else is a 404 at build time. */
export const dynamicParams = false;

/** @returns One static page per equipment type. */
export function generateStaticParams(): Params[] {
  return equipmentPages.map((page) => ({ servicio: page.slug }));
}

function findPage(slug: string) {
  return equipmentPages.find((page) => page.slug === slug);
}

/** @returns Unique title, description, canonical and OpenGraph per page. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = findPage((await params).servicio);
  if (!page) return {};
  const url = `/${page.slug}/`;
  const image = images[page.heroImage].renditions.at(-1)!.jpg;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'es_MX',
      siteName: company.legalName,
      title: `${page.metaTitle} | ${company.legalName}`,
      description: page.metaDescription,
      url,
      images: [{ url: image, alt: images[page.heroImage].alt }],
    },
  };
}

/**
 * @description Equipment landing page (caja seca / plataforma).
 *
 * Fully static HTML: breadcrumb, H1, cargo list, operating details, routes,
 * visible FAQ and quote CTAs, plus BreadcrumbList and Service JSON-LD that
 * mirror the visible content.
 */
export default async function EquipmentLandingPage({ params }: { params: Promise<Params> }) {
  const page = findPage((await params).servicio);
  if (!page) notFound();

  const url = `${siteUrl}/${page.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Equipo', item: `${siteUrl}/#flota` },
          { '@type': 'ListItem', position: 3, name: page.breadcrumb, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: page.h1,
        serviceType: page.breadcrumb,
        description: page.metaDescription,
        url,
        provider: { '@id': `${siteUrl}/#organizacion` },
        areaServed: { '@type': 'Country', name: 'México' },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised from typed, static data — no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main id="contenido">
        <section className="relative bg-romo-black pt-[6.5rem] pb-14 lg:pt-[8rem] lg:pb-20" aria-labelledby="equipo-titulo">
          <div aria-hidden="true" className="hatch pointer-events-none absolute inset-0 opacity-60" />
          <div className="shell relative">
            <nav aria-label="Ruta de navegación">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-romo-muted">
                <li>
                  <Link href="/" className="hover:text-romo-cream-light">Inicio</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#flota" className="hover:text-romo-cream-light">Equipo</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-romo-cream-light">{page.breadcrumb}</li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-14">
              <div>
                <p className="overline">{page.overline}</p>
                <h1 id="equipo-titulo" className="display-hero mt-4 uppercase">{page.h1}</h1>
                <p className="lede mt-6 !max-w-[52ch]">{page.lede}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <WhatsAppCta place={`pagina-${page.slug}`} label="Cotizar por WhatsApp" message={page.whatsappMessage} />
                  <EmailCta place={`pagina-${page.slug}`} />
                </div>
                <PhoneLink place={`pagina-${page.slug}`} label="o llama al" className="mt-3 text-sm text-romo-cream-light" />
              </div>
              <figure>
                <div className="cut-frame border border-romo-border bg-romo-surface p-1.5">
                  <div className="cut-frame overflow-hidden">
                    <ResponsiveImage
                      slug={page.heroImage}
                      sizes="(max-width: 1023px) calc(100vw - 2.5rem), 544px"
                      className="aspect-[4/3] w-full object-cover"
                      priority
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-xs text-romo-muted">{page.heroCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="band-light section" aria-labelledby="equipo-carga">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <div>
              <p className="overline">Tipos de carga</p>
              <h2 id="equipo-carga" className="display-3 mt-3 uppercase">{page.cargo.title}</h2>
              <div aria-hidden="true" className="mt-5 h-[3px] w-14 bg-romo-red" />
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {page.cargo.items.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-romo-border-light pb-3 text-[0.9375rem] font-semibold text-romo-charcoal">
                  <Icon name="check" className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-romo-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="equipo-operacion">
          <div className="shell">
            <h2 id="equipo-operacion" className="display-3 uppercase">Cómo operamos</h2>
            <div aria-hidden="true" className="mt-5 h-[3px] w-14 bg-romo-red" />
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {page.details.map((detail) => (
                <div key={detail.title} className="border-t-[3px] border-romo-red pt-5">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-romo-cream-light">{detail.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-romo-muted">{detail.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-romo-charcoal" aria-labelledby="equipo-rutas">
          <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="equipo-rutas" className="display-3 uppercase">Rutas frecuentes desde Guadalajara</h2>
              <div aria-hidden="true" className="mt-5 h-[3px] w-14 bg-romo-red" />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-romo-muted">{coverage.body}</p>
              <Link href="/#cobertura" className="mt-6 inline-flex items-center gap-2 font-semibold text-romo-cream underline underline-offset-4">
                Ver el mapa de cobertura de fletes desde Guadalajara
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="divide-y divide-romo-border border-y border-romo-border">
              {coverage.corridors.map((corridor) => (
                <li key={corridor.id} className="py-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-romo-cream-light">{corridor.name}</h3>
                  <p className="mt-1.5 text-sm text-romo-muted">Guadalajara → {corridor.stops.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band-light section" aria-labelledby="equipo-preguntas">
          <div className="shell max-w-3xl">
            <h2 id="equipo-preguntas" className="display-3 uppercase">Preguntas frecuentes</h2>
            <div aria-hidden="true" className="mt-5 h-[3px] w-14 bg-romo-red" />
            <div className="mt-8 divide-y divide-romo-border-light border-y border-romo-border-light">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-bold uppercase tracking-tight text-romo-charcoal">
                    {faq.question}
                    <span aria-hidden="true" className="text-romo-red group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-romo-muted-dark">{faq.answer}</p>
                </details>
              ))}
            </div>
            <Link href={page.related.href} className="mt-8 inline-flex items-start gap-2 font-semibold text-romo-charcoal underline underline-offset-4">
              {page.related.text}
              <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0" />
            </Link>
          </div>
        </section>

        <section className="section bg-romo-black" aria-labelledby="equipo-cotizar">
          <div className="shell max-w-3xl">
            <h2 id="equipo-cotizar" className="display-2 uppercase">Cotiza tu flete</h2>
            <div aria-hidden="true" className="mt-5 h-[3px] w-20 bg-romo-red" />
            <p className="lede mt-6">
              Envíanos origen, destino, tipo de mercancía, peso aproximado, dimensiones y fecha de carga.
              Te respondemos con unidad y tarifa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppCta place={`pagina-${page.slug}-final`} message={page.whatsappMessage} />
              <EmailCta place={`pagina-${page.slug}-final`} />
            </div>
            <PhoneLink place={`pagina-${page.slug}-final`} label="o llama al" className="mt-3 text-sm text-romo-cream-light" />
            <p className="mt-6 text-sm text-romo-muted">
              ¿Prefieres un formulario?{' '}
              <Link href="/#cotizar" className="font-semibold text-romo-cream underline underline-offset-2">
                Solicitar cotización con el formulario
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
