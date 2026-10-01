import { Request, Response } from 'express';
import { whatsappConfig } from '../config/whatsapp';
import { logger } from '../config/logger';

export const verifyWebhook = (req: Request, res: Response): void => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === whatsappConfig.webhookVerifyToken) {
    logger.info('Webhook WhatsApp verifie avec succes');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};

export const handleWebhook = (req: Request, res: Response): void => {
  res.sendStatus(200);

  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    body.entry?.forEach((entry: any) => {
      entry.changes?.forEach((change: any) => {
        if (change.value?.messages) {
          change.value.messages.forEach((message: any) => {
            logger.info(`Message WhatsApp recu de ${message.from} : ${message.text?.body}`);
            // TODO : Traiter les messages entrants (chatbot, reponses clients)
          });
        }
      });
    });
  }
};