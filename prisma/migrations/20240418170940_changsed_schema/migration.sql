/*
  Warnings:

  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "plan",
ADD COLUMN     "shopifyDomain" TEXT;

-- CreateTable
CREATE TABLE "PlanDetails" (
    "shopifyDomin" TEXT NOT NULL,
    "planId" INTEGER NOT NULL,
    "planStartDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanDetails_pkey" PRIMARY KEY ("shopifyDomin")
);
