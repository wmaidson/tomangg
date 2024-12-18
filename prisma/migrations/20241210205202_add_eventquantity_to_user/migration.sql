-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "regDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "dkp" INTEGER NOT NULL DEFAULT 0,
    "weapon1Id" INTEGER,
    "weapon2Id" INTEGER,
    "guildBoss" INTEGER NOT NULL DEFAULT 0,
    "eventQuantity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "User_weapon1Id_fkey" FOREIGN KEY ("weapon1Id") REFERENCES "Weapons" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_weapon2Id_fkey" FOREIGN KEY ("weapon2Id") REFERENCES "Weapons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("dkp", "guildBoss", "id", "regDate", "username", "weapon1Id", "weapon2Id") SELECT "dkp", "guildBoss", "id", "regDate", "username", "weapon1Id", "weapon2Id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
