import AppError from '@shared/errors/AppError';
import { CONTAINER } from '@shared/application/constants/container';
import { inject, injectable } from 'tsyringe';

import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';

@injectable()
export class ListarEstudantesPeloStatusService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ESTUDANTE)
    private estudantesRepository: IEstudanteRepository,
  ) {}

  public async execute(status: string): Promise<IEstudante[]> {
    try {
      const listaEstudantes = await this.estudantesRepository.findAllByStatus(
        status,
      );

      return listaEstudantes;
    } catch (error: any) {
      throw new AppError('Erro ao listar estudantes pelo status.');
    }
  }
}
