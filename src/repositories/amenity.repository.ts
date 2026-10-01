
import { prisma } from '../config/database';
import { IAmenityRepository } from './interfaces/IAmenityRepository';

export const amenityRepository: IAmenityRepository = {
  async findById(id: string) {
    return prisma.amenity.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.amenity.create({
      data,
    });
  },

  async update(id, data) {
    const amenity = await prisma.amenity.findUnique({
      where: { id },
    });

    if (!amenity) {
      return null;
    }

    return prisma.amenity.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const where: {
      category?: 'room' | 'apartment' | 'office' | 'common';
      isActive?: boolean;
    } = {};

    if (options.category) {
      where.category = options.category;
    }

    if (options.isActive !== undefined) {
      where.isActive = options.isActive;
    }

    return prisma.amenity.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
  },

  async delete(id: string) {
    const amenity = await prisma.amenity.findUnique({
      where: { id },
    });

    if (!amenity) {
      return false;
    }

    await prisma.amenity.delete({
      where: { id },
    });

    return true;
  },
};

