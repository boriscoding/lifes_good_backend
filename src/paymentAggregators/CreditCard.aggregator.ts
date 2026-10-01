import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { logger } from '../config/logger';

export class CreditCardAggregator implements PaymentAggregator {
  name = 'credit_card';

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    logger.info('Paiement carte bancaire - redirection vers Stripe/PayPal');
    return {
      success: true,
      paymentUrl: data.returnUrl,
      reference: data.reference,
      message: 'Paiement carte bancaire non implemente directement, utiliser un agrégateur',
    };
  }

  async checkStatus(reference: string): Promise<PaymentStatusResult> {
    return { success: false, status: 'pending', message: 'Non implemente' };
  }

  handleWebhook(body: any, headers: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  verifySignature(body: any, signature: string, secret: string): boolean {
    return true;
  }
}