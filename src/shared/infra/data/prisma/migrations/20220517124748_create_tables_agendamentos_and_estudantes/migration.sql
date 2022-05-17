-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('NAO_ATENDIDO', 'NAO_COMPARECEU', 'ATENDIDO');

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "cateogria" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "data_agendamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusAgendamento" "StatusAgendamento" NOT NULL DEFAULT E'NAO_ATENDIDO',
    "estudante_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estudantes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "estudantes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_estudante_id_fkey" FOREIGN KEY ("estudante_id") REFERENCES "estudantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
