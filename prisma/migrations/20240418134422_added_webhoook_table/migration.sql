/*
  Warnings:

  - The primary key for the `RegisteredWebhooks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RegisteredWebhooks" DROP CONSTRAINT "RegisteredWebhooks_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RegisteredWebhooks_pkey" PRIMARY KEY ("id");
