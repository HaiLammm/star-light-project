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

export interface BreadcrumbItem {
  name: string;
  url: string;
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

interface QuestionSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface FAQPageSchema {
  '@context': SchemaContext;
  '@type': 'FAQPage';
  mainEntity: QuestionSchema[];
}

interface ReviewedServiceSchema {
  '@type': 'Service';
  name: string;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: 'JPY';
  };
}

export interface ReviewSchema {
  '@context': SchemaContext;
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  itemReviewed: ReviewedServiceSchema;
  datePublished?: string;
  reviewRating?: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
  };
}

interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListSchema {
  '@context': SchemaContext;
  '@type': 'BreadcrumbList';
  itemListElement: ListItemSchema[];
}

export interface ArticleSchema {
  '@context': SchemaContext;
  '@type': 'Article';
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  mainEntityOfPage: string;
  image?: string;
}

const SCHEMA_CONTEXT: SchemaContext = 'https://schema.org';

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

export function generateBreadcrumb(crumbs: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
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
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.companyName,
      url: SITE_CONFIG.siteUrl,
    },
    mainEntityOfPage: post.url,
    ...(post.image ? { image: post.image } : {}),
  };
}
