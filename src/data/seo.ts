// SEO: textos por defecto y JSON-LD. Se construye con los mismos datos que la UI
// (site.ts, services.ts) para que lo que ven buscadores y personas sea idéntico.
// Criterios: docs/seo.md (basado en las skills seo-audit, schema-markup y ai-seo).
import { site } from './site';
import { expressSurcharge, priceList, services } from './services';

/** 50–60 caracteres, keyword primero, marca al final, sin guiones largos. */
export const defaultTitle = 'Vestidos a la medida y de novia en Monterrey | Anter House';

/** 150–160 caracteres con keyword y llamada a la acción. */
export const defaultDescription =
  'Taller de moda a la medida en Monterrey: vestidos de noche y de novia, más confección y ajustes desde $160 MXN. Agenda tu cita por WhatsApp.';

/** Grafo JSON-LD: WebSite + negocio local con catálogo de servicios. Sin datos inventados. */
export function buildJsonLd(siteUrl: URL, imageUrl?: string) {
  const url = siteUrl.href;
  const id = (fragment: string) => `${url}#${fragment}`;

  const priced = priceList.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `${group.group}: ${item.label}` },
      price: item.price,
      priceCurrency: 'MXN',
    })),
  );

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': id('website'),
        url,
        name: site.name,
        inLanguage: 'es-MX',
        publisher: { '@id': id('business') },
      },
      {
        // No existe un tipo "Dressmaker"; ClothingStore es el más cercano.
        '@type': 'ClothingStore',
        '@id': id('business'),
        name: site.name,
        alternateName: `${site.name} Bespoke Fashion`,
        description: defaultDescription,
        url,
        ...(imageUrl && { image: [imageUrl] }),
        telephone: '+52 81 1719 7371',
        sameAs: [site.instagramUrl],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Monterrey',
          addressRegion: 'Nuevo León',
          addressCountry: 'MX',
        },
        areaServed: { '@type': 'City', name: 'Monterrey' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: [
            ...services.map((service) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: service.title, description: service.body },
            })),
            ...priced,
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Arreglo express (cargo adicional)' },
              price: expressSurcharge,
              priceCurrency: 'MXN',
            },
          ],
        },
      },
    ],
  };
}
