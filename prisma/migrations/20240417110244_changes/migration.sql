/*
  Warnings:

  - You are about to drop the `ChatbotCustomization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conversation_dist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feature_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shopify_installed_shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatbotCustomization" DROP CONSTRAINT "ChatbotCustomization_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropTable
DROP TABLE "ChatbotCustomization";

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "conversation_dist";

-- DropTable
DROP TABLE "feature_request";

-- DropTable
DROP TABLE "shopify_installed_shop";

-- DropTable
DROP TABLE "userDetails";
