
import { prisma } from '../config/database';
import { logger } from '../config/logger';
import dayjs from 'dayjs';

export const checkPendingPayments = async (): Promise<void> => {
  try {
    const expiryDate = dayjs().subtract(30, 'minute').toDate();

    const expired = await prisma.payment.findMany({
      where: {
        status: 'pending',
        createdAt: {
          lt: expiryDate,
        },
      },
    });

    for (const payment of expired) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: 'failed',
        },
      });

      logger.info(
        `Paiement expire annule: ${payment.reference}`,
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error('Erreur checkPendingPayments:', message);
  }
};

