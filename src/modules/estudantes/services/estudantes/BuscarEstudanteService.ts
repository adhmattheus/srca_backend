import AppError from '@shared/errors/AppError';

import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';
import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

@injectable()
export class BuscarEstudanteService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ESTUDANTE)
    private estudantesRepository: IEstudanteRepository,
  ) {}

  public async execute(cpf: string): Promise<IEstudante | null> {
    const estudante = await this.estudantesRepository.findByCPF(cpf);

    return estudante;
  }
}
