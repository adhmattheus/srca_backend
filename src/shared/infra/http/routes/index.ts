import { Router } from 'express';

import estudanteRouter from '@modules/estudantes/infra/http/routes/estudante.routes';
import agendamentoRouter from '@modules/agendamentos/infra/routes/agendamento.routes';
import adminRouter from '@modules/admins/infra/http/routes/admin.routes';

const routes = Router();

routes.use('/estudantes', estudanteRouter);
routes.use('/agendamentos', agendamentoRouter);
routes.use('/admins', adminRouter);

export default routes;
