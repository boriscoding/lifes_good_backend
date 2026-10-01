
import { prisma } from '../config/database';
import { IContractRepository } from './interfaces/IContractRepository';

export const contractRepository: IContractRepository = {
  async findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.contract.create({
      data,
    });
  },

  async update(id, data) {
    const contract = await prisma.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      return null;
    }

    return prisma.contract.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where: {
      status?: typeof options.status;
      tenantId?: string;
      propertyId?: string;
    } = {};

    if (options.status) {
      where.status = options.status;
    }

    if (options.tenantId) {
      where.tenantId = options.tenantId;
    }

    if (options.propertyId) {
      where.propertyId = options.propertyId;
    }

    const [data, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.contract.count({
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
};

