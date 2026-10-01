import { env } from './index';

export const paymentConfig = {
  currency: env.PAYMENT_DEFAULT_CURRENCY, // XAF
  minAmount: env.PAYMENT_MIN_AMOUNT, // 500 FCFA
  maxRetries: 3,
  timeoutMs: 30000, // 30 secondes pour les APIs de paiement
  
  // Configuration des acomptes par defaut
  deposit: {
    defaultPercentage: 30, // 30% d'acompte
    minPercentage: 10,
    maxPercentage: 100,
  },
  
  // Durees de validite des paiements en attente
  pendingExpiryMinutes: 30,
  
  // Webhook security
  webhook: {
    verifySignatures: true,
    allowedIps: [], // Whitelist IPs des agrégateurs si connues
  },
};