-- CreateTable
CREATE TABLE "shopify_installed_shop" (
    "id" SERIAL NOT NULL,
    "shop" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "shopify_installed_shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_installed_shop_shop_key" ON "shopify_installed_shop"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_installed_shop_email_key" ON "shopify_installed_shop"("email");
