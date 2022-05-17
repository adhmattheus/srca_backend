import { ListarEstudantesService } from '@modules/estudantes/services/estudantes';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class EstudantesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const handle = container.resolve(ListarEstudantesService);

    const listaEstudantes = await handle.execute();

    return response.json(listaEstudantes);
  }
}
