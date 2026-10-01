import { z } from 'zod';

// Mise à jour du profil par l'utilisateur lui-même.
// Volontairement restreint aux champs "safe" : pas de password, roleId,
// isActive, emailVerified, phoneVerified ici.
export const updateProfileSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50).optional(),
      lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50).optional(),
      email: z.string().email('Email invalide').optional(),
      phone: z.string().min(9, 'Numéro de téléphone invalide').optional(),
      nationalite: z.string().max(60, 'Nationalité trop longue').nullable().optional(),
      adresse: z.string().max(255, 'Adresse trop longue').nullable().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Au moins un champ doit être fourni pour la mise à jour',
    }),
});



export const listUsersSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(10),
      roleId: z.string().optional(),
      isActive: z
        .preprocess((val) => {
          if (val === 'true' || val === true) return true;
          if (val === 'false' || val === false) return false;
          return undefined;
        }, z.boolean().optional()),
      search: z.string().optional(),
    })
    .default({ page: 1, limit: 10 }),
});
