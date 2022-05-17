import { IEstudante } from '@shared/application/interfaces/IEstudante';
import { ICreateEstudanteDTO } from '../dto/ICreateEstudanteDTO';
import { IUpdateStatusEstudanteDTO } from '../dto/IUpdateStatusEstudanteDTO';

export interface IEstudanteRepository {
  create(data: ICreateEstudanteDTO): Promise<IEstudante>;
  // update(data: IUpdateAnswerDTO): Promise<IAnswer>;
  // delete(id: string): Promise<void>;
  findAll(): Promise<IEstudante[]>;
  findAllByStatus(status: string): Promise<IEstudante[]>;
  findById(id: string): Promise<IEstudante | null>;
  findByCPF(cpf: string): Promise<IEstudante | null>;
  updateStatus(data: IUpdateStatusEstudanteDTO): Promise<IEstudante>;
}
