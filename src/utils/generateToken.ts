import jwt = require('jsonwebtoken');
import { jwtConfig } from '../config/jwt';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, jwtConfig.access.secret, {
    expiresIn: jwtConfig.access.expiresIn,
    issuer: jwtConfig.access.issuer,
    audience: jwtConfig.access.audience,
  });
};

export const generateRefreshToken = (payload: { userId: string }): string => {
  return jwt.sign(payload, jwtConfig.refresh.secret, {
    expiresIn: jwtConfig.refresh.expiresIn,
    issuer: jwtConfig.refresh.issuer,
    audience: jwtConfig.refresh.audience,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, jwtConfig.access.secret, {
    issuer: jwtConfig.access.issuer,
    audience: jwtConfig.access.audience,
  }) as TokenPayload;
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  return jwt.verify(token, jwtConfig.refresh.secret, {
    issuer: jwtConfig.refresh.issuer,
    audience: jwtConfig.refresh.audience,
  }) as { userId: string };
};