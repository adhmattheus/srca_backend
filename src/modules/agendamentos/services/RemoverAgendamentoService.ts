import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { IAgendamentoRepository } from '@shared/infra/data/repositories/interfaces/IAgendamentoRepository';
import { IAgendamento } from '@shared/application/interfaces/IAgendamento';

@injectable()
export class RemoverAgendamentoService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.AGENDAMENTO)
    private agendamentosRepository: IAgendamentoRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.agendamentosRepository.delete(id);
  }
}
