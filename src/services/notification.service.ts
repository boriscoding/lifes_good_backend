import { prisma } from '../config/database';
import { NotificationStatus, NotificationType } from '../generated/prisma/client';

export const notificationService = {
  async list(
    userId: string,
    options?: {
      page?: number | string;
      limit?: number | string;
    },
  ) {
    const page = Number(options?.page) || 1;
    const limit = Number(options?.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      userId,
    };

    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.notification.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async markAsRead(id: string) {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new Error('Notification non trouvee');
    }

    return prisma.notification.update({
      where: { id },
      data: {
        status: NotificationStatus.read,
        readAt: new Date(),
      },
    });
  },

  /**
   * Crée une notification en base pour un utilisateur donné. C'est la
   * pièce qui manquait : sans ça, la cloche du dashboard reste vide car
   * rien n'insère jamais de ligne dans `notifications`.
   *
   * À appeler depuis les autres services métier (booking, payment...) aux
   * moments clés : nouvelle réservation, paiement confirmé, etc.
   *
   * `channel` est un champ texte libre côté schéma (pas un enum) — on y met
   * la même valeur que `type` par défaut (ex: "email"), sauf si un canal
   * plus spécifique est fourni.
   */
  async create(data: {
    userId: string;
    bookingId?: string | null;
    type: NotificationType;
    subject?: string | null;
    content: string;
    channel?: string;
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        bookingId: data.bookingId ?? null,
        type: data.type,
        channel: data.channel ?? data.type,
        subject: data.subject ?? null,
        content: data.content,
        status: NotificationStatus.pending,
      },
    });
  },
};  