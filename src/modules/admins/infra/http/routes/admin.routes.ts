import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AdminsController from '../controllers/AdminsController';

const adminRouter = Router();
const adminController = new AdminsController();

adminRouter.get('/', adminController.index);

adminRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      campus: Joi.string().required(),
      senha: Joi.string()
        .pattern(new RegExp('^[\\@\\#\\$a-zA-Z0-9\\@\\#\\$]{3,30}$'))
        .required()
        .min(8),
    },
  }),
  adminController.create,
);

adminRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  adminController.show,
);

export default adminRouter;
