
import {
  sendWhatsAppMessage,
  sendWhatsAppTemplate,
} from '../whatsapp/whatsapp.client';

import { logger } from '../config/logger';

interface SendMessageData {
  to: string;
  message: string;
}

interface SendTemplateData {
  to: string;
  templateName: string;
  language: string;
  variables?: Record<string, string>;
}

export const whatsappService = {
  async sendMessage(
    data: SendMessageData,
  ): Promise<{ sent: boolean }> {
    const result = await sendWhatsAppMessage(
      data.to,
      data.message,
    );

    return {
      sent: result,
    };
  },

  async sendTemplate(
    data: SendTemplateData,
  ): Promise<{ sent: boolean }> {
    const result = await sendWhatsAppTemplate(
      data.to,
      data.templateName,
      data.language,
      data.variables,
    );

    return {
      sent: result,
    };
  },

  /**
   * Génère le lien WhatsApp avec un message de réservation prédéfini.
   */
  async getReservationWhatsAppLink(
    propertyId: string,
    details: {
      name: string;
      type: string;
      price: number;
      description?: string;
    },
    receptionPhone: string,
  ): Promise<string> {
    const message =
      `Bonjour, 👋\n\n` +
      `Je souhaite réserver le bien suivant :\n\n` +
      `🏠 *Nom* : ${details.name}\n` +
      `📋 *Type* : ${details.type}\n` +
      `💰 *Prix/jour* : ${details.price.toLocaleString()} FCFA\n` +
      `🆔 *ID Bien* : ${propertyId}\n\n` +
      (details.description
        ? `📝 *Description* : ${details.description.substring(0, 100)}...\n\n`
        : '') +
      `Merci de me confirmer la disponibilité et de m'envoyer les coordonnées de paiement (MoMo ou OM). 😊\n\n` +
      `---\n` +
      `Ce message est généré automatiquement depuis Liife'is Good.`;

    const cleanPhone = receptionPhone.replace(/\D/g, '');

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  },

  async sendWhatsAppMessage(
    to: string,
    message: string,
  ): Promise<{
    sent: boolean;
    error?: string;
  }> {
    try {
      const result = await sendWhatsAppMessage(to, message);

      return {
        sent: result,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      logger.error(
        `Erreur envoi WhatsApp à ${to}:`,
        errorMessage,
      );

      return {
        sent: false,
        error: errorMessage,
      };
    }
  },

  async sendConfirmationLink(
    to: string,
    bookingId: string,
    confirmationId: string,
  ): Promise<void> {
    const message =
      `🎉 *Réservation confirmée !*\n\n` +
      `Votre réservation a été validée avec succès.\n` +
      `🆔 *ID de réservation* : ${bookingId}\n` +
      `🔑 *Code de confirmation* : ${confirmationId}\n\n` +
      `Vous pouvez maintenant vous connecter à votre compte et confirmer votre réservation en utilisant ce code.`;

    await this.sendWhatsAppMessage(to, message);
  },
};

