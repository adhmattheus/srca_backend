import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AgendamentosController from '../controllers/AgendamentosController';

const agendamentoRouter = Router();
const agendamentoController = new AgendamentosController();

agendamentoRouter.get('/', agendamentoController.index);

agendamentoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      estudanteId: Joi.string().uuid().required(),
      campus: Joi.string().required(),
      categoria: Joi.string().required(),
      setor: Joi.string().required(),
      dataAgendamento: Joi.date().required(),
    },
  }),
  agendamentoController.create,
);

agendamentoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      status: Joi.string()
        .valid('NAO_ATENDIDO', 'ATENDIDO', 'NAO_COMPARECEU')
        .required(),
    },
  }),
  agendamentoController.updateStatus,
);

agendamentoRouter.get(
  '/status/:status',
  celebrate({
    [Segments.PARAMS]: {
      status: Joi.string()
        .valid('NAO_ATENDIDO', 'ATENDIDO', 'NAO_COMPARECEU')
        .required(),
    },
  }),
  agendamentoController.showByStatus,
);

agendamentoRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agendamentoController.remove,
);

export default agendamentoRouter;
