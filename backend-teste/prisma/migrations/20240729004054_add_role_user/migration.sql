-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "email", "id", "imageUrl", "name", "password", "updatedAt", "usuario") SELECT "createdAt", "email", "id", "imageUrl", "name", "password", "updatedAt", "usuario" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_usuario_key" ON "users"("usuario");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_usuario_email_idx" ON "users"("usuario", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
