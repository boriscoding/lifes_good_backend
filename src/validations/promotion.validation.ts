import { z } from 'zod';

export const createPromotionSchema = z.object({
  body: z.object({
    code: z.string().min(3).max(20).toUpperCase(),
    description: z.string().optional(),
    type: z.enum(['percentage', 'fixed_amount', 'free_nights']),
    value: z.number().positive(),
    scope: z.enum(['global', 'room', 'apartment', 'office', 'property']).default('global'),
    propertyId: z.string().uuid().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    maxUses: z.number().int().positive().optional(),
    minBookingAmount: z.number().positive().optional(),
    isActive: z.boolean().default(true),
  }),
});

export const validatePromotionSchema = z.object({
  body: z.object({
    code: z.string(),
    bookingAmount: z.number().positive(),
    propertyType: z.enum(['room', 'apartment', 'office']).optional(),
  }),
});