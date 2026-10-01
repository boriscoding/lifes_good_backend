import rateLimit from 'express-rate-limit';
import { env } from '../config';
import { ApiResponse } from '../types/controllers.types';


export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 100, // Limite élevée en DEV
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard.',
  },
  // Saute le rate limiting en environnement local de développement
  skip: (req) => process.env.NODE_ENV === 'development' && (req.ip === '::1' || req.ip === '127.0.0.1'),
});