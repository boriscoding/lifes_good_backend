import axios from 'axios';
import { whatsappConfig } from '../config/whatsapp';
import { logger } from '../config/logger';

const BASE_URL = `${whatsappConfig.baseUrl}/${whatsappConfig.apiVersion}`;

export const sendWhatsAppMessage = async (
  to: string,
  message: string
): Promise<boolean> => {
  if (!whatsappConfig.enabled) {
    logger.warn('WhatsApp desactive. Message non envoye : ' + message);
    return false;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/${whatsappConfig.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formatPhoneNumber(to),
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsappConfig.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.status === 200;
  } catch (error: any) {
    logger.error('Erreur envoi WhatsApp :', error.response?.data || error.message);
    return false;
  }
};

export const sendWhatsAppTemplate = async (
  to: string,
  templateName: string,
  languageCode: string = 'fr',
  variables?: Record<string, string>
): Promise<boolean> => {
  if (!whatsappConfig.enabled) return false;

  const components = variables
    ? [
        {
          type: 'body',
          parameters: Object.values(variables).map((v) => ({
            type: 'text',
            text: v,
          })),
        },
      ]
    : undefined;

  try {
    const response = await axios.post(
      `${BASE_URL}/${whatsappConfig.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formatPhoneNumber(to),
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          ...(components && { components }),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsappConfig.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.status === 200;
  } catch (error: any) {
    logger.error('Erreur template WhatsApp :', error.response?.data || error.message);
    return false;
  }
};

const formatPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (!cleaned.startsWith('237')) {
    cleaned = '237' + cleaned;
  }
  return cleaned;
};