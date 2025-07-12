-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "avatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "authorId" TEXT,
    "authorName" TEXT,
    "authorAvatar" TEXT,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "tags" JSONB,
    "metaData" JSONB
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT,
    "image" TEXT,
    "targetAmount" REAL NOT NULL,
    "collectedAmount" REAL NOT NULL DEFAULT 0.00,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" DATETIME,
    "endDate" DATETIME,
    "bankName" TEXT,
    "accountNumber" TEXT,
    "accountName" TEXT,
    "qrisCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "totalDonors" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "donation_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "donationId" TEXT NOT NULL,
    "donorName" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionId" TEXT,
    "paymentUrl" TEXT,
    "expiresAt" DATETIME,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "donation_transactions_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "donations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL DEFAULT 'umum',
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT,
    "authorName" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT,
    "metaData" JSONB
);

-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "description" TEXT,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "menus_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "site_statistics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metricName" TEXT NOT NULL,
    "metricValue" BIGINT NOT NULL DEFAULT 0,
    "metricDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventType" TEXT NOT NULL,
    "resourceId" TEXT,
    "resourceType" TEXT,
    "sessionId" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE INDEX "articles_category_idx" ON "articles"("category");

-- CreateIndex
CREATE INDEX "articles_status_idx" ON "articles"("status");

-- CreateIndex
CREATE INDEX "articles_featured_idx" ON "articles"("featured");

-- CreateIndex
CREATE INDEX "articles_publishedAt_idx" ON "articles"("publishedAt");

-- CreateIndex
CREATE INDEX "articles_category_status_featured_idx" ON "articles"("category", "status", "featured");

-- CreateIndex
CREATE UNIQUE INDEX "donations_slug_key" ON "donations"("slug");

-- CreateIndex
CREATE INDEX "donations_status_idx" ON "donations"("status");

-- CreateIndex
CREATE INDEX "donations_targetAmount_idx" ON "donations"("targetAmount");

-- CreateIndex
CREATE INDEX "donations_collectedAmount_idx" ON "donations"("collectedAmount");

-- CreateIndex
CREATE INDEX "donations_status_createdAt_idx" ON "donations"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "donation_transactions_transactionId_key" ON "donation_transactions"("transactionId");

-- CreateIndex
CREATE INDEX "donation_transactions_donationId_idx" ON "donation_transactions"("donationId");

-- CreateIndex
CREATE INDEX "donation_transactions_status_idx" ON "donation_transactions"("status");

-- CreateIndex
CREATE INDEX "donation_transactions_createdAt_idx" ON "donation_transactions"("createdAt");

-- CreateIndex
CREATE INDEX "donation_transactions_transactionId_idx" ON "donation_transactions"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE INDEX "news_category_idx" ON "news"("category");

-- CreateIndex
CREATE INDEX "news_priority_idx" ON "news"("priority");

-- CreateIndex
CREATE INDEX "news_publishedAt_idx" ON "news"("publishedAt");

-- CreateIndex
CREATE INDEX "news_priority_publishedAt_idx" ON "news"("priority", "publishedAt");

-- CreateIndex
CREATE INDEX "menus_orderIndex_idx" ON "menus"("orderIndex");

-- CreateIndex
CREATE INDEX "menus_isActive_idx" ON "menus"("isActive");

-- CreateIndex
CREATE INDEX "menus_parentId_idx" ON "menus"("parentId");

-- CreateIndex
CREATE INDEX "site_statistics_metricName_idx" ON "site_statistics"("metricName");

-- CreateIndex
CREATE INDEX "site_statistics_metricDate_idx" ON "site_statistics"("metricDate");

-- CreateIndex
CREATE UNIQUE INDEX "site_statistics_metricName_metricDate_key" ON "site_statistics"("metricName", "metricDate");

-- CreateIndex
CREATE INDEX "analytics_events_eventType_idx" ON "analytics_events"("eventType");

-- CreateIndex
CREATE INDEX "analytics_events_resourceId_idx" ON "analytics_events"("resourceId");

-- CreateIndex
CREATE INDEX "analytics_events_createdAt_idx" ON "analytics_events"("createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_resourceType_resourceId_idx" ON "analytics_events"("resourceType", "resourceId");
