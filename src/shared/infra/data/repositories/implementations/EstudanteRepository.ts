import { prismaClient } from '../../prisma/prismaClient';
import { IEstudanteRepository } from '@shared/infra/data/repositories/interfaces/IEstudanteRepository';
import { IEstudante } from '@shared/application/interfaces/IEstudante';

export class EstudanteRepository implements IEstudanteRepository {
  public async findAll(): Promise<IEstudante[]> {
    const estudantes = await prismaClient.estudante.findMany();

    return estudantes;
  }
}
