import { PaymentGatewayInterface, PaymentGatewayResult } from './PaymentGateway.interface';
import { logger } from '../config/logger';

export class CashGateway implements PaymentGatewayInterface {
  name = 'Paiement sur place';
  slug = 'cash';

  async processPayment(data: any): Promise<PaymentGatewayResult> {
    logger.info(`Paiement comptant enregistre: ${data.reference}`);
    return {
      success: true,
      reference: data.reference,
      message: 'Paiement comptant - a regler sur place',
      requiresRedirect: false,
    };
  }

  validatePhoneNumber(phone: string): boolean {
    return true;
  }
}