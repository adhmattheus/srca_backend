import { CONTAINER } from '@shared/application/constants/container';
import { inject, injectable } from 'tsyringe';
import { isEqual } from 'date-fns';

import AppError from '@shared/errors/AppError';

import { IAgendamento } from '@shared/application/interfaces/IAgendamento';
import { ICreateAgendamentoDTO } from '@shared/infra/data/repositories/dto/ICreateAgendamentoDTO';
import { IAgendamentoRepository } from '@shared/infra/data/repositories/interfaces/IAgendamentoRepository';
import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';

@injectable()
export class CriarAgendamentoService {
  constructor(
    @inject(CONTAINER.REPOSITORIES.AGENDAMENTO)
    private agendamentosRepository: IAgendamentoRepository,

    @inject(CONTAINER.REPOSITORIES.ESTUDANTE)
    private estudantesRepository: IEstudanteRepository,
  ) {}

  public async execute({
    estudanteId,
    campus,
    categoria,
    setor,
    dataAgendamento,
  }: ICreateAgendamentoDTO): Promise<IAgendamento> {
    const findExistEstudante = await this.estudantesRepository.findById(
      estudanteId,
    );

    if (!findExistEstudante) {
      throw new AppError('Erro ao encontrar estudante pelo id.');
    }

    const findExistAgendamentoInSameDate =
      await this.agendamentosRepository.findExistAgendamento({
        data: dataAgendamento,
      });

    if (findExistAgendamentoInSameDate) {
      throw new AppError('Já existe agendamento nesta data.');
    }

    const agendamentoCriado = await this.agendamentosRepository.create({
      estudanteId,
      campus,
      categoria,
      setor,
      dataAgendamento,
    });

    return agendamentoCriado;
  }
}
