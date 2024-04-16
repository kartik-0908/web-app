/*
  Warnings:

  - The primary key for the `ChatbotCustomization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChatbotCustomization` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatbotCustomization" DROP CONSTRAINT "ChatbotCustomization_userEmail_fkey";

-- AlterTable
ALTER TABLE "ChatbotCustomization" DROP CONSTRAINT "ChatbotCustomization_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ChatbotCustomization_pkey" PRIMARY KEY ("userEmail");

-- DropTable
DROP TABLE "User";
