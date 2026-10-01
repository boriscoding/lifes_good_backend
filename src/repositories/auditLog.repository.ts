
import { prisma } from '../config/database';

export const auditLogRepository = {
  async create(data: {
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  }) {
    return prisma.auditLog.create({
      data,
    });
  },

  async list(options: {
    page?: number | string;
    limit?: number | string;
  } = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 50;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.auditLog.count(),
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
