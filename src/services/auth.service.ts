import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { userRepository } from '../repositories/user.repository';
import { hashPassword } from '../utils/hashPassword';
import { comparePassword } from '../utils/comparePassword';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken';
import { prisma } from '../config/database';
import { redisClient } from '../config/redis'; // Adaptez le chemin si votre fichier Redis est ailleurs (ex: ../config/redisClient)

export const authService = {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    roleId?: string;
    isActive?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
  }) {
    const existing = await userRepository.findByEmail(data.email);

    if (existing) {
      throw new Error('Email déjà utilisé');
    }

    // Gestion du rôle par défaut si non fourni dans la requête
    let roleId = data.roleId;

    if (!roleId) {
      let defaultRole = await prisma.role.findFirst({
        where: {
          OR: [
            { slug: 'client' },
            { name: 'CLIENT' },
            { name: 'USER' },
            { name: 'Client' },
          ],
        },
      });

      if (!defaultRole) {
        defaultRole = await prisma.role.create({
          data: {
            name: 'CLIENT',
            slug: 'client',
            description: 'Rôle client par défaut',
          },
        });
      }

      roleId = defaultRole.id;
    }

    const hashed = await hashPassword(data.password);

    const user = await userRepository.create({
      ...data,
      password: hashed,
      roleId,
    });

    // Auto-connexion apres inscription : on genere directement les tokens,
    // exactement comme login(), pour que le frontend puisse authentifier
    // l'utilisateur sans lui redemander ses identifiants juste apres l'inscription.
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.roleId,
    };

    return {
      accessToken: generateAccessToken(payload),

      refreshToken: generateRefreshToken({
        userId: user.id,
      }),

      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Identifiants invalides');
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      throw new Error('Identifiants invalides');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.roleId,
    };

    return {
      accessToken: generateAccessToken(payload),

      refreshToken: generateRefreshToken({
        userId: user.id,
      }),

      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  },

  async logout(refreshToken: string) {
    // Stocke le refresh token dans Redis avec une expiration (TTL de 7 jours) pour le blacklister
    await redisClient.set(`blacklist:${refreshToken}`, 'true', 'EX', 7 * 24 * 60 * 60);
    return true;
  },

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as any;

      const user = await userRepository.findByEmail(decoded.email);
      if (!user) throw new Error('Utilisateur introuvable');

      const newAccessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.roleId,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Refresh token invalide ou expiré');
    }
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      throw new Error('Le mot de passe actuel est incorrect');
    }

    const isSameAsOld = await comparePassword(newPassword, user.password);

    if (isSameAsOld) {
      throw new Error('Le nouveau mot de passe doit être différent de l\'ancien');
    }

    const hashedPassword = await hashPassword(newPassword);

    await userRepository.updatePassword(userId, hashedPassword);

    return true;
  },
};