import { notificationQueue } from '../notification.queue';
import { emailService } from '../../services/email.service';
import { smsService } from '../../services/sms.service';
import { logger } from '../../config/logger';

notificationQueue.process(async (job) => {
  const { type, to, subject, content } = job.data;

  try {
    if (type === 'email') {
      await emailService.send(to, subject, content);
    } else if (type === 'sms') {
      await smsService.send(to, content);
    }
    logger.info(`Notification ${type} envoyee a ${to}`);
    return { sent: true };
  } catch (error: any) {
    logger.error(`Erreur notification:`, error.message);
    throw error;
  }
});