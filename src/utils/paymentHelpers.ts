import { env } from '../config';

export const calculateDepositAmount = (totalAmount: number, percentage?: number): number => {
  const pct = percentage ?? env.PAYMENT_MIN_AMOUNT;
  return Math.round((totalAmount * pct) / 100);
};

export const isValidPaymentAmount = (amount: number): boolean => {
  return amount >= env.PAYMENT_MIN_AMOUNT;
};