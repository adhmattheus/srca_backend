/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `estudantes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "estudantes_cpf_key" ON "estudantes"("cpf");
