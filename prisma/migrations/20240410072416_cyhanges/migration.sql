/*
  Warnings:

  - You are about to drop the `ChatbotCustomization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatbotCustomization" DROP CONSTRAINT "ChatbotCustomization_userEmail_fkey";

-- DropTable
DROP TABLE "ChatbotCustomization";

-- DropTable
DROP TABLE "User";
