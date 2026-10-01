import { env } from './index';

export const whatsappConfig = {
  enabled: env.WHATSAPP_ENABLED,
  phoneNumberId: env.WHATSAPP_PHONE_NUMBER_ID || '',
  accessToken: env.WHATSAPP_ACCESS_TOKEN || '',
  webhookVerifyToken: env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '',
  apiVersion: 'v18.0',
  baseUrl: 'https://graph.facebook.com',
  
  // Rate limiting interne WhatsApp
  rateLimit: {
    maxPerMinute: 20,
    maxPerHour: 100,
  },
};