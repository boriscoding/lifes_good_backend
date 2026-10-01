export const WHATSAPP_TEMPLATES = {
  BOOKING_CONFIRMATION: 'booking_confirmation',
  PAYMENT_RECEIVED: 'payment_received',
  CHECK_IN_REMINDER: 'check_in_reminder',
  CHECK_OUT_REMINDER: 'check_out_reminder',
  PAYMENT_REMINDER: 'payment_reminder',
  BOOKING_CANCELLED: 'booking_cancelled',
} as const;

export type WhatsAppTemplateName = typeof WHATSAPP_TEMPLATES[keyof typeof WHATSAPP_TEMPLATES];