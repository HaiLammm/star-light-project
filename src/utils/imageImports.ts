import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png}',
  { eager: false }
);

const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

export async function resolveImage(publicPath: string): Promise<ImageMetadata | undefined> {
  const assetPath = publicPath.replace(/^\/images\//, '/src/assets/images/');
  // Bản trong src/assets đôi khi khác đuôi với bản public (vd. .png ↔ .jpg).
  // Không dò các đuôi khác thì ảnh rơi về file gốc chưa tối ưu — trang chủ từng
  // phải tải 34MB PNG vì lý do này.
  const stem = assetPath.replace(/\.(jpg|jpeg|png)$/i, '');
  const loader =
    allImages[assetPath] ?? EXTENSIONS.map((ext) => allImages[stem + ext]).find(Boolean);
  if (!loader) return undefined;
  try {
    const mod = await loader();
    return mod.default;
  } catch {
    return undefined;
  }
}
