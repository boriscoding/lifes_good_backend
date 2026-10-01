
import { prisma } from '../config/database';
import { IBookingRepository } from './interfaces/IBookingRepository';

export const bookingRepository: IBookingRepository = {
  async findById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.booking.create({
      data,
    });
  },

  async update(id, data) {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return null;
    }

    return prisma.booking.update({
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
      propertyId?: string;
      userId?: string;
    } = {};

    if (options.status) {
      where.status = options.status;
    }

    if (options.propertyId) {
      where.propertyId = options.propertyId;
    }

    if (options.userId) {
      where.userId = options.userId;
    }

    const [data, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.booking.count({
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

  async checkAvailability(propertyId: string, start: Date, end: Date) {
    /*
     * Une réservation est en conflit si :
     *
     * existing.startDate < end
     * ET
     * existing.endDate > start
     *
     * Cela couvre tous les cas de chevauchement.
     */

    const existing = await prisma.booking.findFirst({
      where: {
        propertyId,

        status: {
          not: 'cancelled',
        },

        startDate: {
          lt: end,
        },

        endDate: {
          gt: start,
        },
      },
    });

    /*
     * Même logique pour les périodes bloquées.
     */
    const blocked = await prisma.calendarBlock.findFirst({
      where: {
        propertyId,

        startDate: {
          lt: end,
        },

        endDate: {
          gt: start,
        },
      },
    });

    return !existing && !blocked;
  },
};

