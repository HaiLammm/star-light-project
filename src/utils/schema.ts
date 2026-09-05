import { SITE_CONFIG, type OfficeAddress, type RegionalOffice } from './siteConfig';

type SchemaContext = 'https://schema.org';

interface OrganizationReference {
  '@type': 'Organization' | 'LocalBusiness';
  name: string;
  url: string;
  telephone?: string;
}

interface PostalAddressSchema {
  '@type': 'PostalAddress';
  addressCountry: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
}

interface OfferSchema {
  '@type': 'Offer';
  availability: 'https://schema.org/InStock';
  price: string;
  priceCurrency: 'JPY';
  url?: string;
}

export interface LocalBusinessInput extends RegionalOffice {
  url?: string;
  openingHours?: string[];
  priceRange?: string;
  image?: string[];
}

export interface ServiceInput {
  serviceName: string;
  description: string;
  startingPrice: number;
  serviceArea: string[];
  url: string;
  serviceType?: string;
  providerName?: string;
  providerUrl?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialInput {
  serviceType: string;
  cost: number;
  message: string;
  author: string;
  itemReviewed?: string;
  datePublished?: string;
  ratingValue?: number;
  bestRating?: number;
}

export interface ArticleInput {
  title: string;
  publishedDate: string;
  author: string;
  description: string;
  url: string;
  image?: string;
  modifiedDate?: string;
}

export interface LocalBusinessSchema {
  '@context': SchemaContext;
  '@type': 'LocalBusiness';
  name: string;
  url: string;
  telephone: string;
  address: PostalAddressSchema;
  areaServed: string[];
  openingHours: string[];
  image?: string[];
  priceRange?: string;
}

export interface ServiceSchema {
  '@context': SchemaContext;
  '@type': 'Service';
  name: string;
  description: string;
  serviceType: string;
  provider: OrganizationReference;
  areaServed: string[];
  offers: OfferSchema;
  url: string;
}

export interface ReviewSchema {
  '@context': SchemaContext;
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  itemReviewed: {
    '@type': 'Service';
    name: string;
    offers: {
      '@type': 'Offer';
      price: string;
      priceCurrency: 'JPY';
    };
  };
  datePublished?: string;
  reviewRating?: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
  };
}

interface ImageObjectSchema {
  '@type': 'ImageObject';
  url: string;
}

export interface BreadcrumbListSchema {
  '@context': SchemaContext;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPageSchema {
  '@context': SchemaContext;
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface ArticleSchema {
  '@context': SchemaContext;
  '@type': 'Article';
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  inLanguage: 'ja';
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo: ImageObjectSchema;
  };
  isPartOf: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  mainEntityOfPage: string;
  image?: string[];
}

export interface WebSiteSchema {
  '@context': SchemaContext;
  '@type': 'WebSite';
  name: string;
  alternateName: string;
  url: string;
  inLanguage: 'ja';
  publisher: { '@id': string };
}

export interface OrganizationSchema {
  '@context': SchemaContext;
  '@type': 'Organization';
  '@id': string;
  name: string;
  alternateName: string;
  url: string;
  logo: ImageObjectSchema;
  image: string;
}

const SCHEMA_CONTEXT: SchemaContext = 'https://schema.org';

export function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

export const absoluteUrl = (path: string): string => new URL(path, SITE_CONFIG.siteUrl).href;

const ORGANIZATION_ID = `${SITE_CONFIG.siteUrl}/#organization`;

const buildLogo = (): ImageObjectSchema => ({
  '@type': 'ImageObject',
  url: absoluteUrl(SITE_CONFIG.logoPath),
});

const buildPostalAddress = (address: OfficeAddress): PostalAddressSchema => {
  return {
    '@type': 'PostalAddress',
    addressCountry: address.addressCountry,
    ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
    ...(address.addressLocality ? { addressLocality: address.addressLocality } : {}),
    ...(address.addressRegion ? { addressRegion: address.addressRegion } : {}),
    ...(address.postalCode ? { postalCode: address.postalCode } : {}),
  };
};

const buildProviderReference = (name?: string, url?: string): OrganizationReference => {
  return {
    '@type': 'LocalBusiness',
    name: name ?? SITE_CONFIG.companyName,
    url: url ?? SITE_CONFIG.siteUrl,
    telephone: SITE_CONFIG.phone.display,
  };
};

export function generateLocalBusiness(office: LocalBusinessInput): LocalBusinessSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'LocalBusiness',
    name: office.name,
    url: office.url ?? SITE_CONFIG.siteUrl,
    telephone: office.phone.display,
    address: buildPostalAddress(office.address),
    areaServed: office.areaServed,
    openingHours: office.openingHours ?? ['Mo-Su 00:00-23:59'],
    ...(office.image ? { image: office.image } : {}),
    ...(office.priceRange ? { priceRange: office.priceRange } : {}),
  };
}

export function generateService(service: ServiceInput): ServiceSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Service',
    name: service.serviceName,
    description: service.description,
    serviceType: service.serviceType ?? service.serviceName,
    provider: buildProviderReference(service.providerName, service.providerUrl),
    areaServed: service.serviceArea,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: service.startingPrice.toString(),
      priceCurrency: 'JPY',
      url: service.url,
    },
    url: service.url,
  };
}

export function generateBreadcrumb(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQ(items: FAQItem[]): FAQPageSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateReview(testimonial: TestimonialInput): ReviewSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.author,
    },
    reviewBody: testimonial.message,
    itemReviewed: {
      '@type': 'Service',
      name: testimonial.itemReviewed ?? testimonial.serviceType,
      offers: {
        '@type': 'Offer',
        price: testimonial.cost.toString(),
        priceCurrency: 'JPY',
      },
    },
    ...(testimonial.datePublished ? { datePublished: testimonial.datePublished } : {}),
    ...(typeof testimonial.ratingValue === 'number'
      ? {
          reviewRating: {
            '@type': 'Rating',
            ratingValue: testimonial.ratingValue.toString(),
            bestRating: (testimonial.bestRating ?? 5).toString(),
          },
        }
      : {}),
  };
}

export function generateArticle(post: ArticleInput): ArticleSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate ?? post.publishedDate,
    inLanguage: 'ja',
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
      logo: buildLogo(),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
    mainEntityOfPage: post.url,
    ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
  };
}

export function generateWebSite(): WebSiteSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: SITE_CONFIG.siteName,
    alternateName: SITE_CONFIG.siteNameKana,
    url: `${SITE_CONFIG.siteUrl}/`,
    inLanguage: 'ja',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function generateOrganization(): OrganizationSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_CONFIG.siteName,
    alternateName: SITE_CONFIG.siteNameKana,
    url: `${SITE_CONFIG.siteUrl}/`,
    logo: buildLogo(),
    image: absoluteUrl(SITE_CONFIG.logoPath),
  };
}
