/*
  Warnings:

  - You are about to drop the column `email` on the `shopify_installed_shop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_email_fkey";

-- DropIndex
DROP INDEX "shopify_installed_shop_email_key";

-- AlterTable
ALTER TABLE "shopify_installed_shop" DROP COLUMN "email";
