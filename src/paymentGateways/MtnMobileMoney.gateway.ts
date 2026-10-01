import { PaymentGatewayInterface, PaymentGatewayResult } from './PaymentGateway.interface';
import { AggregatorFactory } from '../paymentAggregators/AggregatorFactory';
import { logger } from '../config/logger';

export class MtnMobileMoneyGateway implements PaymentGatewayInterface {
  name = 'MTN Mobile Money';
  slug = 'mtn_mobile_money';

  async processPayment(data: any): Promise<PaymentGatewayResult> {
    try {
      const aggregator = AggregatorFactory.getAggregator('mtn_money');
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
        requiresRedirect: false,
        transactionId: result.transactionId,
      };
    } catch (error: any) {
      logger.error('Erreur MTN Gateway:', error.message);
      return { success: false, reference: data.reference, message: error.message, requiresRedirect: false };
    }
  }

  validatePhoneNumber(phone: string): boolean {
    const clean = phone.replace(/\D/g, '');
    return /^2376[0-9]{8}$/.test(clean) || /^6[0-9]{8}$/.test(clean);
  }
}