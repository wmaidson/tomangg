-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Auction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "currentBidUserId" INTEGER,
    "currentBidDKP" INTEGER DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'aberto',
    CONSTRAINT "Auction_currentBidUserId_fkey" FOREIGN KEY ("currentBidUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Auction" ("createdAt", "currentBidDKP", "currentBidUserId", "description", "endAt", "id", "startAt", "status") SELECT "createdAt", "currentBidDKP", "currentBidUserId", "description", "endAt", "id", "startAt", "status" FROM "Auction";
DROP TABLE "Auction";
ALTER TABLE "new_Auction" RENAME TO "Auction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
