import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  body: z.object({
    bookingId: z.string().uuid(),
    amount: z.number().positive(),
    method: z.enum(['mtn_mobile_money', 'orange_money', 'credit_card', 'cash', 'paydunya', 'cinetpay', 'opay']),
    type: z.enum(['deposit', 'balance', 'full', 'refund']),
    phoneNumber: z.string().optional(),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string(),
    reference: z.string(),
  }),
});

export const refundPaymentSchema = z.object({
  body: z.object({
    paymentId: z.string().uuid(),
    amount: z.number().positive(),
    reason: z.string().min(5),
  }),
});