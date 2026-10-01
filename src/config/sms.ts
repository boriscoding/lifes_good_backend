import { env } from './index';

export const smsConfig = {
  provider: env.SMS_PROVIDER, // 'africastalking' | 'twilio'
  
  africasTalking: {
    apiKey: env.AFRICASTALKING_API_KEY,
    username: env.AFRICASTALKING_USERNAME,
    sender: env.AFRICASTALKING_SENDER || 'LIIFEISGOOD',
  },
  
  twilio: {
    sid: env.TWILIO_SID,
    token: env.TWILIO_TOKEN,
    phoneNumber: env.TWILIO_PHONE,
  },
};