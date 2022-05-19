import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { ICreateAdminDTO } from '@shared/infra/data/repositories/dto/ICreateAdminDTO';
import { IAdminRepository } from '@shared/infra/data/repositories/interfaces/IAdminRepository';
import { IAdmin } from '@shared/application/interfaces/IAdmin';

import IHashProvider from '@modules/admins/providers/HashProvider/models/IHashProvider';

@injectable()
export class CriarAdminService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADMIN)
    private adminsRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    nome,
    email,
    senha,
    campus,
  }: ICreateAdminDTO): Promise<IAdmin> {
    const findExistAdmin = await this.adminsRepository.findByEmail(email);

    if (findExistAdmin) {
      throw new AppError('Já existe um usuário admin com este e-mail.');
    }

    const hashedPassword = await this.hashProvider.generateHash(senha);

    const adminCriado = await this.adminsRepository.create({
      nome,
      email,
      senha: hashedPassword,
      campus,
    });

    return adminCriado;
  }
}
