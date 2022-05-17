import { prismaClient } from '../../prisma/prismaClient';
import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';
import { ICreateEstudanteDTO } from '../dto/ICreateEstudanteDTO';
import { IUpdateStatusEstudanteDTO } from '../dto/IUpdateStatusEstudanteDTO';

export class EstudanteRepository implements IEstudanteRepository {
  public async findAll(): Promise<IEstudante[]> {
    const estudantes = await prismaClient.estudante.findMany({
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        status: true,
      },
    });

    return estudantes;
  }

  public async findAllByStatus(status: string): Promise<IEstudante[]> {
    const estudantes = await prismaClient.estudante.findMany({
      where: {
        status,
      },
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        status: true,
      },
    });

    return estudantes;
  }

  public async create({
    nome,
    email,
    cpf,
    senha,
  }: ICreateEstudanteDTO): Promise<IEstudante> {
    const estudante = await prismaClient.estudante.create({
      data: {
        nome,
        email,
        cpf,
        senha,
      },
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        status: true,
      },
    });

    return estudante;
  }

  public async findById(id: string): Promise<IEstudante | null> {
    const estudante = await prismaClient.estudante.findUnique({
      where: { id },
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        status: true,
      },
    });

    return estudante;
  }

  public async findByCPF(cpf: string): Promise<IEstudante | null> {
    const estudante = await prismaClient.estudante.findUnique({
      where: { cpf },
    });

    return estudante;
  }

  public async updateStatus({
    cpf,
    status,
  }: IUpdateStatusEstudanteDTO): Promise<IEstudante> {
    const estudante = await prismaClient.estudante.update({
      where: { cpf },
      data: {
        status,
      },
      select: {
        id: true,
        cpf: true,
        nome: true,
        email: true,
        status: true,
      },
    });

    return estudante;
  }
}
