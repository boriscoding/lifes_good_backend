import { Router } from 'express';
import { getApartments, getApartmentById } from '../../controllers/apartment.controller';

const router = Router();

router.get('/', getApartments);
router.get('/:id', getApartmentById);

export default router;