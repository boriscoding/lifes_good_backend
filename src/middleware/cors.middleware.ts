import cors from 'cors';

// Découpage des URLs si FRONTEND_URL contient plusieurs origines séparées par des virgules
const envOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim()) 
  : [];

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8100',
  'http://127.0.0.1:8100',
  ...envOrigins,
].filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Autorise Postman/Mobile/outils CLI (origin est undefined) et les domaines de la whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // callback(null, false) au lieu d'une Error pour éviter que le serveur crash (500)
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200, // Compatibilité avec certains anciens navigateurs (Smart TVs, legacy browsers)
});