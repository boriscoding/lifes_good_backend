import { Router } from 'express';
import publicationController from '../../controllers/publication.controller';
import { validate } from '../../middleware/validation.middleware';
import { 
  createPublicationValidation, 
  updatePublicationValidation, 
  publicationQueryValidation 
} from '../../validations/publication.validation';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/role.middleware';

const router = Router();

router.get('/', validate(publicationQueryValidation), publicationController.getAll);
router.get('/slug/:slug', publicationController.getBySlug);
router.get('/:id', publicationController.getById);

router.post('/', authenticate, authorize('admin'), validate(createPublicationValidation), publicationController.create);
router.put('/:id', authenticate, authorize('admin'), validate(updatePublicationValidation), publicationController.update);
router.delete('/:id', authenticate, authorize('admin'), publicationController.delete);

export default router;