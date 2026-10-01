import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { paymentAggregatorConfig } from '../config/paymentAggregator';
import { logger } from '../config/logger';
import axios from 'axios';

export class PayDunyaAggregator implements PaymentAggregator {
  name = 'paydunya';
  private config = paymentAggregatorConfig.paydunya;

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/api/v1/checkout-invoice/create`,
        {
          invoice: {
            items: {
              item_0: {
                name: data.description,
                quantity: 1,
                unit_price: data.amount,
                total_price: data.amount,
                description: data.description,
              },
            },
            taxes: {},
            total_amount: data.amount,
            description: data.description,
            custom_data: { reference: data.reference },
          },
          store: {
            name: "Liife'is Good",
            tagline: 'Complexe immobilier',
            phone: '',
            postal_address: '',
            logo_url: '',
            website_url: '',
          },
          actions: {
            cancel_url: data.cancelUrl,
            return_url: data.returnUrl,
            callback_url: `${process.env.API_URL}/webhooks/payments/paydunya`,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'PAYDUNYA-MASTER-KEY': this.config.masterKey,
            'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
            'PAYDUNYA-PUBLIC-KEY': this.config.publicKey,
          },
        }
      );

      const result = response.data.response_text === 'OK'
        ? {
            success: true,
            paymentUrl: response.data.response_text,
            reference: data.reference,
            transactionId: response.data.token,
            message: 'Paiement initie',
          }
        : {
            success: false,
            reference: data.reference,
            message: response.data.response_text || 'Erreur PayDunya',
          };

      return result;
    } catch (error: any) {
      logger.error('Erreur PayDunya initiatePayment:', error.response?.data || error.message);
      return { success: false, reference: data.reference, message: 'Erreur de connexion PayDunya' };
    }
  }

  async checkStatus(reference: string): Promise<PaymentStatusResult> {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/api/v1/checkout-invoice/confirm/${reference}`,
        {
          headers: {
            'PAYDUNYA-MASTER-KEY': this.config.masterKey,
            'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          },
        }
      );

      const status = response.data.status === 'completed' ? 'success' : 'pending';
      return {
        success: true,
        status: status as any,
        amount: response.data.total_amount,
        message: `Statut: ${response.data.status}`,
      };
    } catch (error: any) {
      logger.error('Erreur PayDunya checkStatus:', error.message);
      return { success: false, status: 'failed', message: 'Erreur verification' };
    }
  }

  handleWebhook(body: any, headers: any): Promise<boolean> {
    const { WebhookHandler } = require('./WebhookHandler');
    return WebhookHandler.processWebhook('paydunya', body, headers['PAYDUNYA-SIGNATURE']).then(() => true);
  }

  verifySignature(body: any, signature: string, secret: string): boolean {
    // TODO: Implementer HMAC verification
    return true;
  }
}