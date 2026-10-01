import { logger } from '../config/logger';
import { AggregatorPaymentStatus, mapAggregatorStatus } from './PaymentStatus';
import { paymentRepository } from '../repositories/payment.repository';
import { paymentTransactionRepository } from '../repositories/paymentTransaction.repository';
import { bookingRepository } from '../repositories/booking.repository';

export class WebhookHandler {
  static async processWebhook(
    provider: string,
    body: any,
    signature?: string
  ): Promise<void> {
    logger.info(`Webhook recu de ${provider}`, { body });

    let reference: string | undefined;
    let status: string | undefined;
    let transactionId: string | undefined;

    if (provider === 'paydunya') {
      reference = body.data?.custom_data?.reference || body.custom_data?.reference;
      status = body.data?.status || body.status;
      transactionId = body.data?.transaction_id || body.transaction_id;
    } else if (provider === 'cinetpay') {
      reference = body.cpm_trans_id;
      status = body.cpm_trans_status;
      transactionId = body.cpm_trans_id;
    } else if (provider === 'opay') {
      reference = body.reference;
      status = body.status;
      transactionId = body.orderNo;
    }

    if (!reference) {
      logger.error('Reference manquante dans le webhook', { provider, body });
      return;
    }

    const payment = await paymentRepository.findByReference(reference);
    if (!payment) {
      logger.error('Paiement non trouve pour le webhook', { reference });
      return;
    }

    const mappedStatus = mapAggregatorStatus(provider, status || 'pending');

    await paymentTransactionRepository.create({
      paymentId: payment.id,
      aggregator: provider,
      externalTransactionId: transactionId || '',
      status: mappedStatus as any,
      responsePayload: JSON.stringify(body),
      processedAt: new Date(),
    });

    if (mappedStatus === AggregatorPaymentStatus.SUCCESS) {
      await paymentRepository.update(payment.id, {
        status: 'completed',
        paidAt: new Date(),
      });

      const booking = await bookingRepository.findById(payment.bookingId);
      if (booking) {
        const newPaidAmount = Number(booking.paidAmount) + Number(payment.amount);
        const isFullyPaid = newPaidAmount >= Number(booking.totalAmount);
        await bookingRepository.update(booking.id, {
          paidAmount: newPaidAmount,
          status: isFullyPaid ? 'confirmed' : booking.status,
        });
      }
    } else if (mappedStatus === AggregatorPaymentStatus.FAILED) {
      await paymentRepository.update(payment.id, { status: 'failed' });
    }
  }
}