import { prisma } from '../config/database';
import { IPaymentRepository } from './interfaces/IPaymentRepository';

export const paymentRepository: IPaymentRepository = {
  async findById(id: string) {
    return prisma.payment.findUnique({
      where: { id },
    });
  },

  async findByReference(reference: string) {
    return prisma.payment.findUnique({
      where: { reference },
    });
  },

  async create(data) {
    return prisma.payment.create({
      data,
    });
  },

  async update(id, data) {
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return null;
    }

    return prisma.payment.update({
      where: { id },
      data,
    });
  },

  async list(options = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(options.bookingId && {
        bookingId: options.bookingId,
      }),

      ...(options.transactionId && {
        transactionId: options.transactionId,
      }),

      ...(options.reference && {
        reference: options.reference,
      }),

      ...(options.method && {
        method: options.method,
      }),

      ...(options.type && {
        type: options.type,
      }),

      ...(options.status && {
        status: options.status,
      }),
    };

    // include booking pour que l'admin puisse afficher le client
    // (guestName) et la reference de reservation sans requete separee.
    const [data, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          booking: {
            select: {
              reference: true,
              guestName: true,
              guestEmail: true,
            },
          },
        },
      }),

      prisma.payment.count({
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