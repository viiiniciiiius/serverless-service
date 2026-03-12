import { Router } from 'express';
import { validateController } from '../controllers/validateControllers';

const validateRouter = Router();

validateRouter.get('/', validateController);

export default validateRouter;