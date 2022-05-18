export interface ICreateAgendamentoDTO {
  estudanteId: string;
  campus: string;
  categoria: string;
  setor: string;
  dataAgendamento: Date;
  statusAgendamento?: string;
}
