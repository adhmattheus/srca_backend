import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { IAdminRepository } from '@shared/infra/data/repositories/interfaces/IAdminRepository';
import { IAdmin } from '@shared/application/interfaces/IAdmin';

@injectable()
export class BuscarAdminService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.ADMIN)
    private adminsRepository: IAdminRepository,
  ) {}

  public async execute(id: string): Promise<IAdmin | null> {
    const admin = await this.adminsRepository.findById(id);

    return admin;
  }
}
