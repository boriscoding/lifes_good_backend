import { prisma } from '../config/database';

export interface CreateMediaData {
  propertyId: string;
  url: string;
  type: 'image' | 'video' | 'document';
  title?: string | null;
  order?: number;
  isPrimary?: boolean;
}

export const mediaRepository = {
  async listByProperty(propertyId: string) {
    return prisma.media.findMany({
      where: { propertyId },
      orderBy: { order: 'asc' },
    });
  },

  async create(data: CreateMediaData) {
    return prisma.media.create({
      data: {
        propertyId: data.propertyId,
        url: data.url,
        type: data.type,
        title: data.title ?? null,
        order: data.order ?? 0,
        isPrimary: data.isPrimary ?? false,
      },
    });
  },

  async findById(id: string) {
    return prisma.media.findUnique({
      where: { id },
    });
  },

  async delete(id: string) {
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      return false;
    }

    await prisma.media.delete({ where: { id } });
    return true;
  },
};