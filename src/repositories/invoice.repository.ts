import { prisma } from '../config/database';
import { InvoiceStatus } from '../generated/prisma/client';

export interface CreateInvoiceData {
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  taxAmount?: number;
  totalAmount: number;
  status?: InvoiceStatus;
  issuedAt?: Date | null;
}

export interface UpdateInvoiceData {
  status?: InvoiceStatus;
  paidAt?: Date | null;
  pdfUrl?: string | null;
}

export interface ListInvoicesOptions {
  userId?: string;
  bookingId?: string;
  status?: InvoiceStatus;
  page?: number;
  limit?: number;
}

export const invoiceRepository = {
  async findById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { booking: true },
    });
  },

  async findByBookingId(bookingId: string) {
    return prisma.invoice.findFirst({
      where: { bookingId },
      include: { booking: true },
    });
  },

  async create(data: CreateInvoiceData) {
    return prisma.invoice.create({
      data: {
        bookingId: data.bookingId,
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
        taxAmount: data.taxAmount ?? 0,
        totalAmount: data.totalAmount,
        status: data.status ?? 'issued',
        issuedAt: data.issuedAt ?? new Date(),
      },
      include: { booking: true },
    });
  },

  async update(id: string, data: UpdateInvoiceData) {
    const invoice = await prisma.invoice.findUnique({ where: { id } });

    if (!invoice) {
      return null;
    }

    return prisma.invoice.update({
      where: { id },
      data,
      include: { booking: true },
    });
  },

  // Filtre par booking.userId via la relation Prisma reelle Invoice -> Booking.
  async list(options: ListInvoicesOptions = {}) {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (options.bookingId) {
      where.bookingId = options.bookingId;
    }

    if (options.status) {
      where.status = options.status;
    }

    if (options.userId) {
      where.booking = { userId: options.userId };
    }

    const [data, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: { booking: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.invoice.count({ where }),
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