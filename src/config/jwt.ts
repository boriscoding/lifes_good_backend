import type { StringValue } from 'ms';
import { env } from './index';

export const jwtConfig = {
  access: {
    secret: env.JWT_ACCESS_SECRET,
    expiresIn: env.JWT_ACCESS_EXPIRATION as StringValue,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
    algorithm: 'HS256' as const,
  },

  refresh: {
    secret: env.JWT_REFRESH_SECRET,
    expiresIn: env.JWT_REFRESH_EXPIRATION as StringValue,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
    algorithm: 'HS256' as const,
  },
};

// Vérification de force des secrets au runtime
if (jwtConfig.access.secret.length < 32) {
  throw new Error(
    'JWT_ACCESS_SECRET trop court. Minimum 32 caractères.',
  );
}

if (jwtConfig.refresh.secret.length < 32) {
  throw new Error(
    'JWT_REFRESH_SECRET trop court. Minimum 32 caractères.',
  );
}

if (jwtConfig.access.secret === jwtConfig.refresh.secret) {
  throw new Error(
    'JWT_ACCESS_SECRET et JWT_REFRESH_SECRET doivent être différents !',
  );
}