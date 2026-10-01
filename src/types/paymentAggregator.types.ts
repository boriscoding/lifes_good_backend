export type AggregatorName = 'paydunya' | 'cinetpay' | 'opay' | 'orange_money' | 'mtn_money' | 'credit_card';

export interface AggregatorResponse {
  success: boolean;
  transactionId?: string;
  reference?: string;
  paymentUrl?: string;
  status: 'pending' | 'success' | 'failed';
  message: string;
  rawResponse?: Record<string, unknown>;
}

export interface WebhookPayload {
  provider: AggregatorName;
  signature: string;
  body: Record<string, unknown>;
}