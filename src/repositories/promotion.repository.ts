
import { prisma } from '../config/database';
import { IPromotionRepository } from './interfaces/IPromotionRepository';

export const promotionRepository: IPromotionRepository = {
  async findById(id: string) {
    return prisma.promotion.findUnique({
      where: { id },
    });
  },

  async findByCode(code: string) {
    return prisma.promotion.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });
  },

  async create(data) {
    return prisma.promotion.create({
      data,
    });
  },

  async update(id, data) {
    const promo = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!promo) {
      return null;
    }

    return prisma.promotion.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(options.code && {
        code: options.code.toUpperCase(),
      }),

      ...(options.type && {
        type: options.type,
      }),

      ...(options.scope && {
        scope: options.scope,
      }),

      ...(options.propertyId && {
        propertyId: options.propertyId,
      }),

      ...(options.isActive !== undefined && {
        isActive: options.isActive,
      }),

      ...(options.startDate && {
        startDate: {
          gte: options.startDate,
        },
      }),

      ...(options.endDate && {
        endDate: {
          lte: options.endDate,
        },
      }),
    };

    const [data, total] = await Promise.all([
      prisma.promotion.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.promotion.count({
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
    const promo = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!promo) {
      return false;
    }

    await prisma.promotion.delete({
      where: { id },
    });

    return true;
  },
};

