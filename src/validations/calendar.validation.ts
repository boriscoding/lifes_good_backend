import { z } from 'zod';

export const blockDatesSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    reason: z.string().min(3),
    type: z.enum(['maintenance', 'private', 'other']).default('maintenance'),
  }),
});

export const unblockDatesSchema = z.object({
  params: z.object({
    blockId: z.string().uuid(),
  }),
});