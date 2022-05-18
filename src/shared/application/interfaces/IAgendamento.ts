export interface IAgendamento {
  id: string;
  estudanteId: string;
  adminId?: string;
  campus: string;
  categoria: string;
  setor: string;
  dataAgendamento: Date;
  statusAgendamento: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
