import { CorsOptions } from 'cors';
import { env } from './index';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
    ].filter(Boolean);

    // Autorise les requetes sans origin (Postman, mobile apps, webhooks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS : Origin ${origin} non autorisee.`));
    }
  },
  credentials: true, // Autorise les cookies / Authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-API-Key',
    'X-Webhook-Signature',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Request-Id'],
  maxAge: 86400, // Preflight cache 24h
};