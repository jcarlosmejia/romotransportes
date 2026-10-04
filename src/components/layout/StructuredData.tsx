import { company, contact, siteUrl, siteUrlIsVerified } from '@/data/company';
import { coverage } from '@/data/content';
import { services } from '@/data/services';
import { equipmentPages } from '@/data/equipmentPages';

/**
 * @description JSON-LD structured data.
 *
 * Only confirmed facts are emitted. `foundingDate` (2010), `telephone`,
 * `email` and the named `areaServed` cities are all owner-confirmed. There is
 * still **no** `aggregateRating`, no `review`, no `award`, no
 * `numberOfEmployees` and no street address (only locality Guadalajara,
 * Jalisco) — none of those are verified, and
 * fabricating review markup is both false and a search-policy violation.
 *
 * No `FAQPage`: since 2023 Google shows FAQ rich results only for
 * authoritative government and health sites, so the markup would add nothing
 * here. The FAQ stays as visible content.
 *
 * `LocalBusiness` is deliberately not used: it requires a physical address,
 * which has not been confirmed (see `address-hours` in `pendingVerification`).
 * Until one exists, the plain `Organization` type carries the identity and
 * `Service` nodes describe what is offered.
 */
export function StructuredData() {
  const id = siteUrlIsVerified ? `${siteUrl}/#organizacion` : '#organizacion';

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': id,
    name: company.legalName,
    // Spellings buyers actually type, including the one in the domain.
    alternateName: ['Romo Transportes', 'Romos Transportes'],
    description: company.valueProposition,
    image: siteUrlIsVerified ? `${siteUrl}/brand/og-image.jpg` : '/brand/og-image.jpg',
    logo: siteUrlIsVerified
      ? `${siteUrl}/brand/logo-romos-transportes-512.png`
      : '/brand/logo-romos-transportes-512.png',
    // Country plus the owner-confirmed cities. Nothing beyond what was confirmed.
    areaServed: [
      { '@type': 'Country', name: 'México' },
      ...coverage.cities.map((city) => ({
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'AdministrativeArea', name: city.state },
      })),
    ],
    knowsAbout: [
      'Transporte de carga',
      'Fletes desde Guadalajara',
      'Carga completa (FTL)',
      "Caja seca de 48 y 53 pies",
      'Plataforma tipo plana',
      'Carga pesada e industrial',
      'Servicio spot',
      'Servicio recurrente',
    ],
  };

  if (siteUrlIsVerified) organization.url = siteUrl;
  if (contact.phone) organization.telephone = contact.phone;
  if (contact.email) organization.email = contact.email;
  // Primary first, then the alternate line; both reach sales.
  const phones = [
    { telephone: contact.phone, description: 'Teléfono principal' },
    { telephone: contact.phoneSecondary, description: 'Teléfono alterno' },
    { telephone: contact.whatsapp ? `+${contact.whatsapp}` : null, description: 'WhatsApp' },
  ].filter((p) => p.telephone);
  if (phones.length) {
    organization.contactPoint = phones.map((p) => ({
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: p.telephone,
      description: p.description,
      areaServed: 'MX',
      availableLanguage: 'es',
    }));
  }
  if (!company.address && company.baseCity) {
    // City-level only: the owner has not published a street address.
    organization.address = {
      '@type': 'PostalAddress',
      addressLocality: company.baseCity,
      addressRegion: company.baseState,
      addressCountry: 'MX',
    };
  }
  if (company.address) {
    organization.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'MX',
      ...(company.baseCity ? { addressLocality: company.baseCity } : {}),
      ...(company.baseState ? { addressRegion: company.baseState } : {}),
    };
  }
  if (company.foundedYear) organization.foundingDate = String(company.foundedYear);

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#sitio`,
    url: `${siteUrl}/`,
    name: company.legalName,
    inLanguage: 'es-MX',
    publisher: { '@id': id },
  };

  // Equipment pages carry their own full Service node; link to them here.
  const equipmentNodes = equipmentPages.map((page) => ({
    '@type': 'Service',
    name: page.metaTitle,
    serviceType: page.breadcrumb,
    url: `${siteUrl}/${page.slug}/`,
    provider: { '@id': id },
    areaServed: { '@type': 'Country', name: 'México' },
  }));

  const serviceNodes = services.map((service) => ({
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { '@id': id },
    areaServed: { '@type': 'Country', name: 'México' },
  }));


  const graph = {
    '@context': 'https://schema.org',
    '@graph': [website, organization, ...serviceNodes, ...equipmentNodes],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from the typed objects above — no external or user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
