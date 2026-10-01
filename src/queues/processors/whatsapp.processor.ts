import { whatsappQueue } from '../whatsapp.queue';
import { sendWhatsAppMessage } from '../../whatsapp/whatsapp.client';
import { logger } from '../../config/logger';

whatsappQueue.process(async (job) => {
  const { to, message } = job.data;
  const result = await sendWhatsAppMessage(to, message);
  logger.info(`WhatsApp envoye a ${to}: ${result ? 'OK' : 'ECHEC'}`);
  return { sent: result };
});