
import { PaymentAggregator } from '../paymentAggregators/PaymentAggregator.interface';

interface PaymentInitiateData {
  reference?: string;
  amount?: number;
  phone?: string;
  method?: string;
  [key: string]: unknown;
}

interface WebhookHeaders {
  [key: string]: string | string[] | undefined;
}

export const paymentAggregatorService = {
  async initiate(data: PaymentInitiateData) {
    // TODO: Utiliser AggregatorFactory pour initier le paiement

    return {
      paymentUrl: '',
      reference: data.reference ?? '',
    };
  },

  async checkStatus(reference: string) {
    // TODO: Verifier le statut aupres de l'agregateur

    return {
      reference,
      status: 'pending' as const,
    };
  },

  async handleWebhook(
    body: unknown,
    headers: WebhookHeaders,
  ): Promise<boolean> {
    // TODO: Traiter le webhook securise

    return true;
  },
};

