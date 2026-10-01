import { sendWhatsAppMessage, sendWhatsAppTemplate } from './whatsapp.client';
import { WHATSAPP_TEMPLATES } from './whatsapp.templates';
import { logger } from '../config/logger';

export const sendBookingConfirmation = async (
  phone: string,
  guestName: string,
  bookingRef: string,
  propertyName: string,
  checkInDate: string
): Promise<void> => {
  try {
    await sendWhatsAppTemplate(phone, WHATSAPP_TEMPLATES.BOOKING_CONFIRMATION, 'fr', {
      guest_name: guestName,
      booking_ref: bookingRef,
      property_name: propertyName,
      check_in_date: checkInDate,
    });
  } catch (error) {
    logger.error('Erreur confirmation WhatsApp :', error);
  }
};

export const sendPaymentReceived = async (
  phone: string,
  guestName: string,
  amount: string,
  bookingRef: string
): Promise<void> => {
  try {
    await sendWhatsAppTemplate(phone, WHATSAPP_TEMPLATES.PAYMENT_RECEIVED, 'fr', {
      guest_name: guestName,
      amount: amount,
      booking_ref: bookingRef,
    });
  } catch (error) {
    logger.error('Erreur paiement WhatsApp :', error);
  }
};

export const sendPaymentReminder = async (
  phone: string,
  guestName: string,
  amount: string,
  dueDate: string
): Promise<void> => {
  const message = `Bonjour ${guestName},\n\nRappel : un paiement de ${amount} FCFA est attendu avant le ${dueDate}.\n\nMerci de votre confiance.\nLiife'is Good`;
  
  try {
    await sendWhatsAppMessage(phone, message);
  } catch (error) {
    logger.error('Erreur rappel WhatsApp :', error);
  }
};

export const sendCheckInReminder = async (
  phone: string,
  guestName: string,
  propertyName: string,
  checkInTime: string
): Promise<void> => {
  try {
    await sendWhatsAppTemplate(phone, WHATSAPP_TEMPLATES.CHECK_IN_REMINDER, 'fr', {
      guest_name: guestName,
      property_name: propertyName,
      check_in_time: checkInTime,
    });
  } catch (error) {
    logger.error('Erreur rappel check-in WhatsApp :', error);
  }
};