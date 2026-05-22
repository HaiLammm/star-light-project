import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png}',
  { eager: false }
);

export async function resolveImage(publicPath: string): Promise<ImageMetadata | undefined> {
  const assetPath = publicPath.replace(/^\/images\//, '/src/assets/images/');
  const loader = allImages[assetPath];
  if (!loader) return undefined;
  try {
    const mod = await loader();
    return mod.default;
  } catch {
    return undefined;
  }
}
