export interface IAdmin {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
