-- CreateTable
CREATE TABLE "Auction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "currentBidUserId" INTEGER,
    "currentBidDKP" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    CONSTRAINT "Auction_currentBidUserId_fkey" FOREIGN KEY ("currentBidUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
