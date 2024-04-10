-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotCustomization" (
    "id" SERIAL NOT NULL,
    "selectedColor" TEXT NOT NULL DEFAULT '#4F6E5',
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

    CONSTRAINT "ChatbotCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ChatbotCustomization" ADD CONSTRAINT "ChatbotCustomization_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
