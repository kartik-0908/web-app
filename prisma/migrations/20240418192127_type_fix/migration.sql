/*
  Warnings:

  - The primary key for the `PlanDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shopifyDomin` on the `PlanDetails` table. All the data in the column will be lost.
  - Added the required column `shopifyDomain` to the `PlanDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanDetails" DROP CONSTRAINT "PlanDetails_pkey",
DROP COLUMN "shopifyDomin",
ADD COLUMN     "shopifyDomain" TEXT NOT NULL,
ADD CONSTRAINT "PlanDetails_pkey" PRIMARY KEY ("shopifyDomain");
