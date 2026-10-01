
import {
  Payment,
  PaymentMethodCode,
  PaymentStatus,
  PaymentType,
} from '../../generated/prisma/client';

export interface IPaymentRepository {
  findById(id: string): Promise<Payment | null>;

  findByReference(reference: string): Promise<Payment | null>;

  create(data: {
    bookingId: string;
    transactionId: string;
    reference: string;
    amount: number;
    method: PaymentMethodCode;
    type: PaymentType;
    status?: PaymentStatus;
    phoneNumber?: string | null;
    providerResponse?: string | null;
    paidAt?: Date | null;
    refundedAt?: Date | null;
    refundReason?: string | null;
  }): Promise<Payment>;

  update(
    id: string,
    data: {
      bookingId?: string;
      transactionId?: string;
      reference?: string;
      amount?: number;
      method?: PaymentMethodCode;
      type?: PaymentType;
      status?: PaymentStatus;
      phoneNumber?: string | null;
      providerResponse?: string | null;
      paidAt?: Date | null;
      refundedAt?: Date | null;
      refundReason?: string | null;
    },
  ): Promise<Payment | null>;

  list(options?: {
    bookingId?: string;
    transactionId?: string;
    reference?: string;
    method?: PaymentMethodCode;
    type?: PaymentType;
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Payment[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}

