import { PaymentGatewayInterface, PaymentGatewayResult } from './PaymentGateway.interface';
import { AggregatorFactory } from '../paymentAggregators/AggregatorFactory';
import { logger } from '../config/logger';

export class OrangeMoneyGateway implements PaymentGatewayInterface {
  name = 'Orange Money';
  slug = 'orange_money';

  async processPayment(data: any): Promise<PaymentGatewayResult> {
    try {
      const aggregator = AggregatorFactory.getAggregator('orange_money');
      const result = await aggregator.initiatePayment({
        amount: data.amount,
        currency: data.currency || 'XAF',
        description: data.description,
        reference: data.reference,
        customerEmail: data.customerEmail,
        customerPhone: data.phoneNumber,
        returnUrl: data.returnUrl,
        cancelUrl: data.cancelUrl,
      });

      return {
        success: result.success,
        reference: result.reference,
        message: result.message,
        requiresRedirect: !!result.paymentUrl,
        redirectUrl: result.paymentUrl,
        transactionId: result.transactionId,
      };
    } catch (error: any) {
      logger.error('Erreur Orange Gateway:', error.message);
      return { success: false, reference: data.reference, message: error.message, requiresRedirect: false };
    }
  }

  validatePhoneNumber(phone: string): boolean {
    const clean = phone.replace(/\D/g, '');
    return /^2376[0-9]{8}$/.test(clean) || /^6[0-9]{8}$/.test(clean) || /^2372[0-9]{8}$/.test(clean);
  }
}