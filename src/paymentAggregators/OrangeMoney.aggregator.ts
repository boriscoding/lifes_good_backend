import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { paymentAggregatorConfig } from '../config/paymentAggregator';
import { logger } from '../config/logger';
import axios from 'axios';

export class OrangeMoneyAggregator implements PaymentAggregator {
  name = 'orange_money';
  private config = paymentAggregatorConfig.orangeMoney;

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    try {
      const response = await axios.post(
        'https://api.orange.com/orange-money-webpay/dev/v1/payment',
        {
          merchant_key: this.config.merchantId,
          currency: 'OUV',
          order_id: data.reference,
          amount: data.amount,
          return_url: data.returnUrl,
          cancel_url: data.cancelUrl,
          notif_url: `${process.env.API_URL}/webhooks/payments/orange`,
          lang: 'fr',
          reference: data.reference,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.authorizationHeader}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.payment_url) {
        return {
          success: true,
          paymentUrl: response.data.payment_url,
          reference: data.reference,
          transactionId: response.data.payment_token,
          message: 'Paiement Orange Money initie',
        };
      }

      return { success: false, reference: data.reference, message: 'Erreur Orange Money' };
    } catch (error: any) {
      logger.error('Erreur Orange Money:', error.response?.data || error.message);
      return { success: false, reference: data.reference, message: 'Erreur Orange Money' };
    }
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