import { PaymentStatus } from '../generated/prisma/client';

import { paymentRepository } from '../repositories/payment.repository';
import { generatePaymentReference } from '../utils/generateReference';
import { isValidPaymentAmount } from '../utils/paymentHelpers';

type PaymentCreateData = Parameters<
  typeof paymentRepository.create
>[0];

type PaymentUpdateData = Parameters<
  typeof paymentRepository.update
>[1];

type PaymentListOptions = Parameters<
  typeof paymentRepository.list
>[0];

export const paymentService = {
  async initiate(data: PaymentCreateData) {
    if (!isValidPaymentAmount(Number(data.amount))) {
      throw new Error('Montant invalide');
    }

    const reference = generatePaymentReference();

    return paymentRepository.create({
      ...data,
      reference,
      transactionId: reference,
      status: PaymentStatus.pending,
    });
  },

  async verify(data: {
    reference: string;
  }) {
    const payment = await paymentRepository.findByReference(
      data.reference,
    );

    if (!payment) {
      throw new Error('Paiement non trouve');
    }

    // TODO: Verifier aupres de l'agregateur

    return payment;
  },

  async getStatus(id: string) {
    const payment = await paymentRepository.findById(id);

    if (!payment) {
      throw new Error('Paiement non trouve');
    }

    return payment;
  },

  // Liste paginee des paiements (avec reference/guestName de la
  // reservation associee) — utilisee par le dashboard admin.
  async list(options?: PaymentListOptions) {
    return paymentRepository.list(options);
  },

  async refund(data: {
    paymentId: string;
    reason?: string | null;
  }) {
    const payment = await paymentRepository.findById(
      data.paymentId,
    );

    if (!payment) {
      throw new Error('Paiement non trouve');
    }

    if (payment.status !== PaymentStatus.completed) {
      throw new Error(
        'Paiement non eligible au remboursement',
      );
    }

    const updateData: PaymentUpdateData = {
      status: PaymentStatus.refunded,
      refundedAt: new Date(),
      refundReason: data.reason ?? null,
    };

    return paymentRepository.update(
      payment.id,
      updateData,
    );
  },
};