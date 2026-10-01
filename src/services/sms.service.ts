
import { smsConfig } from '../config/sms';
import { logger } from '../config/logger';

export const smsService = {
  async send(
    phone: string,
    message: string,
  ): Promise<{
    sent: true;
    provider: typeof smsConfig.provider;
  }> {
    if (smsConfig.provider === 'africastalking') {
      // TODO: Implementer Africa's Talking
      logger.info(
        `SMS [Africa's Talking] a ${phone}: ${message}`,
      );
    } else {
      // TODO: Implementer Twilio
      logger.info(
        `SMS [Twilio] a ${phone}: ${message}`,
      );
    }

    return {
      sent: true,
      provider: smsConfig.provider,
    };
  },
};

