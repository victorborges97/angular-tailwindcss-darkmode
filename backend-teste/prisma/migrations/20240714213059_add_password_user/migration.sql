/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "id", "imageUrl", "name", "usuario") SELECT "email", "id", "imageUrl", "name", "usuario" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_usuario_key" ON "users"("usuario");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_usuario_email_idx" ON "users"("usuario", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
