-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "conversationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_dist" (
    "shopDomain" TEXT NOT NULL,
    "Monday" INTEGER NOT NULL DEFAULT 0,
    "Tuesday" INTEGER NOT NULL DEFAULT 0,
    "Wednesday" INTEGER NOT NULL DEFAULT 0,
    "Thursday" INTEGER NOT NULL DEFAULT 0,
    "Friday" INTEGER NOT NULL DEFAULT 0,
    "Saturday" INTEGER NOT NULL DEFAULT 0,
    "Sunday" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "conversation_dist_pkey" PRIMARY KEY ("shopDomain")
);

-- CreateTable
CREATE TABLE "feature_request" (
    "id" SERIAL NOT NULL,
    "shop" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "feature_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopify_installed_shop" (
    "id" SERIAL NOT NULL,
    "shop" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "shopify_installed_shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userDetails" (
    "id" SERIAL NOT NULL,
    "shopify_website" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "interaction" TEXT[],
    "industry" TEXT NOT NULL,
    "companySize" TEXT NOT NULL,
    "inquiries" TEXT NOT NULL,
    "Setup" TEXT NOT NULL,
    "currentTool" TEXT NOT NULL,
    "learnAbout" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conversation_shopDomain_idx" ON "Conversation"("shopDomain");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_installed_shop_shop_key" ON "shopify_installed_shop"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_installed_shop_email_key" ON "shopify_installed_shop"("email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;