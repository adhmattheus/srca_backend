import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EstudantesController from '../controllers/EstudantesController';

const estudanteRouter = Router();
const estudanteController = new EstudantesController();

estudanteRouter.get('/', estudanteController.index);

estudanteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string().min(11).max(11).required(),
      senha: Joi.string()
        .pattern(new RegExp('^[\\@\\#\\$a-zA-Z0-9\\@\\#\\$]{3,30}$'))
        .required()
        .min(8),
    },
  }),
  estudanteController.create,
);

estudanteRouter.get(
  '/:cpf',
  celebrate({
    [Segments.PARAMS]: {
      cpf: Joi.string().min(11).max(11).required(),
    },
  }),
  estudanteController.show,
);

estudanteRouter.put(
  '/status',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().min(11).max(11).required(),
      status: Joi.string().valid('ativo', 'bloqueado').required(),
    },
  }),
  estudanteController.updateStatus,
);

estudanteRouter.get(
  '/status/:status',
  celebrate({
    [Segments.PARAMS]: {
      status: Joi.string().valid('ativo', 'bloqueado').required(),
    },
  }),
  estudanteController.showByStatus,
);

export default estudanteRouter;
