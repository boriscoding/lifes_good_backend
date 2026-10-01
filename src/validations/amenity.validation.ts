import { z } from 'zod';

export const createAmenitySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(100),
    category: z.enum(['room', 'apartment', 'office', 'common']),
    icon: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const updateAmenitySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});