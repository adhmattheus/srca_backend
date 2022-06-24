import { prismaClient } from '../../prisma/prismaClient';
import { DateTime } from 'luxon';

import { STATUS_AGENDAMENTO } from '@shared/application/constants/StatusAgendamento';
import { IAgendamento } from '@shared/application/interfaces/IAgendamento';
import { ICreateAgendamentoDTO } from '../dto/ICreateAgendamentoDTO';
import { IAgendamentoRepository } from '../interfaces/IAgendamentoRepository';
import { IUpdateStatusAgendamentoDTO } from '../dto/IUpdateStatusAgendamentoDTO';
import { IFindExistAgendamentoDTO } from '../dto/IFindExistAgendamentoDTO';

export class AgendamentoRepository implements IAgendamentoRepository {
  public async create({
    estudanteId,
    campus,
    categoria,
    setor,
    dataAgendamento,
  }: ICreateAgendamentoDTO): Promise<IAgendamento> {
    const agendamento = await prismaClient.agendamento.create({
      data: {
        estudanteId,
        campus,
        categoria,
        setor,
        dataAgendamento,
      },
    });

    return agendamento;
  }

  public async findAll(): Promise<IAgendamento[]> {
    const agendamentos = await prismaClient.agendamento.findMany();

    return agendamentos;
  }

  public async findAllByStatus(status: string): Promise<IAgendamento[]> {
    const agendamentos = await prismaClient.agendamento.findMany({
      where: {
        statusAgendamento: STATUS_AGENDAMENTO[status as STATUS_AGENDAMENTO],
      },
    });

    return agendamentos;
  }

  public async findAllByAppointmentDate(
    dataAgendamento: Date,
  ): Promise<IAgendamento[]> {
    const firstHourOfMonth = DateTime.fromJSDate(new Date(dataAgendamento));
    const lastHourOfMonth = firstHourOfMonth.plus({
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    // console.log(firstHourOfMonth.toJSDate(), lastHourOfMonth.toJSDate());

    const agendamentos = await prismaClient.agendamento.findMany({
      where: {
        dataAgendamento: {
          gte: firstHourOfMonth.toJSDate(),
          lte: lastHourOfMonth.toJSDate(),
        },
      },
      orderBy: {
        dataAgendamento: 'asc',
      },
    });

    return agendamentos;
  }

  public async findById(id: string): Promise<IAgendamento | null> {
    const agendamento = await prismaClient.agendamento.findUnique({
      where: { id },
    });

    return agendamento;
  }

  public async findExistAgendamento({
    data,
  }: IFindExistAgendamentoDTO): Promise<IAgendamento | null> {
    const agendamento = await prismaClient.agendamento.findFirst({
      where: { dataAgendamento: data },
    });

    return agendamento;
  }

  public async updateStatus({
    id,
    status,
  }: IUpdateStatusAgendamentoDTO): Promise<IAgendamento> {
    const agendamento = await prismaClient.agendamento.update({
      where: { id },
      data: {
        statusAgendamento: STATUS_AGENDAMENTO[status as STATUS_AGENDAMENTO],
      },
    });

    return agendamento;
  }

  public async delete(id: string): Promise<void> {
    await prismaClient.agendamento.delete({
      where: { id },
    });
  }

  // public async changeStatus({
  //   id,
  //   status,
  // }: IChangeStatusAgendamentoDTO): Promise<IAgendamento> {
  //   const agendamento = await prismaClient.agendamento.update({
  //     where: { id },
  //     data: {
  //       statusAgendamento: STATUS_AGENDAMENTO[status as STATUS_AGENDAMENTO],
  //     },
  //   });

  //   return agendamento;
  // }
}
