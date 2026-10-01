
export interface IPublication {
  id: string;

  title: string;

  slug: string;

  content: string;

  excerpt?: string | null;

  featuredImage?: string | null;

  status: 'draft' | 'published' | 'archived';

  category?: string | null;

  tags?: string[] | null;

  authorId: string;

  publishedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

export interface CreatePublicationDTO {
  title: string;

  slug: string;

  content: string;

  excerpt?: string | null;

  featuredImage?: string | null;

  status?: 'draft' | 'published' | 'archived';

  category?: string | null;

  tags?: string[] | null;

  authorId: string;

  publishedAt?: Date | null;
}

export interface UpdatePublicationDTO {
  title?: string;

  slug?: string;

  content?: string;

  excerpt?: string | null;

  featuredImage?: string | null;

  status?: 'draft' | 'published' | 'archived';

  category?: string | null;

  tags?: string[] | null;

  authorId?: string;

  publishedAt?: Date | null;
}

export interface PublicationQuery {
  status?: 'draft' | 'published' | 'archived';

  category?: string;

  search?: string;

  page?: number;

  limit?: number;
}

