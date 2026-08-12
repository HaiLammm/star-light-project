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
  /** Đường dẫn ảnh; tương đối hay tuyệt đối đều được, hàm sẽ tự absolute hóa. */
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

interface ImageObjectSchema {
  '@type': 'ImageObject';
  url: string;
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
  legalName: string;
  url: string;
  logo: ImageObjectSchema;
  image: string;
  telephone: string;
}

const SCHEMA_CONTEXT: SchemaContext = 'https://schema.org';

/** Ghép đường dẫn tương đối thành URL tuyệt đối — structured data của Google
 *  bỏ qua giá trị tương đối, khác với thẻ og:image do trình duyệt tự resolve. */
const absoluteUrl = (path: string): string => new URL(path, SITE_CONFIG.siteUrl).href;

/** `@id` cố định cho thực thể Organization, để WebSite/Article trỏ về cùng một node. */
const ORGANIZATION_ID = `${SITE_CONFIG.siteUrl}/#organization`;

const buildLogo = (): ImageObjectSchema => ({
  '@type': 'ImageObject',
  url: absoluteUrl(SITE_CONFIG.logoPath),
});

// Escapes `<` so a value containing `</script>` cannot break out of the
// inline <script type="application/ld+json"> tag. `<` is still valid JSON.
export function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

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

interface NestedReviewSchema {
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  datePublished?: string;
  reviewRating?: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
  };
}

export interface AggregateRatingSchema {
  '@context': SchemaContext;
  '@type': 'Organization';
  '@id'?: string;
  name: string;
  url: string;
  aggregateRating: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
    ratingCount: string;
    bestRating: string;
  };
  review: NestedReviewSchema[];
}

// Bundles reviews under a single rated item so they are eligible for rich
// results (Google ignores standalone Review nodes). Returns null when no
// review carries a numeric rating, since AggregateRating requires one.
export function generateAggregateRating(
  testimonials: TestimonialInput[],
  item?: { name?: string; url?: string }
): AggregateRatingSchema | null {
  const rated = testimonials.filter((t) => typeof t.ratingValue === 'number');
  if (rated.length === 0) return null;

  const bestRating = 5;
  const average =
    rated.reduce((sum, t) => sum + (t.ratingValue as number), 0) / rated.length;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    // Không có override tức là đang nói về chính công ty: dùng lại `@id` của node
    // Organization phát ở BaseLayout để Google gộp làm một thực thể, thay vì
    // thấy hai Organization trùng tên trên cùng một trang.
    ...(item?.name || item?.url ? {} : { '@id': ORGANIZATION_ID }),
    name: item?.name ?? SITE_CONFIG.companyName,
    url: item?.url ?? SITE_CONFIG.siteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.toFixed(1),
      reviewCount: testimonials.length.toString(),
      ratingCount: rated.length.toString(),
      bestRating: bestRating.toString(),
    },
    review: testimonials.map((t) => ({
      '@type': 'Review' as const,
      author: {
        '@type': 'Person' as const,
        name: t.author,
      },
      reviewBody: t.message,
      ...(t.datePublished ? { datePublished: t.datePublished } : {}),
      ...(typeof t.ratingValue === 'number'
        ? {
            reviewRating: {
              '@type': 'Rating' as const,
              ratingValue: t.ratingValue.toString(),
              bestRating: (t.bestRating ?? bestRating).toString(),
            },
          }
        : {}),
    })),
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
    // Bài viết được biên soạn dưới danh nghĩa công ty, không phải một cá nhân cụ thể.
    // Khai '@type': 'Person' với tên công ty là sai thực thể — Google không quy được
    // uy tín cho một Person không tồn tại. Dùng Organization trỏ về chính site.
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.companyName,
      url: SITE_CONFIG.siteUrl,
      logo: buildLogo(),
    },
    inLanguage: 'ja',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.companyName,
      url: SITE_CONFIG.siteUrl,
    },
    mainEntityOfPage: post.url,
    ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
  };
}

/** Cho Google biết tên site (thay vì hiển thị domain trần trên SERP). */
export function generateWebSite(): WebSiteSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    name: SITE_CONFIG.companyName,
    alternateName: SITE_CONFIG.companyNameKana,
    url: `${SITE_CONFIG.siteUrl}/`,
    inLanguage: 'ja',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** Nguồn logo có cấu trúc cho toàn site — Google dùng để chọn favicon/knowledge panel. */
export function generateOrganization(): OrganizationSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_CONFIG.companyName,
    alternateName: SITE_CONFIG.companyNameKana,
    legalName: SITE_CONFIG.legalName,
    url: `${SITE_CONFIG.siteUrl}/`,
    logo: buildLogo(),
    image: absoluteUrl(SITE_CONFIG.logoPath),
    telephone: SITE_CONFIG.phone.display,
  };
}
