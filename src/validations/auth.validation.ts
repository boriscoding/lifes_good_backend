import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'Le prenom est requis').max(50),
    lastName: z.string().min(2, 'Le nom est requis').max(50),
    email: z.string().email('Email invalide'),
    phone: z.string().min(9, 'Telephone invalide'),
    password: z.string().min(8, 'Minimum 8 caracteres').max(100),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Mot de passe requis'),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token requis'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),
    password: z.string().min(8),
  }),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
      newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caracteres').max(100),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: 'Le nouveau mot de passe doit etre different de l\'ancien',
      path: ['newPassword'],
    }),
});