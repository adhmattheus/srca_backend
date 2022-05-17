import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { ICreateEstudanteDTO } from '@shared/infra/data/repositories/dto/ICreateEstudanteDTO';
import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';

import IHashProvider from '@modules/estudantes/providers/HashProvider/models/IHashProvider';

@injectable()
export class CriarEstudanteService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ESTUDANTE)
    private estudantesRepository: IEstudanteRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    nome,
    cpf,
    email,
    senha,
  }: ICreateEstudanteDTO): Promise<IEstudante> {
    const findExistEstudante = await this.estudantesRepository.findByCPF(cpf);

    if (findExistEstudante) {
      throw new AppError('Já existe um estudante com este CPF.');
    }

    const hashedPassword = await this.hashProvider.generateHash(senha);

    const estudanteCriado = await this.estudantesRepository.create({
      nome,
      cpf,
      email,
      senha: hashedPassword,
    });

    return estudanteCriado;
  }
}
