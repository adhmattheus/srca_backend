import {
  AtualizarStatusEstudanteService,
  BuscarEstudanteService,
  CriarEstudanteService,
  ListarEstudantesPeloStatusService,
  ListarEstudantesService,
} from '@modules/estudantes/services';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class EstudantesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const handle = container.resolve(ListarEstudantesService);

      const listaEstudantes = await handle.execute();

      return response.json({
        estudantes: listaEstudantes,
      });
    } catch (error) {
      throw new AppError('Erro ao listar estudantes.');
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { nome, email, cpf, senha } = request.body;

      const handle = container.resolve(CriarEstudanteService);

      const estudanteCriado = await handle.execute({
        nome,
        email,
        cpf,
        senha,
      });

      return response.json({
        estudante: estudanteCriado,
      });
    } catch (err) {
      throw new AppError('Erro ao criar estudante.');
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { cpf } = request.params;

      const handle = container.resolve(BuscarEstudanteService);

      const estudante = await handle.execute(cpf);

      return response.json({
        estudante,
      });
    } catch (err) {
      throw new AppError('Erro ao buscar estudante pelo cpf.');
    }
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { cpf, status } = request.body;

      const handle = container.resolve(AtualizarStatusEstudanteService);

      const estudanteAtualizado = await handle.execute({
        cpf,
        status,
      });

      return response.json({
        estudante: estudanteAtualizado,
      });
    } catch (err) {
      throw new AppError('Erro ao atualizar status do estudante.');
    }
  }

  public async showByStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { status } = request.params;

      const handle = container.resolve(ListarEstudantesPeloStatusService);

      const listaEstudantes = await handle.execute(status);

      return response.json({
        estudantes: listaEstudantes,
      });
    } catch (error) {
      throw new AppError('Erro ao listar estudantes pelo status.');
    }
  }
}
