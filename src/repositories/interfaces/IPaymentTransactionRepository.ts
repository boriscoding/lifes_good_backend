
import {
  PaymentTransaction,
  PaymentTransactionStatus,
} from '../../generated/prisma/client';

export interface IPaymentTransactionRepository {
  findById(id: string): Promise<PaymentTransaction | null>;

  create(data: {
    paymentId: string;
    aggregator: string;
    externalTransactionId?: string | null;
    status?: PaymentTransactionStatus;
    requestPayload?: string | null;
    responsePayload?: string | null;
    processedAt?: Date | null;
  }): Promise<PaymentTransaction>;

  update(
    id: string,
    data: {
      paymentId?: string;
      aggregator?: string;
      externalTransactionId?: string | null;
      status?: PaymentTransactionStatus;
      requestPayload?: string | null;
      responsePayload?: string | null;
      processedAt?: Date | null;
    },
  ): Promise<PaymentTransaction | null>;
}
