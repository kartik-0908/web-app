/*
  Warnings:

  - You are about to drop the column `documentFileNames` on the `KnowledgeBase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KnowledgeBase" DROP COLUMN "documentFileNames",
ADD COLUMN     "documents" JSONB[];
