/*
  Warnings:

  - Added the required column `senha` to the `estudantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estudantes" ADD COLUMN     "senha" TEXT NOT NULL;
