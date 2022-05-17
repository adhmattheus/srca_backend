import { Prisma, PrismaClient } from '@prisma/client';

const log = process.env.DATABASE_LOGGING?.split(', ') as
  | (Prisma.LogLevel | Prisma.LogDefinition)[]
  | undefined;

export const prismaClient =
  process.env.node_env !== 'production'
    ? new PrismaClient({ log })
    : new PrismaClient();
