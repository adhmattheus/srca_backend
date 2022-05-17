import { Router } from 'express';
import EstudantesController from '../controllers/EstudantesController';

const estudanteRouter = Router();
const estudanteController = new EstudantesController();

estudanteRouter.get('/', estudanteController.index);

export default estudanteRouter;
