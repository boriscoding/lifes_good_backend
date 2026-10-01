import bcrypt from 'bcryptjs';
import { env } from '../config';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};