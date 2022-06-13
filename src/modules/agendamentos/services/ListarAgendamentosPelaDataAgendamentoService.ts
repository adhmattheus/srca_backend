import { inject, injectable } from 'tsyringe';
import { DateTime } from 'luxon';

import { CONTAINER } from '@shared/application/constants/container';

import { IAgendamentoRepository } from '@shared/infra/data/repositories/interfaces/IAgendamentoRepository';
import { IAgendamento } from '@shared/application/interfaces/IAgendamento';

@injectable()
export class ListarAgendamentosPelaDataAgendamentoService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.AGENDAMENTO)
    private agendamentosRepository: IAgendamentoRepository,
  ) {}

  public async execute(dataAgendamento: string): Promise<IAgendamento[]> {
    const listaAgendamentos =
      await this.agendamentosRepository.findAllByAppointmentDate(
        new Date(dataAgendamento),
      );

    return listaAgendamentos;
  }
}
