import { env } from './index';

export const paymentAggregatorConfig = {
  paydunya: {
    masterKey: env.PAYDUNYA_MASTER_KEY || '',
    privateKey: env.PAYDUNYA_PRIVATE_KEY || '',
    publicKey: env.PAYDUNYA_PUBLIC_KEY || '',
    token: env.PAYDUNYA_TOKEN || '',
    mode: env.PAYDUNYA_MODE, // 'test' | 'live'
    baseUrl: env.PAYDUNYA_MODE === 'live' 
      ? 'https://app.paydunya.com' 
      : 'https://app.paydunya.com/sandbox',
  },
  
  cinetpay: {
    apiKey: env.CINETPAY_API_KEY || '',
    siteId: env.CINETPAY_SITE_ID || '',
    secretKey: env.CINETPAY_SECRET_KEY || '',
    mode: env.CINETPAY_MODE,
    baseUrl: env.CINETPAY_MODE === 'production'
      ? 'https://api.cinetpay.com'
      : 'https://sandbox.cinetpay.com',
  },
  
  opay: {
    merchantId: env.OPAY_MERCHANT_ID || '',
    publicKey: env.OPAY_PUBLIC_KEY || '',
    secretKey: env.OPAY_SECRET_KEY || '',
    mode: env.OPAY_MODE,
    baseUrl: env.OPAY_MODE === 'production'
      ? 'https://api.opay.com'
      : 'https://sandboxapi.opay.com',
  },
  
  orangeMoney: {
    authorizationHeader: env.ORANGE_MONEY_AUTHORIZATION_HEADER || '',
    merchantId: env.ORANGE_MONEY_MERCHANT_ID || '',
    pin: env.ORANGE_MONEY_PIN || '',
  },
  
  mtnMoney: {
    apiUser: env.MTN_MONEY_API_USER || '',
    apiKey: env.MTN_MONEY_API_KEY || '',
    subscriptionKey: env.MTN_MONEY_SUBSCRIPTION_KEY || '',
    environment: env.MTN_MONEY_ENVIRONMENT,
    baseUrl: env.MTN_MONEY_ENVIRONMENT === 'production'
      ? 'https://momodeveloper.mtn.com'
      : 'https://sandbox.momodeveloper.mtn.com',
  },
};