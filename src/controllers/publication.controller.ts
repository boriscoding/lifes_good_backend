import { Request, Response, NextFunction } from 'express';
import publicationService from '../services/publication.service';
import { PublicationQuery } from '../types/publication.type';

class PublicationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      const publication = await publicationService.create({ ...req.body, authorId: user?.id });
      res.status(201).json({ success: true, data: publication });
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const publication = await publicationService.findById(req.params.id);
      res.status(200).json({ success: true, data: publication });
    } catch (error) { next(error); }
  }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const publication = await publicationService.findBySlug(req.params.slug);
      res.status(200).json({ success: true, data: publication });
    } catch (error) { next(error); }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query: PublicationQuery = req.query;
      const result = await publicationService.findAll(query);
      res.status(200).json({ 
        success: true, 
        data: result.rows, 
        meta: { total: result.count, page: query.page || 1, limit: query.limit || 10 } 
      });
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const publication = await publicationService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: publication });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await publicationService.delete(req.params.id);
      res.status(200).json({ success: true, message: 'Publication supprimée' });
    } catch (error) { next(error); }
  }
}

export default new PublicationController();