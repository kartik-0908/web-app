/*
  Warnings:

  - You are about to drop the `shopify_installed_shop` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ChatbotCustomization" ALTER COLUMN "selectedColor" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "customerEmail" TEXT;

-- DropTable
DROP TABLE "shopify_installed_shop";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
