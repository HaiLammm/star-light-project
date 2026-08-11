import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Ảnh chèn bằng cú pháp markdown trong bài viết đi thẳng ra <img> trần: không có
// width/height (gây CLS khi ảnh tải xong và đẩy nội dung xuống) và không có
// loading="lazy" (trình duyệt tải cả 5-10 ảnh ngay từ đầu, kéo LCP xuống).
// Plugin này bổ sung ba thuộc tính đó lúc build, đọc kích thước thật từ file
// trong public/ nên không phải sửa nội dung markdown.
const dimensionCache = new Map();

async function getDimensions(src) {
  if (dimensionCache.has(src)) return dimensionCache.get(src);
  const filePath = path.join(process.cwd(), 'public', src);
  let result;
  if (existsSync(filePath)) {
    try {
      const { width, height } = await sharp(filePath).metadata();
      if (width && height) result = { width, height };
    } catch {
      // ảnh hỏng/không đọc được: bỏ qua, giữ nguyên thẻ img
    }
  }
  dimensionCache.set(src, result);
  return result;
}

export function rehypeArticleImages() {
  return async (tree) => {
    const targets = [];
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img') targets.push(node);
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);

    for (const node of targets) {
      const src = node.properties?.src;
      if (typeof src !== 'string' || !src.startsWith('/images/')) continue;

      node.properties.loading ??= 'lazy';
      node.properties.decoding ??= 'async';

      if (node.properties.width && node.properties.height) continue;
      const dims = await getDimensions(src);
      if (dims) {
        node.properties.width = dims.width;
        node.properties.height = dims.height;
      }
    }
  };
}
