export interface PaymentGatewayInterface {
  name: string;
  slug: string;
  processPayment(data: any): Promise<PaymentGatewayResult>;
  validatePhoneNumber(phone: string): boolean;
}

export interface PaymentGatewayResult {
  success: boolean;
  reference: string;
  message: string;
  requiresRedirect: boolean;
  redirectUrl?: string;
  transactionId?: string;
}