import { company, contact, siteUrl, siteUrlIsVerified } from '@/data/company';
import { coverage } from '@/data/content';
import { faqs } from '@/data/faqs';
import { services } from '@/data/services';

/**
 * @description JSON-LD structured data.
 *
 * Only confirmed facts are emitted. `foundingDate` (2010), `telephone`,
 * `email` and the named `areaServed` cities are all owner-confirmed. There is
 * still **no** `aggregateRating`, no `review`, no `award`, no
 * `numberOfEmployees` and no street address — none of those are verified, and
 * fabricating review markup is both false and a search-policy violation.
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
      'Transporte terrestre de mercancías',
      'Carga completa',
      'Caja seca',
      'Plataforma',
      'Fletes nacionales',
    ],
  };

  if (siteUrlIsVerified) organization.url = siteUrl;
  if (contact.phone) organization.telephone = contact.phone;
  if (contact.email) organization.email = contact.email;
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

  const serviceNodes = services.map((service) => ({
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { '@id': id },
    areaServed: { '@type': 'Country', name: 'México' },
  }));

  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, ...serviceNodes, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from the typed objects above — no external or user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
