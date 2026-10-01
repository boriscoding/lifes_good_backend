
import { prisma } from '../config/database';
import { AggregatorFactory } from '../paymentAggregators/AggregatorFactory';
import { logger } from '../config/logger';

export const syncPaymentStatus = async (): Promise<void> => {
  try {
    const pendingPayments = await prisma.payment.findMany({
      where: {
        status: 'pending',
      },
      take: 50,
    });

    for (const payment of pendingPayments) {
      try {
        const aggregator = AggregatorFactory.getAggregator(payment.method);
        const result = await aggregator.checkStatus(payment.reference);

        if (result.status === 'success') {
          await prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: 'completed',
              paidAt: result.paidAt ?? new Date(),
            },
          });

          logger.info(
            `Paiement ${payment.reference} confirme`,
          );
        } else if (result.status === 'failed') {
          await prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: 'failed',
            },
          });
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : String(error);

        logger.error(
          `Erreur sync ${payment.reference}:`,
          message,
        );
      }
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    logger.error(
      'Erreur syncPaymentStatus:',
      message,
    );
  }
};

