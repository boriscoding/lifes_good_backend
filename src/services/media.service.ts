import { prisma } from '../config/database';

export const mediaService = {
  async listByProperty(propertyId: string) {
    if (!propertyId) return [];
    return prisma.media.findMany({
      where: { propertyId },
      orderBy: { order: 'asc' },
    });
  },

  async delete(id: string) {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) throw new Error('Media non trouve');

    await prisma.media.delete({ where: { id } });
    return true;
  },
};