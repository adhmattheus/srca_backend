/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `estudantes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "estudantes_email_key" ON "estudantes"("email");
