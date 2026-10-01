import { prisma } from '../config/database';
import { User } from '@prisma/client';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  roleId: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  nationalite?: string;
  adresse?: string;
  roleId?: string;
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

export interface ListUsersOptions {
  page?: number | string;
  limit?: number | string;
  roleId?: string;
  isActive?: boolean;
  search?: string;
}

export interface ListUsersResult {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { email },
      include: { role: true },
    });
  },

  async findByPhone(phone: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { phone },
    });
  },

  async create(data: CreateUserData): Promise<User> {
    const { roleId, ...userData } = data;

    return prisma.user.create({
      data: {
        ...userData,
        role: {
          connect: { id: roleId },
        },
      },
      include: {
        role: true,
      },
    });
  },

  // Mise à jour générique (utilisée par l'admin ET par le service de profil).
  // Ne touche JAMAIS au mot de passe : voir updatePassword() pour ça.
  async update(id: string, data: UpdateUserData): Promise<User | null> {
    const { roleId, ...rest } = data;

    try {
      return await prisma.user.update({
        where: { id },
        data: {
          ...rest,
          ...(roleId ? { role: { connect: { id: roleId } } } : {}),
        },
        include: { role: true },
      });
    } catch (error: any) {
      // P2025 = "Record to update not found." (Prisma)
      if (error?.code === 'P2025') {
        return null;
      }
      throw error;
    }
  },

  // Méthode dédiée et isolée pour le changement de mot de passe : évite
  // qu'un password puisse se glisser accidentellement dans un update() générique.
  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  },

  async list(options?: ListUsersOptions): Promise<ListUsersResult> {
    // 1. Conversion et sécurisation de limit (take)
    const rawLimit = options?.limit;
    const limitNum = typeof rawLimit === 'string' ? parseInt(rawLimit, 10) : Number(rawLimit || 20);
    const take = isNaN(limitNum) || limitNum <= 0 ? 20 : limitNum;

    // 2. Conversion et sécurisation de page (skip)
    const rawPage = options?.page;
    const pageNum = typeof rawPage === 'string' ? parseInt(rawPage, 10) : Number(rawPage || 1);
    const validPage = isNaN(pageNum) || pageNum <= 0 ? 1 : pageNum;
    const skip = (validPage - 1) * take;

    const where: Record<string, unknown> = {};

    if (options?.roleId) {
      where.roleId = options.roleId;
    }

    if (typeof options?.isActive === 'boolean') {
      where.isActive = options.isActive;
    }

    if (options?.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: 'insensitive' } },
        { lastName: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    // 3. Exécution parallèle avec Prisma
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: { role: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.user.count({ where }),
    ]);

    return { data, total, page: validPage, limit: take };
  }, // 👈 Fermeture de la méthode list()
}; // 👈 Fermeture de l'objet userRepository