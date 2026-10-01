import { PaymentGatewayInterface, PaymentGatewayResult } from './PaymentGateway.interface';

export class CreditCardGateway implements PaymentGatewayInterface {
  name = 'Carte Bancaire';
  slug = 'credit_card';

  async processPayment(data: any): Promise<PaymentGatewayResult> {
    return {
      success: true,
      reference: data.reference,
      message: 'Paiement par carte - utiliser CinetPay ou PayDunya comme agrégateur',
      requiresRedirect: true,
      redirectUrl: data.returnUrl,
    };
  }

  validatePhoneNumber(phone: string): boolean {
    return false;
  }
}