import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    to: z.string().min(9),
    message: z.string().min(1).max(4096),
    type: z.enum(['text', 'template']).default('text'),
  }),
});

export const sendTemplateSchema = z.object({
  body: z.object({
    to: z.string().min(9),
    templateName: z.string(),
    language: z.string().default('fr'),
    variables: z.object({}).catchall(z.string()).optional(),
  }),
});