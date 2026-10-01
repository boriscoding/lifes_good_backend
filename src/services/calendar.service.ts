
import { prisma } from '../config/database';
import { CalendarBlockType } from '../generated/prisma/client';

export const calendarService = {
  async block(data: {
    propertyId: string;
    startDate: Date | string;
    endDate: Date | string;
    type?: CalendarBlockType;
    reason?: string | null;
    createdBy?: string | null;
  }) {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      throw new Error('Dates invalides');
    }

    if (startDate >= endDate) {
      throw new Error(
        'La date de debut doit etre anterieure a la date de fin',
      );
    }

    return prisma.calendarBlock.create({
      data: {
        propertyId: data.propertyId,
        startDate,
        endDate,
        type: data.type ?? 'other',
        reason: data.reason ?? null,
        createdBy: data.createdBy ?? null,
      },
    });
  },

  async unblock(blockId: string) {
    const block = await prisma.calendarBlock.findUnique({
      where: { id: blockId },
    });

    if (!block) {
      throw new Error('Blocage non trouve');
    }

    await prisma.calendarBlock.delete({
      where: { id: blockId },
    });

    return true;
  },

  async list(options?: {
    propertyId?: string;
  }) {
    const where: {
      propertyId?: string;
    } = {};

    if (options?.propertyId) {
      where.propertyId = options.propertyId;
    }

    return prisma.calendarBlock.findMany({
      where,
      orderBy: {
        startDate: 'asc',
      },
    });
  },
};

