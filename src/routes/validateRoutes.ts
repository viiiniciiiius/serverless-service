import { Router } from 'express';
import { validateController } from '../controllers/validateControllers.js';

const validateRouter = Router();

validateRouter.get('/', validateController);

export default validateRouter;