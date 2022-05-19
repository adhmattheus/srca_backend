import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import {
  CriarAdminService,
  BuscarAdminService,
  ListarAdminsService,
} from '@modules/admins/services';

export default class AdminsController {
  public async index(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const handle = container.resolve(ListarAdminsService);

      const listaAdmins = await handle.execute();

      return response.json({
        admins: listaAdmins,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao listar usuários admins.');

      _next(error);
    }
  }

  public async create(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { nome, email, senha, campus } = request.body;

      const handle = container.resolve(CriarAdminService);

      const adminCriado = await handle.execute({
        nome,
        email,
        senha,
        campus,
      });

      return response.json({
        admin: adminCriado,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao criar usuário admin.');

      _next(error);
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const handle = container.resolve(BuscarAdminService);

      const admin = await handle.execute(id);

      return response.json({
        admin,
      });
    } catch (err) {
      throw new AppError('Erro ao buscar admin.');
    }
  }
}
