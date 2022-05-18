import { CONTAINER } from '@shared/application/constants/container';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import { IAgendamento } from '@shared/application/interfaces/IAgendamento';
import { IAgendamentoRepository } from '@shared/infra/data/repositories/interfaces/IAgendamentoRepository';
import { IUpdateStatusAgendamentoDTO } from '@shared/infra/data/repositories/dto/IUpdateStatusAgendamentoDTO';

@injectable()
export class AtualizarStatusAgendamentoService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.AGENDAMENTO)
    private agendamentosRepository: IAgendamentoRepository,
  ) {}

  public async execute({
    id,
    status,
  }: IUpdateStatusAgendamentoDTO): Promise<IAgendamento> {
    const findExistAgendamento = await this.agendamentosRepository.findById(id);

    if (!findExistAgendamento) {
      throw new AppError('Não existe agendamento para o id informado.');
    }

    const agendamentoAtualizado =
      await this.agendamentosRepository.updateStatus({
        id,
        status,
      });

    return agendamentoAtualizado;
  }
}
