import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '@shared/application/constants/container';

import { IAgendamentoRepository } from '@shared/infra/data/repositories/interfaces/IAgendamentoRepository';
import { IAgendamento } from '@shared/application/interfaces/IAgendamento';

@injectable()
export class ListarAgendamentosPeloStatusService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.AGENDAMENTO)
    private agendamentosRepository: IAgendamentoRepository,
  ) {}

  public async execute(status: string): Promise<IAgendamento[]> {
    const listaAgendamentos = await this.agendamentosRepository.findAllByStatus(
      status,
    );

    return listaAgendamentos;
  }
}
