export type WhatsAppMessageType = 'text' | 'template' | 'media';

export interface WhatsAppMessagePayload {
  to: string;
  type: WhatsAppMessageType;
  content: string;
  templateName?: string;
  variables?: Record<string, string>;
}