-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerEmail" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,
    "unanswered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "shopifyDomain" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDetails" (
    "shopifyDomain" TEXT NOT NULL,
    "planId" INTEGER NOT NULL,
    "planStartDate" TIMESTAMP(3) NOT NULL,
    "convleft" INTEGER NOT NULL,

    CONSTRAINT "PlanDetails_pkey" PRIMARY KEY ("shopifyDomain")
);

-- CreateTable
CREATE TABLE "ChatbotCustomization" (
    "selectedColor" TEXT NOT NULL,
    "botName" TEXT NOT NULL,
    "greetingMessage" TEXT NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "widgetPosition" TEXT NOT NULL,
    "toneAndStyle" TEXT NOT NULL,
    "userGuidance" TEXT NOT NULL,
    "positiveReinforcement" TEXT NOT NULL,
    "errorHandling" TEXT NOT NULL,
    "politeness" TEXT NOT NULL,
    "clarityAndSimplicity" TEXT NOT NULL,
    "personalization" TEXT NOT NULL,
    "responseLength" TEXT NOT NULL,
    "clarificationPrompt" TEXT NOT NULL,
    "apologyAndRetryAttempt" TEXT NOT NULL,
    "errorMessageStyle" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "ChatbotCustomization_pkey" PRIMARY KEY ("userEmail")
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

    CONSTRAINT "shopify_installed_shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "shopDomain" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredWebhooks" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "shopDomain" TEXT NOT NULL,

    CONSTRAINT "RegisteredWebhooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conversation_shopDomain_idx" ON "Conversation"("shopDomain");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_shopifyDomain_key" ON "User"("shopifyDomain");

-- CreateIndex
CREATE UNIQUE INDEX "shopify_installed_shop_shop_key" ON "shopify_installed_shop"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_shopDomain_email_key" ON "Customer"("shopDomain", "email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatbotCustomization" ADD CONSTRAINT "ChatbotCustomization_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
