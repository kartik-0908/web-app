-- CreateTable
CREATE TABLE "RegisteredWebhooks" (
    "id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,

    CONSTRAINT "RegisteredWebhooks_pkey" PRIMARY KEY ("id")
);
