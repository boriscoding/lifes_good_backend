
import { prisma } from '../config/database';
import { IPropertyRepository } from './interfaces/IPropertyRepository';

export const propertyRepository: IPropertyRepository = {
  async findById(id: string) {
    return prisma.property.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.property.create({
      data,
    });
  },

  async update(id, data) {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return null;
    }

    return prisma.property.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(options.type && {
        type: options.type,
      }),

      ...(options.city && {
        city: options.city,
      }),

      ...(options.category && {
        category: options.category,
      }),

      ...(options.isActive !== undefined && {
        isActive: options.isActive,
      }),

      ...(options.minPrice !== undefined && {
        price: {
          gte: options.minPrice,
        },
      }),

      ...(options.maxPrice !== undefined && {
        price: {
          ...(options.minPrice !== undefined && {
            gte: options.minPrice,
          }),
          lte: options.maxPrice,
        },
      }),

      ...(options.capacity !== undefined && {
        capacity: {
          gte: options.capacity,
        },
      }),
    };

    const [data, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.property.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async delete(id: string) {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return false;
    }

    await prisma.property.delete({
      where: { id },
    });

    return true;
  },
};

