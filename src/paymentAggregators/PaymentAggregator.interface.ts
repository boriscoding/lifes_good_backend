export interface PaymentAggregator {
  name: string;
  initiatePayment(data: PaymentInitData): Promise<PaymentInitResult>;
  checkStatus(reference: string): Promise<PaymentStatusResult>;
  handleWebhook(body: any, headers: any): Promise<boolean>;
  verifySignature(body: any, signature: string, secret: string): boolean;
}

export interface PaymentInitData {
  amount: number;
  currency: string;
  description: string;
  reference: string;
  customerEmail: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentInitResult {
  success: boolean;
  paymentUrl?: string;
  reference: string;
  transactionId?: string;
  message: string;
}

export interface PaymentStatusResult {
  success: boolean;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  amount?: number;
  paidAt?: Date;
  message: string;
}