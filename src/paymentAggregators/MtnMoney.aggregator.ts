import { PaymentAggregator, PaymentInitData, PaymentInitResult, PaymentStatusResult } from './PaymentAggregator.interface';
import { paymentAggregatorConfig } from '../config/paymentAggregator';
import { logger } from '../config/logger';
import axios from 'axios';

export class MtnMoneyAggregator implements PaymentAggregator {
  name = 'mtn_money';
  private config = paymentAggregatorConfig.mtnMoney;

  async initiatePayment(data: PaymentInitData): Promise<PaymentInitResult> {
    try {
      const token = await this.getAccessToken();
      const referenceId = data.reference;

      await axios.post(
        `${this.config.baseUrl}/collection/v1_0/requesttopay`,
        {
          amount: data.amount.toString(),
          currency: data.currency,
          externalId: referenceId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: (data.customerPhone || '').replace('+', ''),
          },
          payerMessage: data.description,
          payeeNote: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Reference-Id': referenceId,
            'X-Target-Environment': this.config.environment,
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        reference: data.reference,
        transactionId: referenceId,
        message: 'Demande de paiement MTN Money envoyee',
      };
    } catch (error: any) {
      logger.error('Erreur MTN Money:', error.response?.data || error.message);
      return { success: false, reference: data.reference, message: 'Erreur MTN Money' };
    }
  }

  private async getAccessToken(): Promise<string> {
    const response = await axios.post(
      `${this.config.baseUrl}/collection/token/`,
      {},
      {
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
        },
        auth: {
          username: this.config.apiUser,
          password: this.config.apiKey,
        },
      }
    );
    return response.data.access_token;
  }

  async checkStatus(reference: string): Promise<PaymentStatusResult> {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
        `${this.config.baseUrl}/collection/v1_0/requesttopay/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Target-Environment': this.config.environment,
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          },
        }
      );

      const status = response.data.status === 'SUCCESSFUL' ? 'success' : 'pending';
      return {
        success: true,
        status: status as any,
        amount: Number(response.data.amount),
        message: `Statut MTN: ${response.data.status}`,
      };
    } catch (error: any) {
      logger.error('Erreur MTN check:', error.message);
      return { success: false, status: 'failed', message: 'Erreur' };
    }
  }

  handleWebhook(body: any, headers: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  verifySignature(body: any, signature: string, secret: string): boolean {
    return true;
  }
}