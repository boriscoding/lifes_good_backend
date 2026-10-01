import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { paymentAggregatorConfig } from '../config/paymentAggregator';
import { logger } from '../config/logger';
import axios from 'axios';

export class CinetPayAggregator implements PaymentAggregator {
  name = 'cinetpay';
  private config = paymentAggregatorConfig.cinetpay;

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/v2/payment`,
        {
          apikey: this.config.apiKey,
          site_id: this.config.siteId,
          transaction_id: data.reference,
          amount: data.amount,
          currency: data.currency,
          description: data.description,
          return_url: data.returnUrl,
          notify_url: `${process.env.API_URL}/webhooks/payments/cinetpay`,
          channels: 'ALL',
          lang: 'FR',
          metadata: JSON.stringify({ reference: data.reference }),
          customer_name: data.customerEmail.split('@')[0],
          customer_surname: 'Client',
          customer_email: data.customerEmail,
          customer_phone_number: data.customerPhone || '000000000',
          customer_address: 'Cameroun',
          customer_city: 'Douala',
          customer_country: 'CM',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.code === '201') {
        return {
          success: true,
          paymentUrl: response.data.data.payment_url,
          reference: data.reference,
          transactionId: response.data.data.payment_token,
          message: 'Paiement initie',
        };
      }

      return {
        success: false,
        reference: data.reference,
        message: response.data.message || 'Erreur CinetPay',
      };
    } catch (error: any) {
      logger.error('Erreur CinetPay:', error.response?.data || error.message);
      return { success: false, reference: data.reference, message: 'Erreur CinetPay' };
    }
  }

  async checkStatus(reference: string): Promise<PaymentStatusResult> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/v2/payment/check`,
        {
          apikey: this.config.apiKey,
          site_id: this.config.siteId,
          transaction_id: reference,
        }
      );

      const status = response.data.data?.status === 'ACCEPTED' ? 'success' : 'pending';
      return {
        success: true,
        status: status as any,
        amount: response.data.data?.amount,
        message: `Statut CinetPay: ${response.data.data?.status}`,
      };
    } catch (error: any) {
      logger.error('Erreur CinetPay check:', error.message);
      return { success: false, status: 'failed', message: 'Erreur' };
    }
  }

  handleWebhook(body: any, headers: any): Promise<boolean> {
    const { WebhookHandler } = require('./WebhookHandler');
    return WebhookHandler.processWebhook('cinetpay', body).then(() => true);
  }

  verifySignature(body: any, signature: string, secret: string): boolean {
    return true;
  }
}