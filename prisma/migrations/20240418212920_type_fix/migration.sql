/*
  Warnings:

  - You are about to drop the `conversation_dist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shopifyDomain]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "conversation_dist";

-- DropTable
DROP TABLE "userDetails";

-- CreateIndex
CREATE UNIQUE INDEX "User_shopifyDomain_key" ON "User"("shopifyDomain");
