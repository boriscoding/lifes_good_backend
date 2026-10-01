
import nodemailer from 'nodemailer';

import { mailConfig } from '../config/mail';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: mailConfig.auth,
  pool: mailConfig.pool,
});

export const emailService = {
  async send(
    to: string,
    subject: string,
    html: string,
  ): Promise<{ sent: true; messageId: string }> {
    try {
      const info = await transporter.sendMail({
        from: `"${mailConfig.from.name}" <${mailConfig.from.address}>`,
        to,
        subject,
        html,
      });

      logger.info(
        `Email envoye a ${to}: ${info.messageId}`,
      );

      return {
        sent: true,
        messageId: info.messageId,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      logger.error(`Erreur email: ${message}`);

      throw error;
    }
  },
};

