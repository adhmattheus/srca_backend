export interface IEstudante {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
