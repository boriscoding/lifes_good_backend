
import { prisma } from '../config/database';

import {
  PublicationStatus,
  Prisma,
} from '../generated/prisma/client';

import {
  IPublication,
  CreatePublicationDTO,
  UpdatePublicationDTO,
  PublicationQuery,
} from '../types/publication.type';

class PublicationRepository {
  async create(data: CreatePublicationDTO): Promise<IPublication> {
    const publication = await prisma.publication.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt ?? null,
        featuredImage: data.featuredImage ?? null,

        status: (data.status ?? 'draft') as PublicationStatus,

        category: data.category ?? null,

        tags: data.tags
          ? (data.tags as Prisma.InputJsonValue)
          : undefined,

        authorId: data.authorId,

        publishedAt:
          data.status === 'published' && !data.publishedAt
            ? new Date()
            : data.publishedAt ?? null,
      },
    });

    return publication as IPublication;
  }

  async findById(id: string): Promise<IPublication | null> {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });

    return publication
      ? (publication as IPublication)
      : null;
  }

  async findBySlug(slug: string): Promise<IPublication | null> {
    const publication = await prisma.publication.findUnique({
      where: { slug },
    });

    return publication
      ? (publication as IPublication)
      : null;
  }

  async findAll(
    query: PublicationQuery,
  ): Promise<{ rows: IPublication[]; count: number }> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.status && {
        status: query.status as PublicationStatus,
      }),

      ...(query.category && {
        category: query.category,
      }),

      ...(query.search && {
        OR: [
          {
            title: {
              contains: query.search,
            },
          },
          {
            content: {
              contains: query.search,
            },
          },
        ],
      }),
    };

    const [rows, count] = await Promise.all([
      prisma.publication.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),

      prisma.publication.count({
        where,
      }),
    ]);

    return {
      rows: rows as IPublication[],
      count,
    };
  }

  async update(
    id: string,
    data: UpdatePublicationDTO,
  ): Promise<IPublication | null> {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });

    if (!publication) {
      return null;
    }

    const updateData: Prisma.PublicationUpdateInput = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.slug !== undefined) {
      updateData.slug = data.slug;
    }

    if (data.content !== undefined) {
      updateData.content = data.content;
    }

    if (data.excerpt !== undefined) {
      updateData.excerpt = data.excerpt;
    }

    if (data.featuredImage !== undefined) {
      updateData.featuredImage = data.featuredImage;
    }

    if (data.status !== undefined) {
      updateData.status = data.status as PublicationStatus;
    }

    if (data.category !== undefined) {
      updateData.category = data.category;
    }

    if (data.tags !== undefined) {
      updateData.tags = data.tags as Prisma.InputJsonValue;
    }

    if (data.authorId !== undefined) {
      updateData.author = {
        connect: {
          id: data.authorId,
        },
      };
    }

    if (data.publishedAt !== undefined) {
      updateData.publishedAt = data.publishedAt;
    } else if (
      data.status === 'published' &&
      !publication.publishedAt
    ) {
      updateData.publishedAt = new Date();
    }

    const updatedPublication = await prisma.publication.update({
      where: { id },
      data: updateData,
    });

    return updatedPublication as IPublication;
  }

  async delete(id: string): Promise<boolean> {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });

    if (!publication) {
      return false;
    }

    await prisma.publication.delete({
      where: { id },
    });

    return true;
  }
}

export default new PublicationRepository();

