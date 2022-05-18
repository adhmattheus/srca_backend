import agendamentoRouter from '@modules/agendamentos/infra/routes/agendamento.routes';
import estudanteRouter from '@modules/estudantes/infra/http/routes/estudante.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/estudantes', estudanteRouter);
routes.use('/agendamentos', agendamentoRouter);

export default routes;
