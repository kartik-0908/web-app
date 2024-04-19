-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "shopify_installed_shop"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
