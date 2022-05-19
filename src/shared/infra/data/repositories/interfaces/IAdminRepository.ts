import { IAdmin } from '@shared/application/interfaces/IAdmin';
import { ICreateAdminDTO } from '../dto/ICreateAdminDTO';

export interface IAdminRepository {
  create(data: ICreateAdminDTO): Promise<IAdmin>;
  findAll(): Promise<IAdmin[]>;
  findById(id: string): Promise<IAdmin | null>;
  findByEmail(email: string): Promise<IAdmin | null>;
}
