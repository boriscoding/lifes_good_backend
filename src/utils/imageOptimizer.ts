import sharp from 'sharp';

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export const optimizeImage = async (
  buffer: Buffer,
  options: ImageOptimizationOptions = {}
): Promise<Buffer> => {
  const { width = 1200, height, quality = 80, format = 'jpeg' } = options;

  let pipeline = sharp(buffer).resize(width, height, { fit: 'inside', withoutEnlargement: true });

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, progressive: true });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  }

  return pipeline.toBuffer();
};