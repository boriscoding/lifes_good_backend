
import { prisma } from '../config/database';
import { IManualBookingRepository } from './interfaces/IManualBookingRepository';

export const manualBookingRepository: IManualBookingRepository = {
  async findById(id: string) {
    return prisma.manualBookingRequest.findUnique({
      where: { id },
    });
  },

  async findByConfirmationId(confirmationId: string) {
    return prisma.manualBookingRequest.findUnique({
      where: { confirmationId },
    });
  },

  async create(data) {
    return prisma.manualBookingRequest.create({
      data,
    });
  },

  async update(id, data) {
    const request = await prisma.manualBookingRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return null;
    }

    return prisma.manualBookingRequest.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(options.status && {
        status: options.status,
      }),

      ...(options.propertyId && {
        propertyId: options.propertyId,
      }),

      ...(options.guestEmail && {
        guestEmail: options.guestEmail,
      }),

      ...(options.confirmationId && {
        confirmationId: options.confirmationId,
      }),
    };

    const [data, total] = await Promise.all([
      prisma.manualBookingRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.manualBookingRequest.count({
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

