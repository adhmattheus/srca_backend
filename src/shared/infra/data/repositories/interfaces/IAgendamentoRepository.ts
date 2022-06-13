import { IAgendamento } from '@shared/application/interfaces/IAgendamento';
import { ICreateAgendamentoDTO } from '../dto/ICreateAgendamentoDTO';
import { IFindExistAgendamentoDTO } from '../dto/IFindExistAgendamentoDTO';
import { IUpdateStatusAgendamentoDTO } from '../dto/IUpdateStatusAgendamentoDTO';

export interface IAgendamentoRepository {
  create(data: ICreateAgendamentoDTO): Promise<IAgendamento>;
  delete(id: string): Promise<void>;
  findAll(): Promise<IAgendamento[]>;
  findById(id: string): Promise<IAgendamento | null>;
  findExistAgendamento(
    data: IFindExistAgendamentoDTO,
  ): Promise<IAgendamento | null>;
  findAllByStatus(status: string): Promise<IAgendamento[]>;
  findAllByAppointmentDate(dataAgendamento: Date): Promise<IAgendamento[]>;
  updateStatus(data: IUpdateStatusAgendamentoDTO): Promise<IAgendamento>;
}
