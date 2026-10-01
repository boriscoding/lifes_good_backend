
import { prisma } from '../config/database';

export const paymentMethodRepository = {
  async findById(id: string) {
    return prisma.paymentMethodConfig.findUnique({
      where: { id },
    });
  },

  async findBySlug(slug: string) {
    return prisma.paymentMethodConfig.findUnique({
      where: { slug },
    });
  },

  async create(data: {
    name: string;
    slug: string;
    type: 'mobile_money' | 'card' | 'cash' | 'aggregator';
    provider?: string | null;
    isActive?: boolean;
    config?: string | null;
  }) {
    return prisma.paymentMethodConfig.create({
      data,
    });
  },

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      type?: 'mobile_money' | 'card' | 'cash' | 'aggregator';
      provider?: string | null;
      isActive?: boolean;
      config?: string | null;
    },
  ) {
    const paymentMethod = await prisma.paymentMethodConfig.findUnique({
      where: { id },
    });

    if (!paymentMethod) {
      return null;
    }

    return prisma.paymentMethodConfig.update({
      where: { id },
      data,
    });
  },

  async list(options: {
    type?: 'mobile_money' | 'card' | 'cash' | 'aggregator';
    provider?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  } = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(options.type && {
        type: options.type,
      }),

      ...(options.provider && {
        provider: options.provider,
      }),

      ...(options.isActive !== undefined && {
        isActive: options.isActive,
      }),
    };

    const [data, total] = await Promise.all([
      prisma.paymentMethodConfig.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      }),

      prisma.paymentMethodConfig.count({
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
    const paymentMethod = await prisma.paymentMethodConfig.findUnique({
      where: { id },
    });

    if (!paymentMethod) {
      return false;
    }

    await prisma.paymentMethodConfig.delete({
      where: { id },
    });

    return true;
  },
};

