import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// ==========================================================
// HELPERS ZOD
// ==========================================================

const zNum = (defaultValue?: number) =>
  z.preprocess(
    (val) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string' && val !== '') return Number(val);
      return defaultValue;
    },
    z.number().default(defaultValue ?? 0),
  );

const zBool = (defaultValue: boolean = false) =>
  z.preprocess(
    (val) => {
      if (typeof val === 'boolean') return val;
      if (typeof val === 'string') return val === 'true';
      return defaultValue;
    },
    z.boolean().default(defaultValue),
  );

const zStr = (defaultValue?: string) =>
  defaultValue !== undefined
    ? z.string().default(defaultValue)
    : z.string();

const zEnum = <T extends [string, ...string[]]>(
  values: T,
  defaultValue?: T[number],
) =>
  defaultValue !== undefined
    ? z.enum(values).default(defaultValue)
    : z.enum(values);

// ==========================================================
// SCHEMA
// ==========================================================

const envSchema = z.object({
  NODE_ENV: zEnum(['development', 'production', 'test'], 'development'),

  PORT: zNum(3000),

  API_URL: zStr('http://localhost:3000'),

  FRONTEND_URL: zStr('http://localhost:3001'),

  // ========================================================
  // DATABASE - MYSQL / MARIADB
  // ========================================================

  DB_DIALECT: zEnum(['mysql', 'sqlite', 'postgres'], 'mysql'),

  DB_HOST: zStr().optional(),

  DB_PORT: zNum(3306),

  DB_NAME: zStr().optional(),

  DB_USER: zStr().optional(),

  DB_PASSWORD: zStr().optional(),

  DB_SSL: zBool(false),

  DB_POOL_MIN: zNum(2),

  DB_POOL_MAX: zNum(10),

  // ========================================================
  // REDIS
  // ========================================================

  REDIS_HOST: zStr('localhost'),

  REDIS_PORT: zNum(6379),

  REDIS_PASSWORD: zStr().optional(),

  REDIS_DB: zNum(0),

  // ========================================================
  // JWT
  // ========================================================

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET : 32 caracteres minimum'),

  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET : 32 caracteres minimum'),

  JWT_ACCESS_EXPIRATION: zStr('15m'),

  JWT_REFRESH_EXPIRATION: zStr('7d'),

  JWT_ISSUER: zStr('liifeisgood-api'),

  JWT_AUDIENCE: zStr('liifeisgood-client'),

  // ========================================================
  // BCRYPT
  // ========================================================

  BCRYPT_ROUNDS: zNum(12),

  // ========================================================
  // SMTP
  // ========================================================

  SMTP_HOST: zStr(),

  SMTP_PORT: zNum(587),

  SMTP_SECURE: zBool(false),

  SMTP_USER: zStr(),

  SMTP_PASS: zStr(),

  SMTP_FROM_NAME: zStr("Liife'is Good"),

  SMTP_FROM_EMAIL: zStr('noreply@liifeisgood.cm'),

  // ========================================================
  // SMS
  // ========================================================

  SMS_PROVIDER: zEnum(
    ['africastalking', 'twilio'],
    'africastalking',
  ),

  AFRICASTALKING_API_KEY: zStr().optional(),

  AFRICASTALKING_USERNAME: zStr().optional(),

  AFRICASTALKING_SENDER: zStr('LIIFEISGOOD').optional(),

  TWILIO_SID: zStr().optional(),

  TWILIO_TOKEN: zStr().optional(),

  TWILIO_PHONE: zStr().optional(),

  // ========================================================
  // WHATSAPP
  // ========================================================

  WHATSAPP_ENABLED: zBool(false),

  WHATSAPP_PHONE_NUMBER_ID: zStr().optional(),

  WHATSAPP_ACCESS_TOKEN: zStr().optional(),

  WHATSAPP_WEBHOOK_VERIFY_TOKEN: zStr().optional(),

  // ========================================================
  // AWS / S3
  // ========================================================

  AWS_REGION: zStr().optional(),

  AWS_ACCESS_KEY_ID: zStr().optional(),

  AWS_SECRET_ACCESS_KEY: zStr().optional(),

  AWS_S3_BUCKET: zStr().optional(),

  AWS_S3_ENDPOINT: zStr().optional(),

  // ========================================================
  // PAYMENTS
  // ========================================================

  PAYMENT_DEFAULT_CURRENCY: zStr('XAF'),

  PAYMENT_MIN_AMOUNT: zNum(500),

  // PAYDUNYA
  PAYDUNYA_MASTER_KEY: zStr().optional(),

  PAYDUNYA_PRIVATE_KEY: zStr().optional(),

  PAYDUNYA_PUBLIC_KEY: zStr().optional(),

  PAYDUNYA_TOKEN: zStr().optional(),

  PAYDUNYA_MODE: zEnum(['test', 'live'], 'test'),

  // CINETPAY
  CINETPAY_API_KEY: zStr().optional(),

  CINETPAY_SITE_ID: zStr().optional(),

  CINETPAY_SECRET_KEY: zStr().optional(),

  CINETPAY_MODE: zEnum(
    ['sandbox', 'production'],
    'sandbox',
  ),

  // OPAY
  OPAY_MERCHANT_ID: zStr().optional(),

  OPAY_PUBLIC_KEY: zStr().optional(),

  OPAY_SECRET_KEY: zStr().optional(),

  OPAY_MODE: zEnum(
    ['sandbox', 'production'],
    'sandbox',
  ),

  // ORANGE MONEY
  ORANGE_MONEY_AUTHORIZATION_HEADER: zStr().optional(),

  ORANGE_MONEY_MERCHANT_ID: zStr().optional(),

  ORANGE_MONEY_PIN: zStr().optional(),

  // MTN MONEY
  MTN_MONEY_API_USER: zStr().optional(),

  MTN_MONEY_API_KEY: zStr().optional(),

  MTN_MONEY_SUBSCRIPTION_KEY: zStr().optional(),

  MTN_MONEY_ENVIRONMENT: zEnum(
    ['sandbox', 'production'],
    'sandbox',
  ),

  // ========================================================
  // RATE LIMIT
  // ========================================================

  RATE_LIMIT_WINDOW_MS: zNum(900000),

  RATE_LIMIT_MAX_REQUESTS: zNum(100),

  // ========================================================
  // LOGGING
  // ========================================================

  LOG_LEVEL: zEnum(
    ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
    'info',
  ),

  LOG_DIR: zStr('logs'),
});

// ==========================================================
// VALIDATION
// ==========================================================

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Configuration invalide. Verifiez votre fichier .env :\n',
  );

  parsed.error.issues.forEach((issue) => {
    console.error(
      `   → ${issue.path.join('.')} : ${issue.message}`,
    );
  });

  process.exit(1);
}

export const env = parsed.data;

// ==========================================================
// DATABASE VALIDATION
// ==========================================================

if (env.DB_DIALECT === 'mysql') {
  if (!env.DB_HOST || !env.DB_NAME || !env.DB_USER) {
    console.error(
      '❌ DB_DIALECT=mysql necessite DB_HOST, DB_NAME, DB_USER, DB_PASSWORD',
    );

    process.exit(1);
  }
}

// ==========================================================
// JWT VALIDATION
// ==========================================================

if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) {
  console.error(
    '❌ JWT_ACCESS_SECRET et JWT_REFRESH_SECRET doivent etre differents !',
  );

  process.exit(1);
}