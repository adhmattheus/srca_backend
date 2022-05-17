import { IEstudante } from '@shared/application/interfaces/IEstudante';

export interface IEstudanteRepository {
  // create(data: ICreateAnswerDTO): Promise<IAnswer>;
  // update(data: IUpdateAnswerDTO): Promise<IAnswer>;
  // delete(id: string): Promise<void>;
  findAll(): Promise<IEstudante[]>;
  // findById(id: string): Promise<IAnswer | null>;
}
