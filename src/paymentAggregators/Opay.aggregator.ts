import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { paymentAggregatorConfig } from '../config/paymentAggregator';
import { logger } from '../config/logger';
import axios from 'axios';

export class OpayAggregator implements PaymentAggregator {
  name = 'opay';
  private config = paymentAggregatorConfig.opay;

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/api/v3/cashier/initialize`,
        {
          reference: data.reference,
          mchShortName: "LiifeisGood",
          productName: data.description,
          productDesc: data.description,
          userPhone: data.customerPhone || '',
          userRequestIp: '127.0.0.1',
          amount: { total: data.amount, currency: data.currency },
          callbackUrl: `${process.env.API_URL}/webhooks/payments/opay`,
          returnUrl: data.returnUrl,
          expireAt: Math.floor(Date.now() / 1000) + 1800,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.publicKey}`,
            'Content-Type': 'application/json',
            MerchantId: this.config.merchantId,
          },
        }
      );

      if (response.data.data && response.data.data.cashierUrl) {
        return {
          success: true,
          paymentUrl: response.data.data.cashierUrl,
          reference: data.reference,
          transactionId: response.data.data.reference,
          message: 'Paiement initie',
        };
      }

      return {
        success: false,
        reference: data.reference,
        message: response.data.message || 'Erreur OPay',
      };
    } catch (error: any) {
      logger.error('Erreur OPay:', error.response?.data || error.message);
      return { success: false, reference: data.reference, message: 'Erreur OPay' };
    }
  }

  async checkStatus(reference: string): Promise<PaymentStatusResult> {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/api/v3/cashier/status?reference=${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.config.publicKey}`,
            MerchantId: this.config.merchantId,
          },
        }
      );

      const status = response.data.data?.status === 'SUCCESS' ? 'success' : 'pending';
      return {
        success: true,
        status: status as any,
        amount: response.data.data?.amount?.total,
        message: `Statut OPay: ${response.data.data?.status}`,
      };
    } catch (error: any) {
      logger.error('Erreur OPay check:', error.message);
      return { success: false, status: 'failed', message: 'Erreur' };
    }
  }

  handleWebhook(body: any, headers: any): Promise<boolean> {
    const { WebhookHandler } = require('./WebhookHandler');
    return WebhookHandler.processWebhook('opay', body).then(() => true);
  }

  verifySignature(body: any, signature: string, secret: string): boolean {
    return true;
  }
}