import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { IAdminRepository } from '@shared/infra/data/repositories/interfaces/IAdminRepository';
import { IAdmin } from '@shared/application/interfaces/IAdmin';

@injectable()
export class ListarAdminsService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADMIN)
    private adminsRepository: IAdminRepository,
  ) {}

  public async execute(): Promise<IAdmin[]> {
    const listaAdmins = await this.adminsRepository.findAll();

    return listaAdmins;
  }
}
