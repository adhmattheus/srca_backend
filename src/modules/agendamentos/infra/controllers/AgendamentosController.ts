import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import {
  AtualizarStatusAgendamentoService,
  CriarAgendamentoService,
  ListarAgendamentosPeloStatusService,
  ListarAgendamentosService,
  RemoverAgendamentoService,
} from '@modules/agendamentos/services';

export default class AgendamentosController {
  public async create(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { estudanteId, campus, categoria, setor, dataAgendamento } =
        request.body;

      const handle = container.resolve(CriarAgendamentoService);

      const agendamentoCriado = await handle.execute({
        estudanteId,
        campus,
        categoria,
        setor,
        dataAgendamento,
      });

      return response.json({
        agendamento: agendamentoCriado,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao criar agendamento.');

      _next(error);
    }
  }

  public async index(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const handle = container.resolve(ListarAgendamentosService);

      const listaAgendamentos = await handle.execute();

      return response.json({
        agendamentos: listaAgendamentos,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao listar agendamentos.');

      _next(error);
    }
  }

  public async updateStatus(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { id, status } = request.body;

      const handle = container.resolve(AtualizarStatusAgendamentoService);

      const agendamentoAtualizado = await handle.execute({
        id,
        status,
      });

      return response.json({
        agendamento: agendamentoAtualizado,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao atualizar status do agendamento.');

      _next(error);
    }
  }

  public async showByStatus(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { status } = request.params;

      const handle = container.resolve(ListarAgendamentosPeloStatusService);

      const listaAgendamentos = await handle.execute(status);

      return response.json({
        agendamentos: listaAgendamentos,
      });
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao listar agendamentos pelo status.');

      _next(error);
    }
  }

  public async remove(
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { id } = request.body;

      const handle = container.resolve(RemoverAgendamentoService);

      await handle.execute(id);

      return response.send();
    } catch (error) {
      if (!(error instanceof AppError))
        throw new AppError('Erro ao remover agendamento.');

      _next(error);
    }
  }
}
