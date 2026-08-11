import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../utils/siteConfig';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a, b) => new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime()
  );

  return rss({
    title: `${SITE_CONFIG.companyName}｜お役立ちコラム`,
    description: '電気設備・水回り設備のトラブル対処法や予防のポイントを専門スタッフが解説するコラムです。',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.updatedDate ?? post.data.publishedDate,
      link: `/columns/${post.id}/`,
      categories: [post.data.subcategory],
    })),
    customData: '<language>ja</language>',
  });
}
