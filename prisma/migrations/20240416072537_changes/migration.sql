/*
  Warnings:

  - A unique constraint covering the columns `[shopDomain,email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_shopDomain_email_key" ON "Customer"("shopDomain", "email");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_shopDomain_customerEmail_fkey" FOREIGN KEY ("shopDomain", "customerEmail") REFERENCES "Customer"("shopDomain", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
