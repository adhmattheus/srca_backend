import { prismaClient } from '../../prisma/prismaClient';
import { IAdminRepository } from '@shared/infra/data/repositories/interfaces/IAdminRepository';
import { IAdmin } from '@shared/application/interfaces/IAdmin';
import { ICreateAdminDTO } from '../dto/ICreateAdminDTO';

export class AdminRepository implements IAdminRepository {
  public async findAll(): Promise<IAdmin[]> {
    const admins = await prismaClient.admin.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        campus: true,
        status: true,
        createdAt: true,
      },
    });

    return admins;
  }

  public async create({
    nome,
    email,
    senha,
    campus,
  }: ICreateAdminDTO): Promise<IAdmin> {
    const admin = await prismaClient.admin.create({
      data: {
        nome,
        email,
        senha,
        campus,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        campus: true,
        status: true,
        createdAt: true,
      },
    });

    return admin;
  }

  public async findById(id: string): Promise<IAdmin | null> {
    const admin = await prismaClient.admin.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        campus: true,
        status: true,
        createdAt: true,
      },
    });

    return admin;
  }

  public async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await prismaClient.admin.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        campus: true,
        status: true,
        createdAt: true,
      },
    });

    return admin;
  }
}
