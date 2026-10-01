export type PaymentMethod = 'mtn_mobile_money' | 'orange_money' | 'credit_card' | 'cash' | 'paydunya' | 'cinetpay' | 'opay';

export type PaymentType = 'deposit' | 'balance' | 'full' | 'refund' | 'penalty';

export interface PaymentInitPayload {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  type: PaymentType;
  phoneNumber?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PaymentVerifyPayload {
  transactionId: string;
  reference: string;
  provider: string;
}