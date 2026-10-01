
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import dayjs from 'dayjs';

export const generateDailyReports = async (): Promise<void> => {
  try {
    const today = dayjs().startOf('day').toDate();
    const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

    const newBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const revenueResult = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'completed',
        paidAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    const revenue = revenueResult._sum.amount ?? 0;

    logger.info(
      `Rapport journalier: ${newBookings} nouvelles reservations, ${revenue} FCFA de revenus`,
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur generateDailyReports:', message);
  }
};

