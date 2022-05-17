import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { ICreateEstudanteDTO } from '@shared/infra/data/repositories/dto/ICreateEstudanteDTO';
import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';

import IHashProvider from '@modules/estudantes/providers/HashProvider/models/IHashProvider';
import { IUpdateStatusEstudanteDTO } from '@shared/infra/data/repositories/dto/IUpdateStatusEstudanteDTO';

@injectable()
export class AtualizarStatusEstudanteService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ESTUDANTE)
    private estudantesRepository: IEstudanteRepository,
  ) {}

  public async execute({
    cpf,
    status,
  }: IUpdateStatusEstudanteDTO): Promise<IEstudante> {
    const findExistEstudante = await this.estudantesRepository.findByCPF(cpf);

    if (!findExistEstudante) {
      throw new AppError('Estudante não existe para o cpf informado.');
    }

    const estudante = await this.estudantesRepository.updateStatus({
      cpf,
      status,
    });

    return estudante;
  }
}
