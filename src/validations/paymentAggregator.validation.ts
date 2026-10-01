import { z } from 'zod';

export const aggregatorWebhookSchema = z.object({
  body: z.any(),           
  headers: z.any(),        
});

export const initiateAggregatorPaymentSchema = z.object({
  body: z.object({
    aggregator: z.enum(['paydunya', 'cinetpay', 'opay']),
    amount: z.number().positive(),
    currency: z.string().default('XAF'),
    description: z.string(),
    customerEmail: z.string().email(),
    customerPhone: z.string().optional(),
    returnUrl: z.string().url(),
    cancelUrl: z.string().url(),
  }),
});