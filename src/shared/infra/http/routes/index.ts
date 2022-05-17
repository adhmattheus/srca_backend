import estudanteRouter from '@modules/estudantes/infra/http/routes/estudante.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/estudantes', estudanteRouter);

export default routes;
