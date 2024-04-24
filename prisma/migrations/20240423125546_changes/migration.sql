-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "shopDomain" TEXT NOT NULL,
    "faqUrl" TEXT,
    "termsAndConditionsUrl" TEXT,
    "helpUrl" TEXT,
    "documentFileNames" TEXT[],
    "videoLinkUrls" TEXT[],

    CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("shopDomain")
);
